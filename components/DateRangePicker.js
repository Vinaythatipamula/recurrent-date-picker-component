'use client'

import useRecurringDateStore from '../store/recurringDateStore'
import { formatDateForInput } from '../utils/dateUtils'

const DateRangePicker = () => {
  const {
    startDate,
    endDate,
    setStartDate,
    setEndDate
  } = useRecurringDateStore()

  const handleStartDateChange = (e) => {
    const date = new Date(e.target.value)
    setStartDate(date)
  }

  const handleEndDateChange = (e) => {
    const date = e.target.value ? new Date(e.target.value) : null
    setEndDate(date)
  }

  const clearEndDate = () => {
    setEndDate(null)
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Date Range</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Start Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Start Date *
          </label>
          <input
            type="date"
            value={formatDateForInput(startDate)}
            onChange={handleStartDateChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          />
        </div>

        {/* End Date */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              End Date (Optional)
            </label>
            {endDate && (
              <button
                onClick={clearEndDate}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Clear
              </button>
            )}
          </div>
          <input
            type="date"
            value={endDate ? formatDateForInput(endDate) : ''}
            onChange={handleEndDateChange}
            min={formatDateForInput(startDate)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <p className="text-xs text-gray-500 mt-1">
            Leave empty for no end date
          </p>
        </div>
      </div>
    </div>
  )
}

export default DateRangePicker 