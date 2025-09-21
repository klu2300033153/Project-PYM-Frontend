import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/MusicList.css";

const MusicList = () => {
  const [musicData, setMusicData] = useState([]);

  // Fisher-Yates Shuffle
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    fetch("http://localhost:8080/music/all")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch music data");
        }
        return response.json();
      })
      .then((data) => {
        const shuffledData = shuffleArray(data);
        console.log("Fetched and Shuffled Music Data:", shuffledData);
        setMusicData(shuffledData);
      })
      .catch((error) => {
        console.error("Error fetching music data:", error);
      });
  }, []);

  return (
    <div className="music-list-container">
      <div className="music-grid">
        {musicData
          .filter((song) => song.isVisible)
          .map((song) => (
            <Link
              to={`/play/${song.musicId}`}
              key={song.musicId}
              className="music-card-link"
            >
              <div className="music-card">
                <img
                  width="100px"
                  className="music-image"
                  src={`http://localhost:8080/music/image/${song.musicId}`}
                  alt={song.songName}
                />
                <div className="music-name">{song.songName}</div>
              </div>
            </Link>
          ))}
        {musicData
          .filter((song) => song.isVisible)
          .map((song) => (
            <Link
              to={`/play/${song.musicId}`}
              key={song.musicId}
              className="music-card-link"
            >
              <div className="music-card">
                <img
                  width="100px"
                  className="music-image"
                  src={`http://localhost:8080/music/image/${song.musicId}`}
                  alt={song.songName}
                />
                <div className="music-name">{song.songName}</div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default MusicList;
