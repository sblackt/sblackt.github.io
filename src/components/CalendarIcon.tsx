import React from 'react';
import './CalendarIcon.css';

const CalendarIcon: React.FC = () => {
  const today = new Date();
  const day = today.getDate();
  const month = today.toLocaleString('default', { month: 'short' }).toUpperCase();

  return (
    <div className="calendar-icon">
      <div className="calendar-icon-header">{month}</div>
      <div className="calendar-icon-day">{day}</div>
    </div>
  );
};

export default CalendarIcon;
