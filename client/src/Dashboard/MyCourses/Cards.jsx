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
                Array.from({ length: 2 }).map((_, index) => (

                    <Paper id="slideFromBottomAnim" elevation={6} sx={{
                        display: "flex",
                        flexDirection: "column",
                        color: thememode ? "#afafaf" : "#43464a",
                        background: thememode ? "#101534" : "#d9d9d9",
                        borderRadius: "6px", padding: "inherit",
                        width: "13rem",
                        height: "inherit",
                        marginTop: "1rem",
                        marginRight:"1rem"
                    }}>

                        <Box sx={{ wordWrap: "break-word" }} >
                            <Typography textAlign={"center"} variant="h4" component="h2">
                                {index+1}. coming soon
                            </Typography>
                            <Typography margin={3} variant="p" component="p">
                                course details coming soon...
                            </Typography>
                        </Box>

                        <Box display={"flex"} justifyContent={"center"} sx={{ width: "100%" }}><Button
                            endIcon={<KeyboardArrowRight />}
                            style={{
                                background: "#3d9540",
                                width: "70%",
                                borderRadius: "7px", height: "3rem", color: "white",
                            }} variant="contained" ></Button>
                        </Box>

                    </Paper>


                ))


            }

        </>
    )
}

export default Cards