import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { usePlayer } from '../../hooks/usePlayer';
import songsData from '../../data/songs.json';
import styles from './PlaylistCard.module.css';

const PlaylistCard = ({ playlist }) => {
  const navigate = useNavigate();
  const { playSong } = usePlayer();

  const handleCardClick = () => {
    navigate(`/playlist/${playlist.id}`);
  };

  const handlePlayClick = (e) => {
    e.stopPropagation();
    const playlistSongs = songsData.songs.filter(song => 
      playlist.songIds.includes(song.id)
    );
    if (playlistSongs.length > 0) {
      playSong(playlistSongs[0], playlistSongs);
    }
  };

  return (
    <motion.div
      className={styles.playlistCard}
      onClick={handleCardClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <img 
        src={playlist.cover} 
        alt={playlist.name}
        className={styles.playlistCover}
        onError={(e) => {
          e.target.src = `https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop`;
        }}
      />
      
      <button 
        className={styles.playButton}
        onClick={handlePlayClick}
        aria-label="Play playlist"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z"/>
        </svg>
      </button>

      <div className={styles.playlistInfo}>
        <h3 className={styles.playlistName}>{playlist.name}</h3>
        <p className={styles.playlistDescription}>{playlist.description}</p>
      </div>
    </motion.div>
  );
};

export default PlaylistCard;