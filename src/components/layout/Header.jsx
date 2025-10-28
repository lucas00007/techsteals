import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const location = useLocation();

  const categories = ['Chargers', 'Cables', 'Cases', 'Power Banks', 'Headphones'];

  const isActive = (path) => location.pathname === path;

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleCategories = () => setIsCategoriesOpen(!isCategoriesOpen);

  return (
    <>
      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '64px',
        background: 'linear-gradient(45deg, #2563eb, #7c3aed, #ec4899, #2563eb)',
        backgroundSize: '300% 300%',
        animation: 'gradientShift 15s ease-in-out infinite',
        color: 'white',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1rem'
      }}>
      {/* Logo */}
      <Link to="/" style={{
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: 'white',
        textDecoration: 'none',
        textShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
        transition: 'all 0.3s ease'
      }}>
        TechSteals
      </Link>

      {/* Desktop Navigation */}
      <nav style={{
        display: window.innerWidth >= 768 ? 'flex' : 'none',
        alignItems: 'center',
        gap: '2rem'
      }}>
        <Link to="/" style={{
          color: 'white',
          textDecoration: 'none',
          transition: 'opacity 0.3s ease',
          borderBottom: isActive('/') ? '2px solid white' : 'none',
          paddingBottom: '2px'
        }}
        onMouseEnter={(e) => e.target.style.opacity = '0.8'}
        onMouseLeave={(e) => e.target.style.opacity = '1'}>
          Home
        </Link>

        <Link to="/deals" style={{
          color: 'white',
          textDecoration: 'none',
          transition: 'opacity 0.3s ease',
          borderBottom: isActive('/deals') ? '2px solid white' : 'none',
          paddingBottom: '2px'
        }}
        onMouseEnter={(e) => e.target.style.opacity = '0.8'}
        onMouseLeave={(e) => e.target.style.opacity = '1'}>
          All Deals
        </Link>

        <div style={{ position: 'relative' }}>
          <button
            onClick={toggleCategories}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              fontSize: '1rem',
              transition: 'opacity 0.3s ease',
              paddingBottom: '2px'
            }}
            onMouseEnter={(e) => e.target.style.opacity = '0.8'}
            onMouseLeave={(e) => e.target.style.opacity = '1'}
          >
            Categories ▼
          </button>
          
          {isCategoriesOpen && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              background: 'white',
              color: '#333',
              minWidth: '150px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              borderRadius: '8px',
              overflow: 'hidden',
              marginTop: '8px'
            }}>
              {categories.map((category) => (
                <Link
                  key={category}
                  to={`/deals?category=${category.toLowerCase()}`}
                  style={{
                    display: 'block',
                    padding: '12px 16px',
                    color: '#333',
                    textDecoration: 'none',
                    transition: 'background-color 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                  onClick={() => setIsCategoriesOpen(false)}
                >
                  {category}
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link to="/about" style={{
          color: 'white',
          textDecoration: 'none',
          transition: 'opacity 0.3s ease',
          borderBottom: isActive('/about') ? '2px solid white' : 'none',
          paddingBottom: '2px'
        }}
        onMouseEnter={(e) => e.target.style.opacity = '0.8'}
        onMouseLeave={(e) => e.target.style.opacity = '1'}>
          About
        </Link>
      </nav>

      {/* Desktop Search Icon */}
      <button style={{
        display: window.innerWidth >= 768 ? 'block' : 'none',
        background: 'none',
        border: 'none',
        color: 'white',
        fontSize: '1.2rem',
        cursor: 'pointer',
        padding: '8px',
        borderRadius: '4px',
        transition: 'opacity 0.3s ease'
      }}
      onMouseEnter={(e) => e.target.style.opacity = '0.8'}
      onMouseLeave={(e) => e.target.style.opacity = '1'}>
        🔍
      </button>

      {/* Mobile Hamburger Menu */}
      <button
        onClick={toggleMobileMenu}
        style={{
          display: window.innerWidth < 768 ? 'block' : 'none',
          background: 'none',
          border: 'none',
          color: 'white',
          fontSize: '1.5rem',
          cursor: 'pointer',
          padding: '4px'
        }}
      >
        ☰
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '100%',
          height: '100vh',
          background: 'linear-gradient(45deg, #2563eb, #7c3aed, #ec4899, #2563eb)',
          backgroundSize: '300% 300%',
          animation: 'gradientShift 15s ease-in-out infinite',
          zIndex: 1001,
          display: 'flex',
          flexDirection: 'column',
          padding: '1rem',
          transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease'
        }}>
          {/* Mobile Menu Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem'
          }}>
            <span style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              textShadow: '0 0 10px rgba(255, 255, 255, 0.3)'
            }}>
              TechSteals
            </span>
            <button
              onClick={toggleMobileMenu}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '1.5rem',
                cursor: 'pointer'
              }}
            >
              ✕
            </button>
          </div>

          {/* Mobile Menu Items */}
          <nav style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
          }}>
            <Link
              to="/"
              onClick={toggleMobileMenu}
              style={{
                color: 'white',
                textDecoration: 'none',
                fontSize: '1.2rem',
                padding: '1rem 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              Home
            </Link>
            
            <Link
              to="/deals"
              onClick={toggleMobileMenu}
              style={{
                color: 'white',
                textDecoration: 'none',
                fontSize: '1.2rem',
                padding: '1rem 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              All Deals
            </Link>

            <div style={{
              padding: '1rem 0',
              borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <div style={{
                color: 'white',
                fontSize: '1.2rem',
                marginBottom: '1rem'
              }}>
                Categories
              </div>
              {categories.map((category) => (
                <Link
                  key={category}
                  to={`/deals?category=${category.toLowerCase()}`}
                  onClick={toggleMobileMenu}
                  style={{
                    display: 'block',
                    color: 'rgba(255, 255, 255, 0.8)',
                    textDecoration: 'none',
                    fontSize: '1rem',
                    padding: '0.5rem 1rem',
                    marginBottom: '0.5rem'
                  }}
                >
                  {category}
                </Link>
              ))}
            </div>

            <Link
              to="/about"
              onClick={toggleMobileMenu}
              style={{
                color: 'white',
                textDecoration: 'none',
                fontSize: '1.2rem',
                padding: '1rem 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              About
            </Link>
          </nav>
        </div>
      )}
      </header>
    </>
  );
};

export default Header;