const express=require('express');
const app=express();
const bcrypt=require('bcrypt');
const session=require('express-session');
const mysql=require('mysql2');
const path = require('path');
const cors=require('cors')
const filestore = require("session-file-store")(session)
require('dotenv').config();
const bodyParser = require("body-parser");
const puppeteer = require('puppeteer');
const fs = require('fs');
const ejs= require('ejs');
const nodemailer = require('nodemailer');


app.use(express.static(path.join(__dirname,'/../client/build')));



app.use(express.urlencoded({extended:false}))
app.use(session({
    secret:process.env.SECRET,
    // secret:"asec",
    saveUninitialized: true,
    resave: false,
    store: new filestore(),
    cookie : {
        secure:'auto',
        sameSite: 'strict', // THIS is the config you are looing for.
    }
}));

app.use(bodyParser.json())


app.use((req,res,next)=>{
    console.log(req.body,"session-> ",req.session);
    next();
})

const db = mysql.createConnection({
    host:process.env.HOST,
    // host:"localhost",
    user:process.env.MYSQL_USER,
    // user:"root",
    password:process.env.PASSWORD,
    // password:"rootpass",
    // database:"toptrove"
    database:process.env.DATABASE
})//fill it up

db.connect(function(err) {
if (err) {
    return console.error('error: ' + err.message);
}
console.log('Connected to the MySQL server.');
})


//home page routes
app.get("/*",(req,res)=>
{

  res.sendFile(path.join(__dirname, '/../client/build', 'index.html'));

});


app.post('/register',async(req,res)=>{

    const {username,password,fname,lname}=req.body;
    const hash=await bcrypt.hash(password,12);

    const query2="SELECT id from auth where user_name=?"//change the table name,column name as per requirement

    db.query(query2,username,(err,result)=>{
        if(err)
        {
            console.log(err);
            res.sendStatus(403);
        }
        if(result.length!=0)
        {
            console.log('Username already exists');
            res.sendStatus(400)
        }
        else{
            const values=[username,hash,fname,lname];

            const query="INSERT INTO auth(`user_name`,`user_password`,`first_name`,`last_name`) values (?,?,?,?)"//change the table name,column name as per requirement
            db.query(query,values,(err,result)=>{
                if(err)
                {
                    console.log(err);
                    res.redirect('/register')
                }
                // console.log("result ",result);
                
                //here need to add code for sending mail;
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                      user: process.env.GmailDm1,
                      pass: process.env.passGmailDm1
                    }
                  });
                  
                  var mailOptions = {
                    from: process.env.GmailDm1,
                    to: username,
                    subject: 'Welcome to Peershala',
                    html: '<h1>HEllo Welcome to Perrshala!</h1>'
                  };
                  
                  transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email sent: ' + info.response);
                    }
                  });
        
                console.log('Account created for ',username);
                res.sendStatus(200);
            })
        }
    })
})


app.post('/login',async(req,res)=>{
    const {username,password}=req.body||"nulluser";

    if(username=='' || password=='')
    {
        res.statusCode = 400;
        res.send("Invalid Details");
    }
    const query2="SELECT id,user_password from auth where user_name=?"//change the table name,column name as per requirement

    db.query(query2,username,async (err,result)=>{
        if(err)
        {
            console.log(err);
            res.statusCode = 400;
            res.send("Invalid Details");
        }

        if(result.length==0)
        {
            console.log('first WRONG USERNAME OR PASSWORD');
            res.statusCode = 401;
            res.send("Unauthorized");
        }
        else{
            var userId=result[0].id || 0;
            var passwordhash=result[0].user_password || "";
                const validuser=await bcrypt.compare(password,passwordhash);
                if(validuser)
                {
                    req.session.user_id=userId;
                    req.session.username=username;

                    console.log("valid",req.session);
                    res.send(req.session);
                }
                else{
                    res.statusCode=400;
                    res.send({success:false});
                }
            }
        }
    )
});

app.post('/logout',(req,res)=>{
    req.session.destroy();
    console.log('LOGGED OUT SUCCESSFULLY');
    res.sendStatus(200);
})

app.post('/filestore',async (req,res)=>{
    const{cname,ctitle,durationtime,cdate,uname}=req.body;//name of candidate,job title,score of candidate and date of issue of certificate is taken from request body.
    console.log(cname,ctitle,durationtime,cdate,uname);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    try {
      var compiled = ejs.compile(fs.readFileSync(__dirname + '/views/offerl.ejs', 'utf8'));
    //   var html = fs.readFileSync(__dirname + '/views/offerl.ejs', 'utf8');
      var html = compiled({ name: cname, role:ctitle , date1:cdate,duration:durationtime});//DYNAMIC VALUES
      await page.setContent(html, { waitUntil: 'domcontentloaded' });
      // await page.evaluate(async () => {
      //   try {
      //     const images = Array.from(document.images);
      //     await Promise.all(images.map(img => {
      //       if (img.complete) return;
      //       return new Promise((resolve, reject) => {
      //         img.onload = resolve;
      //         img.onerror = reject;
      //       });
      //     }));          
      //   } catch (error) {
      //     console.log('error in eval',error);
      //   }

      // });
      await page.waitForTimeout(4000);
    } catch (error) {
      // console.log(new Error(`${error}`));
      console.log(error);
      await browser.close();
      res.send(error);
      return;
    }

    const pdf = await page.pdf({
      margin: { top: '20px', right: '50px', bottom: '20px', left: '50px' },
    //   margin: { top: , right: '50px', bottom: '100px', left: '50px' },
      printBackground: true,
      format: 'letter',
      preferCSSPageSize: true
    });
    //once the pdf is created it is not stored in any path, instead its stored in database in next step.
    await browser.close();
    // Buffer.from(result[0].file_data)
    // fs.writeFileSync(`${uname}.pdf`, pdf);
    const values=[cname,pdf,uname];
    //testing purpose only

    //certificates are not stored in db for now.

    const query= "INSERT INTO certificate(`file_name`,`file_data`,`username`) values (?,?,?)";
    db.query(query,values,(err,result)=>{
      if(err)
      {
        console.log(err);
        res.send(err)
        return;
      }
      console.log(result);
    });
    res.send('ok');
});



app.post("/fileget", (req, res) => {
    const  file_user =req.body.file_name|| "nulluser";
    console.log('in file get',file_user);

    const query = "Select file_data From certificate Where username = ?";
    db.query(query, [file_user],(err, result) => {
      if (err) {
        res.status(500).send("Error retrieving file data");
      }
      else if(result.length==0)
      {
        res.status(400).send('File not found');
      }
      else{
        const fileData = result[0].file_data;
        res.setHeader("Content-Type", "application/pdf");
        res.send(Buffer.from(fileData, "binary"));
      }
    })
});




const port=process.env.PORT || 8880;

app.listen(port,()=>{
    console.log(`SESSION HEARING on ${port}..`);
});