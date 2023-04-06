import { Box, Paper, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { AppState } from '../../context/ContextProvider';
import Cards from './Cards';
import { useNavigate } from 'react-router-dom';

function MyCourses() {

    const navigate = useNavigate();
    const { thememode } = AppState();


    return (
        <div style={{ overflow: "scroll", background: "", height: "100%", borderRadius: "10px" }}>

            <Paper elevation={5} id="slideInAnim" sx={{
                marginTop: "10px",
                display: "flex", justifyContent: "center", alignItems: "center", background: thememode ? "#00ff9536" : "#e7e7e7", color: thememode ? "white" : "black",
                borderRadius: "10px", height: "3rem"
            }}>
                <Typography fontWeight={"bold"} variant="h5" component="h3">
                    My Courses
                </Typography>
            </Paper>
            <Box sx={{
                display: { xs: 'flex', sm: 'flex', md: 'flex', lg: 'flex', xl: 'flex' },
                flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'row', xl: 'row' },
                marginTop: "1rem",
                alignItems: "center",
                justifyContent: "flex-start",
                padding: "2rem",
                flexWrap: "wrap",
                margin:"0"
            }}>


                <Cards />

            </Box>


        </div>
    )
}

export default MyCourses
