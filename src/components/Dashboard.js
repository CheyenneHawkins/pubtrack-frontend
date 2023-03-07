import { Box, Typography, useTheme, colors } from "@mui/material";
import MusicPlayer from "./MusicPlayer";
import SessionFooterBar from "./SessionFooterBar";
import '../styles/App.scss';
import { useContext } from "react";
import {UserContext} from "../context/UserContext";
import { login } from "./Login";

export default function Dashboard(){

    const { user, setUser } = useContext(UserContext)

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
                {/* {JSON.stringify(user.email, null, 2)} */}
                <button 
                type='button' 
                onClick={async ()=> {
                    const user = await login();
                    setUser(user)
                }}>CLICK</button>
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