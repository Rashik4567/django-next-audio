import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { getSongsList, getSongDetails } from '../data/list'
import styles from '../styles/home.module.css'
import Player from '../components/player'
import { Song } from '../interfaces/song'
import { useCookies } from "react-cookie"



const Home: NextPage = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [songs, setSongs] = useState<any | null>(null);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  let isSuccessful = true;
  const [cookie, setCookie] = useCookies(["lastPlayed"])

  useEffect(() => {

    async function fetchSongsList() {
      const result = await getSongsList();
      const songs = result.songs
      const error = result.err

      setSongs(songs);
      if (error) {
        isSuccessful = false;
      }

      setIsLoading(false);
      console.log("isSuccessful: " + isSuccessful);
      console.log(songs)
      getPlayerState();
    }
    function getPlayerState() {
      console.log("Running player")
      // TODO: Get the last played song from cache and play.
      // If user is new, then jut keep null
      if (cookie.lastPlayed) {
        setCurrentSong(cookie.lastPlayed);

      }
      else { setCurrentSong(null); }
    }
    fetchSongsList();





  }, []);


  function createCard(song: Song) {
    return (
      <div className="card text-dark" style={{ "width": "18rem" }}>
        <img src={song.album} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{song.name}</h5>
          <p className="card-text">{song.artist}</p>
          <a href={song.song} className="btn btn-primary">Go to song</a>
        </div>
      </div>
    )
  }

  async function songClick(e: any) {
    const id = e.target.value;
    console.log(id);
    const res = await getSongDetails(id);
    const song: Song = res.song;
    if (res.err) {
      console.log("error occured.")
    }
    setCurrentSong(song);
    setCookie("lastPlayed", song);
  }

  if (!isSuccessful) {
    return (
      <div>
        <h1>Error occured.</h1>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    )
  }
  else {
    return (
      <div>
        <Head>
          <title>Audio</title>
        </Head>

        <div className={styles.container}>
          <div className="leftsec">left</div>
          <div className={styles.middlesec}>
            <ul>
              {songs.map((song: Song) => {
                return (
                  <li key={song.id}><button value={song.id} onClick={songClick}>{song.name}</button></li>
                );
              })}
            </ul>
          </div>
          <div className="rightsec">right</div>
        </div>

        <Player song={currentSong}></Player>
      </div>
    )
  }
}

export default Home
