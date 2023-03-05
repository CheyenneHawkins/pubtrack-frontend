import { useEffect, useState } from "react"
import SpotifyPlayer from 'react-spotify-web-playback'
import SpotiftyLogin from "./SpotifyLogin";
import useSpotifyAuth from "./useSpotifyAuth";
import SpotifyComponent from "./SpotifyComponent";

export default function MusicPlayer(){

    const spotifyCode = new URLSearchParams(window.location.search).get('code');
    const spotifyToken = useSpotifyAuth(spotifyCode)
    return (
        <>
        <div className="SpotifyWrapper">
            {spotifyCode ? <h1>{<SpotifyComponent/>} </h1> : <SpotiftyLogin />}
        </div>

        </>
    )
}