import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Layout.css';

const Layout = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className="layout">
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">🌾</span>
            <h1>Farm-IT</h1>
          </div>
          
          <button className="menu-toggle" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>

          <nav className={`nav ${menuOpen ? 'nav-open' : ''}`}>
            <NavLink to="/" end onClick={closeMenu}>
              <span className="nav-icon">📊</span>
              Dashboard
            </NavLink>
            <NavLink to="/animals" onClick={closeMenu}>
              <span className="nav-icon">🐄</span>
              Rebanho
            </NavLink>
            <NavLink to="/feeding" onClick={closeMenu}>
              <span className="nav-icon">🌾</span>
              Alimentação
            </NavLink>
            <NavLink to="/manure" onClick={closeMenu}>
              <span className="nav-icon">♻️</span>
              Esterco
            </NavLink>
            <NavLink to="/financial" onClick={closeMenu}>
              <span className="nav-icon">💰</span>
              Financeiro
            </NavLink>
            <NavLink to="/profile" onClick={closeMenu}>
              <span className="nav-icon">👤</span>
              Perfil
            </NavLink>
          </nav>

          <div className="user-menu">
            <span className="user-name">{user?.name}</span>
            <button className="logout-btn" onClick={logout}>Sair</button>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="container">
          <Outlet />
        </div>
      </main>

      <footer className="footer">
        <p>&copy; 2025 Farm-IT - Gestão Sustentável para Propriedades Pecuárias</p>
      </footer>
    </div>
  );
};

export default Layout;

