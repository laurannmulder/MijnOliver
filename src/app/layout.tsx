import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Oliver Intelligence | Data, AI en automatisering voor organisaties',
  description:
    'Oliver Intelligence helpt organisaties in uiteenlopende sectoren slimmer werken met data, kunstmatige intelligentie en automatisering.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  )
}
