'use client'

export function VerwijderKnop({ naam }: { naam: string }) {
  return (
    <button
      type="submit"
      className="text-sm text-red-600 underline-offset-4 hover:underline"
      onClick={(event) => {
        if (!window.confirm(`${naam} definitief verwijderen? Het account verdwijnt volledig.`)) {
          event.preventDefault()
        }
      }}
    >
      Verwijderen
    </button>
  )
}
