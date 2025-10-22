import {useLocation, useNavigate} from "react-router";
import PlaylistItem from "../components/PlaylistItem.tsx";

const Result = () => {

    const location = useLocation();
    const { state } = location;
    const { playlist } = state;
    const navigate = useNavigate();
    const handleHomeButton = () => {
        navigate('/dashboard');
    }

    const handleRegenButton = async () => {

        try {
            await fetch("http://127.0.0.1:5000/api/delete-playlist", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    playlist_id: playlist.id,
                })
            })
        } catch (error) {
            console.error("Can't delete playlist: "+ error);
        } finally {
            navigate('/generate-playlist');
        }
    }

    return (
        <div>
            <h1>Your Generated Playlist</h1>
            <PlaylistItem playlist={playlist} />
            <div>
                <button style={{marginRight: "10px"}} onClick={handleHomeButton}>Home</button>
                <button onClick={handleRegenButton}>Don't like? Generate again</button>
            </div>
        </div>
    );
}

export default Result;