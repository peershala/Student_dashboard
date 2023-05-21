const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const session = require('express-session');
const mysql = require('mysql2');
const path = require('path');
const cors = require('cors')
const filestore = require("session-file-store")(session)
require('dotenv').config({ path: path.resolve(__dirname + '/../.env') });
const bodyParser = require("body-parser");
const puppeteer = require('puppeteer');
const fs = require('fs');
const ejs = require('ejs');
const nodemailer = require('nodemailer');


app.use(express.static(path.join(__dirname, '/../client/build')));



app.use(express.urlencoded({ extended: false }))
app.use(session({
  // secret: "bdewu",
  secret: process.env.SECRET,
  saveUninitialized: true,
  resave: false,
  store: new filestore(),
  cookie: {
    secure: 'auto',
    sameSite: 'strict', // THIS is the config you are looing for.
  }
}));

app.use(bodyParser.json())


// app.use((req,res,next)=>{
//     console.log(req.body,"session-> ",req.session);
//     next();
// })

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.MYSQL_USER,
  password: process.env.PASSWORD,
  database:process.env.DATABASE
})//fill it up

db.connect(function (err) {
  if (err) {
    return console.error('error: ' + err.message);
  }
  console.log('Connected to the MySQL server.');
})



function checkNameExists(name) {
  return new Promise((resolve, reject) => {
    db.query('SELECT COUNT(*) as count FROM auth WHERE user_name = ?', [name], (error, results) => {
      if (error) {
        reject(error);
      } else {
        const count = results[0].count;
        if (count > 0) {
          // If the count is greater than 0, the name already exists in the database
          resolve(true);
        } else {
          // If the count is 0, the name does not exist in the database
          resolve(false);
        }
      }
    });
  });
}



//home page routes
app.get("/*", (req, res) => {

  res.sendFile(path.join(__dirname, '/../client/build', 'index.html'));

});


app.post('/register', async (req, res) => {
  const { uemail, username, password, fname, lname, collegename, mentor, coursename } = req.body || "null";
  console.log(uemail, username, password, fname, lname, collegename, mentor, coursename);
  const hash = await bcrypt.hash(password, 12);
  const fullname = fname + " " + lname;

  try {
    const nameExists = await checkNameExists(username);
    console.log(nameExists);
    if (nameExists) {
      // Show an alert in the browser
      console.log('User already exists');
      res.status(400).send();
      return;
    } else {
      const values = [username, hash, fname, lname, uemail, collegename, mentor, coursename];
      const query = "INSERT INTO auth(`user_name`,`user_password`,`first_name`,`last_name`,`email`,`collegename`,`mentor`,`coursename`) values (?,?,?,?,?,?,?,?)"//change the table name,column name as per requirement
      db.query(query, values, async (err, result) => {
        if (err) {
          console.log(err);
          res.redirect('/register')
        }

        //here need to add code for sending mail;

        try {
          var compiled = ejs.compile(fs.readFileSync(__dirname + '/views/jio.ejs', 'utf8'));
          var compiledhtml = compiled({ fname: fullname, useremail: uemail, upassword: password });

          var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.GmailDm1,
              pass: process.env.passGmailDm1
            }
          });

          var mailOptions = {
            from: process.env.GmailDm1,
            to: uemail,
            subject: 'Welcome to Peershala',
            html: compiledhtml
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
        } catch (error) {
          console.log(error);
        }

        console.log('Account created for ', username);
        res.sendStatus(200);
      });
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});




app.post('/login', async (req, res) => {
  const { username, password } = req.body || "nulluser";

  if (username == '' || password == '') {
    res.statusCode = 400;
    res.send("Invalid Details");
  }
  const query2 = "SELECT * from auth where email=?"//change the table name,column name as per requirement

  db.query(query2, username, async (err, result) => {
    if (err) {
      console.log(err);
      res.statusCode = 400;
      res.send("Invalid Details");
    }

    if (result.length == 0) {
      console.log('first WRONG USERNAME OR PASSWORD');
      res.statusCode = 401;
      res.send("Unauthorized");
    }
    else {
      console.log('result ', result[0]);
      var userId = result[0].id || 0;
      var passwordhash = result[0].user_password || "";
      var fullname = result[0].first_name + " " + result[0].last_name || "";
      var cemail = result[0].email || "";
      var collegename = result[0].collegename || "";
      var mentorname = result[0].mentor || "";
      var coursename = result[0].coursename || "";
      const validuser = await bcrypt.compare(password, passwordhash);
      if (validuser) {
        req.session.user_id = userId;
        req.session.username = username;
        req.session.cname = fullname;
        req.session.umail = cemail;
        req.session.collegename = collegename;
        req.session.mname = mentorname;
        req.session.coursename = coursename;

        console.log("valid", req.session);
        res.send(req.session);
      }
      else {
        res.statusCode = 400;
        res.send({ success: false });
      }
    }
  }
  )
});

app.post('/logout', (req, res) => {
  req.session.destroy();
  console.log('LOGGED OUT SUCCESSFULLY');
  res.sendStatus(200);
})

app.post('/filestore', async (req, res) => {
  const { cname, ctitle, durationtime, cdate, uname } = req.body;//name of candidate,job title,score of candidate and date of issue of certificate is taken from request body.
  console.log(cname, ctitle, durationtime, cdate, uname);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  try {
    var compiled = ejs.compile(fs.readFileSync(__dirname + '/views/offerl.ejs', 'utf8'));
    //   var html = fs.readFileSync(__dirname + '/views/offerl.ejs', 'utf8');
    var html = compiled({ name: cname, role: ctitle, date1: cdate, duration: durationtime });//DYNAMIC VALUES
    await page.setContent(html, { waitUntil: 'domcontentloaded' });
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

  const values = [cname, pdf, uname];
  //testing purpose only

  //certificates are not stored in db for now.

  const query = "INSERT INTO certificate(`file_name`,`file_data`,`username`) values (?,?,?)";
  db.query(query, values, (err, result) => {
    if (err) {
      console.log(err);
      res.send(err)
      return;
    }
    console.log(result);
  });
  res.send('ok');
});



app.post("/fileget", (req, res) => {
  const file_user = req.body.file_name || "nulluser";
  console.log('in file get', file_user);

  const query = "Select file_data From certificate Where username = ?";
  db.query(query, [file_user], (err, result) => {
    if (err) {
      res.status(500).send("Error retrieving file data");
    }
    else if (result.length == 0) {
      res.status(400).send('File not found');
    }
    else {
      const fileData = result[0].file_data;
      res.setHeader("Content-Type", "application/pdf");
      res.send(Buffer.from(fileData, "binary"));
    }
  })
});




const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`SESSION HEARING on ${port}..`);
});
