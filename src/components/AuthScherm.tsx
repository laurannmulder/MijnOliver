import type { ReactNode } from 'react'
import { Merk } from './Merk'
import { Kaart } from './ui'

/** Gedeelde opmaak voor alle uitgelogde schermen (inloggen, wachtwoord, uitnodiging). */
export function AuthScherm({ titel, children }: { titel: string; children: ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <Merk hoogte={36} />
      <Kaart className="w-full max-w-sm">
        <h1 className="mb-4 text-lg font-semibold tracking-tight">{titel}</h1>
        {children}
      </Kaart>
    </main>
  )
}
