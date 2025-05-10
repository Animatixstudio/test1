"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowLeft, ArrowRight, X } from "lucide-react"
import CosmicBackground from "./cosmic-background"

interface PortfolioImage {
    id: number
    title: string
    description: string
    imagePath: string
    category: "concept" | "character" | "environment" | "animation"
}

const portfolioImages: PortfolioImage[] = [
    {
        id: 1,
        title: "Tempus Fugit",
        description: "A visual exploration of time, blending traditional watchmaking with modern digital art techniques.",
        imagePath: "/images/tempus-fugit-watch.jpeg",
        category: "concept",
    },
    {
        id: 2,
        title: "Dragon's Breath",
        description:
            "Fantasy creature design showcasing our ability to create detailed mythical beings with personality and presence.",
        imagePath: "/images/dragon-concept.jpeg",
        category: "character",
    },
    {
        id: 3,
        title: "Human Evolution",
        description: "2D animation frame demonstrating our storytelling capabilities through dynamic character movement.",
        imagePath: "/images/2d-animation-running.jpeg",
        category: "animation",
    },
    {
        id: 4,
        title: "Divine Energy",
        description:
            "Character design exploring themes of divinity and cosmic power through vibrant color and lighting effects.",
        imagePath: "/images/2d-art-deity.jpeg",
        category: "character",
    },
    {
        id: 5,
        title: "Mystical Guardian",
        description:
            "Character design for a fantasy RPG, showcasing our ability to create atmospheric and emotionally resonant characters.",
        imagePath: "/images/hooded-figure.jpeg",
        category: "character",
    },
    {
        id: 6,
        title: "Digital Consciousness",
        description:
            "Our studio's signature piece demonstrating the fusion of traditional art and cutting-edge technology.",
        imagePath: "/images/animatix-robot-hand.jpeg",
        category: "concept",
    },
    {
        id: 7,
        title: "Studio Headquarters",
        description:
            "Vibrant architectural visualization showcasing our ability to create stylized environments with personality.",
        imagePath: "/images/animatix-studio-logo.jpeg",
        category: "environment",
    },
    {
        id: 8,
        title: "Character Development",
        description:
            "Portrait design demonstrating our detailed approach to character creation from wireframe to final render.",
        imagePath: "/images/portrait-concept.jpeg",
        category: "character",
    },
    {
        id: 9,
        title: "Timekeeper",
        description: "Detailed product visualization combining technical precision with artistic flair.",
        imagePath: "/images/pocket-watch.jpeg",
        category: "concept",
    },
    {
        id: 10,
        title: "Man & Machine",
        description: "Conceptual artwork exploring the relationship between humanity and technology.",
        imagePath: "/images/robotic-hand.jpeg",
        category: "concept",
    },
]

export default function PortfolioShowcase() {
    const [selectedImage, setSelectedImage] = useState<PortfolioImage | null>(null)
    const [filter, setFilter] = useState<string>("all")

    const filteredImages = filter === "all" ? portfolioImages : portfolioImages.filter((img) => img.category === filter)

    const openLightbox = (image: PortfolioImage) => {
        setSelectedImage(image)
        document.body.style.overflow = "hidden"
    }

    const closeLightbox = () => {
        setSelectedImage(null)
        document.body.style.overflow = "auto"
    }

    const navigateImage = (direction: "next" | "prev") => {
        if (!selectedImage) return

        const currentIndex = filteredImages.findIndex((img) => img.id === selectedImage.id)
        let newIndex: number

        if (direction === "next") {
            newIndex = (currentIndex + 1) % filteredImages.length
        } else {
            newIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length
        }

        setSelectedImage(filteredImages[newIndex])
    }

    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center gradient-text">From Concept to Reality</h2>

                <div className="flex justify-center mb-8">
                    <div className="inline-flex rounded-md shadow-sm">
                        <button
                            onClick={() => setFilter("all")}
                            className={`px-4 py-2 text-sm font-medium rounded-l-lg ${filter === "all" ? "bg-purple-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                                }`}
                        >
                            All Works
                        </button>
                        <button
                            onClick={() => setFilter("concept")}
                            className={`px-4 py-2 text-sm font-medium ${filter === "concept" ? "bg-purple-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                                }`}
                        >
                            Concept Art
                        </button>
                        <button
                            onClick={() => setFilter("character")}
                            className={`px-4 py-2 text-sm font-medium ${filter === "character" ? "bg-purple-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                                }`}
                        >
                            Characters
                        </button>
                        <button
                            onClick={() => setFilter("environment")}
                            className={`px-4 py-2 text-sm font-medium ${filter === "environment" ? "bg-purple-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                                }`}
                        >
                            Environments
                        </button>
                        <button
                            onClick={() => setFilter("animation")}
                            className={`px-4 py-2 text-sm font-medium rounded-r-lg ${filter === "animation" ? "bg-purple-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                                }`}
                        >
                            Animation
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredImages.map((image) => (
                        <div
                            key={image.id}
                            className="relative group cursor-pointer overflow-hidden rounded-lg border border-white/30 hover:border-white/70 transition-all duration-300"
                            onClick={() => openLightbox(image)}
                        >
                            <div className="aspect-w-16 aspect-h-12 relative">
                                <Image
                                    src={image.imagePath || "/placeholder.svg"}
                                    alt={image.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-white text-shadow-lg">{image.title}</h3>
                                        <p className="text-sm text-white/90 text-shadow-sm line-clamp-2">{image.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            {selectedImage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
                    <div className="absolute inset-0">
                        <CosmicBackground />
                    </div>
                    <div className="relative z-10 max-w-6xl w-full max-h-[90vh] flex flex-col">
                        <button
                            onClick={closeLightbox}
                            className="absolute top-4 right-4 z-10 bg-black/50 rounded-full p-2 text-white hover:bg-black/70 transition-colors"
                        >
                            <X className="h-6 w-6" />
                        </button>

                        <div className="relative h-[70vh] w-full">
                            <Image
                                src={selectedImage.imagePath || "/placeholder.svg"}
                                alt={selectedImage.title}
                                fill
                                className="object-contain"
                            />

                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    navigateImage("prev")
                                }}
                                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 rounded-full p-3 text-white hover:bg-black/70 transition-colors"
                            >
                                <ArrowLeft className="h-6 w-6" />
                            </button>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    navigateImage("next")
                                }}
                                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 rounded-full p-3 text-white hover:bg-black/70 transition-colors"
                            >
                                <ArrowRight className="h-6 w-6" />
                            </button>
                        </div>

                        <div className="p-6 bg-black/50 backdrop-blur-sm rounded-b-xl">
                            <h2 className="text-2xl font-bold text-white mb-2">{selectedImage.title}</h2>
                            <p className="text-gray-300">{selectedImage.description}</p>
                            <div className="mt-2">
                                <span className="inline-block px-2 py-1 text-xs rounded bg-purple-900/50 text-purple-300">
                                    {selectedImage.category.charAt(0).toUpperCase() + selectedImage.category.slice(1)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}
