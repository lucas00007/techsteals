const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage (use database in production)
let deals = [];
let subscribers = [];

// Routes
app.get('/api/deals', (req, res) => {
  const { category, search, sort } = req.query;
  
  let filteredDeals = [...deals];
  
  // Filter by category
  if (category) {
    filteredDeals = filteredDeals.filter(deal => 
      deal.category.toLowerCase() === category.toLowerCase()
    );
  }
  
  // Search filter
  if (search) {
    filteredDeals = filteredDeals.filter(deal =>
      deal.title.toLowerCase().includes(search.toLowerCase()) ||
      deal.store.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  // Sort deals
  if (sort === 'price-low') {
    filteredDeals.sort((a, b) => a.currentPrice - b.currentPrice);
  } else if (sort === 'price-high') {
    filteredDeals.sort((a, b) => b.currentPrice - a.currentPrice);
  } else {
    filteredDeals.sort((a, b) => b.discount - a.discount);
  }
  
  res.json(filteredDeals);
});

app.get('/api/deals/:id', (req, res) => {
  const deal = deals.find(d => d.id === parseInt(req.params.id));
  if (!deal) {
    return res.status(404).json({ error: 'Deal not found' });
  }
  res.json(deal);
});

app.post('/api/deals', (req, res) => {
  deals = req.body;
  console.log(`Updated ${deals.length} deals at ${new Date().toISOString()}`);
  res.json({ 
    success: true, 
    count: deals.length,
    timestamp: new Date().toISOString()
  });
});

app.post('/api/newsletter/subscribe', (req, res) => {
  const { email } = req.body;
  
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email required' });
  }
  
  if (!subscribers.includes(email)) {
    subscribers.push(email);
    console.log(`New subscriber: ${email}`);
  }
  
  res.json({ success: true, message: 'Subscribed successfully' });
});

app.get('/api/stats', (req, res) => {
  const stats = {
    totalDeals: deals.length,
    subscribers: subscribers.length,
    categories: [...new Set(deals.map(d => d.category))],
    stores: [...new Set(deals.map(d => d.store))],
    averageDiscount: deals.length > 0 
      ? Math.round(deals.reduce((sum, d) => sum + d.discount, 0) / deals.length)
      : 0,
    lastUpdated: deals.length > 0 ? new Date().toISOString() : null
  };
  res.json(stats);
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    deals: deals.length
  });
});

app.listen(PORT, () => {
  console.log(`TechSteals API server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});