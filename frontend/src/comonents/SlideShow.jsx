import React, { useState, useEffect } from "react";
import NewWeek from "../assets/NewWeek.png";
import GiveAway from "../assets/GiveAway.png";
import Promo from "../assets/Promo.mp4";
import Soon from "../assets/Soon.mp4";

const IMAGES = [
    { type: "image", src: NewWeek, action: "scrollToNewThisWeek" },
    { type: "video", src: Promo },
    { type: "video", src: Soon },
    { type: "image", src: GiveAway }
];

const SlideShow = ({ scrollToNewThisWeek }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            setWindowHeight(window.innerHeight);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000); // Auto-play every 5 seconds
        return () => clearInterval(interval);
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % IMAGES.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + IMAGES.length) % IMAGES.length);
    };

    const handleClick = () => {
        if (IMAGES[currentIndex].action === "scrollToNewThisWeek") {
            scrollToNewThisWeek();
        }
    };

    return (
        <div className="relative w-full h-full">
            <div
                className={`w-full h-[${windowHeight}px] flex items-center justify-center bg-black transition-all duration-300`}
                onClick={handleClick} // Make image itself a button
            >
                {IMAGES[currentIndex].type === "video" ? (
                    <video
                        src={IMAGES[currentIndex].src}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                        onError={(e) => console.error("Video failed to load:", e.target.src)}
                    />
                ) : (
                    <img
                        src={IMAGES[currentIndex].src}
                        alt="Slide"
                        className="w-full h-full object-cover"
                        onError={(e) => console.error("Image failed to load:", e.target.src)}
                    />
                )}
            </div>

            {/* Navigation Buttons */}
            <button
                className="absolute top-0 left-0 transform w-10 h-full bg-[#65656760] p-2 text-white shadow-md hover:bg-gray-300"
                onClick={prevSlide}
            >
                ◀
            </button>
            <button
                className="absolute top-0 right-0 transform w-10 h-full bg-[#65656760] p-2 text-white shadow-md hover:bg-gray-300"
                onClick={nextSlide}
            >
                ▶
            </button>

            {/* Navigation Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {IMAGES.map((_, index) => (
                    <div
                        key={index}
                        className={`w-3 h-3 rounded-full ${
                            currentIndex === index ? "bg-white" : "bg-gray-400"
                        } transition-all cursor-pointer`}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default SlideShow;
