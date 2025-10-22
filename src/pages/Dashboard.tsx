import {useQuery} from "@tanstack/react-query";
import {useContext} from "react";
import {UserInfoContext} from "../context/UserContext.tsx";
import Playlist from "../components/Playlist.tsx";
import type {PlaylistItemType} from "../types/PlaylistType.tsx";
import "../css/playlist.css";
import {useNavigate} from "react-router";

const Dashboard = () => {

    const navigate = useNavigate();

    const userInfoContext = useContext(UserInfoContext);

    if (!userInfoContext) {
        throw new Error("UserContext not found");
    }

    const { userInfo } = userInfoContext;

    const {data, isLoading, error} = useQuery({
        queryKey: ["playlistData"],
        queryFn: () => fetch("http://127.0.0.1:5000/api/get-user-playlists").then(res => res.json()),
        staleTime: 60000
    })

    if (isLoading) return <p>Loading playlists...</p>

    if (error) return 'Error: ' + error.message

    const handleClick = () => {
        navigate('/generate-playlist')
    }

    return (
        <div className="page-fade" style={{ padding: "20px" }}>
            <h1>Welcome, {userInfo?.display_name ?? "Guest"}</h1>
            <h2>Your Playlists</h2>
            <div className="playlist-grid">
                {data?.items?.map((playlist: PlaylistItemType, index: number) => (
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