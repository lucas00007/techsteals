import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDeal } from '../hooks/useDeals';

const DealDetailPage = () => {
  const { id } = useParams();
  const { deal, loading } = useDeal(id);
  
  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔄</div>
        <p>Loading deal details...</p>
      </div>
    );
  }

  if (!deal) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Deal Not Found</h1>
        <Link to="/deals" style={{ color: '#2563eb', textDecoration: 'none' }}>
          ← Back to Deals
        </Link>
      </div>
    );
  }

  const isMobile = window.innerWidth < 768;
  
  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Breadcrumb */}
      <div style={{ marginBottom: '2rem' }}>
        <Link to="/deals" style={{ color: '#2563eb', textDecoration: 'none' }}>
          ← Back to Deals
        </Link>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: '3rem'
      }}>
        {/* Product Image */}
        <div>
          <img
            src={deal.image}
            alt={deal.title}
            style={{
              width: '100%',
              borderRadius: '12px',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)'
            }}
          />
        </div>

        {/* Product Details */}
        <div>
          <div style={{
            background: `linear-gradient(45deg, ${deal.discount >= 50 ? '#ef4444' : deal.discount >= 30 ? '#f59e0b' : '#10b981'}, transparent)`,
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '9999px',
            display: 'inline-block',
            fontSize: '0.875rem',
            fontWeight: 'bold',
            marginBottom: '1rem'
          }}>
            {deal.discount}% OFF
          </div>

          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            lineHeight: '1.2'
          }}>
            {deal.title}
          </h1>

          <p style={{
            color: '#6b7280',
            fontSize: '1.125rem',
            marginBottom: '2rem',
            lineHeight: '1.6'
          }}>
            {deal.description}
          </p>

          {/* Price */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
              <span style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                color: '#16a34a'
              }}>
                ${deal.currentPrice}
              </span>
              <span style={{
                fontSize: '1.5rem',
                color: '#6b7280',
                textDecoration: 'line-through'
              }}>
                ${deal.originalPrice}
              </span>
            </div>
            <p style={{ color: '#16a34a', fontWeight: 'bold' }}>
              You save ${(deal.originalPrice - deal.currentPrice).toFixed(2)}!
            </p>
          </div>

          {/* Rating */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '2rem'
          }}>
            <div style={{ color: '#fbbf24', fontSize: '1.25rem' }}>
              {'★'.repeat(Math.floor(deal.rating))}{'☆'.repeat(5 - Math.floor(deal.rating))}
            </div>
            <span style={{ color: '#6b7280' }}>({deal.rating}/5)</span>
          </div>

          {/* Store */}
          <div style={{
            background: '#f3f4f6',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '2rem'
          }}>
            <p style={{ marginBottom: '0.5rem' }}>
              <strong>Store:</strong> {deal.store}
            </p>
            <p style={{ marginBottom: '0.5rem' }}>
              <strong>Category:</strong> {deal.category}
            </p>
            {deal.couponCode && (
              <p style={{ color: '#2563eb', fontWeight: 'bold' }}>
                <strong>Coupon Code:</strong> {deal.couponCode}
              </p>
            )}
          </div>

          {/* CTA Button */}
          <a
            href={deal.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block',
              background: 'linear-gradient(to right, #2563eb, #7c3aed)',
              color: 'white',
              textDecoration: 'none',
              textAlign: 'center',
              padding: '1.5rem 2rem',
              borderRadius: '12px',
              fontSize: '1.25rem',
              fontWeight: 'bold',
              transition: 'all 0.3s ease',
              marginBottom: '1rem'
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
            Get This Deal →
          </a>

          <p style={{
            fontSize: '0.875rem',
            color: '#6b7280',
            textAlign: 'center'
          }}>
            * Price and availability subject to change
          </p>
        </div>
      </div>

      {/* Additional Info */}
      <div style={{
        marginTop: '4rem',
        padding: '2rem',
        background: '#f9fafb',
        borderRadius: '12px'
      }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          marginBottom: '1rem'
        }}>
          Deal Details
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: '1rem'
        }}>
          <div>
            <strong>Discount:</strong> {deal.discount}% off
          </div>
          <div>
            <strong>Original Price:</strong> ${deal.originalPrice}
          </div>
          <div>
            <strong>Sale Price:</strong> ${deal.currentPrice}
          </div>
          <div>
            <strong>You Save:</strong> ${(deal.originalPrice - deal.currentPrice).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealDetailPage;
