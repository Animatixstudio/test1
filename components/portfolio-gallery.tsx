"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ExternalLink, X } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

interface PortfolioItem {
  id: number
  title: string
  client: string
  image: string
  description?: string
}

interface PortfolioGalleryProps {
  type: "2D" | "3D"
  items: PortfolioItem[]
}

export default function PortfolioGallery({ type, items }: PortfolioGalleryProps) {
  const galleryRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLDivElement[]>([])
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null)

  useEffect(() => {
    // Animate gallery items
    itemsRef.current.forEach((item, index) => {
      gsap.fromTo(
        item,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.1 + index * 0.1,
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
          },
        },
      )
    })
  }, [])

  // Handle modal open/close
  const openModal = (item: PortfolioItem) => {
    setSelectedItem(item)
    document.body.style.overflow = "hidden"
  }

  const closeModal = () => {
    setSelectedItem(null)
    document.body.style.overflow = "auto"
  }

  const width = galleryRef.current ? galleryRef.current.offsetWidth : 0;

  return (
    <>
      <div ref={galleryRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <div
            key={item.id}
            ref={(el) => {
              itemsRef.current[index] = el
            }}
            className="group relative border border-white/30 rounded-lg overflow-hidden hover:border-white/70 transition-all duration-300 cursor-pointer"
            onClick={() => openModal(item)}
          >
            <div className="relative h-64 overflow-hidden">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center transition-all duration-300">
                  View Details <ExternalLink className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p className="text-gray-400">Client: {item.client}</p>
              <div className="mt-2">
                <span
                  className={`inline-block px-2 py-1 text-xs rounded ${type === "2D" ? "bg-purple-900/50 text-purple-300" : "bg-blue-900/50 text-blue-300"
                    }`}
                >
                  {type} Animation
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for detailed view */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative bg-gray-900 rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-black/50 rounded-full p-2 text-white hover:bg-black/70 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="relative h-[50vh] w-full">
              <Image
                src={selectedItem.image || "/placeholder.svg"}
                alt={selectedItem.title}
                fill
                className="object-contain"
              />
            </div>

            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{selectedItem.title}</h2>
              <p className="text-gray-400 mb-4">Client: {selectedItem.client}</p>
              {selectedItem.description && <p className="text-gray-300">{selectedItem.description}</p>}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
