import React, { createContext, useState, useEffect } from 'react';

// Create RecurrenceContext
export const RecurrenceContext = createContext();

// RecurrenceProvider component
export const RecurrenceProvider = ({ children }) => {
  // Initialize state with data from localStorage if available
  const [recurrenceEvents, setRecurrenceEvents] = useState(() => {
    const savedEvents = localStorage.getItem('recurrenceEvents');
    return savedEvents ? JSON.parse(savedEvents) : {}; // Parse JSON if it exists, otherwise return an empty object
  });

  // Use effect to store recurrenceEvents in localStorage every time it changes
  useEffect(() => {
    localStorage.setItem('recurrenceEvents', JSON.stringify(recurrenceEvents)); // Store the updated events in localStorage
  }, [recurrenceEvents]); // This effect will run whenever recurrenceEvents changes

  return (
    <RecurrenceContext.Provider value={{ recurrenceEvents, setRecurrenceEvents }}>
      {children}
    </RecurrenceContext.Provider>
  );
};

