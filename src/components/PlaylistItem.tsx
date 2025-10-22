import "../css/playlistItem.css";
import type {PlaylistType} from "../types/PlaylistType.tsx";

interface PlaylistItemProps {
    playlist: PlaylistType;
}

const PlaylistItem = ({playlist} : PlaylistItemProps) => {

    return (
        <div className="playlist-item-container">
            <h2 className="playlist-title">{playlist.name}</h2>
            <div className="track-list">
                {playlist?.tracks?.items?.map((item, index: number) => {
                    const track = item.track;
                    return (
                        <div className="track-item" key={track?.id || index}>
                            <div className="track-image">
                                <img src={track?.album?.images?.[0]?.url}  alt={track?.name}/>
                            </div>
                            <div className="track-info">
                                <h3>{track?.name}</h3>
                                <p>{track?.artists?.[0]?.name}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default PlaylistItem;