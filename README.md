# Recurring Date Picker

A comprehensive, reusable recurring date picker component built with Next.js, React, Tailwind CSS, and Zustand. This component allows users to create complex recurring date patterns similar to those found in popular task management apps like TickTick.

## Features

### 🗓️ Recurrence Options
- **Daily**: Every X days
- **Weekly**: Every X weeks on specific days
- **Monthly**: Every X months on specific day or day-of-week pattern
- **Yearly**: Every X years on the same date

### 🎛️ Customization Features
- **Interval Control**: Set "Every X days/weeks/months/years"
- **Day Selection**: Choose specific days of the week for weekly patterns
- **Advanced Monthly Patterns**: 
  - Day of month (e.g., "15th of every month")
  - Day of week patterns (e.g., "2nd Tuesday of every month")

### 📅 Date Range Management
- **Start Date**: Required start date for the pattern
- **End Date**: Optional end date to limit the recurrence
- **Flexible Range**: No end date means unlimited recurrence

### 📊 Visual Features
- **Mini Calendar Preview**: Interactive calendar showing selected dates
- **Real-time Updates**: Calendar updates as you modify settings
- **Date List**: Scrollable list of all generated dates
- **Export Options**: Copy to clipboard, CSV, and JSON export

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: JavaScript (ES6+)
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Date Utilities**: date-fns
- **Icons**: Lucide React
- **Testing**: Jest + React Testing Library

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd recurrent-date-picker-nextjs
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Basic Usage

```jsx
import RecurringDatePicker from './components/RecurringDatePicker'

function App() {
  return (
    <div className="container mx-auto p-4">
      <RecurringDatePicker />
    </div>
  )
}
```

### Using Individual Components

You can also use the individual components separately:

```jsx
import RecurrenceOptions from './components/RecurrenceOptions'
import DateRangePicker from './components/DateRangePicker'
import MiniCalendar from './components/MiniCalendar'
import useRecurringDateStore from './store/recurringDateStore'

function CustomDatePicker() {
  const { generatedDates } = useRecurringDateStore()
  
  return (
    <div>
      <RecurrenceOptions />
      <DateRangePicker />
      <MiniCalendar />
      <div>
        Generated Dates: {generatedDates.length}
      </div>
    </div>
  )
}
```

## Component Architecture

### Main Components

1. **RecurringDatePicker** (`components/RecurringDatePicker.js`)
   - Main component that orchestrates all sub-components
   - Handles pattern description and export functionality

2. **RecurrenceOptions** (`components/RecurrenceOptions.js`)
   - Manages recurrence type selection (daily, weekly, monthly, yearly)
   - Handles interval settings and specific pattern options

3. **DateRangePicker** (`components/DateRangePicker.js`)
   - Manages start and end date selection
   - Provides date input validation

4. **MiniCalendar** (`components/MiniCalendar.js`)
   - Displays interactive calendar preview
   - Shows selected dates with visual indicators

### State Management

The component uses Zustand for state management with the following store structure:

```javascript
{
  // Basic settings
  recurrenceType: 'daily' | 'weekly' | 'monthly' | 'yearly',
  interval: number,
  startDate: Date,
  endDate: Date | null,
  
  // Weekly specific
  selectedWeekDays: number[],
  
  // Monthly specific
  monthlyType: 'dayOfMonth' | 'dayOfWeek',
  dayOfMonth: number,
  weekOfMonth: number,
  dayOfWeek: number,
  
  // Generated data
  generatedDates: Date[]
}
```

### Utility Functions

The `utils/dateUtils.js` file contains helper functions for:
- Date formatting and parsing
- Calendar generation
- Date comparison and validation
- Week and month calculations

## Testing

The project includes comprehensive testing with Jest and React Testing Library:

### Run Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Structure
- **Unit Tests**: Test individual utility functions and store logic
- **Integration Tests**: Test complete component functionality
- **Component Tests**: Test individual component behavior

## Customization

### Styling
The component uses Tailwind CSS classes and can be customized by:
- Modifying the Tailwind configuration
- Overriding component classes
- Using CSS custom properties

### Adding New Recurrence Types
To add new recurrence types:

1. Update the store with new state properties
2. Add logic to the `generateDates` function
3. Create UI components for the new options
4. Update the pattern description logic

### Extending Export Options
Add new export formats by:
1. Creating new export functions
2. Adding export buttons to the main component
3. Implementing the export logic

## API Reference

### RecurringDatePicker Props
The main component doesn't accept props but can be customized through the store.

### Store Actions
```javascript
const store = useRecurringDateStore()

// Basic actions
store.setRecurrenceType('weekly')
store.setInterval(2)
store.setStartDate(new Date())
store.setEndDate(new Date())

// Weekly actions
store.setSelectedWeekDays([1, 3, 5]) // Monday, Wednesday, Friday

// Monthly actions
store.setMonthlyType('dayOfWeek')
store.setDayOfMonth(15)
store.setWeekOfMonth(2)
store.setDayOfWeek(1)

// Utility actions
store.generateDates()
store.reset()
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Acknowledgments

- Inspired by recurring date patterns in TickTick and other task management apps
- Built with modern React patterns and best practices
- Uses date-fns for reliable date manipulation
- Styled with Tailwind CSS for consistent design 