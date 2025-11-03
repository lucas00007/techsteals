import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import DealGrid from '../components/deals/DealGrid';
import mockDeals from '../data/mockDeals';

const DealDetailPage = () => {
  const { id } = useParams();
  const [showCopied, setShowCopied] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const deal = mockDeals.find(d => d.id === parseInt(id));
  
  if (!deal) {
    return (
      <div style={{
        background: '#f9fafb',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            Deal Not Found
          </h1>
          <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
            The deal you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/deals"
            style={{
              background: 'linear-gradient(to right, #2563eb, #7c3aed)',
              color: 'white',
              textDecoration: 'none',
              padding: '0.75rem 2rem',
              borderRadius: '8px',
              fontWeight: 'bold'
            }}
          >
            Browse All Deals
          </Link>
        </div>
      </div>
    );
  }

  // Mock additional images for gallery
  const images = [
    deal.imageUrl,
    deal.imageUrl, // In real app, these would be different angles
    deal.imageUrl,
    deal.imageUrl
  ];

  // Mock reviews data
  const reviews = [
    { id: 1, name: 'Sarah M.', rating: 5, comment: 'Great quality and fast shipping!', date: '2024-01-15' },
    { id: 2, name: 'Mike R.', rating: 4, comment: 'Good value for money. Works as expected.', date: '2024-01-10' },
    { id: 3, name: 'Lisa K.', rating: 5, comment: 'Excellent product, highly recommend!', date: '2024-01-08' }
  ];

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  // Related deals (same category, excluding current deal)
  const relatedDeals = mockDeals
    .filter(d => d.category === deal.category && d.id !== deal.id)
    .slice(0, 4);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  const getTimeUntilExpiry = () => {
    if (!deal.expiresAt) return null;
    const now = new Date();
    const expiry = new Date(deal.expiresAt);
    const hoursLeft = Math.ceil((expiry - now) / (1000 * 60 * 60));
    return hoursLeft <= 24 ? hoursLeft : null;
  };

  const hoursLeft = getTimeUntilExpiry();
  const isMobile = window.innerWidth < 768;

  return (
    <div style={{ background: '#f9fafb', minHeight: '100vh' }}>
      {/* Breadcrumb */}
      <div style={{
        background: 'white',
        padding: '1rem 2rem',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <nav style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.875rem',
            color: '#6b7280'
          }}>
            <Link to="/" style={{ color: '#2563eb', textDecoration: 'none' }}>Home</Link>
            <span>›</span>
            <Link to="/deals" style={{ color: '#2563eb', textDecoration: 'none' }}>Deals</Link>
            <span>›</span>
            <span>{deal.category}</span>
            <span>›</span>
            <span style={{ color: '#111827' }}>{deal.title}</span>
          </nav>
        </div>
      </div>

      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '2rem'
      }}>
        {/* Main Product Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: '3rem',
          marginBottom: '3rem'
        }}>
          {/* Image Gallery */}
          <div>
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '2rem',
              marginBottom: '1rem'
            }}>
              <img
                src={images[selectedImage]}
                alt={deal.title}
                style={{
                  width: '100%',
                  height: '400px',
                  objectFit: 'cover',
                  borderRadius: '8px'
                }}
              />
            </div>
            
            {/* Thumbnail Gallery */}
            <div style={{
              display: 'flex',
              gap: '0.5rem',
              justifyContent: 'center'
            }}>
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  style={{
                    width: '80px',
                    height: '80px',
                    border: selectedImage === index ? '2px solid #2563eb' : '2px solid transparent',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    background: 'white'
                  }}
                >
                  <img
                    src={img}
                    alt={`${deal.title} ${index + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div style={{ background: 'white', borderRadius: '12px', padding: '2rem' }}>
            {/* Category Badge */}
            <div style={{
              display: 'inline-block',
              background: 'linear-gradient(to right, #2563eb, #7c3aed)',
              color: 'white',
              padding: '0.25rem 0.75rem',
              borderRadius: '9999px',
              fontSize: '0.875rem',
              fontWeight: 'bold',
              marginBottom: '1rem'
            }}>
              {deal.category}
            </div>

            {/* Title */}
            <h1 style={{
              fontSize: isMobile ? '1.5rem' : '2rem',
              fontWeight: 'bold',
              color: '#111827',
              marginBottom: '1rem',
              lineHeight: '1.3'
            }}>
              {deal.title}
            </h1>

            {/* Rating */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{ display: 'flex', gap: '2px' }}>
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    style={{
                      color: i < Math.floor(averageRating) ? '#fbbf24' : '#d1d5db',
                      fontSize: '1.25rem'
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span style={{ color: '#6b7280' }}>
                {averageRating.toFixed(1)} ({reviews.length} reviews)
              </span>
            </div>

            {/* Store */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1.5rem',
              color: '#6b7280'
            }}>
              <span>🏪</span>
              <span>Sold by {deal.store}</span>
            </div>

            {/* Price Section */}
            <div style={{
              background: '#f9fafb',
              padding: '1.5rem',
              borderRadius: '8px',
              marginBottom: '1.5rem'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1rem'
              }}>
                <span style={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  color: '#16a34a'
                }}>
                  ${deal.salePrice}
                </span>
                <span style={{
                  fontSize: '1.25rem',
                  color: '#6b7280',
                  textDecoration: 'line-through'
                }}>
                  ${deal.originalPrice}
                </span>
                <div style={{
                  background: 'linear-gradient(135deg, #ef4444, #f97316)',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  padding: '0.5rem 1rem',
                  borderRadius: '9999px'
                }}>
                  -{deal.discount}% OFF
                </div>
              </div>
              
              <div style={{
                fontSize: '1rem',
                color: '#16a34a',
                fontWeight: '500'
              }}>
                You save ${(deal.originalPrice - deal.salePrice).toFixed(2)}!
              </div>
            </div>

            {/* Coupon Code */}
            {deal.couponCode && (
              <div style={{
                background: '#f3f4f6',
                border: '1px solid transparent',
                backgroundImage: 'linear-gradient(white, white), linear-gradient(to right, #2563eb, #7c3aed)',
                backgroundOrigin: 'border-box',
                backgroundClip: 'content-box, border-box',
                borderRadius: '8px',
                padding: '1rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>
                      Coupon Code Available
                    </div>
                    <div style={{
                      fontFamily: 'monospace',
                      fontSize: '1.125rem',
                      color: '#2563eb',
                      fontWeight: 'bold'
                    }}>
                      {deal.couponCode}
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(deal.couponCode)}
                    style={{
                      background: 'linear-gradient(to right, #2563eb, #7c3aed)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '0.5rem 1rem',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    {showCopied ? 'COPIED!' : 'COPY'}
                  </button>
                </div>
              </div>
            )}

            {/* Expiration Warning */}
            {hoursLeft && hoursLeft <= 24 && (
              <div style={{
                background: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '8px',
                padding: '1rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  color: '#ef4444',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  ⏰ Limited Time Offer!
                </div>
                <div style={{ color: '#7f1d1d', marginTop: '0.25rem' }}>
                  This deal expires in {hoursLeft} hours. Don't miss out!
                </div>
              </div>
            )}

            {/* Get Deal Button */}
            <button
              onClick={() => window.open(deal.affiliateLink, '_blank')}
              style={{
                width: '100%',
                background: 'linear-gradient(to right, #2563eb, #7c3aed)',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '1.125rem',
                padding: '1rem 2rem',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
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
              Get This Deal Now
            </button>

            <div style={{
              fontSize: '0.875rem',
              color: '#6b7280',
              textAlign: 'center'
            }}>
              You'll be redirected to {deal.store} to complete your purchase
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '2rem',
          marginBottom: '3rem'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            marginBottom: '2rem'
          }}>
            Customer Reviews ({reviews.length})
          </h2>
          
          <div style={{
            display: 'grid',
            gap: '1.5rem'
          }}>
            {reviews.map(review => (
              <div
                key={review.id}
                style={{
                  padding: '1.5rem',
                  background: '#f9fafb',
                  borderRadius: '8px'
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.5rem'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <span style={{ fontWeight: 'bold' }}>{review.name}</span>
                    <div style={{ display: 'flex', gap: '2px' }}>
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          style={{
                            color: i < review.rating ? '#fbbf24' : '#d1d5db',
                            fontSize: '1rem'
                          }}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <span style={{
                    color: '#6b7280',
                    fontSize: '0.875rem'
                  }}>
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
                <p style={{ color: '#374151' }}>{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Deals */}
        {relatedDeals.length > 0 && (
          <div>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              marginBottom: '2rem',
              textAlign: 'center'
            }}>
              More {deal.category} Deals
            </h2>
            <DealGrid deals={relatedDeals} />
          </div>
        )}
      </div>

      {/* Copy Toast */}
      {showCopied && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'linear-gradient(to right, #16a34a, #059669)',
          color: 'white',
          padding: '1rem 2rem',
          borderRadius: '8px',
          fontWeight: 'bold',
          zIndex: 1000,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
        }}>
          ✅ Coupon code copied to clipboard!
        </div>
      )}
    </div>
  );
};

export default DealDetailPage;