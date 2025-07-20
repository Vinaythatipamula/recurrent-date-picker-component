'use client'

import { useState } from 'react'
import useRecurringDateStore from '../store/recurringDateStore'
import { getDayName, getWeekLabel } from '../utils/dateUtils'
import { ChevronDown, ChevronUp } from 'lucide-react'

const RecurrenceOptions = () => {
  const {
    recurrenceType,
    interval,
    selectedWeekDays,
    monthlyType,
    dayOfMonth,
    weekOfMonth,
    dayOfWeek,
    setRecurrenceType,
    setInterval,
    setSelectedWeekDays,
    setMonthlyType,
    setDayOfMonth,
    setWeekOfMonth,
    setDayOfWeek
  } = useRecurringDateStore()

  const [isExpanded, setIsExpanded] = useState(false)

  const handleWeekDayToggle = (dayIndex) => {
    const newSelectedDays = selectedWeekDays.includes(dayIndex)
      ? selectedWeekDays.filter(day => day !== dayIndex)
      : [...selectedWeekDays, dayIndex].sort()
    setSelectedWeekDays(newSelectedDays)
  }

  const recurrenceTypes = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly' }
  ]

  const weekDays = [
    { value: 0, label: 'Sunday' },
    { value: 1, label: 'Monday' },
    { value: 2, label: 'Tuesday' },
    { value: 3, label: 'Wednesday' },
    { value: 4, label: 'Thursday' },
    { value: 5, label: 'Friday' },
    { value: 6, label: 'Saturday' }
  ]

  const monthDays = Array.from({ length: 31 }, (_, i) => i + 1)
  const weeksOfMonth = [
    { value: 1, label: '1st' },
    { value: 2, label: '2nd' },
    { value: 3, label: '3rd' },
    { value: 4, label: '4th' },
    { value: 5, label: '5th' }
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Recurrence Options</h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center text-sm text-gray-600 hover:text-gray-900"
        >
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          {isExpanded ? 'Collapse' : 'Expand'}
        </button>
      </div>

      <div className={`space-y-4 ${isExpanded ? 'block' : 'hidden'}`}>
        {/* Recurrence Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Recurrence Type
          </label>
          <div className="grid grid-cols-2 gap-2">
            {recurrenceTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => setRecurrenceType(type.value)}
                className={`px-3 py-2 text-sm rounded-md border transition-colors ${
                  recurrenceType === type.value
                    ? 'bg-primary-600 text-white border-primary-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-primary-300'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Interval */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Every {interval} {recurrenceType.slice(0, -2)}
            {interval > 1 ? 's' : ''}
          </label>
          <input
            type="number"
            min="1"
            max="99"
            value={interval}
            onChange={(e) => setInterval(parseInt(e.target.value) || 1)}
            className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Weekly Options */}
        {recurrenceType === 'weekly' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Days of the Week
            </label>
            <div className="grid grid-cols-2 gap-2">
              {weekDays.map((day) => (
                <button
                  key={day.value}
                  onClick={() => handleWeekDayToggle(day.value)}
                  className={`px-3 py-2 text-sm rounded-md border transition-colors ${
                    selectedWeekDays.includes(day.value)
                      ? 'bg-primary-600 text-white border-primary-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-primary-300'
                  }`}
                >
                  {day.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Monthly Options */}
        {recurrenceType === 'monthly' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Pattern
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setMonthlyType('dayOfMonth')}
                  className={`px-3 py-2 text-sm rounded-md border transition-colors ${
                    monthlyType === 'dayOfMonth'
                      ? 'bg-primary-600 text-white border-primary-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-primary-300'
                  }`}
                >
                  Day of Month
                </button>
                <button
                  onClick={() => setMonthlyType('dayOfWeek')}
                  className={`px-3 py-2 text-sm rounded-md border transition-colors ${
                    monthlyType === 'dayOfWeek'
                      ? 'bg-primary-600 text-white border-primary-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-primary-300'
                  }`}
                >
                  Day of Week
                </button>
              </div>
            </div>

            {monthlyType === 'dayOfMonth' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Day of Month
                </label>
                <select
                  value={dayOfMonth}
                  onChange={(e) => setDayOfMonth(parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {monthDays.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {monthlyType === 'dayOfWeek' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Week of Month
                  </label>
                  <select
                    value={weekOfMonth}
                    onChange={(e) => setWeekOfMonth(parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    {weeksOfMonth.map((week) => (
                      <option key={week.value} value={week.value}>
                        {week.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Day of Week
                  </label>
                  <select
                    value={dayOfWeek}
                    onChange={(e) => setDayOfWeek(parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    {weekDays.map((day) => (
                      <option key={day.value} value={day.value}>
                        {day.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default RecurrenceOptions 