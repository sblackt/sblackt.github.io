/**
 * Parse a date string in YYYY-MM-DD format and return a Date object in local timezone
 * This prevents timezone conversion issues when creating dates from strings
 */
export const parseLocalDate = (dateString: string): Date => {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
};

/**
 * Format a date string in YYYY-MM-DD format to a local Date object
 * and then format it using date-fns
 */
export const formatLocalDate = (dateString: string, formatString: string, formatFn: (date: Date, format: string) => string): string => {
  const localDate = parseLocalDate(dateString);
  return formatFn(localDate, formatString);
};
