"use client"

import { useState } from "react"
import YouTube from "react-youtube"

const VideoPlayer = ({ youtubeId }) => {
    const  [isOpen, setIsOpen] = useState(true)

    const handleVideoPLayer = () => {
        setIsOpen((prevState) => !prevState)
    }

    const option = {
        width: "300",
        height: "250"
    }

    const Player = () => {
        return (
            <div className="fixed bottom-2 right-2">
                <button 
                onClick={handleVideoPLayer}
                className="text-color-primary float-right bg-color-secondary px-3 mb-1">X</button>
                <YouTube 
                    videoId={youtubeId} 
                    onReady={(event) => event.target.pauseVideo()}
                    opts={option} 
                    onError={() => alert("Video is broken, please try another.")}   
                />
            </div>
        )
    }

    const ButtonOpenTrailer = () => {
        return (
            <button 
            onClick={handleVideoPLayer} 
            className="rounded fixed bottom-5 w-32 bg-color-primary text-color-dark hover:bg-color-accent transition-all shadow-xl">Tonto Trailer
            </button>
        )
    }

    return isOpen ? <Player /> : <ButtonOpenTrailer/>
}

export default VideoPlayer