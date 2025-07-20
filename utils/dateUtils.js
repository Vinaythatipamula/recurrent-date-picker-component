import { 
  format, 
  addDays, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  getDay, 
  getWeekOfMonth,
  isSameMonth,
  isSameDay
} from 'date-fns'

/**
 * Get the day name from day index (0-6)
 */
export const getDayName = (dayIndex) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  return days[dayIndex]
}

/**
 * Get the short day name from day index (0-6)
 */
export const getShortDayName = (dayIndex) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  return days[dayIndex]
}

/**
 * Get week number label (1st, 2nd, 3rd, 4th, 5th)
 */
export const getWeekLabel = (weekNumber) => {
  const labels = ['', '1st', '2nd', '3rd', '4th', '5th']
  return labels[weekNumber] || `${weekNumber}th`
}

/**
 * Generate calendar days for a given month
 */
export const generateCalendarDays = (date) => {
  const start = startOfMonth(date)
  const end = endOfMonth(date)
  const days = eachDayOfInterval({ start, end })
  
  // Add padding days from previous month
  const firstDayOfWeek = getDay(start)
  const paddingStart = []
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    paddingStart.push(addDays(start, -i - 1))
  }
  
  // Add padding days from next month
  const lastDayOfWeek = getDay(end)
  const paddingEnd = []
  for (let i = 1; i <= 6 - lastDayOfWeek; i++) {
    paddingEnd.push(addDays(end, i))
  }
  
  return [...paddingStart, ...days, ...paddingEnd]
}

/**
 * Check if a date is in the current month
 */
export const isInCurrentMonth = (date, currentMonth) => {
  return isSameMonth(date, currentMonth)
}

/**
 * Format date for display
 */
export const formatDate = (date) => {
  return format(date, 'MMM dd, yyyy')
}

/**
 * Format date for input field
 */
export const formatDateForInput = (date) => {
  return format(date, 'yyyy-MM-dd')
}

/**
 * Get month name
 */
export const getMonthName = (date) => {
  return format(date, 'MMMM yyyy')
}

/**
 * Check if a date is selected in the generated dates
 */
export const isDateSelected = (date, selectedDates) => {
  return selectedDates.some(selectedDate => isSameDay(date, selectedDate))
} 