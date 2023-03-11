import { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../context/authContext';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'graphql-tag'
import { useNavigate } from'react-router-dom';

// import { REGISTER_USER } from '../graphql/mutations'
import { } from '../graphql/queries'

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
import { Alert, Button } from '@mui/material';
import { Stack } from '@mui/system';

import globe from '../images/globe.png';


const REGISTER_USER = gql`
    mutation Mutation(
        $registerInput: RegisterInput
        ) {
            registerUser(
                registerInput: $registerInput
            ) {
            name
            email
            password
            token
            }
        }
`

const LOGIN_USER = gql`
    mutation Mutation(
        $loginInput: LoginInput
        ) {
            loginUser(
                loginInput: $loginInput
            ) {
            name
            email
            token
            }
        }
`

const QUERY_USER_BY_EMAIL = gql`
    query GetUserByEmail(
        $email: String!
    ) {
        getUserByEmail(
            email: $email
        ) {
            name
        }
    }
`

export default function Login() {
    
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
    });
    

    const [loginValues, setLoginValues] = useState({
        email: '',
        password: '',
    })
    
    const [showPassword, setShowPassword] = useState(false);
    const [loginType, setLoginType] = useState('login');
    const [errors, setErrors] = useState([]);
    
    const { user, logout } = useContext(AuthContext)

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    
    const handleLoginType = () => {
        setLoginType(loginType === 'login'? 'register' : 'login');
    }

    const context = useContext(AuthContext);
    let navigate = useNavigate();

    // const  { loading: queryLoading, error: queryError , data: queryData  } = useQuery(QUERY_USER_BY_EMAIL, { variables: { email: 'cheyenne.hawkins@gmail.com' }});

    // console.log(queryData);

    ////
    const  [registerUser, { loading, error, data }] = useMutation(REGISTER_USER, {
        update(proxy, { data: { registerUser: userData }}) {
            context.login(userData);
            navigate('/dashboard');
        },
        onError(err) {
            setErrors(err.graphQLErrors);
        },
        variables: { registerInput: values}
    });

    const  [loginUser, { loading: loginLoading, error: loginError , data: loginData  }] = useMutation(LOGIN_USER, {
        update(proxy, { data: { loginUser: userData }}) {
            context.login(userData);
            navigate('/dashboard');
        },
        onError(err) {
            setErrors(err.graphQLErrors);
        },
        variables: { loginInput: loginValues}
    });


    function handleSubmit(e) {
        e.preventDefault();
        console.log('SUBMITTED');
        loginType === 'login' ? loginUser() : registerUser();
    }

    ////
    return (
        <div className='login'>
        {user === null ? 
        <>
            <form className='login-container'>
            <Stack 
                spacing={2}
                width='100%'
            >
            <div className='login-header'>
                <img src={globe} alt='logo' height={50} />
                <h1>PUBTRACK</h1>
            </div>
                {loginType === 'register' &&
                <OutlinedInput 
                    fullWidth
                    onChange={(e) => {
                        setValues({...values, name: e.target.value })
                        }}
                    placeholder='Full Name'
                />}
                <OutlinedInput 
                    fullWidth
                    onChange={(e) => {
                        setValues({...values, email: e.target.value })
                        setLoginValues({...loginValues, email: e.target.value })
                        }}
                    placeholder='Email'
                    autoComplete='email'
                />
                <OutlinedInput 
                    fullWidth
                    onChange={(e) => {
                        setValues({...values, password: e.target.value })
                        setLoginValues({...loginValues, password: e.target.value })
                        }}
                    placeholder='Password'
                    autoComplete='current-password'
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            handleSubmit(e)
                        }
                    }}
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
                    onClick={(e) => {
                        console.log(loginValues)
                        handleSubmit(e)
                    }}
                >{loginType === 'login' ? 'Login' : 'Register'}
                </Button>
                </Stack>
                    {errors.map(function (error, index) {
                        return (
                            <Alert severity='error' key={index}>{error.message}</Alert>
                        )
                    })}
            </form>
                <button type='button' 
                    className='naked-button'
                    id='login-type-button'
                    onClick={()=>{handleLoginType()}}
                    >{loginType === 'login' ? 'New user?' : 'Already have an account?'}
                </button>
            </>
            : <>
                <div className='login-container'>
                    You already here dog.}.
                    {/* You already here {queryData ? queryData?.getUserByEmail?.name : 'guy'}. */}
                <div 
                    className='button-spaced'
                >
                    <Button
                        fullWidth
                        label='Login'
                        size='large'
                        variant='contained'
                        onClick={()=>{logout()}}
                    >
                        LOGOUT
                    </Button>
                    
                </div>
                </div> 
            </>
        }
                <button type='button' 
                    onClick={()=>{console.log(user)}}
                    >CHECK USER
                </button>
                <br/>
                <button type='button' 
                    onClick={()=>{
                        // GetUserByEmail('cheyenne.hawkins@gmail.com')
                        }}
                    >CHECK QUERY
                </button>
                <br/>
                {/* <h1>{queryData.getUserByEmail.name}</h1> */}
    </div>
  )
}
