import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DealCard = ({ deal }) => {
  const [showCopied, setShowCopied] = useState(false);

  const {
    id,
    title,
    originalPrice,
    currentPrice,
    discount,
    store,
    couponCode,
    link,
    image,
    rating
  } = deal;

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };



  return (
    <div style={{
      position: 'relative',
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      padding: '1.5rem',
      width: '100%',
      transition: 'box-shadow 0.3s ease, transform 0.3s ease',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.boxShadow = '0 8px 12px rgba(0, 0, 0, 0.15)';
      e.currentTarget.style.transform = 'translateY(-2px)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
      e.currentTarget.style.transform = 'translateY(0)';
    }}>
      
      {/* Product Image */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '200px',
        marginBottom: '1rem',
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        <img
          src={image}
          alt={title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
        
        {/* Discount Badge */}
        <div style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          background: 'linear-gradient(135deg, #ef4444, #f97316)',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '0.875rem',
          padding: '4px 8px',
          borderRadius: '9999px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
        }}>
          -{discount}%
        </div>
      </div>

      {/* Product Title */}
      <h3 style={{
        fontSize: '1.25rem',
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: '0.5rem',
        lineHeight: '1.4',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden'
      }}>
        {title}
      </h3>

      {/* Store Name */}
      <div style={{
        fontSize: '0.875rem',
        color: '#6b7280',
        marginBottom: '1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '4px'
      }}>
        🏪 {store}
      </div>

      {/* Price Section */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        marginBottom: '1rem'
      }}>
        <span style={{
          fontSize: '1rem',
          color: '#6b7280',
          textDecoration: 'line-through'
        }}>
          ${originalPrice}
        </span>
        <span style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: '#16a34a'
        }}>
          ${currentPrice}
        </span>
      </div>

      {/* Coupon Code Box */}
      {couponCode && (
        <div style={{
          backgroundColor: '#f3f4f6',
          border: '1px solid transparent',
          backgroundImage: 'linear-gradient(white, white), linear-gradient(to right, #2563eb, #7c3aed)',
          backgroundOrigin: 'border-box',
          backgroundClip: 'content-box, border-box',
          borderRadius: '8px',
          padding: '0.75rem',
          marginBottom: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{
            fontSize: '0.875rem',
            color: '#374151',
            fontFamily: 'monospace'
          }}>
            Code: {couponCode}
          </span>
          <button
            onClick={() => copyToClipboard(couponCode)}
            style={{
              background: 'linear-gradient(to right, #2563eb, #7c3aed)',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '4px 8px',
              fontSize: '0.75rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'opacity 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.opacity = '0.9'}
            onMouseLeave={(e) => e.target.style.opacity = '1'}
          >
            {showCopied ? 'COPIED!' : 'COPY'}
          </button>
        </div>
      )}

      {/* Rating */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        marginBottom: '1rem'
      }}>
        <div style={{ color: '#fbbf24', fontSize: '1rem' }}>
          {'★'.repeat(Math.floor(rating))}{'☆'.repeat(5 - Math.floor(rating))}
        </div>
        <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>({rating})</span>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Link
          to={`/deal/${id}`}
          style={{
            flex: 1,
            background: 'white',
            color: '#2563eb',
            border: '2px solid #2563eb',
            fontWeight: 'bold',
            fontSize: '0.875rem',
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            textDecoration: 'none',
            textAlign: 'center',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = '#2563eb';
            e.target.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'white';
            e.target.style.color = '#2563eb';
          }}
        >
          View Deal
        </Link>
        <button
          onClick={() => window.open(link, '_blank')}
          style={{
            flex: 1,
            background: 'linear-gradient(to right, #2563eb, #7c3aed)',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '0.875rem',
            padding: '0.75rem 1rem',
            border: 'none',
            borderRadius: '8px',
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
          Get Deal
        </button>
      </div>

      {/* Copy Toast Notification */}
      {showCopied && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'linear-gradient(to right, #16a34a, #059669)',
          color: 'white',
          padding: '0.75rem 1.5rem',
          borderRadius: '8px',
          fontSize: '0.875rem',
          fontWeight: 'bold',
          zIndex: 1000,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
        }}>
          ✅ Coupon code copied!
        </div>
      )}
    </div>
  );
};

export default DealCard;