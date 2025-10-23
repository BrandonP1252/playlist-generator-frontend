import { useEffect, useState} from "react";
import spotifyLogo from "../assets/spotify_logo.png";
import {useQuery} from "@tanstack/react-query";


const Welcome = () => {

    const [loginEndPoint, setLoginEndPoint] = useState("");


    const {data, isLoading, error} = useQuery({
        queryKey: ["playlistData"],
        queryFn: () => fetch("https://playlistgeneratorv2.onrender.com/api/login").then(
            res => res.json()
        ),
        staleTime: 60000
    })

    useEffect(() => {
        if (data) {
            setLoginEndPoint(data);
        }
    }, [data]); // runs only when data changes

    if (isLoading) {return <p>Loading...</p>}

    if (error) {return <p>Error: {error.message}</p>}

    return (
        <div
            className="page-fade"
            style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            textAlign: "center",
            padding: "20px",
        }}>
            <img
                src={spotifyLogo}
                alt="Spotify Logo"
                style={{
                width: "20vw", // scales with viewport width
                maxWidth: "150px",
                minWidth: "80px",
                height: "auto",
                marginBottom: "20px",
            }}/>
            <div>
                <h1
                    style={{
                    fontSize: "clamp(1.2rem, 2vw, 2rem)", // responsive font size
                    marginBottom: "15px",
                }}>Welcome to Spotify Playlist Generator</h1>
                <a className="button-link" href={loginEndPoint} style={{marginTop: "20px"}}>Login with Spotify</a>
            </div>
        </div>
    )
}

export default Welcome;