import { renderHook, act } from '@testing-library/react'
import useRecurringDateStore from '../../store/recurringDateStore'

// Mock date-fns functions
jest.mock('date-fns', () => ({
  addDays: jest.fn((date, days) => {
    const result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
  }),
  addWeeks: jest.fn((date, weeks) => {
    const result = new Date(date)
    result.setDate(result.getDate() + (weeks * 7))
    return result
  }),
  addMonths: jest.fn((date, months) => {
    const result = new Date(date)
    result.setMonth(result.getMonth() + months)
    return result
  }),
  addYears: jest.fn((date, years) => {
    const result = new Date(date)
    result.setFullYear(result.getFullYear() + years)
    return result
  }),
  getDay: jest.fn((date) => date.getDay()),
  getWeekOfMonth: jest.fn((date) => Math.ceil(date.getDate() / 7))
}))

describe('useRecurringDateStore', () => {
  beforeEach(() => {
    // Reset the store before each test
    const { result } = renderHook(() => useRecurringDateStore())
    act(() => {
      result.current.reset()
    })
  })

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useRecurringDateStore())

    expect(result.current.recurrenceType).toBe('daily')
    expect(result.current.interval).toBe(1)
    expect(result.current.startDate).toBeInstanceOf(Date)
    expect(result.current.endDate).toBeNull()
    expect(result.current.selectedWeekDays).toEqual([])
    expect(result.current.generatedDates).toEqual([])
  })

  it('should set recurrence type', () => {
    const { result } = renderHook(() => useRecurringDateStore())

    act(() => {
      result.current.setRecurrenceType('weekly')
    })

    expect(result.current.recurrenceType).toBe('weekly')
  })

  it('should set interval', () => {
    const { result } = renderHook(() => useRecurringDateStore())

    act(() => {
      result.current.setInterval(3)
    })

    expect(result.current.interval).toBe(3)
  })

  it('should not allow interval less than 1', () => {
    const { result } = renderHook(() => useRecurringDateStore())

    act(() => {
      result.current.setInterval(0)
    })

    expect(result.current.interval).toBe(1)
  })

  it('should set start date', () => {
    const { result } = renderHook(() => useRecurringDateStore())
    const newDate = new Date(2024, 0, 15)

    act(() => {
      result.current.setStartDate(newDate)
    })

    expect(result.current.startDate).toEqual(newDate)
  })

  it('should set end date', () => {
    const { result } = renderHook(() => useRecurringDateStore())
    const newDate = new Date(2024, 11, 31)

    act(() => {
      result.current.setEndDate(newDate)
    })

    expect(result.current.endDate).toEqual(newDate)
  })

  it('should set selected week days', () => {
    const { result } = renderHook(() => useRecurringDateStore())

    act(() => {
      result.current.setSelectedWeekDays([1, 3, 5])
    })

    expect(result.current.selectedWeekDays).toEqual([1, 3, 5])
  })

  it('should set monthly type', () => {
    const { result } = renderHook(() => useRecurringDateStore())

    act(() => {
      result.current.setMonthlyType('dayOfWeek')
    })

    expect(result.current.monthlyType).toBe('dayOfWeek')
  })

  it('should set day of month', () => {
    const { result } = renderHook(() => useRecurringDateStore())

    act(() => {
      result.current.setDayOfMonth(15)
    })

    expect(result.current.dayOfMonth).toBe(15)
  })

  it('should set week of month', () => {
    const { result } = renderHook(() => useRecurringDateStore())

    act(() => {
      result.current.setWeekOfMonth(2)
    })

    expect(result.current.weekOfMonth).toBe(2)
  })

  it('should set day of week', () => {
    const { result } = renderHook(() => useRecurringDateStore())

    act(() => {
      result.current.setDayOfWeek(3)
    })

    expect(result.current.dayOfWeek).toBe(3)
  })

  it('should generate dates for daily recurrence', () => {
    const { result } = renderHook(() => useRecurringDateStore())
    const startDate = new Date(2024, 0, 1)

    act(() => {
      result.current.setStartDate(startDate)
      result.current.setRecurrenceType('daily')
      result.current.setInterval(1)
    })

    expect(result.current.generatedDates.length).toBeGreaterThan(0)
  })

  it('should generate dates for weekly recurrence', () => {
    const { result } = renderHook(() => useRecurringDateStore())
    const startDate = new Date(2024, 0, 1)

    act(() => {
      result.current.setStartDate(startDate)
      result.current.setRecurrenceType('weekly')
      result.current.setSelectedWeekDays([1, 3, 5]) // Monday, Wednesday, Friday
    })

    expect(result.current.generatedDates.length).toBeGreaterThan(0)
  })

  it('should generate dates for monthly recurrence', () => {
    const { result } = renderHook(() => useRecurringDateStore())
    const startDate = new Date(2024, 0, 1)

    act(() => {
      result.current.setStartDate(startDate)
      result.current.setRecurrenceType('monthly')
      result.current.setMonthlyType('dayOfMonth')
      result.current.setDayOfMonth(15)
    })

    expect(result.current.generatedDates.length).toBeGreaterThan(0)
  })

  it('should generate dates for yearly recurrence', () => {
    const { result } = renderHook(() => useRecurringDateStore())
    const startDate = new Date(2024, 0, 15)

    act(() => {
      result.current.setStartDate(startDate)
      result.current.setRecurrenceType('yearly')
    })

    expect(result.current.generatedDates.length).toBeGreaterThan(0)
  })

  it('should reset to default values', () => {
    const { result } = renderHook(() => useRecurringDateStore())

    // Set some custom values
    act(() => {
      result.current.setRecurrenceType('weekly')
      result.current.setInterval(3)
      result.current.setSelectedWeekDays([1, 2])
    })

    // Reset
    act(() => {
      result.current.reset()
    })

    expect(result.current.recurrenceType).toBe('daily')
    expect(result.current.interval).toBe(1)
    expect(result.current.selectedWeekDays).toEqual([])
  })
}) 