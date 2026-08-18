import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MijnOliver',
  description: 'Centrale toegang tot de MijnOliver-tools.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  )
}
