import React, { useState, useContext } from 'react';
import '../App.css'; // Import the CSS file for styling
import { Link } from 'react-router-dom'; // Import Link from react-router-dom for navigation
import { RecurrenceContext } from '../ContextApi/ContextApi'; // Import RecurrenceContext to share state globally

const WeeklyScheduler = () => {
  // State hooks for managing event name, start date, end date, and selected day of the week
  const [eventName, setEventName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedDay, setSelectedDay] = useState('');

  // Using RecurrenceContext to get and update the shared recurrenceEvents state
  const { recurrenceEvents, setRecurrenceEvents } = useContext(RecurrenceContext); 

  // Array of days to be used for the dropdown selection
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Function to get the day of the week for a given date
  const getDayOfWeek = (date) => {
    return daysOfWeek[new Date(date).getDay()];
  };

  // Function to calculate recurring events based on the selected day of the week and date range
  const calculateRecurrences = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    let currentDate = start;
    const newEvents = { ...recurrenceEvents }; // Clone the existing events

    // Loop through each day from start to end date
    while (currentDate <= end) {
      // If the current day matches the selected day, add it to recurrence events
      if (getDayOfWeek(currentDate) === selectedDay) {
        const formattedDate = currentDate.toDateString();
        newEvents[formattedDate] = eventName || 'Unnamed Event'; // Use 'Unnamed Event' if no event name is provided
      }
      currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
    }

    setRecurrenceEvents(newEvents); // Update the context with new recurrence events
  };

  return (
    <div className="recurrence-scheduler-container">
      <div className="recurrence-scheduler">
        {/* Header with close link */}
        <h2 className="header">
          Recurrence Scheduler <span><Link to="/" className="close-linkk">&times;</Link></span>
        </h2>

        {/* Form for inputting event details */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            calculateRecurrences(); // Call calculateRecurrences on form submission
          }}
        >
          {/* Event Name Input */}
          <label className="label">Event Name:</label>
          <input
            className="input-field"
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            placeholder="Enter Event Name"
          />

          {/* Start Date Input */}
          <label className="label">Start Date:</label>
          <input
            className="input-field"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />

          {/* End Date Input */}
          <label className="label">End Date:</label>
          <input
            className="input-field"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />

          {/* Day of the Week Dropdown */}
          <label className="label">Select Day of the Week:</label>
          <select
            className="input-field"
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
          >
            <option value="">--Select a day--</option>
            {daysOfWeek.map((day, index) => (
              <option key={index} value={day}>
                {day}
              </option>
            ))}
          </select>

          {/* Submit Button */}
          <button className="submit-button" type="submit">
            Calculate Recurrences
          </button>
        </form>
      </div>
    </div>
  );
};

export default WeeklyScheduler;

