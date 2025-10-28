export const formatPrice = (price) => {
  if (typeof price !== 'number' || isNaN(price)) return '$0.00';
  return `$${price.toFixed(2)}`;
};

export const calculateDiscount = (originalPrice, salePrice) => {
  if (!originalPrice || !salePrice || originalPrice <= salePrice) return 0;
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
};

export const formatDate = (dateString) => {
  try {
    const date = new Date(dateString);
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return `Expires ${date.toLocaleDateString('en-US', options)}`;
  } catch (error) {
    return 'Expires soon';
  }
};

export const isExpired = (dateString) => {
  try {
    const expiryDate = new Date(dateString);
    const today = new Date();
    return expiryDate < today;
  } catch (error) {
    return false;
  }
};

export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};
