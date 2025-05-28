import { useEffect } from 'react'; 
import { motion } from 'framer-motion';
import { usePlayer } from '../../hooks/usePlayer';
import { formatTime } from '../../utils/helpers';
import styles from './PlayerControls.module.css';

const PlayerControls = () => {
  const {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    volume,
    pauseSong,
    resumeSong,
    playNext,
    playPrevious,
    seekTo,
    setVolume,
    toggleFavorite,
    isFavorite,
    audioRef,
    queue,
    currentIndex
  } = usePlayer();

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(console.error);
    } else {
      audio.pause();
    }
  }, [isPlaying, currentSong]);

  const handlePlayPause = () => {
    if (isPlaying) {
      pauseSong();
    } else {
      resumeSong();
    }
  };

  const handleProgressClick = (e) => {
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    seekTo(newTime);
  };

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  if (!currentSong) {
    return (
      <motion.div 
        className={styles.playerControls}
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.placeholder}>
          Select a song to start playing
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className={styles.playerControls}
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.container}>
        {/* Song Info */}
        <div className={styles.songInfo}>
          <img 
            src={currentSong.cover} 
            alt={currentSong.title}
            className={styles.albumCover}
            onError={(e) => {
              e.target.src = `https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop`;
            }}
          />
          <div className={styles.trackInfo}>
            <div className={styles.trackTitle}>{currentSong.title}</div>
            <div className={styles.trackArtist}>{currentSong.artist}</div>
          </div>
        </div>

        {/* Controls */}
        <div className={styles.controls}>
          <div className={styles.controlButtons}>
            <button 
              className={styles.controlBtn}
              onClick={playPrevious}
              disabled={currentIndex === 0}
              aria-label="Previous song"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
              </svg>
            </button>

            <button 
              className={styles.playPauseBtn}
              onClick={handlePlayPause}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              )}
            </button>

            <button 
              className={styles.controlBtn}
              onClick={playNext}
              disabled={currentIndex === queue.length - 1}
              aria-label="Next song"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
              </svg>
            </button>
          </div>

          <div className={styles.progressSection}>
            <div className={styles.timeDisplay}>
              {formatTime(currentTime)}
            </div>
            <div 
              className={styles.progressBar}
              onClick={handleProgressClick}
            >
              <div 
                className={styles.progressFill}
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <div className={styles.timeDisplay}>
              {formatTime(duration)}
            </div>
          </div>
        </div>

        {/* Volume & Favorite */}
        <div className={styles.volumeControls}>
          <button
            className={`${styles.favoriteBtn} ${isFavorite(currentSong.id) ? styles.active : ''}`}
            onClick={() => toggleFavorite(currentSong.id)}
            aria-label="Toggle favorite"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill={isFavorite(currentSong.id) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>

          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
  {volume === 0 ? (
    <path d="m19.07 4.93-10 10"/>
  ) : volume < 0.33 ? (
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
  ) : volume < 0.66 ? (
    <>
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
    </>
  ) : (
    <>
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
      <path d="M11 2a16 16 0 0 1 0 20"/>
    </>
  )}
</svg>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className={styles.volumeSlider}
            aria-label="Volume"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default PlayerControls;           