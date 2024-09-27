import "../App.css";
import React, { useState, useContext, useEffect } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { Link } from "react-router-dom";
import { RecurrenceContext } from "../ContextApi/ContextApi"; // Proper import of RecurrenceContext

function HomePage() {
  const [selectedDate, setSelectedDate] = useState(null); // State for selected date
  const [eventForSelectedDate, setEventForSelectedDate] = useState(null); // State for event on the selected date
  const today = new Date();
  const { recurrenceEvents } = useContext(RecurrenceContext); // Get context function

  // Helper function to get the event for a specific date
  const getEventForDate = (date) => {
    const formattedDate = date.toDateString(); // Format date to match recurrenceEvents keys
    return recurrenceEvents[formattedDate] || null; // Return event or null if none found
  };

  // Function to handle date change
  const handleDateChange = (date) => {
    setSelectedDate(date); // Update state with the new selected date
    const event = getEventForDate(date); // Get the event for the selected date
    setEventForSelectedDate(event); // Set the event for the selected date
  };

  // On initial load, display today's event
  useEffect(() => {
    if (!selectedDate) {
      const todayEvent = getEventForDate(today);
      setEventForSelectedDate(todayEvent); // Set today's event if available
    }
  }, [selectedDate, recurrenceEvents, today]); // Trigger useEffect on date change or events update

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Start Your Day</h1>
        <div>
          <Link to="/MarkeventPage">
            <button className="event-button">Mark Event</button>
          </Link>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="calendar-section">
          <div className="calendar-header">
            <h2>Pick the Date to check events</h2>
          </div>
          <div className="calendar-body">
            <p>Calendar</p>
            <div className="calendar">
              <Calendar
                value={selectedDate}  // Bind selected date to state
                onChange={handleDateChange}  // Trigger on date change
                minDate={today}  // Disable past dates
                dateFormat="yyyy/MM/dd"  // Date format (optional)
              />
            </div>
          </div>
        </div>
        <div className="event-section">
          <h1 className="event-button">Event for Selected Date</h1>
          {eventForSelectedDate ? (
            <div>
              <h2>Remember: {eventForSelectedDate}</h2>
            </div>
          ) : (
            <div className="placeholder-content">
              <div className="placeholder-icon">📅</div> {/* Example of a placeholder icon */}
              <p className="empty-message">
                {selectedDate
                  ? "No events for the selected date."
                  : "There is no event today."}
              </p>
             </div>
           )}
         </div>

      </div>
    </div>
  );
}

export default HomePage;




