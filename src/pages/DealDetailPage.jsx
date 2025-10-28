import React from 'react';
import { useParams } from 'react-router-dom';

const DealDetailPage = () => {
  const { id } = useParams();
  
  return (
    <div>
      <h1 style={{ textAlign: 'center', padding: '40px' }}>Deal Detail - ID: {id}</h1>
    </div>
  );
};

export default DealDetailPage;
