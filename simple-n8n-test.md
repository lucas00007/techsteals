# Simple n8n Test Without Complex Setup

## Skip the Complex Workflow - Use This Instead:

### 1. **Create Simple Webhook Workflow in n8n:**
1. **Webhook Trigger** node
2. **Code** node with this script:
```javascript
// Generate test deals
const deals = [];
for (let i = 1; i <= 10; i++) {
  deals.push({
    id: Date.now() + i,
    title: `Deal ${i}: USB-C Fast Charger`,
    originalPrice: 29.99 + (i * 2),
    currentPrice: 19.99 + i,
    salePrice: 19.99 + i,
    discount: Math.floor(((29.99 + (i * 2)) - (19.99 + i)) / (29.99 + (i * 2)) * 100),
    store: i % 2 === 0 ? 'Amazon' : 'Best Buy',
    category: 'Chargers',
    imageUrl: 'https://images.unsplash.com/photo-1609592806596-4d8b5b3c8f5e?w=400',
    image: 'https://images.unsplash.com/photo-1609592806596-4d8b5b3c8f5e?w=400',
    link: `https://example.com/deal-${i}`,
    affiliateLink: `https://example.com/deal-${i}`,
    rating: 4.0 + (Math.random() * 1),
    couponCode: i % 3 === 0 ? `SAVE${10 + i}` : null,
    expiresAt: i % 4 === 0 ? new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() : null
  });
}

return [{ json: deals }];
```

### 2. **Test the Webhook:**
- Copy webhook URL from n8n
- Test in browser or Postman
- Should return JSON array of deals

### 3. **Update Your React App:**
Add this function to trigger deal updates:
```javascript
// In your component
const updateDeals = async () => {
  try {
    const response = await fetch('YOUR_N8N_WEBHOOK_URL');
    const newDeals = await response.json();
    // Update your deals state
  } catch (error) {
    console.log('Webhook failed, using mock data');
  }
};
```

### 4. **Alternative: Manual API Update**
Instead of n8n, create a simple endpoint:
```javascript
// Add to your server.js
app.post('/api/generate-deals', (req, res) => {
  const newDeals = generateMockDeals(); // Your generation logic
  deals = newDeals;
  res.json({ success: true, count: deals.length });
});
```

This avoids the n8n complexity while still testing the API integration!