import React, { useState, useEffect } from 'react';
import DealCard from './DealCard';

const LoadingSkeleton = () => (
  <>
    <style>{`
      @keyframes pulse {
        0% { opacity: 1; }
        50% { opacity: 0.5; }
        100% { opacity: 1; }
      }
    `}</style>
    <div style={{
      height: '450px',
      backgroundColor: '#e5e7eb',
      borderRadius: '12px',
      animation: 'pulse 2s infinite ease-in-out'
    }} />
  </>
);

const DealGrid = ({ deals = [], loading = false }) => {
  const [columns, setColumns] = useState(1);

  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width >= 1280) setColumns(4);
      else if (width >= 1024) setColumns(3);
      else if (width >= 640) setColumns(2);
      else setColumns(1);
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  const getGridColumns = () => {
    if (columns === 4) return 'repeat(4, 1fr)';
    if (columns === 3) return 'repeat(3, 1fr)';
    if (columns === 2) return 'repeat(2, 1fr)';
    return '1fr';
  };

  const containerStyle = {
    width: '100%',
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '2rem',
    scrollMarginTop: '80px'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: getGridColumns(),
    gap: '2rem',
    width: '100%',
    opacity: loading ? 0.7 : 1,
    transition: 'opacity 0.3s ease'
  };

  if (loading) {
    return (
      <div style={containerStyle}>
        <div style={gridStyle}>
          {Array.from({ length: 8 }).map((_, index) => (
            <LoadingSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (!deals || deals.length === 0) {
    return (
      <div style={{
        ...containerStyle,
        minHeight: '400px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: '#111827',
          marginBottom: '0.5rem'
        }}>
          No deals found
        </h2>
        <p style={{
          fontSize: '1rem',
          color: '#6b7280',
          marginBottom: '2rem'
        }}>
          Try adjusting your filters or check back later
        </p>
        <button style={{
          background: 'linear-gradient(to right, #2563eb, #7c3aed)',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '1rem',
          padding: '0.75rem 1.5rem',
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
        }}>
          Clear Filters
        </button>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={{
        fontSize: '0.875rem',
        color: '#6b7280',
        marginBottom: '1.5rem'
      }}>
        Showing {deals.length} deals
      </div>
      <div style={gridStyle}>
        {deals.map((deal) => (
          <DealCard key={deal.id} deal={deal} />
        ))}
      </div>
    </div>
  );
};

export default DealGrid;