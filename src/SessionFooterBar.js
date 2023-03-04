import player from './images/player-temp.png';

export default function SessionFooterBar() {

    return (
    <>
        <div className="session-footer-bar">
        <img src={player} alt="player" className="session-footer-bar-player"/>
        {/* <h1>footer</h1> */}
        </div>
    </>
    )
}