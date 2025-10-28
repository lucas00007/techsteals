import React from 'react';

const AboutPage = () => {
  return (
    <div style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '3rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '2rem' }}>
        About TechSteals
      </h1>
      
      <div style={{ fontSize: '1.125rem', lineHeight: '1.8', color: '#374151' }}>
        <p style={{ marginBottom: '2rem' }}>
          Welcome to TechSteals, your ultimate destination for the best deals on tech accessories. 
          We're passionate about helping you save money while getting the quality tech products you need.
        </p>
        
        <p style={{ marginBottom: '2rem' }}>
          Our team scours the internet daily to find the most incredible discounts on chargers, cables, 
          cases, power banks, headphones, and more. We believe everyone deserves access to affordable, 
          high-quality tech accessories.
        </p>
        
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', marginTop: '3rem' }}>
          What We Do
        </h2>
        
        <ul style={{ marginBottom: '2rem', paddingLeft: '2rem' }}>
          <li style={{ marginBottom: '0.5rem' }}>Find and verify the best tech accessory deals</li>
          <li style={{ marginBottom: '0.5rem' }}>Provide detailed product information and reviews</li>
          <li style={{ marginBottom: '0.5rem' }}>Offer exclusive coupon codes and discounts</li>
          <li style={{ marginBottom: '0.5rem' }}>Keep you updated with daily deal alerts</li>
        </ul>
        
        <p>
          Join thousands of smart shoppers who trust TechSteals to help them save money on their 
          favorite tech accessories. Start exploring our deals today!
        </p>
      </div>
    </div>
  );
};

export default AboutPage;