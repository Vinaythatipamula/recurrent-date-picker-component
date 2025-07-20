import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RecurringDatePicker from '../../components/RecurringDatePicker'

// Mock the store to avoid complex state management in tests
jest.mock('../../store/recurringDateStore', () => {
  const originalModule = jest.requireActual('../../store/recurringDateStore')
  return {
    __esModule: true,
    default: () => ({
      // Basic state
      recurrenceType: 'daily',
      interval: 1,
      startDate: new Date(2024, 0, 1),
      endDate: null,
      selectedWeekDays: [],
      monthlyType: 'dayOfMonth',
      dayOfMonth: 1,
      weekOfMonth: 1,
      dayOfWeek: 1,
      generatedDates: [
        new Date(2024, 0, 1),
        new Date(2024, 0, 2),
        new Date(2024, 0, 3)
      ],
      
      // Actions
      setRecurrenceType: jest.fn(),
      setInterval: jest.fn(),
      setStartDate: jest.fn(),
      setEndDate: jest.fn(),
      setSelectedWeekDays: jest.fn(),
      setMonthlyType: jest.fn(),
      setDayOfMonth: jest.fn(),
      setWeekOfMonth: jest.fn(),
      setDayOfWeek: jest.fn(),
      generateDates: jest.fn(),
      reset: jest.fn()
    })
  }
})

describe('RecurringDatePicker Integration', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks()
  })

  it('should render the main component with all sections', () => {
    render(<RecurringDatePicker />)

    // Check for main sections
    expect(screen.getByText('Recurring Date Picker')).toBeInTheDocument()
    expect(screen.getByText('Recurrence Options')).toBeInTheDocument()
    expect(screen.getByText('Date Range')).toBeInTheDocument()
    expect(screen.getByText('Calendar Preview')).toBeInTheDocument()
  })

  it('should display current pattern description', () => {
    render(<RecurringDatePicker />)

    expect(screen.getByText('Current Pattern')).toBeInTheDocument()
    expect(screen.getByText(/Every day starting/)).toBeInTheDocument()
  })

  it('should show generated dates count', () => {
    render(<RecurringDatePicker />)

    expect(screen.getByText('Generated Dates (3)')).toBeInTheDocument()
  })

  it('should display export options', () => {
    render(<RecurringDatePicker />)

    expect(screen.getByText('Export Options')).toBeInTheDocument()
    expect(screen.getByText('Copy to Clipboard')).toBeInTheDocument()
    expect(screen.getByText('Export as CSV')).toBeInTheDocument()
    expect(screen.getByText('Export as JSON')).toBeInTheDocument()
  })

  it('should have reset functionality', () => {
    render(<RecurringDatePicker />)

    const resetButton = screen.getByText('Reset')
    expect(resetButton).toBeInTheDocument()
  })

  it('should show recurrence type options', () => {
    render(<RecurringDatePicker />)

    // Expand the recurrence options
    const expandButton = screen.getByText('Expand')
    fireEvent.click(expandButton)

    // Check for recurrence type buttons
    expect(screen.getByText('Daily')).toBeInTheDocument()
    expect(screen.getByText('Weekly')).toBeInTheDocument()
    expect(screen.getByText('Monthly')).toBeInTheDocument()
    expect(screen.getByText('Yearly')).toBeInTheDocument()
  })

  it('should show date range inputs', () => {
    render(<RecurringDatePicker />)

    const startDateInput = screen.getByLabelText('Start Date *')
    expect(startDateInput).toBeInTheDocument()
    expect(startDateInput).toHaveAttribute('type', 'date')

    const endDateInput = screen.getByLabelText('End Date (Optional)')
    expect(endDateInput).toBeInTheDocument()
    expect(endDateInput).toHaveAttribute('type', 'date')
  })

  it('should display calendar preview', () => {
    render(<RecurringDatePicker />)

    // Check for calendar elements
    expect(screen.getByText('Calendar Preview')).toBeInTheDocument()
    
    // Check for navigation buttons
    expect(screen.getByRole('button', { name: /previous/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument()
    expect(screen.getByText('Today')).toBeInTheDocument()
  })

  it('should show week day headers in calendar', () => {
    render(<RecurringDatePicker />)

    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    weekDays.forEach(day => {
      expect(screen.getByText(day)).toBeInTheDocument()
    })
  })

  it('should display generated dates in list format', () => {
    render(<RecurringDatePicker />)

    // Check for generated dates
    expect(screen.getByText('Jan 01, 2024')).toBeInTheDocument()
    expect(screen.getByText('Jan 02, 2024')).toBeInTheDocument()
    expect(screen.getByText('Jan 03, 2024')).toBeInTheDocument()
  })

  it('should have proper accessibility attributes', () => {
    render(<RecurringDatePicker />)

    // Check for proper labels
    expect(screen.getByLabelText('Start Date *')).toBeInTheDocument()
    expect(screen.getByLabelText('End Date (Optional)')).toBeInTheDocument()

    // Check for proper button roles
    const buttons = screen.getAllByRole('button')
    buttons.forEach(button => {
      expect(button).toBeInTheDocument()
    })
  })

  it('should handle date input changes', async () => {
    const user = userEvent.setup()
    render(<RecurringDatePicker />)

    const startDateInput = screen.getByLabelText('Start Date *')
    
    await user.clear(startDateInput)
    await user.type(startDateInput, '2024-02-15')
    
    expect(startDateInput).toHaveValue('2024-02-15')
  })

  it('should show clear button for end date when set', () => {
    render(<RecurringDatePicker />)

    const endDateInput = screen.getByLabelText('End Date (Optional)')
    fireEvent.change(endDateInput, { target: { value: '2024-12-31' } })

    // The clear button should appear
    expect(screen.getByText('Clear')).toBeInTheDocument()
  })

  it('should display proper month navigation in calendar', () => {
    render(<RecurringDatePicker />)

    // Check for month display
    expect(screen.getByText('January 2024')).toBeInTheDocument()
  })

  it('should show calendar legend', () => {
    render(<RecurringDatePicker />)

    expect(screen.getByText('Selected')).toBeInTheDocument()
    expect(screen.getByText('Today')).toBeInTheDocument()
  })

  it('should display summary information', () => {
    render(<RecurringDatePicker />)

    expect(screen.getByText('3 recurring dates generated')).toBeInTheDocument()
    expect(screen.getByText('Next: 1/1/2024')).toBeInTheDocument()
  })
}) 