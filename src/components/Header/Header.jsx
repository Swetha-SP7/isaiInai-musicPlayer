import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import styles from './Header.module.css';

const Header = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/favorites', label: 'Favorites' }
  ];

  return (
    <motion.header 
      className={styles.header}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          ISAI INAI
        </Link>

        <nav className={styles.nav}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`${styles.navLink} ${location.pathname === item.path ? styles.active : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.userSection}>
          <span className={styles.userName}>
            Welcome, {user?.name || 'User'}
          </span>
          <button 
            onClick={logout}
            className={styles.logoutBtn}
          >
            Logout
          </button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
