import { motion } from 'framer-motion';
import Header from '../components/Header/Header';
import SongCard from '../components/SongCard/SongCard';
import PlayerControls from '../components/PlayerControls/PlayerControls';
import { usePlayer } from '../hooks/usePlayer';

const FavoritesPage = () => {
  const { getFavoriteSongs, playSong } = usePlayer();
  const favoriteSongs = getFavoriteSongs();

  const handlePlayAll = () => {
    if (favoriteSongs.length > 0) {
      playSong(favoriteSongs[0], favoriteSongs);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--primary-bg)',
      paddingBottom: '120px'
    }}>
      <Header />
      
      <motion.main
        style={{
          paddingTop: '120px',
          padding: '120px var(--spacing-xl) var(--spacing-xl)'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header Section */}
        <motion.section
          style={{
            textAlign: 'center',
            marginBottom: 'var(--spacing-2xl)'
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div style={{
            width: '200px',
            height: '200px',
            margin: '0 auto var(--spacing-xl)',
            background: 'var(--primary-gradient)',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-xl)'
          }}>
            <svg width="80" height="80" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="1">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </div>
          
          <h1 style={{
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            fontWeight: '700',
            color: 'var(--primary-text)',
            marginBottom: 'var(--spacing-md)',
            lineHeight: 1.2
          }}>
            Your Favorites
          </h1>
          
          <p style={{
            color: 'var(--secondary-text)',
            fontSize: '1.1rem',
            marginBottom: 'var(--spacing-lg)',
            lineHeight: 1.5
          }}>
            Songs you've liked and want to hear again
          </p>
          
          <div style={{
            color: 'var(--secondary-text)',
            fontSize: '0.9rem',
            marginBottom: 'var(--spacing-lg)'
          }}>
            {favoriteSongs.length} {favoriteSongs.length === 1 ? 'song' : 'songs'}
          </div>

          {favoriteSongs.length > 0 && (
            <motion.button
              onClick={handlePlayAll}
              style={{
                background: 'var(--primary-gradient)',
                color: 'white',
                border: 'none',
                padding: 'var(--spacing-md) var(--spacing-xl)',
                borderRadius: 'var(--radius-xl)',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--spacing-sm)',
                boxShadow: 'var(--shadow-md)',
                transition: 'all var(--transition-normal)'
              }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: 'var(--shadow-glow)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
              Play All
            </motion.button>
          )}
        </motion.section>

        {/* Songs List */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {favoriteSongs.length > 0 ? (
            <div style={{
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              {favoriteSongs.map((song, index) => (
                <motion.div
                  key={song.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.3 }}
                >
                  <SongCard 
                    song={song} 
                    viewMode="queue"
                    songList={favoriteSongs}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              style={{
                textAlign: 'center',
                color: 'var(--secondary-text)',
                padding: 'var(--spacing-2xl)'
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div style={{
                width: '100px',
                height: '100px',
                margin: '0 auto var(--spacing-lg)',
                background: 'var(--accent-bg)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </div>
              
              <h3 style={{
                color: 'var(--primary-text)',
                fontSize: '1.5rem',
                marginBottom: 'var(--spacing-md)'
              }}>
                No favorites yet
              </h3>
              
              <p style={{
                fontSize: '1.1rem',
                lineHeight: 1.5,
                maxWidth: '400px',
                margin: '0 auto'
              }}>
                Start exploring music and tap the heart icon on songs you love to see them here.
              </p>
            </motion.div>
          )}
        </motion.section>
      </motion.main>

      <PlayerControls />
    </div>
  );
};

export default FavoritesPage;
