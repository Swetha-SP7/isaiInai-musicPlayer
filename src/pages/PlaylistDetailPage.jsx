import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/Header/Header';
import SongCard from '../components/SongCard/SongCard';
import PlayerControls from '../components/PlayerControls/PlayerControls';
import { usePlayer } from '../hooks/usePlayer';
import songsData from '../data/songs.json';

const PlaylistDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { playSong } = usePlayer();

  const playlist = songsData.playlists.find(p => p.id === parseInt(id));
  const playlistSongs = playlist ? 
    songsData.songs.filter(song => playlist.songIds.includes(song.id)) : [];

  if (!playlist) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'var(--primary-bg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ color: 'var(--primary-text)', marginBottom: 'var(--spacing-lg)' }}>
            Playlist not found
          </h1>
          <button
            onClick={() => navigate('/')}
            style={{
              background: 'var(--primary-gradient)',
              color: 'white',
              border: 'none',
              padding: 'var(--spacing-md) var(--spacing-lg)',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer'
            }}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const handlePlayAll = () => {
    if (playlistSongs.length > 0) {
      playSong(playlistSongs[0], playlistSongs);
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
        {/* Playlist Header */}
        <motion.section
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: 'var(--spacing-xl)',
            marginBottom: 'var(--spacing-2xl)',
            flexWrap: 'wrap'
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img 
            src={playlist.cover}
            alt={playlist.name}
            style={{
              width: '250px',
              height: '250px',
              borderRadius: 'var(--radius-lg)',
              objectFit: 'cover',
              boxShadow: 'var(--shadow-xl)',
              background: 'var(--accent-bg)'
            }}
            onError={(e) => {
              e.target.src = `https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop`;
            }}
          />
          
          <div style={{ flex: 1, minWidth: '300px' }}>
            <div style={{
              color: 'var(--secondary-text)',
              fontSize: '0.9rem',
              marginBottom: 'var(--spacing-sm)',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Playlist
            </div>
            
            <h1 style={{
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: '700',
              color: 'var(--primary-text)',
              marginBottom: 'var(--spacing-md)',
              lineHeight: 1.2
            }}>
              {playlist.name}
            </h1>
            
            <p style={{
              color: 'var(--secondary-text)',
              fontSize: '1.1rem',
              marginBottom: 'var(--spacing-lg)',
              lineHeight: 1.5
            }}>
              {playlist.description}
            </p>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-md)',
              color: 'var(--secondary-text)',
              fontSize: '0.9rem',
              marginBottom: 'var(--spacing-lg)'
            }}>
              <span>{playlistSongs.length} songs</span>
            </div>

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
                display: 'flex',
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
          </div>
        </motion.section>

        {/* Songs List */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: 'var(--primary-text)',
            marginBottom: 'var(--spacing-xl)'
          }}>
            Songs
          </h2>

          <div style={{
            maxWidth: '800px'
          }}>
            {playlistSongs.map((song, index) => (
              <motion.div
                key={song.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.3 }}
              >
                <SongCard 
                  song={song} 
                  viewMode="queue"
                  songList={playlistSongs}
                />
              </motion.div>
            ))}
          </div>

          {playlistSongs.length === 0 && (
            <div style={{
              textAlign: 'center',
              color: 'var(--secondary-text)',
              padding: 'var(--spacing-2xl)'
            }}>
              No songs in this playlist yet.
            </div>
          )}
        </motion.section>
      </motion.main>

      <PlayerControls />
    </div>
  );
};

export default PlaylistDetailPage;
