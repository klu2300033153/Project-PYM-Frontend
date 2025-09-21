import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Add this
import "./../styles/GeneralPlaylistComponent.css";

const UserPlaylistComponent = () => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // ✅ Initialize
  const userId = parseInt(localStorage.getItem("userId")); // ✅ Get userId from localStorage


  useEffect(() => {
    fetch("http://localhost:8080/playlist/all")
      .then((res) => res.json())
      .then((data) => {
        setPlaylists(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch playlists:", err);
        setLoading(false);
      });
  }, []);

  const handlePlaylistClick = (id) => {
    navigate(`/listen/${id}`); // ✅ Navigate to play page
  };


  return (
    <div className="general-playlist">
      <h3>My Playlist</h3>
      {loading ? (
        <p>Loading playlists...</p>
      ) : (
        <div className="playlist-scroll">
          {playlists
            .filter((playlist) => playlist.userId === userId)
            .map((playlist) => (
              <div
                className="playlist-card"
                key={playlist.playlistId}
                onClick={() => handlePlaylistClick(playlist.playlistId)} // ✅ Make clickable
              >
                <img
                  src={`http://localhost:8080/playlist/image/${playlist.coverImageUrl}` || "/placeholder.jpg"}
                  alt={playlist.name}
                  className="playlist-cover"
                />
                <div className="playlist-info">
                  <h4>{playlist.name}</h4>
                  <p>{playlist.numberOfTracks} tracks</p>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default UserPlaylistComponent;
