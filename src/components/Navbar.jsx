import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [theme, setTheme] = useState('dark');
    const location = useLocation();

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        updateThemeIcon(newTheme);
    };

    const updateThemeIcon = (currentTheme) => {
        // Icon class update handled by React state rendering
    };

    const isActive = (path) => {
        if (location.pathname === path) return 'active';
        if (path !== '/' && location.pathname.startsWith(path)) return 'active';
        return '';
    };

    const closeMenu = () => setIsMobileMenuOpen(false);

    return (
        <header>
            <nav className="navbar">
                <div className="container navbar-container">
                    <Link to="/" className="logo" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <i className="fab fa-tiktok"></i>
                        <span>T-Downloader</span>
                    </Link>

                    <div
                        className={`menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
                        id="mobile-menu-btn"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>

                    <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`} id="nav-menu">
                        <Link to="/" className={`nav-link ${isActive('/')}`} onClick={closeMenu}>Home</Link>
                        <a href="/#how-to" className="nav-link" onClick={closeMenu}>How to Use</a>
                        <a href="/#features" className="nav-link" onClick={closeMenu}>Features</a>
                        <a href="/#faq" className="nav-link" onClick={closeMenu}>FAQ</a>
                        <Link to="/blog" className={`nav-link ${isActive('/blog')}`} onClick={closeMenu}>Blog</Link>
                        <button id="theme-toggle" className="theme-btn" aria-label="Toggle Theme" onClick={toggleTheme}>
                            <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
