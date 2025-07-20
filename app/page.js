'use client'

import RecurringDatePicker from '../components/RecurringDatePicker'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Recurring Date Picker Demo
        </h1>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <RecurringDatePicker />
        </div>
      </div>
    </div>
  )
} 