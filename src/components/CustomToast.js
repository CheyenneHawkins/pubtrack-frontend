import React, { useState, useEffect } from 'react'
import { Button } from '@mui/material'
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export default function CustomToast(props) {

    const { show, message, autoHideDuration, severity } = props;

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });
      

    const [open, setOpen] = useState(props.show);
    
    const handleClick = () => {
        setOpen(true);
    };
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
    
        setOpen(false);
    };

    // detect prop change
    useEffect(() => {
        // hide alert
        if (show === false) {
            setOpen(false);
        }
        show alert
        else {
            setOpen(true);
        }

    }, [show]);

  return (
    <div>
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar 
                open={open} 
                autoHideDuration={autoHideDuration}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </Stack>
    </div>
  )
}

