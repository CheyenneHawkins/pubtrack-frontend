import { Box, Typography, useTheme, colors } from "@mui/material";
import MusicPlayer from "./MusicPlayer";
import SessionFooterBar from "./SessionFooterBar";
import '../styles/App.scss';

export default function Dashboard(){

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
                Dashboarding, hard.
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