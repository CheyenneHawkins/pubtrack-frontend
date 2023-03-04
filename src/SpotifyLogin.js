import React from 'react';
import { Button } from '@mui/material';

const CLIENT_ID = 'b4ae8ca338c348bfba00ad3f62230966';
const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=http://localhost:3000&scope=streaming&20user-read-email&20user-read-private&20user-library-read&20user-library-modify&20user-read-playback-state&20user-modify-playback-state&20user-read-currently`;

export default function SpotiftyLogin() {

    return (
        <div>
            <Button 
                href={AUTH_URL}
                variant="contained"
                // draggable
                >Login with Spotify
            </Button>
            {/* <a href={AUTH_URL}>Login with Spotify</a> */}
        </div>
    )


}