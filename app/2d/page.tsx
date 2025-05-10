"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ArrowLeft, Check } from "lucide-react"
import Link from "next/link"
import ConceptArtShowcase from "@/components/concept-art-showcase"
import CosmicBackground from "@/components/cosmic-background"

export default function TwoDPortfolio() {
  // Add a state to force re-rendering of the background
  const [backgroundKey, setBackgroundKey] = useState(Date.now())

  // Force re-render of the background when the component mounts
  useEffect(() => {
    setBackgroundKey(Date.now())
  }, [])

  // 2D Animation Package details
  const packages = [
    {
      title: "Basic",
      features: ["HD Quality", "Basic Character Design", "1-5 minute animation", "Changes available as bonus"],
      highlighted: false,
    },
    {
      title: "Standard",
      features: [
        "2K Quality",
        "Custom Character Design",
        "10-15 minute animation",
        "First 3 changes + modifications included as bonus",
      ],
      highlighted: true,
    },
    {
      title: "Premium",
      features: [
        "4K-8K Quality",
        "Premium Character Design",
        "Duration as per client requirements",
        "First 5 changes + modifications + add-ons included as bonus",
      ],
      highlighted: false,
    },
  ]

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <div className="absolute inset-0 -z-10">
          <CosmicBackground key={backgroundKey} forceRender={backgroundKey} />
        </div>
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="text-5xl md:text-7xl font-bold mt-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            2D Animation Portfolio
          </h1>
          <p className="mt-4 text-gray-400 max-w-2xl">
            Explore our collection of stunning 2D animations created for clients across various industries. Each project
            showcases our commitment to storytelling and visual excellence, from concept to final artwork.
          </p>
        </div>

        {/* Featured Artwork - Hero Section */}
        <div className="relative rounded-xl overflow-hidden border border-white/30 hover:border-white/70 transition-all duration-300">
          <div className="aspect-w-16 aspect-h-9 w-full">
            <img src="/Hero page gif.GIF" alt="From Concept to Reality" className="object-cover w-full h-full" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex flex-col justify-end p-6 md:p-8">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">From Concept to Reality</h3>
            <p className="text-gray-300 mb-4 max-w-2xl">
              Our signature animations demonstrate our creative process, showcasing the journey from initial concept
              sketches to fully realized digital art.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-sm text-white/70">Client: Animatix Studio</span>
              <span className="text-sm text-white/70">|</span>
              <div className="flex flex-wrap gap-2">
                {["Animation", "Character Design", "Digital Illustration"].map((tag) => (
                  <span key={tag} className="text-sm bg-white/10 px-2 py-1 rounded-md text-white/90">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Concept Art Showcase */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 gradient-text">Concept to Final Art</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <ConceptArtShowcase
              title="The Art of 2D Backgrounds"
              description="A visual exploration of time, blending traditional watchmaking with modern digital art techniques."
              imageSrc="/2d_1.jpg"
              client="Luxury Timepieces"
              tags={["Product Visualization", "Concept Art"]}
            />
            <ConceptArtShowcase
              title="The Craft of Character Design"
              description="Fantasy creature design showcasing our ability to create detailed mythical beings with personality and presence."
              imageSrc="/2d_2.jpg"
              client="Epic Adventures Studios"
              tags={["Creature Design", "Fantasy Art"]}
            />
            <ConceptArtShowcase
              title="Framing the Vision"
              description="Clean and detailed illustration with great storytelling elements."
              imageSrc="/2d_3.jpg"
              client="Future Tech Expo"
              tags={["Illustration", "Vector Art"]}
            />
            <ConceptArtShowcase
              title="2D Animation"
              description="Dynamic 2D animation frame with expressive characters and lively colors."
              imageSrc="/2d_animation.jpg"
              client="Future Tech Expo"
              tags={["2D Animation", "Cartoon", "Motion"]}
            />
          </div>
        </div>

        {/* 2D Animation Packages */}
        <div className="my-16">
          <h2 className="text-3xl font-bold mb-8 gradient-text">2D Animation Packages</h2>
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

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold mb-4 gradient-text">Ready to bring your ideas to life?</h3>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Our team of talented artists and animators is ready to transform your concepts into stunning visual stories.
          </p>
          <Link
            href="/#contact"
            className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all duration-300 inline-flex items-center neon-button"
          >
            Start Your Project
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  )
}
