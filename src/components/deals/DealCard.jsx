import React, { useState } from 'react';

const DealCard = ({ deal }) => {
  const [showCopied, setShowCopied] = useState(false);

  const {
    title,
    originalPrice,
    salePrice,
    discount,
    store,
    couponCode,
    affiliateLink,
    imageUrl,
    expiresAt
  } = deal;

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  const getTimeUntilExpiry = () => {
    if (!expiresAt) return null;
    const now = new Date();
    const expiry = new Date(expiresAt);
    const hoursLeft = Math.ceil((expiry - now) / (1000 * 60 * 60));
    return hoursLeft <= 24 ? hoursLeft : null;
  };

  const hoursLeft = getTimeUntilExpiry();

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
          src={imageUrl}
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
          ${salePrice}
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

      {/* Expiration Warning */}
      {hoursLeft && hoursLeft <= 24 && (
        <div style={{
          color: '#ef4444',
          fontSize: '0.875rem',
          marginBottom: '1rem',
          fontWeight: '500'
        }}>
          ⏰ Expires in {hoursLeft} hours!
        </div>
      )}

      {/* Get Deal Button */}
      <button
        onClick={() => window.open(affiliateLink, '_blank')}
        style={{
          width: '100%',
          background: 'linear-gradient(to right, #2563eb, #7c3aed)',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '1rem',
          padding: '0.75rem 1rem',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.target.style.background = 'linear-gradient(to right, #3b82f6, #8b5cf6)';
          e.target.style.transform = 'translateY(-1px)';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'linear-gradient(to right, #2563eb, #7c3aed)';
          e.target.style.transform = 'translateY(0)';
        }}
      >
        Get Deal
      </button>

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