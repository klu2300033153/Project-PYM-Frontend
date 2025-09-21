// src/components/PlayPageComponent.jsx
import React, { useEffect, useRef, useState } from "react";
import "../styles/PlayPageComponent.css";

const PlayPageComponent = ({ musicId }) => {
  const audioRef = useRef(null);
  const volumeRef = useRef(null);
  const speedRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [showVolume, setShowVolume] = useState(false);
  const [showSpeed, setShowSpeed] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 0);
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateTime);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateTime);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!volumeRef.current?.contains(e.target)) setShowVolume(false);
      if (!speedRef.current?.contains(e.target)) setShowSpeed(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const handleSeek = (e) => {
    const bar = e.target.getBoundingClientRect();
    const clickPos = e.clientX - bar.left;
    const percentage = clickPos / bar.width;
    const time = percentage * duration;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const muted = !isMuted;
    setIsMuted(muted);
    const newVolume = muted ? 0 : 1;
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  const handleSpeedChange = (e) => {
    const newSpeed = parseFloat(e.target.value);
    audioRef.current.playbackRate = newSpeed;
    setSpeed(newSpeed);
  };

  const seekForward = () => {
    let time = Math.min(duration, audioRef.current.currentTime + 5);
    setCurrentTime(time);
    updateTime();
    // audioRef.current.currentTime = time;
    // setCurrentTime(time);
  };

  const seekBackward = () => {
    // audio.currentTime = Math.max(0, audioRef.current.currentTime - 5);
    let time = Math.max(0, audioRef.current.currentTime - 5);
    setCurrentTime(time);
    updateTime();
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="playPage">
      <img
        src={`http://localhost:8080/music/image/${musicId}`}
        alt="Album Art"
        className="playImage"
      />

      <div className="waveAnimation">
        <div></div>
        <div></div>
        <div></div>
      </div>

      <audio
        ref={audioRef}
        src={`http://localhost:8080/music/${musicId}`}
        style={{ display: "none" }}
      />

      {/* Time bar */}
      <div className="timeBar">
        <span>{formatTime(currentTime)}</span>
        <div className="seekWrapper" onClick={handleSeek}>
          <div
            className="seekFill"
            style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
          />
        </div>
        <span>{formatTime(duration)}</span>
      </div>

      {/* Controls */}
      <div className="buttons">
        <button onClick={seekBackward} title="Back 5s">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" viewBox="0 0 24 24">
            <path d="M11.5 12L18 6v12l-6.5-6zM5 12l6.5-6v12L5 12z" />
          </svg>
        </button>
        <button onClick={togglePlayPause} title={isPlaying ? "Pause" : "Play"}>
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
        <button onClick={seekForward} title="Forward 5s">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" viewBox="0 0 24 24">
            <path d="M12.5 12L6 6v12l6.5-6zM13 6v12l6.5-6L13 6z" />
          </svg>
        </button>
      </div>

      {/* Volume & Speed */}
      <div className="sliders">
        <div className="sliderControl" ref={volumeRef}>
          <button onClick={toggleMute}>
            {isMuted ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24">
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.06c1.48-.74 2.5-2.26 2.5-4.03zM19 12c0 2.53-1.17 4.78-3 6.24v-2.2c1.18-.91 2-2.36 2-4.04s-.82-3.13-2-4.04v-2.2c1.83 1.46 3 3.71 3 6.24zM3 9v6h4l5 5V4L7 9H3z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24">
                <path d="M7 9v6h4l5 5V4l-5 5H7z" />
              </svg>
            )}
          </button>
          <span onClick={() => setShowVolume(!showVolume)}>
            {(volume * 100).toFixed(0)}%
          </span>
          {showVolume && (
            <div className="sliderPopup">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
              />
            </div>
          )}
        </div>

        <div className="sliderControl" ref={speedRef}>
          <button onClick={() => setShowSpeed(!showSpeed)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24">
              <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6s-2.69 6-6 6a6.003 6.003 0 01-5.917-5H4.06a8.003 8.003 0 007.94 7 8 8 0 100-16z" />
            </svg>
          </button>
          <span>{speed.toFixed(1)}x</span>
          {showSpeed && (
            <div className="sliderPopup">
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={speed}
                onChange={handleSpeedChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayPageComponent;
