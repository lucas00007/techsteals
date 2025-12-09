import { useState, useEffect } from 'react';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('techsteals_favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const addToFavorites = (deal) => {
    const newFavorites = [...favorites, deal.id];
    setFavorites(newFavorites);
    localStorage.setItem('techsteals_favorites', JSON.stringify(newFavorites));
  };

  const removeFromFavorites = (dealId) => {
    const newFavorites = favorites.filter(id => id !== dealId);
    setFavorites(newFavorites);
    localStorage.setItem('techsteals_favorites', JSON.stringify(newFavorites));
  };

  const toggleFavorite = (deal) => {
    if (isFavorite(deal.id)) {
      removeFromFavorites(deal.id);
      return false;
    } else {
      addToFavorites(deal);
      return true;
    }
  };

  const isFavorite = (dealId) => {
    return favorites.includes(dealId);
  };

  const getFavoriteDeals = (allDeals) => {
    return allDeals.filter(deal => favorites.includes(deal.id));
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    getFavoriteDeals
  };
};