import { Box, Typography, useTheme, colors } from "@mui/material";
import MusicPlayer from "./MusicPlayer";
import SessionFooterBar from "./SessionFooterBar";
import '../styles/App.scss';
import { useContext } from "react";
import { login } from "./Login";
import { AuthContext } from "../context/authContext";


export default function Dashboard(){

    const { user, logout } = useContext(AuthContext)

    return (
        <>
        <Box 
            width='100%' 
            display='flex' 
            height={'100vh'}
            // bgcolor={colors.grey[800]} 
        >
            <Box 
                width='70%' 
                m='0px 0px 0px 0px' 
                display='flex' 
                justifyContent='center'
                alignItems='center'
                bgcolor={colors.grey[400]} 
            >
            {user 
                ? <h2> Hey {user.name}, you're email address is {user.email}!!</h2>
                : <h2> You should login. </h2>}
                <button onClick={()=> {console.log(user)}}>USER</button>
            </Box>
            <Box 
                width='30%' 
                m='0px 0px 0px 0px' 
                // bgcolor={colors.grey[900]}
                display='flex' 
                justifyContent='center'
                alignItems='center'
            >
                <MusicPlayer />
            </Box>
        </Box>
        </>
    )

}