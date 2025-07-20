import { create } from 'zustand'
import { addDays, addWeeks, addMonths, addYears, format, isSameDay, startOfMonth, endOfMonth, eachDayOfInterval, getDay, getWeekOfMonth } from 'date-fns'

const useRecurringDateStore = create((set, get) => ({
  // Basic recurrence settings
  recurrenceType: 'daily', // 'daily', 'weekly', 'monthly', 'yearly'
  interval: 1, // Every X days/weeks/months/years
  startDate: new Date(),
  endDate: null,
  
  // Weekly specific settings
  selectedWeekDays: [], // [0,1,2,3,4,5,6] for Sunday to Saturday
  
  // Monthly specific settings
  monthlyType: 'dayOfMonth', // 'dayOfMonth' or 'dayOfWeek'
  dayOfMonth: 1, // 1-31
  weekOfMonth: 1, // 1-5 (first, second, third, fourth, fifth)
  dayOfWeek: 1, // 0-6 (Sunday to Saturday)
  
  // Generated dates
  generatedDates: [],
  
  // Actions
  setRecurrenceType: (type) => {
    set({ recurrenceType: type })
    get().generateDates()
  },
  
  setInterval: (interval) => {
    set({ interval: Math.max(1, interval) })
    get().generateDates()
  },
  
  setStartDate: (date) => {
    set({ startDate: date })
    get().generateDates()
  },
  
  setEndDate: (date) => {
    set({ endDate: date })
    get().generateDates()
  },
  
  setSelectedWeekDays: (days) => {
    set({ selectedWeekDays: days })
    get().generateDates()
  },
  
  setMonthlyType: (type) => {
    set({ monthlyType: type })
    get().generateDates()
  },
  
  setDayOfMonth: (day) => {
    set({ dayOfMonth: day })
    get().generateDates()
  },
  
  setWeekOfMonth: (week) => {
    set({ weekOfMonth: week })
    get().generateDates()
  },
  
  setDayOfWeek: (day) => {
    set({ dayOfWeek: day })
    get().generateDates()
  },
  
  generateDates: () => {
    const { 
      recurrenceType, 
      interval, 
      startDate, 
      endDate, 
      selectedWeekDays, 
      monthlyType, 
      dayOfMonth, 
      weekOfMonth, 
      dayOfWeek 
    } = get()
    
    const dates = []
    let currentDate = new Date(startDate)
    const maxDate = endDate || addYears(currentDate, 1) // Default to 1 year if no end date
    
    while (currentDate <= maxDate && dates.length < 100) { // Limit to 100 dates
      let shouldInclude = false
      
      switch (recurrenceType) {
        case 'daily':
          shouldInclude = true
          break
          
        case 'weekly':
          shouldInclude = selectedWeekDays.includes(getDay(currentDate))
          break
          
        case 'monthly':
          if (monthlyType === 'dayOfMonth') {
            shouldInclude = currentDate.getDate() === dayOfMonth
          } else {
            // Day of week pattern (e.g., "second Tuesday")
            const weekOfCurrentMonth = getWeekOfMonth(currentDate)
            const dayOfCurrentWeek = getDay(currentDate)
            shouldInclude = weekOfCurrentMonth === weekOfMonth && dayOfCurrentWeek === dayOfWeek
          }
          break
          
        case 'yearly':
          shouldInclude = currentDate.getDate() === startDate.getDate() && 
                         currentDate.getMonth() === startDate.getMonth()
          break
      }
      
      if (shouldInclude) {
        dates.push(new Date(currentDate))
      }
      
      // Move to next interval
      switch (recurrenceType) {
        case 'daily':
          currentDate = addDays(currentDate, interval)
          break
        case 'weekly':
          currentDate = addWeeks(currentDate, interval)
          break
        case 'monthly':
          currentDate = addMonths(currentDate, interval)
          break
        case 'yearly':
          currentDate = addYears(currentDate, interval)
          break
      }
    }
    
    set({ generatedDates: dates })
  },
  
  // Reset to default values
  reset: () => {
    set({
      recurrenceType: 'daily',
      interval: 1,
      startDate: new Date(),
      endDate: null,
      selectedWeekDays: [],
      monthlyType: 'dayOfMonth',
      dayOfMonth: 1,
      weekOfMonth: 1,
      dayOfWeek: 1,
      generatedDates: []
    })
  }
}))

export default useRecurringDateStore 