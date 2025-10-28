# n8n Integration Guide for TechSteals

## Overview
This guide explains how to connect your TechSteals website to n8n workflows for live data extraction and automation.

## API Endpoints Expected by Frontend

### 1. Deals API
- **GET** `/api/deals` - Fetch all deals
- **GET** `/api/deals/:id` - Fetch specific deal
- **GET** `/api/deals?category=:category` - Filter by category
- **GET** `/api/deals/search?q=:query` - Search deals

### 2. Newsletter API
- **POST** `/api/newsletter/subscribe` - Subscribe to newsletter

## n8n Workflow Setup

### 1. Deal Scraping Workflow
Create workflows to scrape deals from:
- Amazon
- Best Buy
- Walmart
- Target
- Other tech retailers

**Workflow Structure:**
1. **HTTP Request Node** - Scrape product pages
2. **HTML Extract Node** - Extract product data
3. **Function Node** - Transform data to match schema
4. **HTTP Request Node** - POST to your API

### 2. Data Schema
Ensure scraped data matches this format:
```json
{
  "id": 1,
  "title": "Product Name",
  "description": "Product description",
  "originalPrice": 99.99,
  "currentPrice": 49.99,
  "discount": 50,
  "store": "Amazon",
  "category": "Chargers",
  "image": "https://example.com/image.jpg",
  "link": "https://affiliate-link.com",
  "rating": 4.5,
  "couponCode": "SAVE50"
}
```

### 3. Automation Workflows
- **Price Monitoring** - Check for price changes
- **New Deal Alerts** - Notify when new deals are found
- **Newsletter Automation** - Send daily deal emails
- **Analytics Tracking** - Track user interactions

## Environment Setup

1. Copy `.env.example` to `.env`
2. Update with your n8n webhook URLs:
```env
REACT_APP_API_URL=https://your-api-server.com/api
REACT_APP_N8N_DEALS_WEBHOOK=https://your-n8n.com/webhook/deals
REACT_APP_N8N_NEWSLETTER_WEBHOOK=https://your-n8n.com/webhook/newsletter
```

## Backend API Server
You'll need a simple Express.js server to handle API requests:

```javascript
// server.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Store deals in memory or database
let deals = [];

app.get('/api/deals', (req, res) => {
  res.json(deals);
});

app.post('/api/deals', (req, res) => {
  deals = req.body; // Update from n8n
  res.json({ success: true });
});

app.listen(3001);
```

## Deployment
1. Deploy your React app to Vercel/Netlify
2. Deploy API server to Railway/Heroku
3. Set up n8n workflows
4. Configure webhooks and cron jobs

## Testing
- Use mock data fallback when API is unavailable
- Test with sample n8n workflows
- Monitor API response times
- Set up error handling and logging