import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DealGrid from '../components/deals/DealGrid';
import { useDeals } from '../hooks/useDeals';
import ApiService from '../services/api';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [email, setEmail] = useState('');
  const { deals, loading } = useDeals();

  // Calculate stats
  const hotDeals = deals.filter(deal => deal.discount >= 40);
  const averageDiscount = deals.length > 0 ? Math.round(deals.reduce((sum, deal) => sum + deal.discount, 0) / deals.length) : 0;
  const activeCoupons = deals.filter(deal => deal.couponCode).length;

  // Get top 8 deals by discount
  const featuredDeals = [...deals].sort((a, b) => b.discount - a.discount).slice(0, 8);

  // Category data
  const categories = [
    { name: 'Chargers', emoji: '⚡', count: deals.filter(d => d.category === 'Chargers').length },
    { name: 'Cables', emoji: '🔌', count: deals.filter(d => d.category === 'Cables').length },
    { name: 'Cases', emoji: '📱', count: deals.filter(d => d.category === 'Cases').length },
    { name: 'Power Banks', emoji: '🔋', count: deals.filter(d => d.category === 'Power Banks').length },
    { name: 'Headphones', emoji: '🎧', count: deals.filter(d => d.category === 'Headphones').length },
    { name: 'Accessories', emoji: '🎁', count: deals.filter(d => d.category === 'Accessories').length }
  ];

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/deals?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/deals');
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (email) {
      const success = await ApiService.subscribeToNewsletter(email);
      if (success) {
        localStorage.setItem('subscribedEmail', email);
        alert('Thank you for subscribing!');
        setEmail('');
      } else {
        alert('Subscription failed. Please try again.');
      }
    }
  };

  const isMobile = window.innerWidth < 768;

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(225deg, #2563eb, #7c3aed, #ec4899, #2563eb)',
        backgroundSize: '300% 300%',
        animation: 'gradientShift 15s ease-in-out infinite',
        height: isMobile ? '350px' : '500px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '2rem'
      }}>
        <div style={{ maxWidth: '800px', width: '100%' }}>
          <h1 style={{
            fontSize: isMobile ? '2rem' : '3rem',
            fontWeight: 'bold',
            color: 'white',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
            marginBottom: '1rem'
          }}>
            Save Big on Tech Accessories
          </h1>
          
          <p style={{
            fontSize: '1.25rem',
            color: 'rgba(255, 255, 255, 0.9)',
            marginBottom: '2rem'
          }}>
            Find the best deals on chargers, cables, cases & more
          </p>

          <form onSubmit={handleSearch} style={{
            maxWidth: '600px',
            margin: '0 auto 2rem',
            position: 'relative'
          }}>
            <input
              type="text"
              placeholder="Search for products, deals, or stores..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '1rem 4rem 1rem 1.5rem',
                borderRadius: '12px',
                border: 'none',
                fontSize: '1rem',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
              }}
            />
            <button
              type="submit"
              style={{
                position: 'absolute',
                right: '8px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'linear-gradient(to right, #2563eb, #7c3aed)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '0.75rem 1rem',
                cursor: 'pointer',
                fontSize: '1.2rem'
              }}
            >
              🔍
            </button>
          </form>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            justifyContent: 'center'
          }}>
            {[
              { emoji: '⚡', name: 'Chargers', category: 'chargers' },
              { emoji: '🔌', name: 'Cables', category: 'cables' },
              { emoji: '📱', name: 'Cases', category: 'cases' },
              { emoji: '🔋', name: 'Power Banks', category: 'power banks' },
              { emoji: '🎧', name: 'Headphones', category: 'headphones' }
            ].map((item) => (
              <Link
                key={item.category}
                to={`/deals?category=${item.category}`}
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '9999px',
                  padding: '0.5rem 1.5rem',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  fontSize: '0.875rem',
                  display: 'inline-block'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.9)';
                  e.target.style.color = '#2563eb';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                  e.target.style.color = 'white';
                }}
              >
                {item.emoji} {item.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section style={{
        background: 'white',
        padding: '2rem'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          maxWidth: '1200px',
          margin: '0 auto',
          gap: isMobile ? '2rem' : '1rem'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ef4444' }}>🔥 {hotDeals.length}</div>
            <div style={{ color: '#6b7280' }}>Hot Deals Today</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#16a34a' }}>💰 {averageDiscount}%</div>
            <div style={{ color: '#6b7280' }}>Average Savings</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2563eb' }}>⭐ {activeCoupons}</div>
            <div style={{ color: '#6b7280' }}>Active Coupons</div>
          </div>
        </div>
      </section>

      {/* Featured Deals Section */}
      <section style={{
        background: '#f9fafb',
        padding: '4rem 2rem'
      }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '3rem',
          color: '#111827'
        }}>
          🔥 Hot Deals Right Now
        </h2>
        
        <DealGrid deals={featuredDeals} />
        
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link
            to="/deals"
            style={{
              display: 'inline-block',
              background: 'linear-gradient(to right, #2563eb, #7c3aed)',
              color: 'white',
              textDecoration: 'none',
              fontWeight: 'bold',
              padding: '1rem 3rem',
              borderRadius: '8px',
              transition: 'all 0.3s ease',
              fontSize: '1rem'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'linear-gradient(to right, #3b82f6, #8b5cf6)';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'linear-gradient(to right, #2563eb, #7c3aed)';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            View All Deals
          </Link>
        </div>
      </section>

      {/* Category Section */}
      <section style={{
        background: 'white',
        padding: '4rem 2rem'
      }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '3rem',
          color: '#111827'
        }}>
          Shop by Category
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : window.innerWidth < 1024 ? 'repeat(3, 1fr)' : 'repeat(6, 1fr)',
          gap: '2rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/deals?category=${category.name.toLowerCase()}`}
              style={{
                display: 'block',
                background: 'white',
                borderRadius: '12px',
                padding: '2rem',
                textAlign: 'center',
                color: 'inherit',
                textDecoration: 'none',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                border: '2px solid transparent',
                width: '100%'
              }}
              onMouseEnter={(e) => {
                e.target.style.border = '2px solid #2563eb';
                e.target.style.boxShadow = '0 8px 12px rgba(0, 0, 0, 0.15)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.border = '2px solid transparent';
                e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{category.emoji}</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                {category.name}
              </div>
              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                {category.count} deals
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Email Subscribe Section */}
      <section style={{
        background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(124, 58, 237, 0.1))',
        padding: '4rem 2rem'
      }}>
        <div style={{
          maxWidth: '600px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#111827',
            marginBottom: '1rem'
          }}>
            Never Miss a Deal
          </h2>
          
          <p style={{
            color: 'rgba(17, 24, 39, 0.7)',
            marginBottom: '2rem'
          }}>
            Get exclusive deals delivered to your inbox daily
          </p>
          
          <form onSubmit={handleEmailSubmit} style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: '1rem',
            marginBottom: '1rem'
          }}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                flex: 1,
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                fontSize: '1rem'
              }}
            />
            <button
              type="submit"
              style={{
                background: 'linear-gradient(to right, #2563eb, #7c3aed)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '1rem 2rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'linear-gradient(to right, #3b82f6, #8b5cf6)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'linear-gradient(to right, #2563eb, #7c3aed)';
              }}
            >
              Subscribe
            </button>
          </form>
          
          <p style={{
            fontSize: '0.875rem',
            color: 'rgba(17, 24, 39, 0.5)'
          }}>
            We respect your privacy. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* Footer Section */}
      <footer style={{
        background: '#111827',
        padding: '3rem 2rem',
        color: 'white'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: '2rem',
            marginBottom: '2rem'
          }}>
            <div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                marginBottom: '1rem'
              }}>
                TechSteals
              </h3>
              <p style={{ color: '#9ca3af' }}>
                Your source for the best tech accessory deals
              </p>
            </div>
            
            <div>
              <h4 style={{
                fontWeight: 'bold',
                marginBottom: '1rem'
              }}>
                Quick Links
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {['Home', 'Deals', 'Categories', 'About', 'Contact'].map((link) => (
                  <button
                    key={link}
                    style={{
                      color: '#9ca3af',
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'color 0.3s ease',
                      fontSize: '1rem'
                    }}
                    onMouseEnter={(e) => e.target.style.color = 'white'}
                    onMouseLeave={(e) => e.target.style.color = '#9ca3af'}
                  >
                    {link}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h4 style={{
                fontWeight: 'bold',
                marginBottom: '1rem'
              }}>
                Follow Us
              </h4>
              <div style={{ display: 'flex', gap: '1rem' }}>
                {[
                  { icon: '🐦', name: 'Twitter' },
                  { icon: '📘', name: 'Facebook' },
                  { icon: '📸', name: 'Instagram' }
                ].map((social) => (
                  <button
                    key={social.name}
                    style={{
                      color: '#9ca3af',
                      background: 'none',
                      border: 'none',
                      fontSize: '1.5rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'linear-gradient(to right, #2563eb, #7c3aed)';
                      e.target.style.webkitBackgroundClip = 'text';
                      e.target.style.webkitTextFillColor = 'transparent';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.webkitTextFillColor = '#9ca3af';
                    }}
                  >
                    {social.icon}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.2)',
            paddingTop: '2rem',
            textAlign: 'center'
          }}>
            <p style={{
              color: '#9ca3af',
              fontSize: '0.875rem'
            }}>
              © 2024 TechSteals. All rights reserved.
            </p>
          </div>
        </div>
        </footer>
    </div>
  );
};

export default HomePage;