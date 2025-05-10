"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Eye, X } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

interface ConceptArtShowcaseProps {
  title: string
  description: string
  imageSrc: string
  client: string
  tags: string[]
}

export default function ConceptArtShowcase({ title, description, imageSrc, client, tags }: ConceptArtShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [showModal, setShowModal] = useState(false)

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
          start: "top 85%",
        },
      },
    )
  }, [])

  const openModal = () => {
    setShowModal(true)
    document.body.style.overflow = "hidden"
  }

  const closeModal = () => {
    setShowModal(false)
    document.body.style.overflow = "auto"
  }

  return (
    <>
      <div
        ref={containerRef}
        className="group relative border border-white/30 rounded-lg overflow-hidden hover:border-white/70 transition-all duration-300 cursor-pointer"
        onClick={openModal}
      >
        <div className="relative h-64 overflow-hidden bg-black">
          <Image
            src={imageSrc || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center transition-all duration-300">
              View Artwork <Eye className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-gray-400 text-sm mb-2 line-clamp-2">{description}</p>
          <div className="flex flex-wrap gap-1 mt-2">
            {tags.map((tag) => (
              <span key={tag} className="inline-block px-2 py-1 text-xs rounded bg-purple-900/50 text-purple-300">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for detailed view */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative bg-gray-900 rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-black/50 rounded-full p-2 text-white hover:bg-black/70 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="relative h-[60vh] w-full">
              <Image
                src={imageSrc || "/placeholder.svg"}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />
            </div>

            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{title}</h2>
              <p className="text-gray-400 mb-2">Client: {client}</p>
              <p className="text-gray-300 mb-4">{description}</p>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span key={tag} className="inline-block px-2 py-1 text-xs rounded bg-purple-900/50 text-purple-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
