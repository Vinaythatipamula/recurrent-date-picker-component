import './globals.css'

export const metadata = {
  title: 'Recurring Date Picker',
  description: 'A reusable recurring date picker component built with Next.js',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        {children}
      </body>
    </html>
  )
} 