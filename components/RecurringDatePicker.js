'use client'

import { useEffect } from 'react'
import useRecurringDateStore from '../store/recurringDateStore'
import RecurrenceOptions from './RecurrenceOptions'
import DateRangePicker from './DateRangePicker'
import MiniCalendar from './MiniCalendar'
import { formatDate } from '../utils/dateUtils'
import { RotateCcw } from 'lucide-react'

const RecurringDatePicker = () => {
  const {
    startDate,
    endDate,
    recurrenceType,
    interval,
    selectedWeekDays,
    monthlyType,
    dayOfMonth,
    weekOfMonth,
    dayOfWeek,
    generatedDates,
    reset,
    generateDates
  } = useRecurringDateStore()

  // Generate dates on component mount
  useEffect(() => {
    generateDates()
  }, [generateDates])

  const getRecurrenceDescription = () => {
    let description = `Every ${interval > 1 ? interval : ''} ${recurrenceType.slice(0, -2)}${interval > 1 ? 's' : ''}`
    
    switch (recurrenceType) {
      case 'weekly':
        if (selectedWeekDays.length > 0) {
          const dayNames = selectedWeekDays.map(day => ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][day])
          description += ` on ${dayNames.join(', ')}`
        }
        break
      case 'monthly':
        if (monthlyType === 'dayOfMonth') {
          description += ` on day ${dayOfMonth}`
        } else {
          const weekLabels = ['', '1st', '2nd', '3rd', '4th', '5th']
          const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
          description += ` on the ${weekLabels[weekOfMonth]} ${dayNames[dayOfWeek]}`
        }
        break
    }
    
    description += ` starting ${formatDate(startDate)}`
    if (endDate) {
      description += ` until ${formatDate(endDate)}`
    }
    
    return description
  }

  const handleReset = () => {
    reset()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Recurring Date Picker</h2>
          <p className="text-gray-600 mt-1">
            Create recurring date patterns for your events and tasks
          </p>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
        >
          <RotateCcw size={16} />
          <span>Reset</span>
        </button>
      </div>

      {/* Current Pattern Display */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-900 mb-2">Current Pattern</h3>
        <p className="text-blue-800">{getRecurrenceDescription()}</p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Controls */}
        <div className="space-y-6">
          <RecurrenceOptions />
          <DateRangePicker />
        </div>

        {/* Right Column - Calendar Preview */}
        <div>
          <MiniCalendar />
        </div>
      </div>

      {/* Generated Dates List */}
      {generatedDates.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Generated Dates ({generatedDates.length})
          </h3>
          <div className="bg-white border border-gray-200 rounded-lg p-4 max-h-64 overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {generatedDates.slice(0, 30).map((date, index) => (
                <div
                  key={index}
                  className="px-3 py-2 bg-gray-50 rounded-md text-sm text-gray-700"
                >
                  {formatDate(date)}
                </div>
              ))}
              {generatedDates.length > 30 && (
                <div className="px-3 py-2 text-sm text-gray-500 italic">
                  ... and {generatedDates.length - 30} more dates
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Export Section */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Options</h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => {
              const datesText = generatedDates.map(date => formatDate(date)).join('\n')
              navigator.clipboard.writeText(datesText)
            }}
            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
          >
            Copy to Clipboard
          </button>
          <button
            onClick={() => {
              const csvContent = 'Date\n' + generatedDates.map(date => formatDate(date)).join('\n')
              const blob = new Blob([csvContent], { type: 'text/csv' })
              const url = window.URL.createObjectURL(blob)
              const a = document.createElement('a')
              a.href = url
              a.download = 'recurring-dates.csv'
              a.click()
            }}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Export as CSV
          </button>
          <button
            onClick={() => {
              const jsonContent = JSON.stringify({
                pattern: getRecurrenceDescription(),
                dates: generatedDates.map(date => date.toISOString())
              }, null, 2)
              const blob = new Blob([jsonContent], { type: 'application/json' })
              const url = window.URL.createObjectURL(blob)
              const a = document.createElement('a')
              a.href = url
              a.download = 'recurring-dates.json'
              a.click()
            }}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            Export as JSON
          </button>
        </div>
      </div>
    </div>
  )
}

export default RecurringDatePicker 