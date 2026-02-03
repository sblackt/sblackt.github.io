import React from 'react';
import { format } from 'date-fns';
import { AvailabilityResponse, AvailabilityPreference } from '../types';
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
  onDateToggle: (date: string, preference?: AvailabilityPreference | null) => void;
  selectedDates: Map<string, AvailabilityPreference | null>; // Changed to Map with preference
  pendingChanges: Map<string, AvailabilityPreference | null>; // Changed to Map with preference
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
    userPreference: selectedDates.get(date) || null,
    pendingPreference: pendingChanges.get(date)
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
    if (!participantName.trim()) {
      return;
    }

    // Determine current state (pending takes priority, then saved, then null)
    const savedPref = selectedDates.get(date);
    const pendingPref = pendingChanges.get(date);

    // If there's a pending change, cycle from that
    // Otherwise, cycle from the saved preference
    const currentPref = pendingPref !== undefined ? pendingPref : savedPref;

    let nextPref: AvailabilityPreference | null = null;

    // Cycle through: null -> available -> tentative -> preferred -> null
    if (!currentPref) {
      nextPref = 'available';
    } else if (currentPref === 'available') {
      nextPref = 'tentative';
    } else if (currentPref === 'tentative') {
      nextPref = 'preferred';
    } else {
      nextPref = null; // Back to unselected
    }

    onDateToggle(date, nextPref);
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
        {dateAvailability.map(({ date, availableCount, userPreference, pendingPreference }) => {
          const palette = getHeatMapColors(availableCount);
          const selectedBg = rgba(strongAccent, 0.85);
          const selectedBorder = strongAccent;
          const selectedText = '#ffffff';

          // Determine the current preference (pending takes precedence)
          const currentPref = pendingPreference ?? userPreference;
          const isPending = pendingPreference !== undefined;
          const isSelected = currentPref !== null;

          // Define preference-specific styling
          let prefBorder = `1px solid ${palette.chipBorder}`;
          let prefIndicator = null;

          if (isPending) {
            prefBorder = '3px solid #eab308';
          } else if (currentPref) {
            prefBorder = `3px solid ${selectedBorder}`;
          }

          // Set indicator based on preference (show preference even when pending)
          if (currentPref === 'available') {
            prefIndicator = (
              <div className={`selected-indicator available-indicator ${isPending ? 'pending-badge' : ''}`}>
                Available{isPending ? ' (pending)' : ''}
              </div>
            );
          } else if (currentPref === 'tentative') {
            prefIndicator = (
              <div className={`selected-indicator tentative-indicator ${isPending ? 'pending-badge' : ''}`}>
                ~ Tentative{isPending ? ' (pending)' : ''}
              </div>
            );
          } else if (currentPref === 'preferred') {
            prefIndicator = (
              <div className={`selected-indicator preferred-indicator ${isPending ? 'pending-badge' : ''}`}>
                ★ Preferred{isPending ? ' (pending)' : ''}
              </div>
            );
          }

          return (
            <button
              key={date}
              className={`heatmap-date ${isSelected ? 'selected' : ''} ${isPending ? 'pending' : ''} ${currentPref ? `preference-${currentPref}` : ''}`}
              style={{
                backgroundColor: palette.bg,
                color: palette.text,
                border: prefBorder,
                // CSS variable to keep nested elements in sync
                ['--heatmap-chip-bg' as string]: palette.chipBg,
                ['--heatmap-chip-border' as string]: palette.chipBorder,
                ['--heatmap-text' as string]: palette.text,
                ['--heatmap-selected-bg' as string]: selectedBg,
                ['--heatmap-selected-border' as string]: selectedBorder,
                ['--heatmap-selected-text' as string]: selectedText,
                ['--heatmap-selected-chip-bg' as string]: 'rgba(255,255,255,0.2)'
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
              {prefIndicator}
            </button>
          );
        })}
      </div>

      {selectedDates.size > 0 && (
        <div className="your-selections">
          <h4>Your Selections ({selectedDates.size})</h4>
          <div className="selected-dates">
            {Array.from(selectedDates.entries()).map(([date, preference]) => {
              let icon = '';
              let className = 'selected-date-tag';

              if (preference === 'tentative') {
                icon = '~ ';
                className += ' tentative';
              } else if (preference === 'preferred') {
                icon = '★ ';
                className += ' preferred';
              }

              return (
                <span key={date} className={className}>
                  {icon}{format(parseLocalDate(date), 'MMM d')}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default AvailabilityHeatmap; 
