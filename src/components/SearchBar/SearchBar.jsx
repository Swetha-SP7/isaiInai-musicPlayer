import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePlayer } from '../../hooks/usePlayer';
import songsData from '../../data/songs.json';
import styles from './SearchBar.module.css';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const { playSong } = usePlayer();

  useEffect(() => {
    if (query.length > 0) {
      const filteredSongs = songsData.songs.filter(song =>
        song.title.toLowerCase().includes(query.toLowerCase()) ||
        song.artist.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filteredSongs);
      setShowResults(true);
    } else {
      setResults([]);
      setShowResults(false);
    }
  }, [query]);

  const handleSongSelect = (song) => {
    playSong(song, songsData.songs);
    setQuery('');
    setShowResults(false);
  };

  const handleBlur = () => {
    // Delay hiding results to allow for clicks
    setTimeout(() => setShowResults(false), 200);
  };

  return (
    
    <div className={styles.searchContainer}>
      
      <div style={{ position: 'relative' }}>
        <svg 
          className={styles.searchIcon}
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
        <input
          type="text"
          placeholder="Search for songs or artists..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query && setShowResults(true)}
          onBlur={handleBlur}
          className={styles.searchInput}
        />
      </div>

      <AnimatePresence>
        {showResults && (
          <motion.div
            className={styles.searchResults}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {results.length > 0 ? (
              results.map((song) => (
                <motion.div
                  key={song.id}
                  className={styles.resultItem}
                  onClick={() => handleSongSelect(song)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <img 
                    src={song.cover} 
                    alt={song.title}
                    className={styles.resultCover}
                    onError={(e) => {
                      e.target.src = `https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop`;
                    }}
                  />
                  <div className={styles.resultInfo}>
                    <div className={styles.resultTitle}>{song.title}</div>
                    <div className={styles.resultArtist}>{song.artist}</div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className={styles.noResults}>
                No songs found for "{query}"
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;