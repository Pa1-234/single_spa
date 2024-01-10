import React from 'react';

export default function Footer() {
  return (
    <footer style={{ width: '100%', height: 'auto', backgroundColor: '#1976d2', paddingTop: '1rem', paddingBottom: '1rem' }}>
      <div style={{ maxWidth: 'lg', margin: '0 auto', textAlign: 'center' }}>
        <h5 style={{ color: 'white' }}>React Starter App</h5>
        <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.875rem' }}>
          {`${new Date().getFullYear()} | React | Custom Styling | React Router`}
        </p>
      </div>
    </footer>
  );
}
