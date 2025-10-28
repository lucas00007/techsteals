import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import DealGrid from '../components/deals/DealGrid';
import mockDeals from '../data/mockDeals';

const DealsPage = () => {
  const [searchParams] = useSearchParams();
  const [filteredDeals, setFilteredDeals] = useState(mockDeals);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [sortBy, setSortBy] = useState('discount');

  const categories = ['all', 'chargers', 'cables', 'cases', 'power banks', 'headphones', 'accessories'];

  useEffect(() => {
    // Update state from URL params
    const urlSearch = searchParams.get('search') || '';
    const urlCategory = searchParams.get('category') || 'all';
    
    if (urlSearch !== searchQuery) setSearchQuery(urlSearch);
    if (urlCategory !== selectedCategory) setSelectedCategory(urlCategory);
  }, [searchParams, searchQuery, selectedCategory]);

  useEffect(() => {
    let deals = [...mockDeals];

    // Filter by category
    if (selectedCategory !== 'all') {
      deals = deals.filter(deal => 
        deal.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by search query
    if (searchQuery) {
      deals = deals.filter(deal =>
        deal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deal.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deal.store.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort deals
    deals.sort((a, b) => {
      switch (sortBy) {
        case 'discount':
          return b.discount - a.discount;
        case 'price':
          return a.currentPrice - b.currentPrice;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    setFilteredDeals(deals);
  }, [selectedCategory, searchQuery, sortBy]);

  const isMobile = window.innerWidth < 768;

  return (
    <div style={{ padding: '2rem' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          All Deals
        </h1>
        <p style={{ color: '#6b7280', fontSize: '1.125rem' }}>
          {filteredDeals.length} amazing deals found
        </p>
      </div>

      {/* Filters */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '2rem',
        marginBottom: '3rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        {/* Search */}
        <div style={{ marginBottom: '2rem' }}>
          <input
            type="text"
            placeholder="Search deals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '1rem',
              borderRadius: '8px',
              border: '1px solid #d1d5db',
              fontSize: '1rem'
            }}
          />
        </div>

        {/* Category and Sort Filters */}
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: '1rem',
          alignItems: isMobile ? 'stretch' : 'center'
        }}>
          {/* Categories */}
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Category:
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                fontSize: '1rem'
              }}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Sort by:
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                fontSize: '1rem'
              }}
            >
              <option value="discount">Highest Discount</option>
              <option value="price">Lowest Price</option>
              <option value="rating">Highest Rating</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      {filteredDeals.length > 0 ? (
        <DealGrid deals={filteredDeals} />
      ) : (
        <div style={{
          textAlign: 'center',
          padding: '4rem 2rem',
          color: '#6b7280'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>No deals found</h3>
          <p>Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default DealsPage;
