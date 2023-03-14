import player from '../images/player-temp.png';
import MusicPlayer from './MusicPlayer';

export default function SessionFooterBar() {

    return (
    <>
        <div className="session-footer-bar">
        {/* <MusicPlayer /> */}
        <img src={player} alt="player" height={100} className="session-footer-bar-player"/>
        </div>
    </>
    )
}