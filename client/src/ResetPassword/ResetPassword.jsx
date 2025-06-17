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
import Axios from 'axios';
import { UserContext } from '../context/ContextProvider';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function ResetPassword() {

  const navigate = useNavigate()

  const [loginthememode, setloginThememode] = useState(false)
  const [usermail, setmail] = useState('');
  const [userpass, setpass] = useState('');
  const [userconfirmpass, setconfirmpass] = useState('');
  const [passcompare, setPasscompare] = useState(true);
  const [buttonstate, setButtonstate] = useState()
  const [userContext, setUserContext] = useContext(UserContext);

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const toggleTheme = () => {
    loginthememode === false ? setloginThememode(true) : setloginThememode(false)
  }


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


  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handlePassEntry1 = (e) => {
    setpass(e.target.value)
  }

  const handlePassEntry2 = (e) => {
    setconfirmpass(e.target.value)
  }

  useEffect(() => {
    if (userconfirmpass != userpass) {
      setPasscompare(false)
      setButtonstate(false)
    }
    else {
      setPasscompare(true)
      setButtonstate(true)
    }
  }, [userconfirmpass])

  const handlesubmit = () => {
    if (!passcompare || userpass == '') {
      // buttonstate(false)
      setOpenerror(true)
      seterrormessage("Please fill all the fields!")
    }
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

      <Paper elevation={3} sx={{
        background: loginthememode ? "#1a203c" : "#ffffff",
        padding: "3rem",
        borderRadius: "12px",
        width: { xs: '70%', sm: '70%', md: '70%', lg: '30%', xl: '30%' },
        height: { xs: '80%', sm: '80%', md: '80%', },
        overflow: "scroll",
        color: loginthememode ? "white" : "black"
      }}>


        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>

          <Typography variant="h4" fontWeight={"bold"} textAlign={"center"} component="h2">
            Reset password
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly", height: "70%", color: loginthememode ? "white" : "black" }}>

            <TextField sx={{ "& input": { color: loginthememode ? "white" : "black", } }} color='secondary' id="outlined-basic" label="Current password" variant="outlined" type='text' p
              onChange={(e) => { return (e.target.value) }} />

            <TextField sx={{ "& input": { color: loginthememode ? "white" : "black", } }} color='secondary' id="outlined-basic" label="New password" variant="outlined" type='text' p
              onChange={handlePassEntry1} error={passcompare ? false : true} helperText={passcompare ? "" : "Password doesn't match"} />

            <TextField sx={{ "& input": { color: loginthememode ? "white" : "black", } }} color='secondary' id="outlined-basic" label="Confirm password" variant="outlined" type='password' p onChange={handlePassEntry2} error={passcompare ? false : true} helperText={passcompare ? "" : "Password doesn't match"} />


          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", height: "5rem", width: "100%", justifyContent: "space-between" }}>
            <ColorButton variant="contained" startIcon={success ? <CheckCircleIcon /> : ""} onClick={handlesubmit} disabled={buttonstate ? false : true}>
              {success ? "" : loading ? <CircularProgress /> : "Reset"}
            </ColorButton>

          </Box>

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

    </Box >
  )
}

export default ResetPassword