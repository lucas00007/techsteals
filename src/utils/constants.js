export const CATEGORIES = [
  { id: 'all', name: 'All Deals', slug: 'all' },
  { id: 'chargers', name: 'Chargers', slug: 'chargers' },
  { id: 'cables', name: 'Cables', slug: 'cables' },
  { id: 'cases', name: 'Cases', slug: 'cases' },
  { id: 'powerbanks', name: 'Power Banks', slug: 'powerbanks' },
  { id: 'headphones', name: 'Headphones', slug: 'headphones' }
];

export const STORES = [
  { id: 'amazon', name: 'Amazon' },
  { id: 'bestbuy', name: 'Best Buy' },
  { id: 'walmart', name: 'Walmart' }
];

export const PRICE_RANGES = [
  { id: 'all', label: 'All Prices', min: 0, max: Infinity },
  { id: 'under10', label: 'Under $10', min: 0, max: 10 },
  { id: '10to25', label: '$10 - $25', min: 10, max: 25 },
  { id: '25to50', label: '$25 - $50', min: 25, max: 50 },
  { id: 'over50', label: 'Over $50', min: 50, max: Infinity }
];

export const DISCOUNT_RANGES = [
  { id: 'all', label: 'All Discounts', min: 0 },
  { id: '20plus', label: '20% or more', min: 20 },
  { id: '30plus', label: '30% or more', min: 30 },
  { id: '40plus', label: '40% or more', min: 40 }
];
