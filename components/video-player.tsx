"use client"

import { useRef, useState, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"
import Image from "next/image"

interface VideoPlayerProps {
  src: string
  poster?: string
  className?: string
}

export default function VideoPlayer({ src, poster = "/video-poster.png", className = "" }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const playPromiseRef = useRef<Promise<void> | null>(null)

  // Ensure proper path format for src
  const videoSrc = src.startsWith("/") ? src : `/${src}`

  // Handle video loading
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleCanPlay = () => {
      setIsLoaded(true)
    }

    const handleError = (e: Event) => {
      console.error(`Error loading video: ${videoSrc}`, e)
      setHasError(true)
    }

    // Add event listeners
    video.addEventListener("canplay", handleCanPlay)
    video.addEventListener("error", handleError)

    // Check if video is already loaded
    if (video.readyState >= 3) {
      setIsLoaded(true)
    }

    // Cleanup
    return () => {
      video.removeEventListener("canplay", handleCanPlay)
      video.removeEventListener("error", handleError)
    }
  }, [videoSrc])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video || hasError) return

    try {
      if (video.paused) {
        // Only attempt to play if we're not already in the middle of a play operation
        if (!playPromiseRef.current) {
          // Store the play promise so we can track its state
          playPromiseRef.current = video.play()

          if (playPromiseRef.current !== undefined) {
            playPromiseRef.current
              .then(() => {
                // Play succeeded
                setIsPlaying(true)
                playPromiseRef.current = null
              })
              .catch((error) => {
                // Play failed
                console.log("Video play error:", error)
                playPromiseRef.current = null

                // Only set error if it's not an abort error (which happens when play is interrupted)
                if (error.name !== "AbortError") {
                  setHasError(true)
                }
              })
          }
        }
      } else {
        // Only pause if we're not in the middle of a play operation
        if (!playPromiseRef.current) {
          video.pause()
          setIsPlaying(false)
        } else {
          // If there's a pending play operation, wait for it to complete before pausing
          playPromiseRef.current
            .then(() => {
              video.pause()
              setIsPlaying(false)
              playPromiseRef.current = null
            })
            .catch(() => {
              // If play failed, reset the promise ref
              playPromiseRef.current = null
            })
        }
      }
    } catch (err) {
      console.error("Error attempting to play/pause video:", err)
    }
  }

  // Toggle mute
  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    video.muted = !video.muted
    setIsMuted(video.muted)
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
        <div className="text-center p-4 relative z-10">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-black/40 flex items-center justify-center">
            <Play className="h-8 w-8 text-white opacity-50" />
          </div>
          <p className="text-white text-shadow-md">Video preview not available</p>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`relative w-full h-full ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        poster={poster}
        loop
        muted={isMuted}
        playsInline
        preload="metadata"
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser doesn't support HTML5 video.
      </video>

      {/* Loading Overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
        </div>
      )}

      {/* Play/Pause Button */}
      <div
        className="absolute inset-0 flex items-center justify-center cursor-pointer"
        onClick={togglePlay}
        aria-label={isPlaying ? "Pause video" : "Play video"}
      >
        {!isPlaying && (
          <div className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:bg-black/60">
            <Play className="h-8 w-8 text-white" />
          </div>
        )}
      </div>

      {/* Controls - Only show on hover or when playing */}
      <div
        className={`absolute bottom-4 right-4 flex space-x-2 transition-opacity duration-300 ${
          isHovering || isPlaying ? "opacity-100" : "opacity-0"
        }`}
      >
        {isPlaying && (
          <button
            className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center"
            onClick={togglePlay}
            aria-label="Pause"
          >
            <Pause className="h-5 w-5 text-white" />
          </button>
        )}
        <button
          className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center"
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX className="h-5 w-5 text-white" /> : <Volume2 className="h-5 w-5 text-white" />}
        </button>
      </div>
    </div>
  )
}
