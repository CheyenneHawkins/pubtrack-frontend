import React, { useEffect } from 'react'
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Button } from '@mui/material';
import { useQuery, useMutation } from 'apollo-client';


export const login = async (req, res) => {
    return {
        id: 8,
        username: "Jimmy",
        email: "you@me.com",
    }
}


export default function Login() {

    const [values, setValues] = React.useState({
        username: '',
        password: '',
    });

    const [showPassword, setShowPassword] = React.useState(false);
    const [loginType, setLoginType] = React.useState('login');

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
  
    const handleLoginType = () => {
        setLoginType(loginType === 'login'? 'register' : 'login');
    }

    // const lkj = { data, error, loading } = useMutation(LOGIN)

  return (
    <div className='login'>
        <form className='login-container'>
            <OutlinedInput 
                fullWidth
                onChange={(e) => setValues({...values, username: e.target.value })}
                placeholder='email'
            />
            <OutlinedInput 
                fullWidth
                onChange={(e) => setValues({...values, password: e.target.value })}
                placeholder='password'
                type={showPassword ? 'text' : 'password'}
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
                }
            />
            <Button
                fullWidth
                label='Login'
                size='large'
                variant='contained'
            >{loginType === 'login' ? 'Login' : 'Register'}
            </Button>
        </form>
            <button type='button' 
                className='naked-button'
                id='login-type-button'
                onClick={()=>{handleLoginType()}}
                >{loginType === 'login' ? 'New user?' : 'Already have an account?'}
            </button>
    </div>
  )
}
