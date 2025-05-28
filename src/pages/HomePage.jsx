import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header/Header';
import SearchBar from '../components/SearchBar/SearchBar';
import PlaylistCard from '../components/PlaylistCard/PlaylistCard';
import SongCard from '../components/SongCard/SongCard';
import PlayerControls from '../components/PlayerControls/PlayerControls';
import songsData from '../data/songs.json';

const HomePage = () => {
  const [viewMode, setViewMode] = useState('grid'); 

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
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
          paddingTop: '100px', 
          padding: '100px var(--spacing-xl) var(--spacing-xl)'
        }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <motion.section
          style={{
            textAlign: 'center',
            marginBottom: 'var(--spacing-2xl)'
          }}
          variants={itemVariants}
        >
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: '700',
            background: 'var(--primary-gradient)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: 'var(--spacing-lg)',
            lineHeight: 1.2
          }}>
            Discover Your Sound
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: 'var(--secondary-text)',
            maxWidth: '600px',
            margin: '0 auto var(--spacing-xl)',
            lineHeight: 1.6
          }}>
            Explore playlists that connect.Experience melodies that resonate.And an aura only IsaiInai can offer
          </p>
        </motion.section>
        

        {/* Search Section */}
        <motion.section
          style={{ marginBottom: 'var(--spacing-2xl)' }}
          variants={itemVariants}
        >
          <SearchBar />
        </motion.section>

        {/* Playlists Section */}
        <motion.section
          style={{ marginBottom: 'var(--spacing-2xl)' }}
          variants={itemVariants}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 'var(--spacing-xl)'
          }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: '600',
              color: 'var(--primary-text)'
            }}>
              Featured Playlists
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'var(--spacing-lg)',
            marginBottom: 'var(--spacing-2xl)'
          }}>
            {songsData.playlists.map((playlist) => (
              <PlaylistCard key={playlist.id} playlist={playlist} />
            ))}
          </div>
        </motion.section>

        {/* Songs Section */}
        <motion.section variants={itemVariants}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 'var(--spacing-xl)',
            flexWrap: 'wrap',
            gap: 'var(--spacing-md)'
          }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: '600',
              color: 'var(--primary-text)'
            }}>
              All Songs
            </h2>

            <div style={{
              display: 'flex',
              background: 'var(--glass-bg)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--spacing-xs)',
              border: '1px solid var(--border-color)',
              backdropFilter: 'blur(10px)'
            }}>
              <button
                onClick={() => setViewMode('grid')}
                style={{
                  padding: 'var(--spacing-sm) var(--spacing-md)',
                  background: viewMode === 'grid' ? 'var(--accent-color)' : 'transparent',
                  color: viewMode === 'grid' ? 'white' : 'var(--secondary-text)',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-sm)'
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="3" y="3" width="7" height="7"/>
                  <rect x="14" y="3" width="7" height="7"/>
                  <rect x="14" y="14" width="7" height="7"/>
                  <rect x="3" y="14" width="7" height="7"/>
                </svg>
                Grid
              </button>
              <button
                onClick={() => setViewMode('queue')}
                style={{
                  padding: 'var(--spacing-sm) var(--spacing-md)',
                  background: viewMode === 'queue' ? 'var(--accent-color)' : 'transparent',
                  color: viewMode === 'queue' ? 'white' : 'var(--secondary-text)',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-sm)'
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="8" y1="6" x2="21" y2="6"/>
                  <line x1="8" y1="12" x2="21" y2="12"/>
                  <line x1="8" y1="18" x2="21" y2="18"/>
                  <line x1="3" y1="6" x2="3.01" y2="6"/>
                  <line x1="3" y1="12" x2="3.01" y2="12"/>
                  <line x1="3" y1="18" x2="3.01" y2="18"/>
                </svg>
                Queue
              </button>
            </div>
          </div>

          {viewMode === 'grid' ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: 'var(--spacing-lg)'
            }}>
              {songsData.songs.map((song) => (
                <SongCard 
                  key={song.id} 
                  song={song} 
                  viewMode="grid"
                  songList={songsData.songs}
                />
              ))}
            </div>
          ) : (
            <div style={{
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              {songsData.songs.map((song) => (
                <SongCard 
                  key={song.id} 
                  song={song} 
                  viewMode="queue"
                  songList={songsData.songs}
                />
              ))}
            </div>
          )}
        </motion.section>
      </motion.main>

      <PlayerControls />
    </div>
  );
};

export default HomePage;
