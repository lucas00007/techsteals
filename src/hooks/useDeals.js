import { useState, useEffect } from 'react';
import ApiService from '../services/api';
import mockDeals from '../data/mockDeals';

export const useDeals = () => {
  const [deals, setDeals] = useState(mockDeals);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDeals = async () => {
    setLoading(true);
    setError(null);
    try {
      const liveDeals = await ApiService.fetchDeals();
      if (liveDeals.length > 0) {
        setDeals(liveDeals);
      }
    } catch (err) {
      setError(err.message);
      console.log('Using mock data as fallback');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeals();
  }, []);

  return { deals, loading, error, refetch: fetchDeals };
};

export const useDeal = (id) => {
  const [deal, setDeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDeal = async () => {
      setLoading(true);
      setError(null);
      try {
        const liveDeal = await ApiService.fetchDealById(id);
        if (liveDeal) {
          setDeal(liveDeal);
        } else {
          // Fallback to mock data
          const mockDeal = mockDeals.find(d => d.id === parseInt(id));
          setDeal(mockDeal || null);
        }
      } catch (err) {
        setError(err.message);
        const mockDeal = mockDeals.find(d => d.id === parseInt(id));
        setDeal(mockDeal || null);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchDeal();
  }, [id]);

  return { deal, loading, error };
};