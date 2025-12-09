import React from 'react';

const LoadingSkeleton = ({ type = 'card', count = 1 }) => {
  const skeletonStyle = {
    background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
    backgroundSize: '200% 100%',
    animation: 'loading 1.5s infinite',
    borderRadius: '8px'
  };

  const CardSkeleton = () => (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      padding: '1.5rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{ ...skeletonStyle, height: '200px', marginBottom: '1rem' }} />
      <div style={{ ...skeletonStyle, height: '24px', marginBottom: '0.5rem' }} />
      <div style={{ ...skeletonStyle, height: '16px', width: '60%', marginBottom: '1rem' }} />
      <div style={{ ...skeletonStyle, height: '20px', width: '40%', marginBottom: '1rem' }} />
      <div style={{ ...skeletonStyle, height: '40px' }} />
    </div>
  );

  const TextSkeleton = () => (
    <div>
      <div style={{ ...skeletonStyle, height: '20px', marginBottom: '0.5rem' }} />
      <div style={{ ...skeletonStyle, height: '20px', width: '80%', marginBottom: '0.5rem' }} />
      <div style={{ ...skeletonStyle, height: '20px', width: '60%' }} />
    </div>
  );

  return (
    <>
      <style>{`
        @keyframes loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
      <div style={{
        display: 'grid',
        gridTemplateColumns: type === 'card' ? 'repeat(auto-fill, minmax(300px, 1fr))' : '1fr',
        gap: '2rem'
      }}>
        {Array.from({ length: count }, (_, i) => (
          <div key={i}>
            {type === 'card' ? <CardSkeleton /> : <TextSkeleton />}
          </div>
        ))}
      </div>
    </>
  );
};

export default LoadingSkeleton;