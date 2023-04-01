import { Box, Button } from '@mui/material'
import React,{useContext, useEffect} from 'react'
import { Outlet, Route, Routes,useNavigate } from 'react-router-dom'
import { AppState } from '../context/ContextProvider'
import Achievements from './Achievements/Achievements'
import Myprofile from './MyProfile/Myprofile'
import Myteam from './MyTeam/Myteam'
import AppDrawer from './Navbar/AppDrawer'
import AppNavbar from './Navbar/AppNavbar'
import BottomNav from './Navbar/BottomNav'
import Sidebar from './Navbar/Sidebar'
import { UserContext } from '../context/ContextProvider'

function Dashboard() {
    const { thememode } = AppState()
    const [userContext,setContext]=useContext(UserContext);
    const navigate=useNavigate();

    // console.log('token-> ',userContext.token);

    useEffect(()=>{
        navigate('/dashboard');
    },[]);
    // const id=localStorage.getItem("userstore");
    // console.log('store id-> ',id);

    return (
        <Box component="div" sx={{
            display: { xs: 'flex', sm: 'flex', md: 'flex', lg: 'flex', xl: 'flex' },
            flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'row', xl: 'row' },
            background: thememode ? "#0e122c" : "#d9d9d9",
            color: thememode ? "white" : "black",
            width: "100%", height: "100%", padding: "0", margin: "0",
            overflow: "scroll"
        }}>

            <AppNavbar />
            <Sidebar />
            <Box 
            sx={{
                marginBottom:{ xs: '4rem', sm: '4rem', md: '4rem', lg: '0rem', xl: '0rem' },
                marginTop:{ xs: '4rem', sm: '4rem', md: '4rem', lg: '0.1rem', xl: '0rem' },
                width: { xs: '92', sm: '92', md: '92', lg: '100%', xl: '100%' },
                padding: "1rem", display: "flex", flexDirection: "column"
            }}>
                <Outlet />
            </Box>
            {/* <Myprofile/> */}

            <BottomNav />
        </Box>
    )
}

export default Dashboard