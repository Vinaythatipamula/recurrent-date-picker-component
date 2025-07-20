'use client'

import { useState } from 'react'
import useRecurringDateStore from '../store/recurringDateStore'
import { 
  generateCalendarDays, 
  isInCurrentMonth, 
  isDateSelected, 
  getMonthName,
  getShortDayName
} from '../utils/dateUtils'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const MiniCalendar = () => {
  const { generatedDates } = useRecurringDateStore()
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const calendarDays = generateCalendarDays(currentMonth)
  const weekDays = Array.from({ length: 7 }, (_, i) => getShortDayName(i))

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const goToToday = () => {
    setCurrentMonth(new Date())
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Calendar Preview</h3>
      
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={goToPreviousMonth}
            className="p-1 hover:bg-gray-100 rounded-md transition-colors"
          >
            <ChevronLeft size={20} className="text-gray-600" />
          </button>
          
          <div className="flex items-center space-x-2">
            <h4 className="text-lg font-medium text-gray-900">
              {getMonthName(currentMonth)}
            </h4>
            <button
              onClick={goToToday}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              Today
            </button>
          </div>
          
          <button
            onClick={goToNextMonth}
            className="p-1 hover:bg-gray-100 rounded-md transition-colors"
          >
            <ChevronRight size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Week Days Header */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map((day) => (
            <div
              key={day}
              className="text-center text-xs font-medium text-gray-500 py-1"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, index) => {
            const isCurrentMonth = isInCurrentMonth(day, currentMonth)
            const isSelected = isDateSelected(day, generatedDates)
            const isToday = new Date().toDateString() === day.toDateString()

            return (
              <div
                key={index}
                className={`
                  aspect-square flex items-center justify-center text-sm rounded-md cursor-pointer transition-colors
                  ${isCurrentMonth ? 'text-gray-900' : 'text-gray-400'}
                  ${isToday ? 'bg-primary-100 text-primary-700 font-semibold' : ''}
                  ${isSelected ? 'bg-primary-600 text-white font-semibold' : ''}
                  ${!isCurrentMonth ? 'hover:bg-gray-50' : 'hover:bg-gray-100'}
                  ${isSelected && isToday ? 'ring-2 ring-primary-300' : ''}
                `}
              >
                {day.getDate()}
              </div>
            )
          })}
        </div>

        {/* Legend */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-center space-x-4 text-xs">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-primary-600 rounded-sm"></div>
              <span className="text-gray-600">Selected</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-primary-100 rounded-sm"></div>
              <span className="text-gray-600">Today</span>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="text-center">
            <p className="text-sm text-gray-600">
              {generatedDates.length} recurring date{generatedDates.length !== 1 ? 's' : ''} generated
            </p>
            {generatedDates.length > 0 && (
              <p className="text-xs text-gray-500 mt-1">
                Next: {generatedDates[0]?.toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MiniCalendar 