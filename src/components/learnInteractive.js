import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import learnSignCSS from "../css/learnInteractive.module.css";
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
import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs";
import { drawRectQuizGreetings } from "./utilities";

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
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        // Run TensorFlow model
        const runCoco = async () => {
            // Loading the graph model
            const net = await tf.loadGraphModel(
                "https://raw.githubusercontent.com/dp846/SlingoModels/main/model.json"
            );

            // Detect every 16.7 ms
            setInterval(() => {
                detect(net);
            }, 16.7);
        };

        const detect = async (net) => {
            // Check data is available
            if (
                typeof webcamRef.current !== "undefined" &&
                webcamRef.current !== null &&
                webcamRef.current.video.readyState === 4
            ) {
                // Get video properties
                const video = webcamRef.current.video;
                const videoWidth = webcamRef.current.video.videoWidth;
                const videoHeight = webcamRef.current.video.videoHeight;

                // Set video width
                webcamRef.current.video.width = videoWidth;
                webcamRef.current.video.height = videoHeight;

                // Set canvas height and width
                canvasRef.current.width = videoWidth;
                canvasRef.current.height = videoHeight;

                // Make Detections
                const img = tf.browser.fromPixels(video);
                const resized = tf.image.resizeBilinear(img, [640, 480]);
                const casted = resized.cast("int32");
                const expanded = casted.expandDims(0);
                const obj = await net.executeAsync(expanded);

                const boxes = await obj[2].array();
                const classes = await obj[4].array();
                const scores = await obj[7].array();

                // Draw mesh
                const ctx = canvasRef.current.getContext("2d");

                // Update drawing utility
                requestAnimationFrame(() => {
                    drawRectQuizGreetings(
                        boxes[0],
                        classes[0],
                        scores[0],
                        0.65,
                        videoWidth,
                        videoHeight,
                        ctx,
                        setTranslatedSign
                    );
                });

                tf.dispose(img);
                tf.dispose(resized);
                tf.dispose(casted);
                tf.dispose(expanded);
                tf.dispose(obj);
            }
        };

        runCoco();
        setLoading(false);
    }, []);

    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const [translatedSign, setTranslatedSign] = useState("");

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
                {!loading && (
                    <>
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
                                alt={greetingsData[currentIndex].alt}
                            />
                            <div
                                style={{
                                    position: "relative",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    width: 640,
                                    height: 480,
                                }}
                            >
                                <Webcam ref={webcamRef} muted={true} />
                                <canvas
                                    ref={canvasRef}
                                    style={{
                                        position: "absolute",
                                        zIndex: 8,
                                        width: 640,
                                        height: 480,
                                    }}
                                />
                            </div>
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
                        <button
                            onClick={() => navigate("/learn")}
                            className={learnSignCSS["leave-button"]}
                        >
                            Leave session
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
