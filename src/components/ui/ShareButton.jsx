import React, { useState } from 'react';

const ShareButton = ({ deal, style = {} }) => {
  const [showShareMenu, setShowShareMenu] = useState(false);

  const shareUrl = `${window.location.origin}/deal/${deal.id}`;
  const shareText = `Check out this amazing deal: ${deal.title} - ${deal.discount}% off!`;

  const shareOptions = [
    {
      name: 'Twitter',
      icon: '🐦',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'Facebook',
      icon: '📘',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'WhatsApp',
      icon: '💬',
      url: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`
    },
    {
      name: 'Copy Link',
      icon: '🔗',
      action: () => {
        navigator.clipboard.writeText(shareUrl);
        alert('Link copied to clipboard!');
        setShowShareMenu(false);
      }
    }
  ];

  return (
    <div style={{ position: 'relative', ...style }}>
      <button
        onClick={() => setShowShareMenu(!showShareMenu)}
        style={{
          background: 'none',
          border: '1px solid #d1d5db',
          borderRadius: '8px',
          padding: '0.5rem',
          cursor: 'pointer',
          fontSize: '1.2rem',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.target.style.background = '#f3f4f6';
          e.target.style.borderColor = '#2563eb';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'none';
          e.target.style.borderColor = '#d1d5db';
        }}
      >
        📤
      </button>

      {showShareMenu && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: 0,
          background: 'white',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          padding: '0.5rem',
          zIndex: 1000,
          minWidth: '150px',
          marginTop: '0.5rem'
        }}>
          {shareOptions.map((option) => (
            <button
              key={option.name}
              onClick={() => {
                if (option.action) {
                  option.action();
                } else {
                  window.open(option.url, '_blank', 'width=600,height=400');
                  setShowShareMenu(false);
                }
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                width: '100%',
                padding: '0.5rem',
                background: 'none',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.875rem',
                transition: 'background-color 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              <span>{option.icon}</span>
              <span>{option.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShareButton;