"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ArrowLeft, ExternalLink, Volume2, VolumeX, Check } from "lucide-react"
import Link from "next/link"
import PortfolioGallery from "@/components/portfolio-gallery"
import { useRef } from "react"
import Image from "next/image"
import dynamic from "next/dynamic"

// Dynamically import CosmicBackground with SSR disabled
const CosmicBackground = dynamic(() => import("@/components/cosmic-background"), { ssr: false })

// Define proper types for the VideoPlayer props
interface VideoPlayerProps {
  src: string
  poster?: string
}

export default function ThreeDPortfolio() {
  const [isMobile, setIsMobile] = useState(false)
  const [backgroundKey, setBackgroundKey] = useState(Date.now())

  // Add mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Improved video player component with better error handling and no play button
  const VideoPlayer = ({ src, poster = "/video-poster.png" }: VideoPlayerProps) => {
    const videoRef = useRef<HTMLVideoElement | null>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isMuted, setIsMuted] = useState(true)
    const [hasError, setHasError] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
    const playPromiseRef = useRef<Promise<void> | null>(null)

    // Ensure proper path format for src
    const videoSrc = src.startsWith("/") ? src : `/${src}`

    // Handle video loading and errors
    useEffect(() => {
      const video = videoRef.current
      if (!video) return

      const handleCanPlay = () => {
        setIsLoaded(true)
      }

      const handleError = (e: Event) => {
        console.error(`Error with video ${videoSrc}:`, e)
        setHasError(true)
      }

      // Add event listeners
      video.addEventListener("canplay", handleCanPlay)
      video.addEventListener("error", handleError)

      // Check if video is already loaded
      if (video.readyState >= 3) {
        setIsLoaded(true)
      }

      // Auto-play when component mounts (muted)
      video.muted = true
      const playPromise = video.play()

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true)
          })
          .catch((error: Error) => {
            console.log("Auto-play prevented:", error)
            // Don't set error state for autoplay prevention
          })
      }

      // Cleanup
      return () => {
        video.removeEventListener("canplay", handleCanPlay)
        video.removeEventListener("error", handleError)
      }
    }, [videoSrc])

    const handleContainerClick = () => {
      const video = videoRef.current
      if (!video || hasError) return

      try {
        // Only attempt to play if we're not already playing
        if (!isPlaying) {
          // Store the play promise so we can track its state
          playPromiseRef.current = video.play()

          if (playPromiseRef.current !== undefined) {
            playPromiseRef.current
              .then(() => {
                // Play succeeded
                setIsPlaying(true)
                playPromiseRef.current = null
              })
              .catch((error: Error) => {
                // Play failed
                console.log("Video play error:", error)
                playPromiseRef.current = null

                // Only set error if it's not an abort error
                if (error.name !== "AbortError") {
                  setHasError(true)
                }
              })
          }
        }
      } catch (err) {
        console.error("Error attempting to play video:", err)
      }
    }

    const toggleMute = () => {
      const video = videoRef.current
      if (!video) return

      video.muted = !isMuted
      setIsMuted(!isMuted)
    }

    // Prevent right-click context menu
    const preventContextMenu = (e: React.MouseEvent) => {
      e.preventDefault()
      return false
    }

    // If there's an error, show a fallback
    if (hasError) {
      return (
        <div className="relative aspect-video w-full bg-gradient-to-br from-purple-900 to-blue-900 flex items-center justify-center">
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
            <p className="text-white">Video preview not available</p>
          </div>
        </div>
      )
    }

    return (
      <div className="relative aspect-video w-full group cursor-pointer" onClick={handleContainerClick}>
        {/* Video Element */}
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          playsInline
          muted={isMuted}
          loop
          poster={poster}
          onContextMenu={preventContextMenu}
          controlsList="nodownload"
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Loading Overlay */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
          </div>
        )}

        {/* Bottom controls - only mute/unmute button */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation() // Prevent triggering the container click
              toggleMute()
            }}
            className="text-white bg-purple-500/80 hover:bg-purple-500 rounded-full p-1.5 transition-colors"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
        </div>
      </div>
    )
  }

  // 3D Animation Package details
  const packages = [
    {
      title: "Basic",
      features: [
        "HD Quality (1920x1080)",
        "Basic Low-Poly models",
        "Simple Animations",
        "Under 1 minute duration",
        "Changes available as bonus",
      ],
      highlighted: false,
    },
    {
      title: "Standard",
      features: [
        "4K Quality",
        "High Quality models",
        "Advanced animation techniques",
        "1-10 minute duration",
        "First 3 changes included as bonus",
      ],
      highlighted: true,
    },
    {
      title: "Premium",
      features: [
        "8K Quality",
        "Advanced Animation",
        "Detailed models and lighting",
        "Duration as per client requirements",
        "First 5 changes included as bonus",
      ],
      highlighted: false,
    },
  ]

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        {/* Add the cosmic background with the key prop */}
        <div className="absolute inset-0 -z-10">
          <CosmicBackground key={backgroundKey} forceRender={backgroundKey} />
        </div>

        <div className="mb-4 md:mb-8">
          <Link href="/" className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold mt-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
            3D Animation Portfolio
          </h1>
          <p className="mt-4 text-gray-400 max-w-2xl text-sm md:text-base">
            Discover our groundbreaking 3D animations and visual effects created for leading brands and entertainment
            studios. We push the boundaries of what's possible in the digital realm.
          </p>
        </div>

        {/* Featured Project - Hero Video */}
        <div className="relative rounded-xl overflow-hidden bg-gray-900 border border-gray-800">
          <VideoPlayer src={isMobile ? "/hero-page-mobile.mp4" : "/hero-page.mp4"} />
          <div className="p-4 md:p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-white">Cosmic Exploration</h3>
                <p className="text-xs md:text-sm text-gray-400 mt-1">Client: SpaceVentures Inc.</p>
              </div>
              <Link href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
                <ExternalLink className="h-4 md:h-5 w-4 md:w-5" />
                <span className="sr-only">View project</span>
              </Link>
            </div>
            <p className="mt-3 md:mt-4 text-sm md:text-base text-gray-300">
              An immersive journey through a procedurally generated universe, showcasing our ability to create vast,
              detailed environments with dynamic lighting and particle effects.
            </p>
            <div className="mt-3 md:mt-4 flex flex-wrap gap-2">
              {["Cinema 4D", "Octane Render", "After Effects"].map((tech) => (
                <span key={tech} className="px-2 py-1 bg-gray-800 rounded-md text-xs text-gray-300">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Video Showcase Section */}
        <div className="my-12 md:my-20">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
            Animation Reels
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Video 1 */}
            <div className="rounded-xl overflow-hidden bg-gray-900 border border-gray-800 transition-transform hover:scale-[1.02]">
              <VideoPlayer src="/videos_1.mp4" />
              <div className="p-4">
                <h3 className="text-xl font-bold text-white">Ocean Simulation</h3>
                <p className="text-sm text-gray-400 mt-1">Client: Marine Research Institute</p>
                <p className="mt-2 text-gray-300 text-sm">
                  Hyper-realistic ocean simulation with advanced fluid dynamics and light refraction.
                </p>
              </div>
            </div>

            {/* Video 2 */}
            <div className="rounded-xl overflow-hidden bg-gray-900 border border-gray-800 transition-transform hover:scale-[1.02]">
              <VideoPlayer src="/video_2.mp4" />
              <div className="p-4">
                <h3 className="text-xl font-bold text-white">Bubble Physics</h3>
                <p className="text-sm text-gray-400 mt-1">Client: Scientific Visualization Lab</p>
                <p className="mt-2 text-gray-300 text-sm">
                  Experimental animation exploring surface tension and light interaction with translucent objects.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Static Portfolio Gallery */}
        <h2 className="text-3xl font-bold my-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
          3D Renders & Environments
        </h2>
        <PortfolioGallery
          type="3D"
          items={[
            {
              id: 1,
              title: "Futuristic Environment",
              client: "Cyberpunk 2077 Inspired",
              image: "/AssaultTortoise.jpeg",
              description: "Atmospheric sci-fi environment with dynamic lighting and holographic elements.",
            },
            {
              id: 2,
              title: "Abstract Composition",
              client: "Modern Art Gallery",
              image: "/BallsAndStick.jpeg",
              description: "Minimalist study of form, light, and material properties.",
            },
            {
              id: 3,
              title: "Mechanical Entity",
              client: "Horror Game Studio",
              image: "/MonochromeBot.jpeg",
              description: "High-contrast character design exploring themes of technology and mortality.",
            },
            {
              id: 4,
              title: "Product Visualization",
              client: "LuxuryCars",
              image: "/car.jpg",
              description: "Photorealistic product rendering with accurate materials and lighting.",
            },
          ]}
        />

        {/* 3D Animation Packages */}
        <div className="my-20">
          <h2 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
            3D Animation Packages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className={`relative border ${pkg.highlighted ? "border-purple-500 shadow-lg shadow-purple-500/20" : "border-white/30"} rounded-xl overflow-hidden hover:border-white/70 transition-all duration-300`}
              >
                <div className="absolute inset-0">
                  <CosmicBackground />
                </div>
                <div className="relative z-10 p-6">
                  <h3 className="text-2xl font-bold text-white mb-4">{pkg.title}</h3>
                  <ul className="space-y-3">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-white/90">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <Link
                      href="/#contact"
                      className={`block text-center py-2 px-4 rounded-lg ${pkg.highlighted ? "bg-purple-600 hover:bg-purple-700" : "bg-white/20 hover:bg-white/30 border border-white/30"} transition-colors duration-300`}
                    >
                      Get Started
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
