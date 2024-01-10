import React from 'react';

export default function Header() {
  return (
    <header style={{ backgroundColor: '#2196F3', padding: '1rem', color: 'white' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <button
          style={{
            fontSize: '1.5rem',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            marginRight: '1rem',
            color: 'white',
          }}
        >
          ☰
        </button>
        <div style={{ flexGrow: 1 }}>
          <h1 style={{ margin: 0 }}>LOGO</h1>
        </div>
        <button
          style={{
            fontSize: '1rem',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: 'white',
          }}
        >
          Login
        </button>
      </div>
    </header>
  );
}
