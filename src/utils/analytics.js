class Analytics {
  constructor() {
    this.isEnabled = process.env.REACT_APP_ANALYTICS_ENABLED === 'true';
    this.gaId = process.env.REACT_APP_GA_ID;
    this.init();
  }

  init() {
    if (!this.isEnabled || !this.gaId) return;

    // Load Google Analytics
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${this.gaId}`;
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.textContent = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${this.gaId}');
    `;
    document.head.appendChild(script2);
  }

  // Track page views
  trackPageView(path, title) {
    if (!this.isEnabled) return;
    
    if (window.gtag) {
      window.gtag('config', this.gaId, {
        page_path: path,
        page_title: title
      });
    }

    // Also track internally
    this.trackEvent('page_view', {
      page_path: path,
      page_title: title,
      timestamp: new Date().toISOString()
    });
  }

  // Track deal clicks
  trackDealClick(deal) {
    this.trackEvent('deal_click', {
      deal_id: deal.id,
      deal_title: deal.title,
      deal_store: deal.store,
      deal_discount: deal.discount,
      deal_price: deal.currentPrice
    });
  }

  // Track search queries
  trackSearch(query, results_count) {
    this.trackEvent('search', {
      search_term: query,
      results_count: results_count
    });
  }

  // Track favorites
  trackFavoriteToggle(deal, action) {
    this.trackEvent('favorite_toggle', {
      deal_id: deal.id,
      deal_title: deal.title,
      action: action // 'add' or 'remove'
    });
  }

  // Track newsletter signup
  trackNewsletterSignup(email) {
    this.trackEvent('newsletter_signup', {
      email_domain: email.split('@')[1]
    });
  }

  // Generic event tracking
  trackEvent(eventName, properties = {}) {
    if (!this.isEnabled) return;

    // Google Analytics
    if (window.gtag) {
      window.gtag('event', eventName, properties);
    }

    // Store locally for internal analytics
    const events = JSON.parse(localStorage.getItem('techsteals_analytics') || '[]');
    events.push({
      event: eventName,
      properties: properties,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent
    });

    // Keep only last 100 events
    if (events.length > 100) {
      events.splice(0, events.length - 100);
    }

    localStorage.setItem('techsteals_analytics', JSON.stringify(events));

    // Send to your analytics endpoint if available
    if (process.env.REACT_APP_ANALYTICS_ENDPOINT) {
      fetch(process.env.REACT_APP_ANALYTICS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: eventName,
          properties: properties,
          timestamp: new Date().toISOString()
        })
      }).catch(() => {}); // Fail silently
    }
  }

  // Get analytics data
  getAnalyticsData() {
    return JSON.parse(localStorage.getItem('techsteals_analytics') || '[]');
  }
}

const analytics = new Analytics();
export default analytics;