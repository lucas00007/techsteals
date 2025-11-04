import React from 'react';

const PrivacyPage = () => {
  return (
    <div style={{ background: '#f9fafb', minHeight: '100vh', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', background: 'white', borderRadius: '12px', padding: '3rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem', color: '#111827' }}>
          Privacy Policy
        </h1>
        
        <div style={{ lineHeight: '1.6', color: '#374151' }}>
          <p style={{ marginBottom: '1.5rem' }}>
            <strong>Last updated:</strong> {new Date().toLocaleDateString()}
          </p>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '2rem', marginBottom: '1rem' }}>
            Information We Collect
          </h2>
          <p style={{ marginBottom: '1.5rem' }}>
            We collect information you provide directly to us, such as when you subscribe to our newsletter or contact us.
          </p>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '2rem', marginBottom: '1rem' }}>
            How We Use Your Information
          </h2>
          <p style={{ marginBottom: '1.5rem' }}>
            We use the information we collect to provide, maintain, and improve our services, including sending you deal notifications if you've subscribed.
          </p>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '2rem', marginBottom: '1rem' }}>
            Amazon Associates Disclosure
          </h2>
          <p style={{ marginBottom: '1.5rem', padding: '1rem', background: '#f3f4f6', borderRadius: '8px' }}>
            <strong>As an Amazon Associate I earn from qualifying purchases.</strong> This means that when you click on certain links on this site and make a purchase, we may receive a small commission at no additional cost to you.
          </p>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '2rem', marginBottom: '1rem' }}>
            Cookies and Tracking
          </h2>
          <p style={{ marginBottom: '1.5rem' }}>
            We use cookies and similar tracking technologies to track activity on our service and hold certain information to improve your experience.
          </p>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '2rem', marginBottom: '1rem' }}>
            Third-Party Services
          </h2>
          <p style={{ marginBottom: '1.5rem' }}>
            Our service may contain links to third-party websites or services, including Amazon.com. We are not responsible for the privacy practices of these third parties.
          </p>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '2rem', marginBottom: '1rem' }}>
            Contact Us
          </h2>
          <p style={{ marginBottom: '1.5rem' }}>
            If you have any questions about this Privacy Policy, please contact us at privacy@techsteals.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;