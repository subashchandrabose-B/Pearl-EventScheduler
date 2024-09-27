import React, { useState, useContext } from 'react';
import { RecurrenceContext } from "../ContextApi/ContextApi";
import { Link } from 'react-router-dom';

const MarkeventPage = () => {
  const [startDate, setStartDate] = useState('');  // State for start date
  const [endDate, setEndDate] = useState('');      // State for end date
  const [interval, setInterval] = useState(1);     // State for interval
  const [unit, setUnit] = useState('days');        // State for time unit (days, weeks, etc.)
  const [eventName, setEventName] = useState('');  // State for event name
  const { recurrenceEvents, setRecurrenceEvents } = useContext(RecurrenceContext); // Context for storing recurrence events

  // Function to calculate the next occurrence date
  const getNextOccurrence = (currentDate, interval, unit) => {
    const date = new Date(currentDate);

    switch (unit) {
      case 'days':
        date.setDate(date.getDate() + interval);
        break;
      case 'weeks':
        date.setDate(date.getDate() + interval * 7);
        break;
      case 'months':
        date.setMonth(date.getMonth() + interval);
        break;
      case 'years':
        date.setFullYear(date.getFullYear() + interval);
        break;
      default:
        break;
    }

    return date;
  };

  // Function to calculate recurrence events and return them as an object
  const calculateRecurrenceEvents = (start, end, interval, unit, eventName) => {
    const recurrence = {};
    let currentDate = new Date(start);  // Properly create a Date object for start date
    const endDateObj = new Date(end);   // Properly create a Date object for end date

    while (currentDate <= endDateObj) {  // Use endDateObj for comparison
      const formattedDate = currentDate.toDateString();  // Format date as a string
      recurrence[formattedDate] = eventName || 'No Event';  // Set date as key and event name as value
      currentDate = getNextOccurrence(currentDate, interval, unit);  // Move to the next occurrence
    }
    
    return recurrence;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (startDate && endDate && eventName) {
      // Calculate events and store them as a date-event object
      const newEvents = calculateRecurrenceEvents(startDate, endDate, interval, unit, eventName);
      
      // Merge new events with existing recurrenceEvents
      const updatedRecurrenceEvents = { ...recurrenceEvents, ...newEvents };
      
      // Log the updated events to check correctness
      console.log('Updated Recurrence Events:', JSON.stringify(updatedRecurrenceEvents));
      
      // Update recurrence events in context
      setRecurrenceEvents(updatedRecurrenceEvents);
    }
  };

  return (
    <div className="form-container">
      <Link to="/" className="close-link">&times;</Link>
      <h3>Recurrence Scheduler</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Event Name:</label>
          <input
            type="text"
            placeholder="Enter Event Name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Repeat every:</label>
          <input
            type="number"
            min="1"
            value={interval}
            onChange={(e) => setInterval(Number(e.target.value))}
          />
          <select value={unit} onChange={(e) => setUnit(e.target.value)}>
            <option value="days">Days</option>
            <option value="weeks">Weeks</option>
            <option value="months">Months</option>
            <option value="years">Years</option>
          </select>
        </div>
        <button className="btn-submit" type="submit">Calculate Recurrences</button>
      </form>
    </div>
  );
};

export default MarkeventPage;
