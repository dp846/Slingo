import tutorialCSS from "../css/tutorial.module.css"
import React from "react"
import video2 from "../videos/slingo.mp4"
import { useNavigate } from "react-router-dom"


export default function Tutorial(){

const navigate = useNavigate()
localStorage.setItem('was_visited', 1)

return (
<div className={tutorialCSS.container}>
    <div className={tutorialCSS.heading}>
        <h1>Slingo uses your camera!</h1>
        <p>So ensure your camera permissions are turned on!</p>
    </div>
    <div className={tutorialCSS.video}>
        <video src={video2} width={800} height={600} autoPlay={true} muted loop={true}></video>
    </div>
<<<<<<< HEAD
    <button onClick={() => navigate("/Slingo")}>Continue</button>
=======
    <button onClick={() => navigate("../home")}>Continue</button>
>>>>>>> 97b673b9b275c7f429f4e7a7de7b419cdd84a2a5
</div>

)
}