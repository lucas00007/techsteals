import React, { useState, useEffect } from 'react';
import DealGrid from '../components/deals/DealGrid';
import mockDeals from '../data/mockDeals';

const DealsPage = () => {
  const [filteredDeals, setFilteredDeals] = useState(mockDeals);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('discount');
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState('all');
  const [minDiscount, setMinDiscount] = useState(0);
  const [selectedStores, setSelectedStores] = useState([]);
  const [dealStatus, setDealStatus] = useState('all');

  const categories = ['Chargers', 'Cables', 'Cases', 'Power Banks', 'Headphones', 'Accessories'];
  const stores = ['Amazon', 'Best Buy', 'Walmart', 'Target'];
  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: '0-10', label: 'Under $10' },
    { value: '10-25', label: '$10 - $25' },
    { value: '25-50', label: '$25 - $50' },
    { value: '50-100', label: '$50 - $100' },
    { value: '100+', label: 'Over $100' }
  ];

  const sortOptions = [
    { value: 'discount', label: 'Highest Discount' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest First' }
  ];

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...mockDeals];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(deal =>
        deal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deal.store.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deal.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(deal => selectedCategories.includes(deal.category));
    }

    // Price range filter
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(p => p === '+' ? Infinity : parseInt(p));
      filtered = filtered.filter(deal => {
        const price = deal.salePrice;
        return max ? price >= min && price <= max : price >= min;
      });
    }

    // Discount filter
    if (minDiscount > 0) {
      filtered = filtered.filter(deal => deal.discount >= minDiscount);
    }

    // Store filter
    if (selectedStores.length > 0) {
      filtered = filtered.filter(deal => selectedStores.includes(deal.store));
    }

    // Deal status filter
    if (dealStatus === 'ending-soon') {
      filtered = filtered.filter(deal => {
        if (!deal.expiresAt) return false;
        const hoursLeft = Math.ceil((new Date(deal.expiresAt) - new Date()) / (1000 * 60 * 60));
        return hoursLeft <= 24;
      });
    } else if (dealStatus === 'hot-deals') {
      filtered = filtered.filter(deal => deal.discount >= 50);
    }

    // Sort deals
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'discount':
          return b.discount - a.discount;
        case 'price-low':
          return a.salePrice - b.salePrice;
        case 'price-high':
          return b.salePrice - a.salePrice;
        case 'newest':
          return new Date(b.expiresAt || 0) - new Date(a.expiresAt || 0);
        default:
          return 0;
      }
    });

    setFilteredDeals(filtered);
  }, [searchQuery, selectedCategories, priceRange, minDiscount, selectedStores, dealStatus, sortBy]);

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setPriceRange('all');
    setMinDiscount(0);
    setSelectedStores([]);
    setDealStatus('all');
    setSearchQuery('');
  };

  const activeFiltersCount = selectedCategories.length + 
    (priceRange !== 'all' ? 1 : 0) + 
    (minDiscount > 0 ? 1 : 0) + 
    selectedStores.length + 
    (dealStatus !== 'all' ? 1 : 0);

  const isMobile = window.innerWidth < 768;

  const FilterSidebar = () => (
    <div style={{
      width: isMobile ? '100%' : '280px',
      background: 'white',
      borderRadius: '12px',
      padding: '1.5rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      height: 'fit-content',
      position: isMobile ? 'fixed' : 'sticky',
      top: isMobile ? 0 : '80px',
      left: isMobile ? 0 : 'auto',
      right: isMobile ? 0 : 'auto',
      zIndex: isMobile ? 1000 : 'auto',
      maxHeight: isMobile ? '100vh' : 'calc(100vh - 100px)',
      overflowY: 'auto'
    }}>
      {isMobile && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          paddingBottom: '1rem',
          borderBottom: '1px solid #e5e7eb'
        }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Filters</h3>
          <button
            onClick={() => setShowFilters(false)}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer'
            }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Categories */}
      <div style={{ marginBottom: '2rem' }}>
        <h4 style={{ fontWeight: 'bold', marginBottom: '1rem' }}>Categories</h4>
        {categories.map(category => (
          <label key={category} style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '0.5rem',
            cursor: 'pointer'
          }}>
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedCategories([...selectedCategories, category]);
                } else {
                  setSelectedCategories(selectedCategories.filter(c => c !== category));
                }
              }}
              style={{ marginRight: '0.5rem' }}
            />
            <span>{category}</span>
            <span style={{ marginLeft: 'auto', color: '#6b7280', fontSize: '0.875rem' }}>
              ({mockDeals.filter(d => d.category === category).length})
            </span>
          </label>
        ))}
      </div>

      {/* Price Range */}
      <div style={{ marginBottom: '2rem' }}>
        <h4 style={{ fontWeight: 'bold', marginBottom: '1rem' }}>Price Range</h4>
        {priceRanges.map(range => (
          <label key={range.value} style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '0.5rem',
            cursor: 'pointer'
          }}>
            <input
              type="radio"
              name="priceRange"
              value={range.value}
              checked={priceRange === range.value}
              onChange={(e) => setPriceRange(e.target.value)}
              style={{ marginRight: '0.5rem' }}
            />
            <span>{range.label}</span>
          </label>
        ))}
      </div>

      {/* Discount */}
      <div style={{ marginBottom: '2rem' }}>
        <h4 style={{ fontWeight: 'bold', marginBottom: '1rem' }}>
          Minimum Discount: {minDiscount}%
        </h4>
        <input
          type="range"
          min="0"
          max="70"
          value={minDiscount}
          onChange={(e) => setMinDiscount(parseInt(e.target.value))}
          style={{
            width: '100%',
            background: 'linear-gradient(to right, #2563eb, #7c3aed)',
            borderRadius: '4px'
          }}
        />
      </div>

      {/* Stores */}
      <div style={{ marginBottom: '2rem' }}>
        <h4 style={{ fontWeight: 'bold', marginBottom: '1rem' }}>Stores</h4>
        {stores.map(store => (
          <label key={store} style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '0.5rem',
            cursor: 'pointer'
          }}>
            <input
              type="checkbox"
              checked={selectedStores.includes(store)}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedStores([...selectedStores, store]);
                } else {
                  setSelectedStores(selectedStores.filter(s => s !== store));
                }
              }}
              style={{ marginRight: '0.5rem' }}
            />
            <span>{store}</span>
          </label>
        ))}
      </div>

      {/* Deal Status */}
      <div style={{ marginBottom: '2rem' }}>
        <h4 style={{ fontWeight: 'bold', marginBottom: '1rem' }}>Deal Status</h4>
        {[
          { value: 'all', label: 'All Deals' },
          { value: 'ending-soon', label: 'Ending Soon (< 24h)' },
          { value: 'hot-deals', label: 'Hot Deals (50%+ off)' }
        ].map(status => (
          <label key={status.value} style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '0.5rem',
            cursor: 'pointer'
          }}>
            <input
              type="radio"
              name="dealStatus"
              value={status.value}
              checked={dealStatus === status.value}
              onChange={(e) => setDealStatus(e.target.value)}
              style={{ marginRight: '0.5rem' }}
            />
            <span>{status.label}</span>
          </label>
        ))}
      </div>

      {/* Clear Filters */}
      <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1rem' }}>
        {activeFiltersCount > 0 && (
          <div style={{
            background: 'linear-gradient(to right, #2563eb, #7c3aed)',
            color: 'white',
            borderRadius: '9999px',
            padding: '0.25rem 0.75rem',
            fontSize: '0.875rem',
            fontWeight: 'bold',
            display: 'inline-block',
            marginBottom: '1rem'
          }}>
            {activeFiltersCount} active filters
          </div>
        )}
        <button
          onClick={clearAllFilters}
          style={{
            width: '100%',
            background: 'linear-gradient(to right, #2563eb, #7c3aed)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '0.75rem',
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
          Clear All Filters
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ background: '#f9fafb', minHeight: '100vh' }}>
          {/* Page Header */}
          <div style={{
            background: 'white',
            padding: '2rem',
            borderBottom: '1px solid #e5e7eb'
          }}>
            <div style={{
              maxWidth: '1400px',
              margin: '0 auto',
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              justifyContent: 'space-between',
              alignItems: isMobile ? 'stretch' : 'center',
              gap: '1rem'
            }}>
              <div>
                <h1 style={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  color: '#111827',
                  marginBottom: '0.5rem'
                }}>
                  All Deals
                </h1>
                <p style={{ color: '#6b7280' }}>
                  Discover amazing tech accessory deals from top retailers
                </p>
              </div>

              <div style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                gap: '1rem',
                alignItems: 'stretch'
              }}>
                {/* Search Bar */}
                <div style={{ position: 'relative', minWidth: isMobile ? 'auto' : '300px' }}>
                  <input
                    type="text"
                    placeholder="Search deals..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem 3rem 0.75rem 1rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '1rem'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#6b7280'
                  }}>
                    🔍
                  </div>
                </div>

                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    minWidth: '180px'
                  }}
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                {/* Mobile Filter Button */}
                {isMobile && (
                  <button
                    onClick={() => setShowFilters(true)}
                    style={{
                      background: 'linear-gradient(to right, #2563eb, #7c3aed)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '0.75rem 1rem',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      position: 'relative'
                    }}
                  >
                    Filters
                    {activeFiltersCount > 0 && (
                      <span style={{
                        position: 'absolute',
                        top: '-8px',
                        right: '-8px',
                        background: '#ef4444',
                        color: 'white',
                        borderRadius: '50%',
                        width: '20px',
                        height: '20px',
                        fontSize: '0.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {activeFiltersCount}
                      </span>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '2rem',
            display: 'flex',
            gap: '2rem',
            alignItems: 'flex-start'
          }}>
            {/* Desktop Filter Sidebar */}
            {!isMobile && <FilterSidebar />}

            {/* Mobile Filter Overlay */}
            {isMobile && showFilters && (
              <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.5)',
                zIndex: 999
              }}>
                <FilterSidebar />
              </div>
            )}

            {/* Deals Grid */}
            <div style={{ flex: 1 }}>
              <DealGrid deals={filteredDeals} />
            </div>
          </div>
    </div>
  );
};

export default DealsPage;