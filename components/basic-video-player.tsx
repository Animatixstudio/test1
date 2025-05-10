"use client"

import { useRef, useState } from "react"
import { Play } from "lucide-react"
import Image from "next/image"

interface BasicVideoPlayerProps {
  src: string
  poster?: string
  className?: string
}

export default function BasicVideoPlayer({ src, poster = "/video-poster.png", className = "" }: BasicVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasError, setHasError] = useState(false)

  // Ensure proper path format for src
  const videoSrc = src.startsWith("/") ? src : `/${src}`

  const handlePlay = () => {
    if (hasError || !videoRef.current) return

    try {
      if (!isPlaying) {
        // Simple play with minimal state management
        videoRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.error("Video play error:", err)
            setHasError(true)
          })
      }
    } catch (err) {
      console.error("Error playing video:", err)
      setHasError(true)
    }
  }

  // If there's an error, show a fallback
  if (hasError) {
    return (
      <div
        className={`relative w-full h-full ${className} bg-gradient-to-br from-purple-900 to-blue-900 flex items-center justify-center`}
      >
        {poster && (
          <div className="absolute inset-0">
            <Image
              src={poster || "/placeholder.svg"}
              alt="Video poster"
              fill
              className="object-cover opacity-30"
              priority
            />
          </div>
        )}
        <p className="text-white text-shadow-md">Video preview not available</p>
      </div>
    )
  }

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* Video Element */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        poster={poster}
        loop
        muted
        playsInline
        preload="metadata"
        onError={() => setHasError(true)}
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser doesn't support HTML5 video.
      </video>

      {/* Simple Play Button - Only show when not playing */}
      {!isPlaying && (
        <div
          className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/20"
          onClick={handlePlay}
        >
          <div className="w-16 h-16 rounded-full bg-black/40 flex items-center justify-center">
            <Play className="h-8 w-8 text-white" />
          </div>
        </div>
      )}
    </div>
  )
}
