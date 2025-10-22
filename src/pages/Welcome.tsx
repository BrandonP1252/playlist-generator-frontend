import {useNavigate} from "react-router";
import {useContext} from "react";
import {UserInfoContext} from "../context/UserContext.tsx";
import spotifyLogo from "../assets/spotify_logo.png";


const Welcome = () => {

    const navigate = useNavigate();
    const userInfoContext = useContext(UserInfoContext);

    if (!userInfoContext) {
        throw new Error("UserInfoContext not found");
    }

    const { setUserInfo } = userInfoContext;

    const handleLogin = async () => {
        try {
            const response = await fetch("http://127.0.0.1:5000/api/login", {
                method: "GET"
            });

            const data = await response.json();

            setUserInfo({
                display_name: data.display_name,
                id: data.id,
                profile_url: data.profile_url,
                uri: data.uri,
            })

            navigate("/dashboard")
        } catch (error) {
            console.error("Error logging in:", error);
        }
    };

    return (
        <div style={{
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
                <button onClick={handleLogin} style={{marginTop: "20px"}}>Login with Spotify</button>
            </div>
        </div>
    )
}

export default Welcome;