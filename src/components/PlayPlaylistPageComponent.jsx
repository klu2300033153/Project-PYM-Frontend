import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import '../styles/PlayPlaylistPageComponent.css';

const PlayPlaylistPageComponent = () => {
  const { playlistId } = useParams();
  const [songs, setSongs] = useState([]);
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentSong, setCurrentSong] = useState(null);
  const [audio] = useState(new Audio());
  const [isPlayPlaylist, setIsPlayPlaylist] = useState(false);


  function playThisSong(musicId) {
    setIsPlayPlaylist(false);
    if (currentSong && currentSong.musicId === musicId) {
      audio.pause();
      setCurrentSong(null);
    } else {
      const songToPlay = songs.find(song => song.musicId === musicId);
      if (songToPlay) {
        audio.src = `http://localhost:8080/music/${musicId}`;
        audio.play();
        setCurrentSong(songToPlay);
      }
    }
  }

  function playPlayList() {
      if (!currentSong) {
        playThisSong(songs[0].musicId);
        return;
      }
    audio.addEventListener('ended', () => {
      if (!isPlayPlaylist) return;
      const currentIndex = songs.findIndex(song => song.musicId === currentSong.musicId);
      const nextIndex = (currentIndex + 1) % songs.length;
      playThisSong(songs[nextIndex].musicId);
    });
  }

  function playAll() {
    setIsPlayPlaylist(true);
    playPlayList();
  }
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get all playlists and find the matching one
        const playlistRes = await fetch("http://localhost:8080/playlist/all");
        const allPlaylists = await playlistRes.json();
        const matchedPlaylist = allPlaylists.find(p => p.playlistId === parseInt(playlistId));
        setPlaylist(matchedPlaylist);

        // Get playlist-music mappings and all music
        const [mappingsRes, musicRes] = await Promise.all([
          fetch("http://localhost:8080/playlistmusic/all"),
          fetch("http://localhost:8080/music/all")
        ]);

        const mappings = await mappingsRes.json();
        const allMusic = await musicRes.json();

        const musicIdsInPlaylist = mappings
          .filter(item => item.playlistId === parseInt(playlistId))
          .map(item => item.musicId);

        const playlistSongs = allMusic.filter(song =>
          musicIdsInPlaylist.includes(song.musicId)
        );

        setSongs(playlistSongs);
      } catch (err) {
        console.error("Error loading playlist data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [playlistId]);

  let songCount = 0;

  return (
    <>
      <Header isLoggedIn={true} />

      {/* Playlist Info */}
      {playlist && (
        <div className="playlist-banner">
          <img
            src={`http://localhost:8080/playlist/image/${playlist.coverImageUrl}`}
            alt={playlist.name}
            className="playlist-cover"
          />
          <div>
            <h2 className="playlist-title">{playlist.name}</h2>
            <p style={{ marginTop: '5px' }}>
              {playlist.numberOfTracks} Tracks • Created: {new Date(playlist.created).toLocaleDateString()}
            </p>
            <div>
              <button className='play-button' onClick={playAll}>▶</button>
            </div>
          </div>
        </div>
      )}

      {/* Songs */}
      <div className="music-list-container">
        {loading ? (
          <p style={{ padding: '20px' }}>Loading songs...</p>
        ) : songs.length === 0 ? (
          <p style={{ padding: '20px' }}>No songs found in this playlist.</p>
        ) : (
          <div className="music-grid">
            <div className="songs">
            {songs.map((song) => (
              songCount++,
              <>
              <div key={song.musicId} className="music-card" onClick={() => playThisSong(song.musicId)}>
                <img
                  className="music-image"
                  src={`http://localhost:8080/music/image/${song.musicId}`}
                  alt={song.songName}
                  />
                <div className="music-name">{song.songName}</div>
              </div>
                {/* {songCount == 4? <div className='break'></div> : ''} */}
            </>
            ))}
            </div>
          </div>
        )}
      </div>

      {/* Audio Player */}
      {currentSong && (
        <div className="audio-player">
          <img
            className="audio-image"
            src={`http://localhost:8080/music/image/${currentSong.musicId}`}
            alt={currentSong.songName}
          />
          <div className="audio-info">
            <h3>{currentSong.songName}</h3>
            <p>{currentSong.artist}</p>
          </div>
          <div className="audio-timing">
            <span className="current-time">
              {audio.currentTime ? Math.floor(audio.currentTime / 60) + ':' + ('0' + Math.floor(audio.currentTime % 60)).slice(-2) : '0:00'}
            </span>
            <input
              type="range"
              className="timeline-bar"
              min="0"
              max={audio.duration || 0}
              value={audio.currentTime || 0}
              onChange={(e) => {
                audio.currentTime = e.target.value;
              }}
            />
            <span className="duration">
              {audio.duration ? Math.floor(audio.duration / 60) + ':' + ('0' + Math.floor(audio.duration % 60)).slice(-2) : '0:00'}
            </span>
          </div>
          <button className="play-button" onClick={() => playThisSong(currentSong.musicId)}>
            {audio.paused ? '▶' : '❚❚'}
          </button>
        </div>
      )}

      <Footer />

      {/* Continuously update the timeline */}
      {useEffect(() => {
        const updateTimeline = () => {
          if (!audio.paused) {
            setTimeout(() => {
              // Trigger a re-render to update the timeline
              setCurrentSong({ ...currentSong });
            }, 500);
          }
        };

        audio.addEventListener('timeupdate', updateTimeline);
        return () => {
          audio.removeEventListener('timeupdate', updateTimeline);
        };
      }, [audio, currentSong])}
    </>
  );
};

export default PlayPlaylistPageComponent;
