import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Backdrop, Fade, IconButton, InputAdornment, OutlinedInput } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

function ForgetPassword() {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>

            <div>
                <Button disableRipple={true} sx={{
                    "&.MuiButtonBase-root:hover": {
                        bgcolor: "transparent"
                    }
                }} onClick={handleOpen}>Forget Password?</Button>
                <Modal
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                        backdrop: {
                            timeout: 1000,
                        },
                    }}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >

                    <Fade in={open}>
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h5" component="h2">
                                Forget Password
                            </Typography>
                            
                            <Typography marginTop={2} id="modal-modal-description" >
                                Enter your email to get the password in your mail
                            </Typography>

                            <Box marginTop={2} display={"flex"} width={1} justifyContent={"space-between"}>

                            <OutlinedInput color='secondary' id="outlined-basic" onChange={(e) => { return (e.target.value) }}
                                placeholder="enter your email..."
                                required />
                                <Button variant='contained'>get mail</Button>
                            </Box>

                        </Box>
                    </Fade>
                </Modal>
            </div>

        </>
    )
}

export default ForgetPassword