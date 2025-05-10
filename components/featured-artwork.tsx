"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface FeaturedArtworkProps {
  title: string
  description: string
  imageSrc: string
  client: string
  tags: string[]
}

export default function FeaturedArtwork({ title, description, imageSrc, client, tags }: FeaturedArtworkProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      },
    )
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative rounded-xl overflow-hidden border border-white/30 hover:border-white/70 transition-all duration-300"
    >
      <div className="aspect-w-16 aspect-h-9 w-full">
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex flex-col justify-end p-6 md:p-8">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-300 mb-4 max-w-2xl">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-sm text-white/70">Client: {client}</span>
          <span className="text-sm text-white/70">|</span>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="text-sm bg-white/10 px-2 py-1 rounded-md text-white/90">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
