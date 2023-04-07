import { Avatar, Box, Button, Divider } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useMatch, useNavigate } from 'react-router-dom';
import { AppState } from '../../context/ContextProvider';
import ThemeToggleButton from './ThemeToggleButton'
import logo from '../../assets/logo.png';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GroupsIcon from '@mui/icons-material/Groups';
import Alert from './Alert';
import { AutoStories } from '@mui/icons-material';


function SidebarComponents() {
  const { thememode } = AppState()
  const navigate = useNavigate()

  const profileLocation = useMatch("/dashboard")
  const myClassLocation = useMatch("/dashboard/myteam")
  const myCoursesLocation = useMatch("/dashboard/myCourses")
  const certificatesLocation = useMatch("/dashboard/achieve")
  const allCoursesLocation = useMatch("/dashboard/allCourses")

  return (
    <Box sx={{ height: 1, overflow: "scroll" }}>

      <Box sx={{ display: "flex", paddingX: 2, paddingY: 2 }}>
        <img src={logo} alt="Peershala" style={{ fontSize: "2rem", filter: thememode ? 'invert(100%)' : "", height: "3rem" }} />
      </Box>


      <Box sx={{ display: "flex", justifyContent: 'center', flexDirection: "column", paddingX: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <ThemeToggleButton />
        </Box>

        <Box sx={{ display: "flex", justifyContent: 'center' }}>
          <Avatar
            alt="User"
            src=""
            sx={{ width: 100, height: 100 }}
          />
        </Box>

        <Box sx={{ display: "flex", justifyContent: 'center', marginY: 1 }}>

        </Box>
      </Box>

      <Box sx={{ paddingX: 2 }}>
        <Divider sx={{ background: thememode ? "grey" : "white", marginY: 3, }} />
      </Box>


      <Box sx={{ display: "flex", flexDirection: "column", paddingX: 2 }}>

        <Box sx={{ display: "flex", flexDirection: "column", marginY: 2 }}>

          <Button color="secondary" variant={profileLocation?"contained":""} sx={{ marginY: 1 }} onClick={() => navigate("/dashboard")} >
            <AccountCircleIcon sx={{ marginX: 1 }} />Profile
          </Button>

          <Button color="secondary" variant={myClassLocation?"contained":""} sx={{ marginY: 1 }} onClick={() => navigate("/dashboard/myteam")} >
            <GroupsIcon sx={{ marginX: 1 }} /> My Class
          </Button>

          <Button color="secondary" variant={myCoursesLocation?"contained":""} sx={{ marginY: 1 }} onClick={() => navigate("/dashboard/myCourses")} >
            <AutoStories sx={{ marginX: 1 }} /> My Courses
          </Button>

          <Button color="secondary" variant={certificatesLocation?"contained":""} sx={{ marginY: 1 }} onClick={() => navigate("/dashboard/achieve")} >
            <EmojiEventsIcon sx={{ marginX: 1 }} /> Certificates
          </Button>

          <Button color="secondary" variant={allCoursesLocation?"contained":""} sx={{ marginY: 1 }} onClick={() => navigate("/dashboard/allCourses")} >
            <AutoStories sx={{ marginX: 1 }} /> All Courses
          </Button>

        </Box>

        <Divider sx={{ background: thememode ? "grey" : "white" }} />

        <Box sx={{ display: "flex", flexDirection: "column", marginY: 2 }}>

          <Alert />

          <Button
            color="primary"
            disabled={false}
            size="small"
            variant="outlined">
            Need help ?
          </Button>

        </Box>

      </Box>

    </Box>
  )
}

export default SidebarComponents