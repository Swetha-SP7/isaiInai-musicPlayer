 import { createContext, useContext, useState, useEffect, useRef } from 'react';

import songsData from '../data/songs.json';

const PlayerContext = createContext();

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};

export const PlayerProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [queue, setQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const audioRef = useRef(null);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('musicPlayerFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('musicPlayerFavorites', JSON.stringify(favorites));
  }, [favorites]);

  // Audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => playNext();

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentSong]);

  // Update audio volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const playSong = (song, newQueue = null) => {
    setCurrentSong(song);
    if (newQueue) {
      setQueue(newQueue);
      setCurrentIndex(newQueue.findIndex(s => s.id === song.id));
    }
    setIsPlaying(true);
  };

  const pauseSong = () => {
    setIsPlaying(false);
  };

  const resumeSong = () => {
    setIsPlaying(true);
  };

//   const playNext = () => {
//   if (queue.length === 0) return;

//   const nextIndex = (currentIndex + 1) % queue.length;
//   const nextSong = queue[nextIndex];
//   setCurrentSong(nextSong);
//   setCurrentIndex(nextIndex);
//   setIsPlaying(true);
// };


  const playNext = () => {
    if (queue.length > 0 && currentIndex < queue.length - 1) {
      const nextSong = queue[currentIndex + 1];
      setCurrentSong(nextSong);
      setCurrentIndex(currentIndex + 1);
      setIsPlaying(true);
    }
  };

  const playPrevious = () => {
    if (queue.length > 0 && currentIndex > 0) {
      const prevSong = queue[currentIndex - 1];
      setCurrentSong(prevSong);
      setCurrentIndex(currentIndex - 1);
      setIsPlaying(true);
    }
  };

  const seekTo = (time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const toggleFavorite = (songId) => {
    setFavorites(prev => {
      if (prev.includes(songId)) {
        return prev.filter(id => id !== songId);
      } else {
        return [...prev, songId];
      }
    });
  };

  const isFavorite = (songId) => favorites.includes(songId);

  const getFavoriteSongs = () => {
    return songsData.songs.filter(song => favorites.includes(song.id));
  };

  return (
    <PlayerContext.Provider value={{
      currentSong,
      isPlaying,
      currentTime,
      duration,
      volume,
      queue,
      currentIndex,
      favorites,
      playSong,
      pauseSong,
      resumeSong,
      playNext,
      playPrevious,
      seekTo,
      setVolume,
      toggleFavorite,
      isFavorite,
      getFavoriteSongs,
      audioRef
    }}>
      {children}
      <audio ref={audioRef} src={currentSong?.audio} />
    </PlayerContext.Provider>
  );
};