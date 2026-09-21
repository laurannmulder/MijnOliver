import Image, { type StaticImageData } from 'next/image'
import { VideoAchtergrond } from './VideoAchtergrond'

type Props = {
  label: string
  titel: React.ReactNode
  intro?: string
  video?: string
  beeld?: StaticImageData
}

export function PaginaKop({ label, titel, intro, video, beeld }: Props) {
  return (
    <section className="relative isolate flex min-h-[70svh] items-end overflow-hidden pt-32">
      {beeld && (
        <Image src={beeld} alt="" fill preload sizes="100vw" className="-z-20 object-cover" placeholder="blur" />
      )}
      {video && <div className="absolute inset-0 -z-10"><VideoAchtergrond bestand={video} poster={beeld?.src} /></div>}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-zwart via-zwart/60 to-zwart/30" />
      <div className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-8 sm:pb-20">
        <p className="label opkomen text-rood">{label}</p>
        <h1 className="kop opkomen mt-5 max-w-5xl text-[clamp(2.1rem,9vw,4.5rem)] [animation-delay:100ms] lg:text-8xl">{titel}</h1>
        {intro && <p className="opkomen mt-6 max-w-2xl text-lg text-white/75 [animation-delay:200ms]">{intro}</p>}
      </div>
    </section>
  )
}
