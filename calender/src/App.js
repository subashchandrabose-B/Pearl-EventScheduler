import './App.css';
import HomePage from './Pages/HomePage';
import { Route, Routes } from 'react-router-dom';
import MarkeventPage from './Pages/DailySchedule';
import WeeklyScheduler from './Pages/Weekly';
import MonthlyScheduler from './Pages/Month';
import { RecurrenceProvider } from './ContextApi/ContextApi';
import Toggle from './Pages/Toggle';
import { useState } from 'react';

function App() {
  const [activeView, setActiveView] = useState('Daily'); // Manage the active view state

  return (
    <div>
      <RecurrenceProvider>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route
            path='/MarkeventPage'
            element={
              <>
                {/* Pass the activeView and setActiveView as props to Toggle */}
                <Toggle activeView={activeView} setActiveView={setActiveView} />
                
                {/* Conditionally render components based on activeView */}
                {activeView === 'Daily' && <MarkeventPage />}
                {activeView === 'Weekly' && <WeeklyScheduler />}
                {activeView === 'Monthly' && <MonthlyScheduler />}
              </>
            }
          />
        </Routes>
      </RecurrenceProvider>
    </div>
  );
}

export default App;

