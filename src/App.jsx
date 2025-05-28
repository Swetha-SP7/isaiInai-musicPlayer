import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PlayerProvider } from './context/PlayerContext';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import PlaylistDetailPage from './pages/PlaylistDetailPage';
import FavoritesPage from './pages/FavoritesPage';
import './styles/variables.css';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

const AppRoutes = () => {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route 
          path="/login" 
          element={
            <PageTransition>
              <LoginPage />
            </PageTransition>
          } 
        />
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <PageTransition>
                <HomePage />
              </PageTransition>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/playlist/:id" 
          element={
            <ProtectedRoute>
              <PageTransition>
                <PlaylistDetailPage />
              </PageTransition>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/favorites" 
          element={
            <ProtectedRoute>
              <PageTransition>
                <FavoritesPage />
              </PageTransition>
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <PlayerProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </PlayerProvider>
    </AuthProvider>
  );
};

export default App;
