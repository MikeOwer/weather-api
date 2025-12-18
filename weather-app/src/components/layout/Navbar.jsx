/**
 * Componente Navbar
 * Muestra el nombre del usuario autenticado y botón de logout
 * Con menú hamburguesa para móviles
 */

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../common/Button';
import './Navbar.css';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    setMenuOpen(false);
    logout();
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Header siempre visible */}
        <div className="navbar-header">
          <div className="navbar-brand">
            <h2 className="navbar-logo">Weather App</h2>
          </div>

          {/* Avatar y hamburguesa en móviles */}
          <div className="navbar-header-right">
            <span className="navbar-user-avatar navbar-avatar-mobile">
              {user?.name?.charAt(0).toUpperCase()}
            </span>
            
            <button 
              className="navbar-hamburger"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span className={`hamburger-line ${menuOpen ? 'open' : ''}`}></span>
              <span className={`hamburger-line ${menuOpen ? 'open' : ''}`}></span>
              <span className={`hamburger-line ${menuOpen ? 'open' : ''}`}></span>
            </button>
          </div>
        </div>

        {/* Desktop: Links siempre visibles */}
        <div className="navbar-links navbar-desktop-only">
          <Link 
            to="/" 
            className={`navbar-link ${isActive('/') ? 'navbar-link-active' : ''}`}
          >
            Inicio
          </Link>
          <Link 
            to="/weather" 
            className={`navbar-link ${isActive('/weather') || location.pathname.startsWith('/weather/') ? 'navbar-link-active' : ''}`}
          >
            Clima
          </Link>
        </div>
        
        {/* Desktop: Usuario y logout siempre visibles */}
        <div className="navbar-user navbar-desktop-only">
          <div className="navbar-user-info">
            <span className="navbar-user-avatar">
              {user?.name?.charAt(0).toUpperCase()}
            </span>
            <div className="navbar-user-details">
              <span className="navbar-user-name">{user?.name}</span>
              <span className="navbar-user-email">{user?.email}</span>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            onClick={logout}
            className="navbar-logout-btn"
          >
            Cerrar Sesión
          </Button>
        </div>

        {/* Mobile: Menú desplegable */}
        <div className={`navbar-mobile-menu ${menuOpen ? 'open' : ''}`}>
          <div className="navbar-mobile-user">
            <span className="navbar-user-avatar">
              {user?.name?.charAt(0).toUpperCase()}
            </span>
            <div className="navbar-user-details">
              <span className="navbar-user-name">{user?.name}</span>
              <span className="navbar-user-email">{user?.email}</span>
            </div>
          </div>

          <div className="navbar-mobile-links">
            <Link 
              to="/" 
              className={`navbar-mobile-link ${isActive('/') ? 'active' : ''}`}
              onClick={handleLinkClick}
            >
              🏠 Inicio
            </Link>
            <Link 
              to="/weather" 
              className={`navbar-mobile-link ${isActive('/weather') || location.pathname.startsWith('/weather/') ? 'active' : ''}`}
              onClick={handleLinkClick}
            >
              🌤️ Clima
            </Link>
          </div>

          <button 
            className="navbar-mobile-logout"
            onClick={handleLogout}
          >
            🚪 Cerrar Sesión
          </button>
        </div>

        {/* Overlay para cerrar menú */}
        {menuOpen && (
          <div 
            className="navbar-overlay"
            onClick={() => setMenuOpen(false)}
          ></div>
        )}
      </div>
    </nav>
  );
};

