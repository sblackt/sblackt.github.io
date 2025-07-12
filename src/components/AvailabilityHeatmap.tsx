import React from 'react';
import { format } from 'date-fns';
import { AvailabilityResponse } from '../types';
import './AvailabilityHeatmap.css';

interface AvailabilityHeatmapProps {
  timeSlots: Array<{
    id: string;
    date: string;
    time: string;
    available: string[];
    unavailable: string[];
  }>;
  responses: AvailabilityResponse[];
  participantName: string;
  onDateToggle: (date: string) => void;
  selectedDates: string[];
  pendingChanges: string[];
}

const AvailabilityHeatmap: React.FC<AvailabilityHeatmapProps> = ({
  timeSlots,
  responses,
  participantName,
  onDateToggle,
  selectedDates,
  pendingChanges
}) => {
  // Group responses by date to calculate availability
  const datesMap = new Map<string, string[]>();
  
  // Initialize all dates from time slots
  timeSlots.forEach(slot => {
    if (!datesMap.has(slot.date)) {
      datesMap.set(slot.date, []);
    }
  });
  
  // Add responses to the dates map
  responses.forEach(response => {
    if (response.available) {
      const timeSlot = timeSlots.find(slot => slot.id === response.timeSlotId);
      if (timeSlot) {
        const existing = datesMap.get(timeSlot.date) || [];
        if (!existing.includes(response.participantName)) {
          existing.push(response.participantName);
          datesMap.set(timeSlot.date, existing);
        }
      }
    }
  });

  // Calculate availability for each date
  const dateAvailability = Array.from(datesMap.entries()).map(([date, participants]) => ({
    date,
    availableCount: participants.length,
    isSelected: selectedDates.includes(date),
    isPending: pendingChanges.includes(date)
  }));

  // Sort dates chronologically
  dateAvailability.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Calculate max availability for color scaling
  const maxAvailability = Math.max(...dateAvailability.map(d => d.availableCount), 1);

  const getHeatMapColor = (count: number) => {
    const intensity = count / maxAvailability;
    if (intensity === 0) return '#f8f9fa'; // Light gray for no availability
    if (intensity <= 0.25) return '#d4edda'; // Light green
    if (intensity <= 0.5) return '#c3e6cb'; // Medium green
    if (intensity <= 0.75) return '#28a745'; // Dark green
    return '#155724'; // Very dark green for high availability
  };

  const handleDateClick = (date: string) => {
    if (participantName.trim()) {
      onDateToggle(date);
    }
  };

  return (
    <div className="availability-heatmap">
      <div className="heatmap-header">
        <h3>Available Dates</h3>
        <div className="heatmap-legend">
          <span className="legend-item">
            <span className="legend-color" style={{ backgroundColor: '#f8f9fa' }}></span>
            <span>0 available</span>
          </span>
          <span className="legend-item">
            <span className="legend-color" style={{ backgroundColor: '#d4edda' }}></span>
            <span>Few</span>
          </span>
          <span className="legend-item">
            <span className="legend-color" style={{ backgroundColor: '#28a745' }}></span>
            <span>Many</span>
          </span>
        </div>
      </div>

      <div className="heatmap-grid">
        {dateAvailability.map(({ date, availableCount, isSelected, isPending }) => (
          <button
            key={date}
            className={`heatmap-date ${isSelected ? 'selected' : ''} ${isPending ? 'pending' : ''}`}
            style={{
              backgroundColor: getHeatMapColor(availableCount),
              border: isPending ? '3px solid #ffc107' : isSelected ? '3px solid #007bff' : '1px solid #dee2e6'
            }}
            onClick={() => handleDateClick(date)}
            disabled={!participantName.trim()}
          >
            <div className="date-info">
              <div className="date-day">{format(new Date(date), 'EEE')}</div>
              <div className="date-number">{format(new Date(date), 'd')}</div>
              <div className="date-month">{format(new Date(date), 'MMM')}</div>
            </div>
            <div className="availability-count">
              {availableCount} available
            </div>
            {isPending && (
              <div className="pending-indicator">
                ⏳ Pending
              </div>
            )}
            {isSelected && !isPending && (
              <div className="selected-indicator">
                ✓ You're available
              </div>
            )}
          </button>
        ))}
      </div>

      {selectedDates.length > 0 && (
        <div className="your-selections">
          <h4>Your Selections ({selectedDates.length})</h4>
          <div className="selected-dates">
            {selectedDates.map(date => (
              <span key={date} className="selected-date-tag">
                {format(new Date(date), 'MMM d')}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AvailabilityHeatmap; 