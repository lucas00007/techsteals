const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

class ApiService {
  async fetchDeals() {
    try {
      const response = await fetch(`${API_BASE_URL}/deals`);
      if (!response.ok) throw new Error('Failed to fetch deals');
      return await response.json();
    } catch (error) {
      console.error('Error fetching deals:', error);
      return [];
    }
  }

  async fetchDealById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/deals/${id}`);
      if (!response.ok) throw new Error('Deal not found');
      return await response.json();
    } catch (error) {
      console.error('Error fetching deal:', error);
      return null;
    }
  }

  async fetchDealsByCategory(category) {
    try {
      const response = await fetch(`${API_BASE_URL}/deals?category=${encodeURIComponent(category)}`);
      if (!response.ok) throw new Error('Failed to fetch deals');
      return await response.json();
    } catch (error) {
      console.error('Error fetching deals by category:', error);
      return [];
    }
  }

  async searchDeals(query) {
    try {
      const response = await fetch(`${API_BASE_URL}/deals/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error('Search failed');
      return await response.json();
    } catch (error) {
      console.error('Error searching deals:', error);
      return [];
    }
  }

  async subscribeToNewsletter(email) {
    try {
      const response = await fetch(`${API_BASE_URL}/newsletter/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      return response.ok;
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      return false;
    }
  }
}

export default new ApiService();