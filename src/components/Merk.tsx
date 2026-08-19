import Image from 'next/image'

/**
 * Het Oliver-woordmerk. De verhouding volgt het bestand (260×80, dus circa
 * 3,25× zo breed als hoog); wisselt het logo, dan hoort die factor mee te
 * veranderen. Het component staat los zodat public/logo.svg vervangen genoeg
 * is — geen enkele pagina verwijst zelf naar een bestandsnaam.
 */
export function Merk({ hoogte = 32 }: { hoogte?: number }) {
  return (
    <Image
      src="/logo.svg"
      alt="Oliver"
      width={Math.round(hoogte * 3.25)}
      height={hoogte}
      priority
      style={{ height: hoogte, width: 'auto' }}
    />
  )
}
