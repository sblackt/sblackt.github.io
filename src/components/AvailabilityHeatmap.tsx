import React from 'react';
import { format } from 'date-fns';
import { AvailabilityResponse } from '../types';
import { parseLocalDate } from '../utils/dateUtils';
import { EventTypeConfig } from '../constants/eventTypes';
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
  theme?: EventTypeConfig;
}

const AvailabilityHeatmap: React.FC<AvailabilityHeatmapProps> = ({
  timeSlots,
  responses,
  participantName,
  onDateToggle,
  selectedDates,
  pendingChanges,
  theme
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
  dateAvailability.sort((a, b) => parseLocalDate(a.date).getTime() - parseLocalDate(b.date).getTime());

  // Calculate max availability for color scaling
  const maxAvailability = Math.max(...dateAvailability.map(d => d.availableCount), 1);

  const hexToRgb = (hex: string) => {
    const normalized = hex.replace('#', '');
    const bigint = parseInt(normalized.length === 3 ? normalized.repeat(2) : normalized, 16);
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255
    };
  };

  const rgba = (hex: string, alpha: number) => {
    const { r, g, b } = hexToRgb(hex);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const baseAccent = theme?.accent ?? '#3b82f6';
  const strongAccent = theme?.accentStrong ?? '#1d4ed8';
  const defaultText = theme?.text ?? '#0f172a';

  const getHeatMapColors = (count: number) => {
    const intensity = count / maxAvailability;
    if (intensity === 0) {
      return { bg: '#f8fafc', text: defaultText, chipBg: '#e2e8f0', chipBorder: '#cbd5e1' };
    }
    if (intensity <= 0.35) {
      return { bg: rgba(baseAccent, 0.16), text: defaultText, chipBg: rgba(baseAccent, 0.22), chipBorder: rgba(baseAccent, 0.28) };
    }
    if (intensity <= 0.65) {
      return { bg: rgba(baseAccent, 0.3), text: defaultText, chipBg: rgba(baseAccent, 0.2), chipBorder: rgba(baseAccent, 0.35) };
    }
    if (intensity <= 0.85) {
      return { bg: rgba(strongAccent, 0.45), text: '#ffffff', chipBg: rgba(baseAccent, 0.35), chipBorder: rgba(strongAccent, 0.5) };
    }
    return { bg: strongAccent, text: '#ffffff', chipBg: 'rgba(255,255,255,0.2)', chipBorder: 'rgba(255,255,255,0.45)' };
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
            <span className="legend-color" style={{ backgroundColor: '#f8fafc', borderColor: '#cbd5e1' }}></span>
            <span>0 available</span>
          </span>
          <span className="legend-item">
            <span className="legend-color" style={{ backgroundColor: rgba(baseAccent, 0.16), borderColor: rgba(baseAccent, 0.28) }}></span>
            <span>Few</span>
          </span>
          <span className="legend-item">
            <span className="legend-color" style={{ backgroundColor: rgba(strongAccent, 0.45), borderColor: strongAccent }}></span>
            <span>Many</span>
          </span>
        </div>
      </div>

      <div className="heatmap-grid">
        {dateAvailability.map(({ date, availableCount, isSelected, isPending }) => {
          const palette = getHeatMapColors(availableCount);
          return (
            <button
              key={date}
              className={`heatmap-date ${isSelected ? 'selected' : ''} ${isPending ? 'pending' : ''}`}
              style={{
                backgroundColor: palette.bg,
                color: palette.text,
                border: isPending ? '3px solid #eab308' : isSelected ? '3px solid #3b82f6' : `1px solid ${palette.chipBorder}`,
                // CSS variable to keep nested elements in sync
                ['--heatmap-chip-bg' as string]: palette.chipBg,
                ['--heatmap-chip-border' as string]: palette.chipBorder,
                ['--heatmap-text' as string]: palette.text
              }}
              onClick={() => handleDateClick(date)}
              disabled={!participantName.trim()}
            >
              <div className="date-info">
                <div className="date-day">{format(parseLocalDate(date), 'EEE')}</div>
                <div className="date-number">{format(parseLocalDate(date), 'd')}</div>
                <div className="date-month">{format(parseLocalDate(date), 'MMM')}</div>
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
          );
        })}
      </div>

      {selectedDates.length > 0 && (
        <div className="your-selections">
          <h4>Your Selections ({selectedDates.length})</h4>
          <div className="selected-dates">
            {selectedDates.map(date => (
              <span key={date} className="selected-date-tag">
                {format(parseLocalDate(date), 'MMM d')}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AvailabilityHeatmap; 
