import React, { useState,useContext } from 'react'
import Box from '@mui/material/Box';
import { CardMedia, Chip, Divider, Grid, IconButton, Input, InputAdornment, OutlinedInput, Paper } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import logo from '../assets/logo.png';
import google from '../assets/google.png';
import facebook from '../assets/facebook.png';
import { styled } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { width } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import ThemeToggleButton from './ThemeToggleButton';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Axios from 'axios';
import { UserContext } from '../context/ContextProvider';

function Signup() {

  const d= new Date();
  const navigate = useNavigate();

  const [loginthememode, setloginThememode] = useState(false)
  const [usermail,setmail]=useState('');
  const [userpass,setpass]=useState('');
  const [fname,setfname]=useState('');
  const [lname,setlname]=useState('');
  // const [cname,setcname]=useState('');
  const [ctitle1,settitle]=useState('');
  // const [cdate1,setdate]=useState('');
  // const [cscore1,setscore]=useState('');
  const [userContext,setUserContext]=useContext(UserContext);
  const genericErrorMessage = "Something went wrong! Please try again later.";
  const [showPassword, setShowPassword] = React.useState(false);

  const submitHandler=()=>
  {
    // console.log("clicked");
    // console.log(usermail);
    // console.log(userpass);
    // navigate('/dashboard');
    const datenum=d.getDate();
    const datemonth=d.getMonth();
    const dateyear=d.getFullYear()

    const cdate1=`${datenum}/${datemonth}/${dateyear}`;
    // setdate(`${datenum}/${datemonth}/${dateyear}`);
    // setscore("O+");
    const duration=3;
    const cname1=fname.concat(" ",lname);
    Axios.post("/register",
    {username:usermail,
    password:userpass
    })
    .then(async response=>{
      // console.log('no error');
      if(response.status==200)
      {
        // console.log(cdate1,cscore1);
        Axios.post('/filestore',{cname:cname1,ctitle:ctitle1,durationtime:duration,cdate:cdate1,uname:usermail}).then(res=>{
          console.log(`File for  ${usermail} created`);
        })
        .catch(e=>{
          console.log(e);
        })

        navigate('/');
      }
    })
    .catch(error => {

      if(error.response)
      if (error.response.status === 400) {

        // setError("Please fill all the fields correctly!")
        console.log("Please fill all the fields correctly!")

      } else if (error.response.status === 401) {

        console.log("Invalid email and password combination.")

      } else {

        console.log(genericErrorMessage)

    }
    console.log('error',error);
    // setIsSubmitting(false)

    // setError(genericErrorMessage)

  })
  };




  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const toggleTheme = () => {
    loginthememode === false ? setloginThememode(true) : setloginThememode(false)
  }

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[900],
    width: "100%",
    height: "3rem",
    fontWeight: "bold",
    borderRadius: "8px",
    '&:hover': {
      backgroundColor: purple[700],
    },
  }));

  const CssTextField = styled(TextField,OutlinedInput)({
    '& label.Mui-focused': {
      color: loginthememode ? "white" : "blue",
    },
    label: {
      color: loginthememode ? "#bbbbbb" : "grey",
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: "blue",
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: "grey",
      },
      '&:hover fieldset': {
        borderColor: loginthememode ? "white" : "black",
      },
      '&.Mui-focused fieldset': {
        borderColor: '#1976d2',
      },
      input: {
        color: loginthememode ? "white" : "black",
      }
    },
  });



  return (
    <Box sx={{
      overflow: "scroll",
      display: "flex",
      flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: '', xl: '' },
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: loginthememode ? "#0e122c" : "#dfdfdf",
      height: "100%",
      width: "100%",
      color: loginthememode ? "white" : "black"
    }}>

      <Box onClick={toggleTheme} sx={{ display: "flex", justifyContent: "flex-end" }}>
        <ThemeToggleButton />
      </Box>

      {/* <img src={logo} alt="Peershala" style={{marginTop:"10rem", fontSize: "2rem", height: "5rem" }} /> */}

      <Paper elevation={3} sx={{
        background: loginthememode ? "#1a203c" : "#ffffff",
        padding: "3rem",
        borderRadius: "12px",
        width: { xs: '70%', sm: '70%', md: '70%', lg: '30%', xl: '30%' },
        height: { xs: '80%', sm: '80%', md: '80%', },
        overflow: "scroll",
        color: loginthememode ? "white" : "black"
      }}>

        <Box sx={{ display: "flex", flexDirection: "column" }}>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <img src={logo} alt="Peershala" style={{ filter: loginthememode ? 'invert(100%)' : "", fontSize: "1rem", height: "5rem", width: "70%" }} />
          </Box>


          <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly", height: "20rem", color: loginthememode ? "white" : "black" }}>

            <Box sx={{ display: "flex", justifyContent: "space-between", color: loginthememode ? "white" : "black" }}>
              {/* <CssTextField fullWidth label="Name" /> */}
              <Input type='text' onChange={(e)=>{setfname(e.target.value)}} placeholder="first name"/>
              <Box width={"3rem"}></Box>
              {/* <CssTextField fullWidth label="Last name" /> */}
              <Input type='text' onChange={(e)=>{setlname(e.target.value)}} placeholder="last name"/>
            </Box>
            {/* <CssTextField type="email" fullWidth label="Email" /> */}
            <Input type='email' onChange={(e)=>{setmail(e.target.value)}} placeholder="user name"/>
            <Input type='text' onChange={(e)=>{settitle(e.target.value)}} placeholder="title"/>
            <Input type='password' onChange={(e)=>{setpass(e.target.value)}} placeholder="password"/>

            {/* <CssTextField  fullWidth label="Password" /> */}
            {/* <CssTextField  fullWidth label="Password" /> */}
            {/* <CssTextField fullWidth label="Confirm Password"/> */}

          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", height: "5rem", width: "100%", justifyContent: "space-between" }}>
            <ColorButton variant="contained" onClick={submitHandler}>Sign Up</ColorButton>
            {/* <Link href="#" underline="hover">
              {'Forget Password?"'}
            </Link> */}
            {/* <Box sx={{display:"flex",justifyContent:"space-between"}}>
            </Box> */}
          </Box>

          <Divider sx={{ color: loginthememode ? "#afafaf" : "#43464a", marginY: 3, }}>
            Already have an account?
          </Divider>


          <Box display={"flex"} justifyContent={"center"} sx={{ width: "100%" }}>
            <Button
              onClick={() => navigate("/login")}
              startIcon={<ExitToAppIcon />} style={{
                width: "70%",
                borderRadius: "7px", height: "3rem", color: "white", textTransform: "capitalize"
              }} variant="contained">Login</Button>
          </Box>


        </Box>

      </Paper>

    </Box>
  )
}

export default Signup