import React from 'react';
import './Header.css';

interface HeaderProps {
  onBackToList?: () => void;
  onCreateEvent?: () => void;
  currentView: 'list' | 'detail' | 'create';
}

const Header: React.FC<HeaderProps> = ({ onBackToList, onCreateEvent }) => {
  return (
    <header className="header">
      <div className="header-content">
        {onBackToList && (
          <button className="back-button" onClick={onBackToList}>
            ← Back
          </button>
        )}
        {onCreateEvent && (
          <button className="create-button" onClick={onCreateEvent}>
            + New Event
          </button>
        )}
      </div>
    </header>
  );
};

export default Header; 