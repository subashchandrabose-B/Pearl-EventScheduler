import React from 'react';
import '../App.css';

const Toggle = ({ activeView, setActiveView }) => {
  return (
    <div className='nav-bar'>
      <div className='element'>
        <button 
          className={`toggle-button ${activeView === 'Daily' ? 'active' : ''}`} 
          onClick={() => setActiveView('Daily')}
        >
          Daily
        </button>
        <button 
          className={`toggle-button ${activeView === 'Weekly' ? 'active' : ''}`} 
          onClick={() => setActiveView('Weekly')}
        >
          Weekly
        </button>
        <button 
          className={`toggle-button ${activeView === 'Monthly' ? 'active' : ''}`} 
          onClick={() => setActiveView('Monthly')}
        >
          Monthly
        </button>
      </div>
    </div>
  );
};

export default Toggle;

