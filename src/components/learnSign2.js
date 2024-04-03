import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import learnSignCSS from "../css/learnSign.module.css";
import Navbar from "./navbar";
import father from "./family/father.jpg";
import mother from "./family/mother.jpg";
import son from "./family/son.jpg";
import daughter from "./family/daughter.jpg";
import brother from "./family/brother.jpg";
import sister from "./family/sister.jpg";
import step from "./family/step.jpg";
import baby from "./family/baby.jpg";
import home from "./family/home.jpg";
import my from "./family/my.jpg";
import your from "./family/your.jpg";

export default function LearnSign2() {
    const navigate = useNavigate();

    // Static data for family signs
    const familySigns = [
        { name: "Father", description: "Two finger on each hand in a cross formation", src: father },
        { name: "Mother", description: "Three fingers touching the palm of an open hand", src: mother },
        { name: "Son", description: "Pointing motion at chin level", src: son },
        { name: "Daughter", description: "Making a D shape with both hands", src: daughter },
        { name: "Brother", description: "Two fists side by side", src: brother },
        { name: "Sister", description: "A hooked index finger at head level", src: sister },
        { name: "Step", description: "Touching the pinky finger of one hand", src: step },
        { name: "Baby", description: "The shape hands make when holding a baby", src: baby },
        { name: "Home", description: "Hands resembling the shape of a house roof", src: home },
        { name: "My", description: "A closed fist touching the chest", src: my },
        { name: "Your", description: "An open hand with curled fingers pointing forward", src: your }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    function handleNextClick() {
        const nextIndex = (currentIndex + 1) % familySigns.length;
        setCurrentIndex(nextIndex);
    }

    function handlePrevClick() {
        const prevIndex = currentIndex === 0 ? familySigns.length - 1 : currentIndex - 1;
        setCurrentIndex(prevIndex);
    }

    return (
        <div className={learnSignCSS.container}>
            <Navbar />
            <div className={learnSignCSS.content}>
                <h1 className={learnSignCSS.title}>{familySigns[currentIndex].name}</h1>
                <div className={learnSignCSS["slide-show"]}>
                    <button
                        className={learnSignCSS.previous}
                        onClick={handlePrevClick}
                    >
                        Previous
                    </button>
                    <img
                        src={familySigns[currentIndex].src}
                        alt={familySigns[currentIndex].name}
                    />
                    <button
                        className={learnSignCSS.next}
                        onClick={handleNextClick}
                    >
                        Next
                    </button>
                </div>
                <p className={learnSignCSS.description}>
                    {familySigns[currentIndex].description}
                </p>
                <button onClick={() => navigate("/learn")} className={learnSignCSS["leave-button"]}>
                    Leave session
                </button>
            </div>
        </div>
    );
}
