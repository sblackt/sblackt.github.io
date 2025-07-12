import React, { useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isFuture } from 'date-fns';
import './Calendar.css';

interface CalendarProps {
  selectedDates: string[];
  onDateToggle: (date: string) => void;
  minDate?: Date;
}

const Calendar: React.FC<CalendarProps> = ({ selectedDates, onDateToggle, minDate = new Date() }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    const newMonth = subMonths(currentMonth, 1);
    // Don't allow going before the minimum date
    if (newMonth >= minDate) {
      setCurrentMonth(newMonth);
    }
  };

  const getDaysInMonth = () => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    
    // Get all days in the month
    const days = eachDayOfInterval({ start, end });
    
    // Add padding days from previous month to fill the first week
    const firstDayOfWeek = start.getDay();
    const paddingDays = [];
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      paddingDays.push(subMonths(start, 1));
    }
    
    return [...paddingDays, ...days];
  };

  const handleDateClick = (date: Date) => {
    // Only allow future dates
    if (isFuture(date) || isToday(date)) {
      // Use local timezone to avoid date shifting
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const dateString = `${year}-${month}-${day}`;
      onDateToggle(dateString);
    }
  };

  const isDateSelectable = (date: Date) => {
    return isFuture(date) || isToday(date);
  };

  const isDateSelected = (date: Date) => {
    // Use local timezone to avoid date shifting
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;
    return selectedDates.includes(dateString);
  };

  const isDateInCurrentMonth = (date: Date) => {
    return isSameMonth(date, currentMonth);
  };

  return (
    <div className="calendar-widget">
      <div className="calendar-header">
        <button 
          type="button"
          className="calendar-nav-btn" 
          onClick={prevMonth}
          disabled={subMonths(currentMonth, 1) < minDate}
        >
          ‹
        </button>
        <h3 className="calendar-title">
          {format(currentMonth, 'MMMM yyyy')}
        </h3>
        <button type="button" className="calendar-nav-btn" onClick={nextMonth}>
          ›
        </button>
      </div>

      <div className="calendar-grid">
        <div className="calendar-weekdays">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="weekday-header">
              {day}
            </div>
          ))}
        </div>

        <div className="calendar-days">
          {getDaysInMonth().map((date, index) => {
            const selectable = isDateSelectable(date);
            const selected = isDateSelected(date);
            const inCurrentMonth = isDateInCurrentMonth(date);
            const isTodayDate = isToday(date);

            return (
              <button
                key={index}
                type="button"
                className={`calendar-day ${
                  !inCurrentMonth ? 'other-month' : ''
                } ${
                  isTodayDate ? 'today' : ''
                } ${
                  selected ? 'selected' : ''
                } ${
                  !selectable ? 'disabled' : ''
                }`}
                onClick={() => handleDateClick(date)}
                disabled={!selectable}
              >
                {format(date, 'd')}
              </button>
            );
          })}
        </div>
      </div>

      {selectedDates.length > 0 && (
        <div className="selected-dates-summary">
          <h4>Selected Dates ({selectedDates.length})</h4>
          <div className="selected-dates-list">
            {selectedDates
              .sort()
              .slice(0, 5)
              .map(date => {
                // Parse date string and create local date to avoid timezone issues
                const [year, month, day] = date.split('-').map(Number);
                const localDate = new Date(year, month - 1, day);
                return (
                  <span key={date} className="selected-date-tag">
                    {format(localDate, 'MMM d')}
                  </span>
                );
              })}
            {selectedDates.length > 5 && (
              <span className="more-dates">
                +{selectedDates.length - 5} more
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar; 