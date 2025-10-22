import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import * as React from "react";


const GeneratePlaylist = () => {

    const [prompt, setPrompt] = useState("");
    const [songNumber, setSongNumber] = useState("");
    const [playlistName, setPlaylistName] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState("Generating playlist...");
    const [fade, setFade] = useState(true);
    const navigate = useNavigate();


    // Cycle through loading messages
    useEffect(() => {
        const loadingMessages = [
            "Generating playlist...",
            "Selecting songs...",
            "Finalizing recommendations..."
        ]
        let index = 0;
        let interval: number | undefined;
        if (loading) {
            interval = setInterval(() => {
                setFade(false);
                setTimeout(() => {
                    index = (index + 1) % loadingMessages.length;
                    setLoadingText(loadingMessages[index]);
                    setFade(true)
                }, 400)
            }, 2000)
        }
        return () => clearInterval(interval);
    }, [loading])

    // Handle loading page
    if (loading) {
        return (
            <div className="form-container">
                <h2 className="loading-message" style={{ opacity: fade ? 1 : 0 }}>{loadingText}</h2>
            </div>
        )
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const numSongs = Number(songNumber);

        if (!numSongs || numSongs < 1 || numSongs > 50) {
            alert("Please enter a valid number between 1 and 50.");
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:5000/api/generate-playlist", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    prompt: prompt,
                    number_of_songs: songNumber,
                    playlist_name: playlistName
                })
            })

            // Handle 429 Response (rate limiting)
            if (response.status === 429) {
                const errorData = await response.json();
                alert(errorData?.error);
                return;
            }



            const data = await response.json();
            navigate("/result", {state: {playlist: data}})

        } catch (error) {
            console.error("Error generating playlist:", error);
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className="form-container">
            <div className="form-content">
                <h2>Generate your Custom Playlist</h2>

                <form onSubmit={handleSubmit}>
                    <label htmlFor="playlist_name">Playlist Name:</label>
                    <input
                        type="text"
                        id="playlist_name"
                        name="playlist_name"
                        placeholder="e.g. Sunday Chill Mix"
                        required
                        value={playlistName}
                        onChange={(e) => setPlaylistName(e.target.value)}
                    />

                    <label htmlFor="prompt">Enter your prompt:</label>
                    <input
                        type="text"
                        id="prompt"
                        name="prompt"
                        placeholder="e.g. Chill acoustic vibes"
                        required
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                    />

                    <label htmlFor="song_number">Number of songs:</label>
                    <input
                        type="number"
                        id="song_number"
                        name="song_number"
                        max="50"
                        placeholder="Max songs per playlist: 50"
                        required
                        value={songNumber}
                        onChange={(e) => setSongNumber(e.target.value)}
                    />

                    <button type="submit">Generate</button>
                </form>
            </div>
        </div>
    )
}

export default GeneratePlaylist;