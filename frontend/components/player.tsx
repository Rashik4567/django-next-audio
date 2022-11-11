import styles from '../styles/components/player.module.css'
import { Song } from '../interfaces/song'
import { useEffect, useState } from 'react';


function Player({ song }: { song: Song | null }) {

    let [isPlaying, setIsPlaying] = useState(false);


    useEffect(() => {
        if (isPlaying) {
            play();
        }
        const progressContainer = document.getElementById('player-progress');
        progressContainer?.addEventListener('click', setProgress);
        document.getElementById('player-audio')?.addEventListener('timeupdate', updateProgress);
    })

    function updateProgress(e) {
        const progressBar = document.getElementById("progressBar");
        let { duration, currentTime } = e.srcElement;
        let progressPercent = currentTime / duration * 100;
        progressBar.style.width = `${progressPercent}%`;
    }

    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = document.getElementById('player-audio').duration;

        console.log(document.getElementById('player-audio').networkState)

        document.getElementById('player-audio').currentTime = (clickX / width) * duration;
    }

    function play() {
        const aud = document.getElementById('player-audio');
        aud.play();
    }

    function pause() {
        const aud = document.getElementById('player-audio');
        aud.pause();
    }


    function playSong() {
        if (isPlaying) {
            pause();
            setIsPlaying(false);
        }
        else {
            play();
            setIsPlaying(true);
        }
    }


    if (song == null) {
        return (
            <div className={styles.player}>
                Play a song
            </div>
        );
    }
    else {
        return (
            <div className={styles.player}>
                <div className={styles.cover}>
                    <img src={song?.album} id="player-cover"></img>
                </div>
                <div className={styles.info}>
                    <div className={styles.title} id="player-title">{song?.name}</div>
                    <div className={styles.progress_container} id="player-progress">
                        <div className={styles.progress} id="progressBar"></div>
                    </div>
                    <audio src={song?.song} id='player-audio'></audio>

                    <div className={styles.navigation}>
                        <button className='btn btn-primary mx-1' id='player-prev'>
                            <i className="bi bi-skip-backward"></i>
                        </button>
                        <button className='btn btn-primary mx-1' id='player-play-pause' onClick={playSong}>
                            {isPlaying ? <i className="bi bi-pause-circle"></i> : <i className="bi bi-play-circle"></i>}
                        </button>
                        <button className='btn btn-primary mx-1' id='player-next'>
                            <i className="bi bi-skip-forward"></i>
                        </button>
                    </div>
                </div>
                <div className={styles.rightBtns}>
                    <button className={styles.addToPlaylist}>
                        +playlist
                    </button>
                    <button className={styles.addToFav}>
                        +fav
                    </button>
                    <button>{song?.artist}</button>
                </div>
            </div>
        )
    }
}

export default Player;