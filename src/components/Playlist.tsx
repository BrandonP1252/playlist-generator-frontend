import spotifyLogo from "../assets/spotify_logo.png"
import type {PlaylistItemType} from "../types/PlaylistType.tsx"


interface PlaylistItemProps {
    playlist: PlaylistItemType
}

const Playlist = ({ playlist } : PlaylistItemProps ) => {
    return (
        <div style={{ textAlign: "center", maxWidth: "150px", width: "100%" }}>
            <img
                src={playlist.images[0]?.url}
                alt={spotifyLogo}
                style={{ width: "100%", height: "auto", borderRadius: "8px" }}/>
            <h2 style={{ fontSize: "16px", marginTop: "5px" }}>{playlist.name}</h2>
        </div>
    )
}

export default Playlist;