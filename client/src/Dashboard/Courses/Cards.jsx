import { Box, Button, Paper, Typography } from '@mui/material'
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import React from 'react'
import { AppState } from '../../context/ContextProvider'
import Axios from 'axios';
import { KeyboardArrowRight } from '@mui/icons-material';


function Cards() {
    const { thememode } = AppState()



    return (
        <>
            {
                Array.from({ length: 6 }).map((_, index) => (

                    <Paper id="slideFromBottomAnim" elevation={6} sx={{
                        display: "flex",
                        flexDirection: "column",
                        color: thememode ? "#afafaf" : "#43464a",
                        background: thememode ? "#101534" : "#d9d9d9",
                        borderRadius: "6px", padding: "inherit",
                        width: "13rem",
                        height: "inherit",
                        marginTop: "1rem"
                    }}>

                        {/* <Box sx={{
                            background: thememode ? "#0e122c" : "#bdbdbd",
                            marginBottom: "1rem",
                            height: "5rem",
                            width: "9rem",
                            borderRadius: "6px", padding: "inherit"
                        }}>

                        </Box> */}

                        <Box sx={{ wordWrap: "break-word" }} >
                            <Typography textAlign={"center"} variant="h4" component="h2">
                                {index+1}. Coming soon
                            </Typography>
                            <Typography margin={3} variant="p" component="p">
                                course details coming soon...
                            </Typography>
                        </Box>

                        <Box display={"flex"} justifyContent={"center"} sx={{ width: "100%" }}><Button
                            endIcon={<KeyboardArrowRight />}
                            style={{
                                background: "#1fa23b",
                                width: "70%",
                                borderRadius: "7px", height: "3rem", color: "white",
                            }} variant="contained" >Enroll</Button>
                        </Box>

                    </Paper>


                ))


            }

        </>
    )
}

export default Cards