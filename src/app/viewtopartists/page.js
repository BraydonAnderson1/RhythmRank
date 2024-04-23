"use client"
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const CLIENT_ID = "a7d0f74df3774f789303f7fc77ce014b";
const REDIRECT_URI = "http://localhost:3000";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";

function ViewTopArtists() {
  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("")
  const [artists, setArtists] = useState([])

  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    if (!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

      window.location.hash = ""
      window.localStorage.setItem("token", token)
    }

    setToken(token)

  }, [])

  const logout = () => {
    setToken("")
    window.localStorage.removeItem("token")
  }

  const searchArtists = async (e) => {
    e.preventDefault()
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        q: searchKey,
        type: "artist"
      }
    })

    setArtists(data.artists.items)
  }

  const renderArtists = () => {
    return artists.map(artist => (
      <div key={artist.id} className="card card-compact w-96 bg-base-100 shadow-xl">
        <figure><img src={artist.images.length ? artist.images[0].url : "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"} alt={artist.name} /></figure>
        <div className="card-body">
          <h2 className="card-title">{artist.name}</h2>
          <div className="card-actions justify-end">
            <Link href={`/artist/${artist.id}`} className="btn btn-primary">View Artist</Link>
          </div>
        </div>
      </div>
    ))
  }

  const fetchTopArtists = async () => {
    const { data } = await axios.get("https://api.spotify.com/v1/me/top/artists", {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        time_range: "short_term",
        limit: 5,
        offset: 5
      }
    })

    setArtists(data.items)
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="navbar bg-mytheme-neutral outline outline-offset-2 outline-1">
          <div className="flex-1">
            <Link href="/" className="btn btn-ghost text-xl">RhythmRank</Link>
            <Link href='/viewtopsongs' className="btn btn-ghost text-xl">View Top Songs</Link>
            <Link href='/discover' className="btn btn-ghost text-xl">Discover Music</Link>
          </div>
          <div className="flex-none gap-2">
            <div className="form-control">
              <form onSubmit={searchArtists}>
                <input placeholder="Search Artist" type="text" onChange={e => setSearchKey(e.target.value)} className="input input-bordered w-24 md:w-auto" />
              </form>
            </div>
            <p>{!token ?
                  <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=user-top-read`}>Login to Spotify</a>
                  : <button onClick={logout}>Logout</button>}</p>
          </div>
        </div>
      </header>
      <div className="hero min-h-screen bg-mytheme-neutral">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">View Your Top Artists</h1>
            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
            <button onClick={fetchTopArtists} className="btn btn-info bg-mytheme-secondary">Reveal Artists</button>
            {renderArtists()}
          </div>
        </div>
      </div>
      <div>
      </div>
    </div>
  );
}

export default ViewTopArtists;