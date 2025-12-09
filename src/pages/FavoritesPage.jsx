import React from 'react';
import { Link } from 'react-router-dom';
import DealGrid from '../components/deals/DealGrid';
import { useDeals } from '../hooks/useDeals';
import { useFavorites } from '../hooks/useFavorites';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';

const FavoritesPage = () => {
  const { deals, loading } = useDeals();
  const { getFavoriteDeals, favorites } = useFavorites();

  const favoriteDeals = getFavoriteDeals(deals);

  if (loading) {
    return (
      <div style={{ padding: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '2rem' }}>
          My Favorites
        </h1>
        <LoadingSkeleton type="card" count={6} />
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          ❤️ My Favorites
        </h1>
        <p style={{ color: '#6b7280', fontSize: '1.125rem' }}>
          {favoriteDeals.length} saved deals
        </p>
      </div>

      {favoriteDeals.length > 0 ? (
        <DealGrid deals={favoriteDeals} />
      ) : (
        <div style={{
          textAlign: 'center',
          padding: '4rem 2rem',
          color: '#6b7280'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>💔</div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>No favorites yet</h3>
          <p style={{ marginBottom: '2rem' }}>
            Start adding deals to your favorites to see them here
          </p>
          <Link
            to="/deals"
            style={{
              display: 'inline-block',
              background: 'linear-gradient(to right, #2563eb, #7c3aed)',
              color: 'white',
              textDecoration: 'none',
              fontWeight: 'bold',
              padding: '1rem 2rem',
              borderRadius: '8px',
              transition: 'all 0.3s ease'
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
            Browse Deals
          </Link>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;