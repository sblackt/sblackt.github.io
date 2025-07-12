import React from 'react';
import './Header.css';
import meepletower from '../assets/meepletower.png';

interface HeaderProps {
  onBackToList?: () => void;
  onCreateEvent?: () => void;
  currentView: 'list' | 'detail' | 'create';
}

const Header: React.FC<HeaderProps> = ({ onBackToList, onCreateEvent, currentView }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <img src={meepletower} alt="Profile" className="profile-image" />
          {onBackToList && (
            <button className="back-button" onClick={onBackToList}>
              ← Back
            </button>
          )}
        </div>
        
        <h1 className="app-title">
          {currentView === 'list' && 'Board Game Scheduler'}
          {currentView === 'detail' && 'Event Details'}
          {currentView === 'create' && 'Create Event'}
        </h1>
        
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