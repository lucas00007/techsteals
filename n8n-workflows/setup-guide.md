# n8n Deal Scraping Setup Guide

## Quick Setup (5 minutes)

### 1. Install n8n
```bash
npm install -g n8n
# or
npx n8n
```

### 2. Import Workflow
1. Open n8n at `http://localhost:5678`
2. Click "Import from file"
3. Upload `deal-scraper-workflow.json`

### 3. Configure Nodes

#### Cron Trigger
- Set to run every 6 hours
- Or manually trigger for testing

#### HTTP Request (Scraper)
- URL: Target retailer search pages
- Headers: Add User-Agent to avoid blocking
- Method: GET

#### Code Node (Parser)
- Extract product data from HTML
- Transform to match your schema
- Filter out invalid deals

#### HTTP Request (API Update)
- URL: Your backend API endpoint
- Method: POST
- Body: JSON array of deals

### 4. Backend API Server

Create simple Express server:

```javascript
// server.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let deals = [];

app.get('/api/deals', (req, res) => {
  res.json(deals);
});

app.post('/api/deals', (req, res) => {
  deals = req.body;
  console.log(`Updated ${deals.length} deals`);
  res.json({ success: true, count: deals.length });
});

app.listen(3001, () => {
  console.log('API server running on port 3001');
});
```

### 5. Deploy API Server

**Option A: Railway**
```bash
npm init -y
npm install express cors
# Push to GitHub
# Connect to Railway
```

**Option B: Heroku**
```bash
heroku create your-api-name
git push heroku main
```

### 6. Update React App

Update your API service:

```javascript
// src/services/api.js
const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export const fetchDeals = async () => {
  try {
    const response = await fetch(`${API_BASE}/deals`);
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    return mockDeals; // Fallback to mock data
  }
};
```

## Advanced Features

### Price Monitoring
- Track price changes
- Send alerts for big drops
- Update deal status

### Multiple Sources
- Amazon, Best Buy, Walmart
- Deal aggregator sites
- RSS feeds

### Data Quality
- Duplicate detection
- Price validation
- Image optimization

### Notifications
- Slack/Discord alerts
- Email notifications
- Push notifications

## Testing

1. **Manual Trigger**: Test workflow manually first
2. **Mock Data**: Use sample data for initial testing
3. **Error Handling**: Add try/catch blocks
4. **Logging**: Monitor workflow execution

## Troubleshooting

**Common Issues:**
- Rate limiting: Add delays between requests
- Blocked requests: Rotate User-Agents
- Data parsing: Check HTML structure changes
- API errors: Implement retry logic

**Monitoring:**
- Check n8n execution logs
- Monitor API response times
- Track deal count changes
- Set up error alerts