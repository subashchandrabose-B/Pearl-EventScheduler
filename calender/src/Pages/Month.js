import React, { useState, useContext } from 'react';
import '../App.css'; // Import the CSS for styling
import { Link } from 'react-router-dom'; // Import Link for navigation
import { RecurrenceContext } from '../ContextApi/ContextApi'; // Import RecurrenceContext to use the global state

const MonthlyScheduler = () => {
  // State hooks for managing form inputs (event name, start date, end date, selected day, and week number)
  const [eventName, setEventName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [weekNumber, setWeekNumber] = useState('1');

  // Use context to access and modify recurrence events globally
  const { recurrenceEvents, setRecurrenceEvents } = useContext(RecurrenceContext);

  // Days of the week array for dropdown options
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Function to calculate the nth occurrence of a given weekday in a specific month and year
  const getNthWeekdayOfMonth = (year, month, dayOfWeek, nth) => {
    const firstDayOfMonth = new Date(year, month, 1);
    const firstDayOfWeekInMonth = (dayOfWeek - firstDayOfMonth.getDay() + 7) % 7 + 1;
    const dateOfNthWeekday = firstDayOfWeekInMonth + (nth - 1) * 7;

    // Check if the calculated date is within the month
    if (dateOfNthWeekday <= new Date(year, month + 1, 0).getDate()) {
      return new Date(year, month, dateOfNthWeekday);
    }
    return null; // Return null if the nth weekday does not exist in that month
  };

  // Function to calculate recurrences based on user input
  const calculateRecurrences = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    let currentDate = new Date(start.getFullYear(), start.getMonth(), 1); // Start at the beginning of the month
    const newEvents = { ...recurrenceEvents }; // Clone existing events

    const nth = parseInt(weekNumber); // Convert week number to integer
    const dayOfWeekIndex = daysOfWeek.indexOf(selectedDay); // Get the index of the selected day

    // Loop through months until the end date
    while (currentDate <= end) {
      const nthWeekdayDate = getNthWeekdayOfMonth(currentDate.getFullYear(), currentDate.getMonth(), dayOfWeekIndex, nth);

      // Add the event if the calculated date is within the date range
      if (nthWeekdayDate && nthWeekdayDate >= start && nthWeekdayDate <= end) {
        const formattedDate = nthWeekdayDate.toDateString(); // Format date as string
        newEvents[formattedDate] = eventName || 'Unnamed Event'; // Use event name or default
      }

      // Move to the next month
      currentDate.setMonth(currentDate.getMonth() + 1);
    }

    // Update the recurrence events in context
    setRecurrenceEvents(newEvents);
  };

  return (
    <div className="recurrence-scheduler-container">
      <div className="recurrence-scheduler">
        {/* Header with a close link */}
        <h2 className="header">Monthly Recurrence Scheduler <span><Link to="/" className="close-linkk">&times;</Link></span></h2>

        {/* Form for event input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            calculateRecurrences(); // Call the calculate function when the form is submitted
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

          {/* Week Number Dropdown */}
          <label className="label">Select Week of the Month:</label>
          <select
            className="input-field"
            value={weekNumber}
            onChange={(e) => setWeekNumber(e.target.value)}
          >
            <option value="1">First</option>
            <option value="2">Second</option>
            <option value="3">Third</option>
            <option value="4">Fourth</option>
          </select>

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

export default MonthlyScheduler;

