import {
  getDayName,
  getShortDayName,
  getWeekLabel,
  generateCalendarDays,
  isInCurrentMonth,
  formatDate,
  formatDateForInput,
  getMonthName,
  isDateSelected
} from '../../utils/dateUtils'

describe('dateUtils', () => {
  describe('getDayName', () => {
    it('should return correct day names', () => {
      expect(getDayName(0)).toBe('Sunday')
      expect(getDayName(1)).toBe('Monday')
      expect(getDayName(2)).toBe('Tuesday')
      expect(getDayName(3)).toBe('Wednesday')
      expect(getDayName(4)).toBe('Thursday')
      expect(getDayName(5)).toBe('Friday')
      expect(getDayName(6)).toBe('Saturday')
    })
  })

  describe('getShortDayName', () => {
    it('should return correct short day names', () => {
      expect(getShortDayName(0)).toBe('Sun')
      expect(getShortDayName(1)).toBe('Mon')
      expect(getShortDayName(2)).toBe('Tue')
      expect(getShortDayName(3)).toBe('Wed')
      expect(getShortDayName(4)).toBe('Thu')
      expect(getShortDayName(5)).toBe('Fri')
      expect(getShortDayName(6)).toBe('Sat')
    })
  })

  describe('getWeekLabel', () => {
    it('should return correct week labels', () => {
      expect(getWeekLabel(1)).toBe('1st')
      expect(getWeekLabel(2)).toBe('2nd')
      expect(getWeekLabel(3)).toBe('3rd')
      expect(getWeekLabel(4)).toBe('4th')
      expect(getWeekLabel(5)).toBe('5th')
      expect(getWeekLabel(6)).toBe('6th')
    })
  })

  describe('generateCalendarDays', () => {
    it('should generate calendar days for a month', () => {
      const date = new Date(2024, 0, 1) // January 2024
      const days = generateCalendarDays(date)
      
      expect(days).toHaveLength(42) // 6 weeks * 7 days
      expect(days[0]).toBeInstanceOf(Date)
    })
  })

  describe('isInCurrentMonth', () => {
    it('should return true for dates in current month', () => {
      const currentMonth = new Date(2024, 0, 1)
      const dateInMonth = new Date(2024, 0, 15)
      
      expect(isInCurrentMonth(dateInMonth, currentMonth)).toBe(true)
    })

    it('should return false for dates not in current month', () => {
      const currentMonth = new Date(2024, 0, 1)
      const dateNotInMonth = new Date(2024, 1, 15)
      
      expect(isInCurrentMonth(dateNotInMonth, currentMonth)).toBe(false)
    })
  })

  describe('formatDate', () => {
    it('should format date correctly', () => {
      const date = new Date(2024, 0, 15)
      expect(formatDate(date)).toBe('Jan 15, 2024')
    })
  })

  describe('formatDateForInput', () => {
    it('should format date for input field', () => {
      const date = new Date(2024, 0, 15)
      expect(formatDateForInput(date)).toBe('2024-01-15')
    })
  })

  describe('getMonthName', () => {
    it('should return month name with year', () => {
      const date = new Date(2024, 0, 1)
      expect(getMonthName(date)).toBe('January 2024')
    })
  })

  describe('isDateSelected', () => {
    it('should return true for selected dates', () => {
      const selectedDates = [
        new Date(2024, 0, 15),
        new Date(2024, 0, 20)
      ]
      const dateToCheck = new Date(2024, 0, 15)
      
      expect(isDateSelected(dateToCheck, selectedDates)).toBe(true)
    })

    it('should return false for non-selected dates', () => {
      const selectedDates = [
        new Date(2024, 0, 15),
        new Date(2024, 0, 20)
      ]
      const dateToCheck = new Date(2024, 0, 25)
      
      expect(isDateSelected(dateToCheck, selectedDates)).toBe(false)
    })
  })
}) 