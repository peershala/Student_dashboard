import React, { useState, useContext, useEffect } from 'react'
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
import Axios from 'axios';
import { UserContext } from '../context/ContextProvider';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import ForgetPassword from './ForgetPassword';

Axios.defaults.withCredentials = true;

function Login() {


  const navigate = useNavigate()

  const [loginthememode, setloginThememode] = useState(false)
  const [usermail, setmail] = useState('');
  const [userpass, setpass] = useState('');
  const [userContext, setUserContext] = useContext(UserContext);
  const genericErrorMessage = "Something went wrong! Please try again later.";

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)




  useEffect(() => {
    // console.log('in useffect');
    // console.log('local-> ',localStorage.getItem("userstore"));
    const id = localStorage.getItem("userstore");
    // console.log(id.username);
    // console.log('id-> ',id);
    setUserContext(oldValues => {
      return { ...oldValues, token: id }
    })
    navigate('/');
  }, []);


  const toggleTheme = () => {
    loginthememode === false ? setloginThememode(true) : setloginThememode(false)
  }

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  // -----------------------------------alert------------------------------------
  const [openerror, setOpenerror] = useState(false);
  const [opensuccess, setOpensuccess] = useState(false);
  const [errormessage, seterrormessage] = useState("")
  const [successmessage, setsuccessmessage] = useState("")

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

  // ------------------------------------------------------------------------

  const submitHandler = () => {
    setLoading(true)

    Axios.post("/login",
      {
        username: usermail,
        password: userpass
      })
      .then(async response => {
        // console.log('no error');
        if (response.status == 200) {
          // console.log(response.data);
          // console.log(response.data.user_id);
          setUserContext(oldValues => {
            return { ...oldValues, token: response.data }

          })

          try {
            localStorage.setItem("userstore", JSON.stringify(response.data));
          } catch (error) {
            console.log(error);
          }

          setOpensuccess(true)
          setsuccessmessage("login successfully")
          setLoading(false)
          setSuccess(true)
          setTimeout(() => {
            navigate('/dashboard');
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
            }, 1000);
            return


          } else if (error.response.status === 401) {

            seterrormessage("Invalid email and password.")
            setOpenerror(true)
            setTimeout(() => {
              setLoading(false)
            }, 1000);
            return

          } else {

            seterrormessage(genericErrorMessage)
            setOpenerror(true)
            setTimeout(() => {
              setLoading(false)
            }, 1000);
            return

          }
        seterrormessage('Error, please try again');
        setOpenerror(true)
        setTimeout(() => {
          setLoading(false)
        }, 1000);

        // setIsSubmitting(false)

        // setError(genericErrorMessage)

      })
  };



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

  const CssTextField = styled(TextField)({
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
            <img draggable={false} src={logo} alt="Peershala" style={{ filter: loginthememode ? 'invert(100%)' : "", fontSize: "1rem", height: "5rem", width: "70%" }} />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly", height: "10rem", color: loginthememode ? "white" : "black" }}>

            <TextField

              sx={{ "& input": { color: loginthememode ? "white" : "black", } }} color='secondary' id="outlined-basic" label="email" variant="outlined" type='text' p
              onChange={(e) => { setmail(e.target.value) }} value={usermail} required />

            <OutlinedInput type={showPassword ? 'text' : 'password'}
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
              } sx={{ "& input": { color: loginthememode ? "white" : "black", } }} color='secondary' id="outlined-basic" onChange={(e) => { setpass(e.target.value) }}
              placeholder="password"
              required />


            {/* <CssTextField fullWidth type="text" label="Email" value={usermail} defaultValue="hello"  onChange={mailhandler}/> */}
            {/* <CssTextField fullWidth label="Password" value={userpass}  onChange={(e)=>{
              setpass(e.target.value);
            }}/> */}
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", height: "5rem", width: "100%", justifyContent: "space-between" }}>
            <ColorButton variant="contained" disabled={loading ? true : false} startIcon={success ? <CheckCircleIcon /> : ""} onClick={submitHandler}>
              {success ? "" : loading ? <CircularProgress /> : "Login"}
            </ColorButton>

              <ForgetPassword/>
              
            {/* <Box sx={{display:"flex",justifyContent:"space-between"}}>
            </Box> */}
          </Box>

          <Divider sx={{ color: loginthememode ? "white" : "black", marginY: 3, }}>
            Don't have an account?
          </Divider>


          <Box display={"flex"} justifyContent={"center"} sx={{ width: "100%" }}>
            <Button
              onClick={() => navigate("/signup")}
              startIcon={<ExitToAppIcon />} style={{
                width: "70%",
                borderRadius: "7px", height: "3rem", color: "white", textTransform: "capitalize"
              }} variant="contained" >Sign Up</Button>
          </Box>

          {/* <Divider sx={{ color: loginthememode ? "white" : "black", marginY: 1.5, }}>
            Or
          </Divider> */}



          {/* ----------------------------- google and facebook login-------------------------- */}

          {/* <Box width={1} display={"flex"} flexDirection={"column"} >

            <Button width={"100%"} startIcon={<img src={facebook} />} style={{
              borderRadius: "7px", height: "3rem",
              marginTop: "1rem", textTransform: "capitalize"
            }} variant="outlined">Sign in with <span style={{ marginLeft: "0.4rem", fontWeight: "bold", color: "blue" }}>Facebook</span> </Button>

            <Button width={"100%"} startIcon={<img src={google} />} style={{
              borderRadius: "7px", height: "3rem",
              marginTop: "1rem", textTransform: "capitalize"
            }} variant="outlined">Sign in with <span style={{ marginLeft: "0.4rem", fontWeight: "bold", color: loginthememode ? "white" : "black" }}>Google</span></Button>
          </Box> */}

          {/* ----------------------------- google and facebook login-------------------------- */}

        </Box>

      </Paper>

      {/* ----------------------------snackbar---------------------------------- */}
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={openerror} autoHideDuration={4000} onClose={handleClose1}>
        <Alert severity="error" sx={{ width: '100%' }}>
          {errormessage}
        </Alert>
      </Snackbar>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} elevation={3} open={opensuccess} autoHideDuration={4000} onClose={handleClose2}>
        <Alert elevation={3} onClose={handleClose2} severity="success" sx={{ width: '100%' }}>
          {successmessage}
        </Alert>
      </Snackbar>
      {/* -------------------------------------------------------------------------- */}
    </Box>
  )
}

export default Login