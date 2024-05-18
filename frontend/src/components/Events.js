import React from 'react';

function Events() {
  return (
    <div className="form" style={{ textAlign: 'center', margin: '50px auto', maxWidth: '400px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
      <h2 style={{ color: '#007bff', fontFamily: 'Arial, sans-serif' }}>Your event is created successfully</h2>
      <p style={{ fontSize: '16px', lineHeight: '1.6' }}>You can see it in your Google calendar</p>
      <a
        href="https://calendar.google.com/calendar/r"
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: 'inline-block', backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', textDecoration: 'none', borderRadius: '5px', fontSize: '18px', marginTop: '20px' }}
      >
        Click here
      </a>
    </div>
  );
}

export default Events;
