import { Avatar, Box, Paper, Typography } from '@mui/material'
import React , {useContext} from 'react'
import { AppState } from '../../context/ContextProvider'
import {
    CircularProgressbar
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { UserContext } from '../../context/ContextProvider';

function MaxScreen() {
    const { thememode } = AppState()
//   const [userContext, setUserContext] = useContext(UserContext);
    // console.log(userContext.token);
    const id=localStorage.getItem("userstore");
    const uid=JSON.parse(id);

    return (
        <div style={{ overflow: "scroll" }}>


            <Paper
                elevation={3}
                sx={{
                    display: { xs: 'none', sm: 'none', md: 'none', lg: 'flex', xl: 'flex' },
                    borderRadius: "8px",
                    justifyContent: "space-evenly",
                    padding: "15px",
                    background: thememode ? "#1a203c" : "#e7e7e7",
                    borderRadius: "8px",
                    color: thememode ? "#afafaf" : "#43464a"
                }}
            >

                <Paper elevation={3} sx={{
                    display: "flex",
                    flexDirection: "column",
                    color: thememode ? "#afafaf" : "#43464a",
                    background: thememode ? "#101534" : "#d9d9d9", borderRadius: "15px", padding: "inherit"
                }}>
                    <Box sx={{ display: "flex", justifyContent: 'center', marginBottom: "2rem" }}>

                        <Avatar
                            alt="User"

                            src=""
                            sx={{ width: 100, height: 100 }}
                        />
                    </Box>

                    <Typography variant="h6" component="h2">
                        Name
                    </Typography>
                    <Typography color={"grey"} variant="subtitle1" gutterBottom>
                        {uid.cname}
                    </Typography>

                    <Typography variant="h6" component="h2">
                        Email
                    </Typography>
                    <Typography color={"grey"} variant="subtitle1" gutterBottom>
                        {uid.umail}
                    </Typography>

                </Paper>

                <Paper elevation={3} overflow={"scroll"} sx={{
                    background: thememode ? "#101534" : "#d9d9d9",
                    color: thememode ? "#afafaf" : "#43464a",
                    borderRadius: "15px", padding: "inherit"
                }} >
                    <Typography variant="h6" component="h2">
                        College Name
                    </Typography>
                    <Typography color={"grey"} variant="subtitle1" gutterBottom>
                        {uid.collegename}
                    </Typography>

                    <Typography variant="h6" component="h2">
                        Mentor Name
                    </Typography>
                    <Typography color={"grey"} variant="subtitle1" gutterBottom>
                        {uid.mname}
                    </Typography>

                    <Typography variant="h6" component="h2">
                        Course Name
                    </Typography>
                    <Typography color={"grey"} variant="subtitle1" gutterBottom>
                        {uid.coursename}
                    </Typography>

                    <Typography variant="h6" component="h2">
                        Course Duration
                    </Typography>
                    <Typography color={"grey"} variant="subtitle1" gutterBottom>
                        6 months
                    </Typography>

                </Paper>


                <Paper elevation={3} sx={{
                    background: thememode ? "#101534" : "#d9d9d9",
                    color: thememode ? "#afafaf" : "#43464a",
                    borderRadius: "15px", padding: "inherit"
                }} >
                    <Paper elevation={2}  id="slideInAnim" sx={{
                        marginTop: "5px",
                        display: "flex", justifyContent: "center", alignItems: "center", background: thememode ? "#7e0b932e" : "#e7e7e7", color: thememode ? "white" : "black",
                        borderRadius: "10px", height: "3rem",
                        padding: "1rem"
                    }}>
                        <Typography variant="h6" component="h4">
                            My Progress
                        </Typography>
                    </Paper>
                    <Box overflow={"scroll"}  sx={{ height: "30%", padding: "1rem", height: "30%", padding: "1rem", display: "flex" }}>
                        <CircularProgressbar styles={{ transform:"scale(1)"}} value={20} text={`${20}%`} />
                    </Box>
                </Paper>

            </Paper>
        </div>
    )
}

export default MaxScreen