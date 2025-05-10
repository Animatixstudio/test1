"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import VideoPlayer from "./video-player"

gsap.registerPlugin(ScrollTrigger)

interface FeaturedProjectProps {
  title: string
  description: string
  videoSrc: string
  client: string
  technologies: string[]
}

export default function FeaturedProject({ title, description, videoSrc, client, technologies }: FeaturedProjectProps) {
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
      className="relative rounded-xl overflow-hidden border border-white/30 hover:border-white/70 transition-all duration-300 group"
    >
      <div className="aspect-w-16 aspect-h-9 w-full">
        <VideoPlayer src={videoSrc} poster="/video-poster.png" />
      </div>

      {/* Text overlay with strong gradient for better visibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40 flex flex-col justify-end p-4 md:p-8 pointer-events-none">
        {/* Mobile-optimized text with shadows */}
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 text-shadow-lg">{title}</h3>
        <p className="text-gray-200 mb-4 max-w-2xl text-shadow-md">{description}</p>

        {/* Responsive client and technologies display */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
          <span className="text-sm text-white text-shadow-sm font-medium">Client: {client}</span>
          <span className="hidden sm:inline text-white/70">|</span>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <span key={tech} className="text-sm bg-black/60 backdrop-blur-sm px-2 py-1 rounded-md text-white">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
