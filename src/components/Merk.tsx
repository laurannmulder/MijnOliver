import Image from 'next/image'

/**
 * Het MijnOliver-woordmerk. Staat los zodat het vervangen van public/logo.svg
 * genoeg is als het echte logo er is — geen enkele pagina verwijst zelf naar
 * een bestandsnaam.
 */
export function Merk({ hoogte = 32 }: { hoogte?: number }) {
  return (
    <Image
      src="/logo.svg"
      alt="MijnOliver"
      width={hoogte * 5}
      height={hoogte}
      priority
      style={{ height: hoogte, width: 'auto' }}
    />
  )
}
