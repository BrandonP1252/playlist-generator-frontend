import {useQuery} from "@tanstack/react-query";
import { useEffect } from "react";
import Playlist from "../components/Playlist.tsx";
import type {PlaylistItemType} from "../types/PlaylistType.tsx";
import "../css/playlist.css";
import {useNavigate} from "react-router";

const Dashboard = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        if (token) {
            localStorage.setItem("spotify_token", token);
        }
    }, []);

    const {data, isLoading, error} = useQuery({
        queryKey: ["playlistData"],
        queryFn: () => fetch("https://playlistgeneratorv2.onrender.com/api/get-user-data", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("spotify_token"),
            }
        }).then(res => res.json()),
        staleTime: 60000
    })

    if (isLoading) return (
            <div className="form-container">
                <h2 className="loading-message" >Loading playlists...</h2>
            </div>
        )

    if (error) return 'Error: ' + error.message

    const { userInfo, playlists } = data

    const handleClick = () => {
        navigate('/generate-playlist')
    }

    return (
        <div className="page-fade" style={{ padding: "20px" }}>
            <h1>Welcome, {userInfo?.display_name ?? "Guest"}</h1>
            <h2>Your Playlists</h2>
            <div className="playlist-grid">
                {playlists?.items?.map((playlist: PlaylistItemType, index: number) => (
                    <div key={playlist.id}
                         className="playlist-item"
                         style={{ animationDelay: `${index * 100}ms` }}>
                        <Playlist key={playlist.id} playlist={playlist} />
                    </div>
                ))}
            </div>
            <button onClick={handleClick}>Generate your Custom Playlist</button>
        </div>
    )
}

export default Dashboard;