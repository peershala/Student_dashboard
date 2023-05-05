import React, { useState, useContext } from 'react'
import Box from '@mui/material/Box';
import { Alert, CardMedia, Chip, CircularProgress, Divider, Grid, IconButton, Input, InputAdornment, OutlinedInput, Paper, Snackbar } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import logo from '../assets/logo.png';
import google from '../assets/google.png';
import facebook from '../assets/facebook.png';
import { styled } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { width } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import ThemeToggleButton from './ThemeToggleButton';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Axios from 'axios';
import { UserContext } from '../context/ContextProvider';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function Signup() {

  const d = new Date();
  const navigate = useNavigate();

  const [loginthememode, setloginThememode] = useState(false)
  const [usermail, setmail] = useState('');
  const [userpass, setpass] = useState('');
  const [fname, setfname] = useState('');
  const [lname, setlname] = useState('');
  // const [cname,setcname]=useState('');
  const [uname, setuname] = useState('');
  // const [cdate1,setdate]=useState('');
  // const [cscore1,setscore]=useState('');
  const [userContext, setUserContext] = useContext(UserContext);
  const genericErrorMessage = "Something went wrong! Please try again later.";
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)


  // -----------------------------------alert------------------------------------
  const [openerror, setOpenerror] = useState(false);
  const [opensuccess, setOpensuccess] = useState(false);
  const [errormessage, seterrormessage] = useState("")
  const [successmessage, setsuccessmessage] = useState("")
  const [collegen, setcollege] = useState("")
  
  const handleClose1 = (event, reason) => {
    if (reason === 'clickaway') {
      setOpenerror(false);
    }

    setOpenerror(false);
  };
  const handleClose2 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpensuccess(false);
  };
  const [show,setShow]=useState(false)
  const handleShow=()=>{
    setShow(!show)
  }
    <label onClick={handleShow}>{show?"Hide":"Show"}</label>
  
  // ------------------------------------------------------------------------


  const submitHandler = () => {
    setLoading(true)
    // console.log("clicked");
    // console.log(usermail);
    // console.log(userpass);
    // navigate('/dashboard');
    // const datenum = d.getDate();
    // const datemonth = d.getMonth();
    // const dateyear = d.getFullYear()

    // const cdate1 = `${datenum}/${datemonth}/${dateyear}`;
    // setdate(`${datenum}/${datemonth}/${dateyear}`);
    // setscore("O+");
    // const cname1 = fname.concat(" ", lname);
    // const collegen="Rajarshi Shahu Mahavidyalaya";
    const ment="Sudip Das";
    const courname="Web Development";
    Axios.post("/register",
      {
        uemail: usermail,
        username:uname,
        password: userpass,
        fname:fname,
        lname:lname,
        collegename:collegen,
        mentor:ment,
        coursename:courname
      })
      .then(async response => {
        // console.log('no error');
        if (response.status == 200) {
          // console.log(cdate1,cscore1);
          // Axios.post('/filestore', { cname: cname1, username: uname, cscore: cscore1, cdate: cdate1, uemail: usermail }).then(res => {
          //   console.log(`File for  ${usermail} created`);
          // })
          //   .catch(e => {
          //     seterrormessage(e);

          //   })
          setLoading(false)
          setSuccess(true)
          setOpensuccess(true)
          setsuccessmessage("Registration successfull")
          setTimeout(() => {
            navigate('/');
            setSuccess(false)
          }, 1500);
          return
        }
      })
      .catch(error => {

        if (error.response)
          if (error.response.status === 400) {

            // setError("Please fill all the fields correctly!")
            seterrormessage("Please fill all the fields correctly!")
            setOpenerror(true)
            setTimeout(() => {
              setLoading(false)
            }, 2000)
            return

          } else if (error.response.status === 401) {

            seterrormessage("Invalid email and password combination.")
            setOpenerror(true)
            setTimeout(() => {
              setLoading(false)
            }, 2000)
            return
          } else {

            seterrormessage("")
            setOpenerror(true)
            setTimeout(() => {
              setLoading(false)
            }, 2000)
            return
          }
        seterrormessage('error, please try again');
        setOpenerror(true)

        setTimeout(() => {
          setLoading(false)
        }, 1000);


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
    backgroundColor: success ? green[500] : purple[900],
    width: "100%",
    height: "3rem",
    fontWeight: "bold",
    borderRadius: "8px",
    '&:hover': {
      backgroundColor: success ? green[500] : purple[700],
    },
  }));

  const CssTextField = styled(TextField, OutlinedInput)({
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

      {/* <Box onClick={toggleTheme} sx={{ display: "flex", justifyContent: "flex-end" }}>
        <ThemeToggleButton />
      </Box> */}

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

              {/* first name input field */}
              <TextField sx={{ "& input": { color: loginthememode ? "white" : "black", } }}
                color='secondary' id="outlined-basic" label="First name" variant="outlined" type='text' onChange={(e) => { setfname(e.target.value) }} placeholder="first name" />


              <Box width={"3rem"}></Box>

              {/* <CssTextField fullWidth label="Last name" /> */}
              <TextField sx={{ "& input": { color: loginthememode ? "white" : "black", } }} color='secondary' id="outlined-basic" label="Last name" variant="outlined" type='text' onChange={(e) => { setlname(e.target.value) }} placeholder="last name" />

            </Box>

            <TextField sx={{ "& input": { color: loginthememode ? "white" : "black", } }} color='secondary' id="outlined-basic" label="college name" variant="outlined" type='text' onChange={(e) => { setcollege(e.target.value) }} placeholder="college name" />
            {/* <CssTextField type="email" fullWidth label="Email" /> */}
            <TextField sx={{ "& input": { color: loginthememode ? "white" : "black", } }} color='secondary' id="outlined-basic" label="Email" variant="outlined" type='email' onChange={(e) => { setmail(e.target.value) }} placeholder="email" />

            <TextField sx={{ "& input": { color: loginthememode ? "white" : "black", } }} color='secondary' id="outlined-basic" label="username" variant="outlined" type='text' onChange={(e) => { setuname(e.target.value) }} placeholder="user name" />
           

            <OutlinedInput
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              } sx={{ "& input": { color: loginthememode ? "white" : "black", } }} color='secondary' id="outlined-basic" onChange={(e) => { setpass(e.target.value) }} placeholder="password" />

            {/* <CssTextField  fullWidth label="Password" /> */}
            {/* <CssTextField  fullWidth label="Password" /> */}
            {/* <CssTextField fullWidth label="Confirm Password"/> */}

          </Box>

          <Box  sx={{ display: "flex", flexDirection: "column", height: "3rem", width: "100%", justifyContent: "space-between" }}>

            <ColorButton variant="contained" onClick={submitHandler} disabled={loading ? true : false} startIcon={success ? <CheckCircleIcon /> : ""}>
              {success ? "" : loading ? <CircularProgress /> : "Sign Up"}

            </ColorButton>

            {/* <Box sx={{display:"flex",justifyContent:"space-between"}}>
            </Box> */}
          </Box>

          <Divider sx={{ color: loginthememode ? "#afafaf" : "#43464a", marginY: 2, }}>
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
      {/* <Snackbar anchorOrigin={{ vertical: 'top',horizontal: 'right' }} open={true} sx={{ width: '100%' }} autoHideDuration={4000} onClose={handleClose1}>
        <Alert onClose={handleClose1} severity="success" >
          {errormessage}
        </Alert>
      </Snackbar> */}
      {/* ----------------------------snackbar---------------------------------- */}
      <Snackbar anchorOrigin={{ vertical: 'top',horizontal: 'right' }} open={openerror} autoHideDuration={4000} onClose={handleClose1}>
        <Alert severity="error" sx={{width: '100%'}}>
          {errormessage}
        </Alert>
      </Snackbar>
      <Snackbar anchorOrigin={{ vertical: 'top',horizontal: 'right' }} elevation={3} open={opensuccess} autoHideDuration={4000} onClose={handleClose2}>
        <Alert elevation={3} onClose={handleClose2} severity="success" sx={{ width: '100%'}}>
          {successmessage}
        </Alert>
      </Snackbar>
      {/* -------------------------------------------------------------------------- */}

    </Box>
  )
}

export default Signup