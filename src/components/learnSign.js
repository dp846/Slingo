import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import learnSignCSS from "../css/learnSign.module.css";
import Navbar from "./navbar";
import afternoon from "./greetings/afternoon.jpg";
import bad from "./greetings/bad.jpg";
import good from "./greetings/good.jpg";
import hello from "./greetings/hello.jpg";
import how from "./greetings/how.jpg";
import luck from "./greetings/luck.jpg";
import meet from "./greetings/meet.jpg";
import morning from "./greetings/morning.jpg";
import name from "./greetings/name.jpg";
import thanks from "./greetings/thanks.jpg";
import you from "./greetings/you.jpg";

export default function LearnSign() {
    const navigate = useNavigate();

    // Static data for greetings
    const greetingsData = [
        { name: "Afternoon", description: "Two fingers touching the chin.", src: afternoon },
        { name: "Bad", description: "Hand up with a pinky raised to the sky", src: bad },
        { name: "Good", description: "A thumbs up", src: good },
        { name: "Hello", description: "A waving hand", src: hello },
        { name: "How", description: "Interlinked fingers on both hands", src: how },
        { name: "Luck", description: "Index finger touching the nose", src: luck },
        { name: "Meet", description: "Closed hands with fingers meeting and index fingers raised", src: meet },
        { name: "Morning", description: "A flat hand pointing the chest", src: morning },
        { name: "Name", description: "A salute using two fingers", src: name },
        { name: "Thanks", description: "All the fingers touching the chin", src: thanks },
        { name: "You", description: "A point using the index finger", src: you }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    function handleNextClick() {
        const nextIndex = (currentIndex + 1) % greetingsData.length;
        setCurrentIndex(nextIndex);
    }

    function handlePrevClick() {
        const prevIndex = currentIndex === 0 ? greetingsData.length - 1 : currentIndex - 1;
        setCurrentIndex(prevIndex);
    }

    return (
        <div className={learnSignCSS.container}>
            <Navbar />
            <div className={learnSignCSS.content}>
                <h1 className={learnSignCSS.title}>{greetingsData[currentIndex].name}</h1>
                <div className={learnSignCSS["slide-show"]}>
                    <button
                        className={learnSignCSS.previous}
                        onClick={handlePrevClick}
                    >
                        Previous
                    </button>
                    <img
                        src={greetingsData[currentIndex].src}
                        alt={greetingsData[currentIndex].name}
                    />
                    <button
                        className={learnSignCSS.next}
                        onClick={handleNextClick}
                    >
                        Next
                    </button>
                </div>
                <p className={learnSignCSS.description}>
                    {greetingsData[currentIndex].description}
                </p>
                <button onClick={() => navigate("/learn")} className={learnSignCSS["leave-button"]}>
                    Leave session
                </button>
            </div>
        </div>
    );
}
