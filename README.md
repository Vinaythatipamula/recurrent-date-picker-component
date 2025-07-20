# Recurring Date Picker (Next.js)

A reusable and customizable recurring date picker component built with **Next.js**, **React**, **Zustand**, and **Tailwind CSS**. Easily generate and export recurring date patterns for events, tasks, and more.

## Features

- **Flexible Recurrence Options**: Daily, weekly, monthly, and yearly patterns
- **Custom Intervals**: Set intervals (e.g., every 2 weeks, every 3 months)
- **Weekly & Monthly Customization**: Select specific weekdays or monthly patterns (day of month or day of week)
- **Date Range Selection**: Choose start and optional end dates
- **Live Calendar Preview**: Visualize generated dates on a calendar
- **Export Options**: Copy to clipboard, export as CSV or JSON
- **Responsive UI**: Modern, accessible, and mobile-friendly design
- **State Management**: Powered by Zustand
- **Unit & Integration Tests**: Jest and Testing Library

## Getting Started

### Prerequisites
- Node.js
- npm

### Installation

```bash
# Clone the repository
$ git clone <your-repo-url>
$ cd recurrent-date-picker-nextjs

# Install dependencies
$ npm install

### Running the Development Server

```bash
npm run dev

Visit [http://localhost:3000](http://localhost:3000) to view the app.

### Building for Production

```bash
npm run build
npm start
```

## Usage

The main component is `RecurringDatePicker`. You can use it in your Next.js pages or React components:

```jsx
import RecurringDatePicker from '../components/RecurringDatePicker';

export default function Home() {
  return (
    <RecurringDatePicker />
  );
}
```

## Project Structure

- `components/` – UI components (RecurringDatePicker, RecurrenceOptions, DateRangePicker, MiniCalendar)
- `store/` – Zustand store for recurrence state
- `utils/` – Date utility functions
- `app/` – Next.js app directory (entry point, layout, global styles)
- `__tests__/` – Unit and integration tests

## Testing

Run all tests:
```bash
npm test

Run tests in watch mode:
```bash
npm run test:watch
```

Check test coverage:
```bash
npm run test:coverage
```

## Technologies Used
- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Tailwind CSS](https://tailwindcss.com/)
- [date-fns](https://date-fns.org/)
- [Jest](https://jestjs.io/) & [Testing Library](https://testing-library.com/)

## License

This project is licensed under the MIT License. 
