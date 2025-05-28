import { motion } from 'framer-motion';
import { usePlayer } from '../../hooks/usePlayer';
import { formatDuration } from '../../utils/helpers';
import styles from './SongCard.module.css';

const SongCard = ({ song, viewMode = 'grid', songList = [] }) => {
  const { playSong, toggleFavorite, isFavorite } = usePlayer();

  const handlePlaySong = () => {
    playSong(song, songList);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(song.id);
  };

  if (viewMode === 'queue') {
    return (
      <motion.div
        className={styles.queueItem}
        onClick={handlePlaySong}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <img 
          src={song.cover} 
          alt={song.title}
          className={styles.queueCover}
          onError={(e) => {
            e.target.src = `https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop`;
          }}
        />
        <div className={styles.queueInfo}>
          <div className={styles.queueTitle}>{song.title}</div>
          <div className={styles.queueArtist}>{song.artist}</div>
        </div>
        <div className={styles.queueDuration}>
          {formatDuration(song.duration)}
        </div>
        <div className={styles.queueActions}>
          <button
            className={`${styles.favoriteButton} ${isFavorite(song.id) ? styles.active : ''}`}
            onClick={handleFavoriteClick}
            aria-label="Toggle favorite"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill={isFavorite(song.id) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={styles.songCard}
      onClick={handlePlaySong}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <img 
        src={song.cover} 
        alt={song.title}
        className={styles.songCover}
        onError={(e) => {
          e.target.src = `https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop`;
        }}
      />
      
      <button
        className={`${styles.favoriteButton} ${isFavorite(song.id) ? styles.active : ''}`}
        onClick={handleFavoriteClick}
        aria-label="Toggle favorite"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill={isFavorite(song.id) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      </button>

      <div className={styles.playOverlay}>
        <button className={styles.playButton} aria-label="Play song">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </button>
      </div>

      <div className={styles.songInfo}>
        <h3 className={styles.songTitle}>{song.title}</h3>
        <p className={styles.songArtist}>{song.artist}</p>
      </div>
    </motion.div>
  );
};

export default SongCard;
