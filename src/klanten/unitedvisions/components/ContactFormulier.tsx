'use client'

import { useActionState } from 'react'
import { ArrowUpRight, CheckCircle2 } from 'lucide-react'
import { verstuurAanvraag, type ContactStatus } from '@/app/unitedvisions/contact/actions'
import { ONDERWERPEN } from '@/klanten/unitedvisions/lib/inhoud'

const BEGIN: ContactStatus = { soort: 'leeg' }

const invoer =
  'mt-2 w-full rounded-none border-0 border-b border-inkt/20 bg-transparent px-0 py-3 text-base text-inkt placeholder:text-inkt/35 focus:border-rood focus:outline-none focus:ring-0'
const label = 'label text-inkt/60'

export function ContactFormulier({ onderwerp }: { onderwerp?: string }) {
  const [status, verstuur, bezig] = useActionState(verstuurAanvraag, BEGIN)

  if (status.soort === 'gelukt') {
    return (
      <div role="status" className="flex flex-col items-start gap-4 py-10">
        <CheckCircle2 className="size-10 text-rood" aria-hidden />
        <h3 className="kop text-3xl">Bedankt!</h3>
        <p className="text-inkt/70">We hebben uw bericht ontvangen en nemen zo snel mogelijk contact met u op.</p>
      </div>
    )
  }

  const w = status.soort === 'fout' ? status.waarden : undefined

  return (
    // De key forceert een verse render met de teruggegeven waarden na een fout.
    <form key={JSON.stringify(w)} action={verstuur} className="relative flex flex-col gap-7">
      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <label htmlFor="naam" className={label}>Naam *</label>
          <input id="naam" name="naam" defaultValue={w?.naam} required maxLength={200} autoComplete="name" className={invoer} />
        </div>
        <div>
          <label htmlFor="email" className={label}>E-mailadres *</label>
          <input id="email" name="email" type="email" defaultValue={w?.email} required maxLength={320} autoComplete="email" className={invoer} />
        </div>
        <div>
          <label htmlFor="telefoon" className={label}>Telefoonnummer</label>
          <input id="telefoon" name="telefoon" type="tel" defaultValue={w?.telefoon} maxLength={40} autoComplete="tel" className={invoer} />
        </div>
        <div>
          <label htmlFor="datum" className={label}>Datum evenement</label>
          <input id="datum" name="datum" defaultValue={w?.datum} maxLength={40} placeholder="Bijv. 14 maart of nog onbekend" className={invoer} />
        </div>
      </div>

      <fieldset>
        <legend className={label}>Waar gaat het over?</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {ONDERWERPEN.map((o) => (
            <label key={o} className="cursor-pointer">
              <input
                type="radio"
                name="onderwerp"
                value={o}
                defaultChecked={(w?.onderwerp ?? onderwerp) === o}
                className="peer sr-only"
              />
              <span className="inline-block rounded-full border border-inkt/20 px-4 py-2 text-sm transition-colors peer-checked:border-rood peer-checked:bg-rood peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-rood hover:border-inkt">
                {o}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="bericht" className={label}>Uw vraag *</label>
        <textarea
          id="bericht"
          name="bericht"
          defaultValue={w?.bericht}
          required
          rows={5}
          maxLength={5000}
          placeholder="Vertel kort over uw evenement: locatie, aantal gasten, wat u voor ogen heeft."
          className={`${invoer} resize-y`}
        />
      </div>

      {/* Honeypot: onzichtbaar voor mensen, zie verstuurAanvraag. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {status.soort === 'fout' && (
        <p role="alert" className="border-l-2 border-rood bg-rood/10 px-4 py-3 text-sm text-inkt">{status.melding}</p>
      )}

      <button
        type="submit"
        disabled={bezig}
        className="group inline-flex items-center gap-2 self-start rounded-full bg-rood px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-rood-donker disabled:opacity-60"
      >
        {bezig ? 'Versturen…' : 'Verstuur aanvraag'}
        <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
      </button>
    </form>
  )
}
