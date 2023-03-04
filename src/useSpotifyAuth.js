import React, { useEffect } from 'react';
import axios from 'axios';

export default function useSpotifyAuth(spotifyCode) {

    const [accessToken, setAccessToken] = React.useState()
    const [refreshToken, setRefreshToken] = React.useState()
    const [expiresIn, setExpiresInToken] = React.useState()

// this works, only disabled to prevent the console errors

//     useEffect(() => {
//         axios.post('http://localhost:8800/spotifylogin', {
//             spotifyCode
//         })
//     .then(res => {
//         // console.log(res.data)
//         setAccessToken(res.data.accessToken)
//         setRefreshToken(res.data.refreshToken)
//         setExpiresInToken(res.data.expiresIn)
//     })
//     .catch(err => {
//         console.log(err)
//     })
// }, [spotifyCode])

}