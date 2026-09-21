'use client'

import { useEffect, useRef } from 'react'
import { publiek } from '@/klanten/unitedvisions/lib/pad'

// Autoplay-video als sfeerbeeld. Wie "beperk beweging" aan heeft staan, krijgt
// alleen de poster te zien.
export function VideoAchtergrond({ bestand, poster }: { bestand: string; poster?: string }) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) video.pause()
  }, [])

  return (
    <video
      ref={ref}
      className="absolute inset-0 size-full object-cover"
      src={publiek(`video/${bestand}`)}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden
    />
  )
}
