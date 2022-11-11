
export async function getSongsList() {
    let songs = []
    let err = false;

    const api_url = "http://127.0.0.1:8000/api/list"

    await fetch(api_url)
        .then(res => res.json())
        .then((data) => {
            console.log("fetching songs...")
            songs = data
        }
        )
        .catch(error => {
            console.log(error);
            err = true;
        })
    return {songs, err}
}


export async function getSongDetails(songid) {
    let song = {}
    let err = false;
    const api_url = "http://127.0.0.1:8000/api/" + songid
    await fetch(api_url)
        .then(res => res.json())
        .then((data) => {
            console.log("fetching song with id: " + songid);
            song = data;
        })
        .catch(error => {
            console.log(error);
            err = true;
        })
    return {song, err}
}