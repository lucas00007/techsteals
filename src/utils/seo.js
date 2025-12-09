export const updatePageMeta = (title, description, keywords = '', image = '') => {
  // Update title
  document.title = title ? `${title} | TechSteals` : 'TechSteals - Best Tech Accessory Deals';

  // Update or create meta tags
  const updateMetaTag = (name, content, property = false) => {
    const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
    let meta = document.querySelector(selector);
    
    if (!meta) {
      meta = document.createElement('meta');
      if (property) {
        meta.setAttribute('property', name);
      } else {
        meta.setAttribute('name', name);
      }
      document.head.appendChild(meta);
    }
    
    meta.setAttribute('content', content);
  };

  // Basic meta tags
  updateMetaTag('description', description || 'Find the best deals on tech accessories. Save big on chargers, cables, cases, power banks, headphones and more.');
  updateMetaTag('keywords', keywords || 'tech deals, accessories, chargers, cables, cases, power banks, headphones, discounts');

  // Open Graph tags
  updateMetaTag('og:title', title || 'TechSteals - Best Tech Accessory Deals', true);
  updateMetaTag('og:description', description || 'Find the best deals on tech accessories. Save big on chargers, cables, cases, power banks, headphones and more.', true);
  updateMetaTag('og:type', 'website', true);
  updateMetaTag('og:url', window.location.href, true);
  
  if (image) {
    updateMetaTag('og:image', image, true);
  }

  // Twitter Card tags
  updateMetaTag('twitter:card', 'summary_large_image');
  updateMetaTag('twitter:title', title || 'TechSteals - Best Tech Accessory Deals');
  updateMetaTag('twitter:description', description || 'Find the best deals on tech accessories. Save big on chargers, cables, cases, power banks, headphones and more.');
  
  if (image) {
    updateMetaTag('twitter:image', image);
  }
};

export const generateStructuredData = (type, data) => {
  const baseData = {
    '@context': 'https://schema.org',
    '@type': type
  };

  let structuredData = { ...baseData, ...data };

  // Remove existing structured data
  const existingScript = document.querySelector('script[type="application/ld+json"]');
  if (existingScript) {
    existingScript.remove();
  }

  // Add new structured data
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(structuredData);
  document.head.appendChild(script);
};