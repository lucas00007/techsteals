// Amazon Associates Configuration
const ASSOCIATE_ID = process.env.REACT_APP_AMAZON_ASSOCIATE_ID || 'techsteals-20';

// Generate Amazon affiliate link
export const generateAmazonLink = (productUrl, associateId = ASSOCIATE_ID) => {
  try {
    const url = new URL(productUrl);
    
    // Extract ASIN from Amazon URL
    const asinMatch = productUrl.match(/\/dp\/([A-Z0-9]{10})/i) || 
                     productUrl.match(/\/gp\/product\/([A-Z0-9]{10})/i);
    
    if (asinMatch) {
      const asin = asinMatch[1];
      return `https://amazon.com/dp/${asin}/?tag=${associateId}`;
    }
    
    // Fallback: add tag parameter to existing URL
    url.searchParams.set('tag', associateId);
    return url.toString();
  } catch (error) {
    console.error('Error generating affiliate link:', error);
    return productUrl; // Return original URL if error
  }
};

// Generate affiliate links for different stores
export const generateAffiliateLink = (originalUrl, store) => {
  switch (store.toLowerCase()) {
    case 'amazon':
      return generateAmazonLink(originalUrl);
    
    case 'best buy':
      // Best Buy affiliate program (if you join)
      return originalUrl; // Add Best Buy affiliate ID when available
    
    case 'walmart':
      // Walmart affiliate program (if you join)
      return originalUrl; // Add Walmart affiliate ID when available
    
    case 'target':
      // Target affiliate program (if you join)
      return originalUrl; // Add Target affiliate ID when available
    
    default:
      return originalUrl;
  }
};

// Track affiliate link clicks (for analytics)
export const trackAffiliateClick = (dealId, store, price) => {
  // Add analytics tracking here
  console.log(`Affiliate click: Deal ${dealId}, Store: ${store}, Price: $${price}`);
  
  // Example: Send to Google Analytics
  if (window.gtag) {
    window.gtag('event', 'affiliate_click', {
      deal_id: dealId,
      store: store,
      value: price,
      currency: 'USD'
    });
  }
};

// Real Amazon product examples with affiliate links
export const sampleAmazonProducts = [
  {
    id: 'amz-1',
    title: 'Anker PowerCore 10000 Portable Charger',
    originalPrice: 29.99,
    currentPrice: 19.99,
    discount: 33,
    store: 'Amazon',
    category: 'Power Banks',
    asin: 'B07QXV6N1B',
    affiliateLink: generateAmazonLink('https://amazon.com/dp/B07QXV6N1B/')
  },
  {
    id: 'amz-2', 
    title: 'USB C to Lightning Cable [Apple MFi Certified]',
    originalPrice: 24.99,
    currentPrice: 12.99,
    discount: 48,
    store: 'Amazon',
    category: 'Cables',
    asin: 'B08R68T84N',
    affiliateLink: generateAmazonLink('https://amazon.com/dp/B08R68T84N/')
  }
];

export default {
  generateAmazonLink,
  generateAffiliateLink,
  trackAffiliateClick,
  sampleAmazonProducts
};