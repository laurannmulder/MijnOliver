import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Oliver Intelligence | Slimme tools voor verzekeringen, letselschade, energie en vastgoed',
  description:
    'Oliver Intelligence bouwt online tools voor professionals die werken met jaarcijfers, dossiers en openbare registers.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  )
}
