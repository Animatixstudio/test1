"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import VideoPlayer from "./video-player"

gsap.registerPlugin(ScrollTrigger)

interface VideoShowcaseProps {
  title: string
  description: string
  videoSrc: string
  client: string
}

export default function VideoShowcase({ title, description, videoSrc, client }: VideoShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
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

      <div className="p-4 bg-black/50">
        <h3 className="text-xl font-bold text-shadow-sm">{title}</h3>
        <p className="text-gray-300 text-sm mb-2">{description}</p>
        <p className="text-sm text-purple-400">Client: {client}</p>
      </div>
    </div>
  )
}
