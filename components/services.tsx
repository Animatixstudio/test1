"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight, Film, Layers, Palette, PenTool, Video } from "lucide-react"
import CosmicBackground from './cosmic-background';

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    title: "2D Animation",
    description: "Captivating 2D animations that bring your stories to life with vibrant characters and fluid motion.",
    icon: <Film className="h-10 w-10 text-purple-400" />,
    link: "/2d",
  },
  {
    title: "3D Animation",
    description: "Immersive 3D animations with photorealistic rendering and dynamic camera movements.",
    icon: <Layers className="h-10 w-10 text-blue-400" />,
    link: "/3d",
  },
  {
    title: "Other Services",
    description: "Bring your brand to life with additional animation effects and visual enhancements.",
    icon: <Palette className="h-10 w-10 text-cyan-400" />,
    link: "/other-services",
  },

]

function ServicesSection() {

  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    // Animate section title
    gsap.fromTo(
      ".services-title",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      },
    )

    // Animate cards
    cardsRef.current.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.2 + index * 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        },
      )
    })
  }, [])

  return (
    <section id="services" ref={sectionRef} className="py-24 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="services-title text-4xl md:text-5xl font-bold gradient-text">Our Premium Services</h2>
          <p className="services-title mt-4 text-gray-400 max-w-2xl mx-auto">
            We offer a comprehensive range of animation services to bring your creative vision to life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              ref={(el) => {
                if (el) cardsRef.current[index] = el
              }}
              className="relative h-80 border border-white/30 rounded-xl overflow-hidden hover-card hover:border-white/70 transition-all duration-300 group"
            >
              {/* Add CosmicBackground here with a unique key */}
              <div className="absolute inset-0">
                <CosmicBackground key={`service-${index}`} />
              </div>
              <div className="relative h-full z-10 p-6 flex flex-col">
                <div className="mb-4 text-shadow-lg">{service.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-white text-shadow-lg">{service.title}</h3>
                <p className="text-white text-shadow-sm mb-6">{service.description}</p>
                <div className="mt-auto">
                  <Link
                    href={service.link}
                    className="inline-flex items-center text-purple-300 hover:text-purple-200 transition-colors text-shadow-md"
                  >
                    View Projects <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div id="other-services" className="mt-20 text-center">
          <h3 className="text-3xl font-bold mb-8 gradient-text-alt">Additional Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative border border-white/30 rounded-lg overflow-hidden hover:border-white/70 transition-all duration-300 group">
              <div className="absolute inset-0">
                <CosmicBackground key={`other-service-1`} />
              </div>
              <div className="relative z-10 p-6 bg-gradient-to-b from-black/10 to-black/40">
                <h4 className="text-xl font-bold mb-2 text-white text-shadow-lg">Storyboarding</h4>
                <p className="text-white text-shadow-sm">
                  Professional storyboarding to visualize your project before production.
                </p>
              </div>
            </div>
            <div className="relative border border-white/30 rounded-lg overflow-hidden hover:border-white/70 transition-all duration-300 group">
              <div className="absolute inset-0">
                <CosmicBackground key={`other-service-2`} />
              </div>
              <div className="relative z-10 p-6 bg-gradient-to-b from-black/10 to-black/40">
                <h4 className="text-xl font-bold mb-2 text-white text-shadow-lg">Sound Design</h4>
                <p className="text-white text-shadow-sm">
                  Custom sound effects and audio mixing to enhance your animations.
                </p>
              </div>
            </div>
            <div className="relative border border-white/30 rounded-lg overflow-hidden hover:border-white/70 transition-all duration-300 group">
              <div className="absolute inset-0">
                <CosmicBackground key={`other-service-3`} />
              </div>
              <div className="relative z-10 p-6 bg-gradient-to-b from-black/10 to-black/40">
                <h4 className="text-xl font-bold mb-2 text-white text-shadow-lg">ILLUSTATIONS</h4>
                <p className="text-white text-shadow-sm">
                  Add vibrant, custom illustrations to make your content visually engaging and uniquely yours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    // Animate section title
    gsap.fromTo(
      ".services-title",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      },
    )

    // Animate cards
    cardsRef.current.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.2 + index * 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        },
      )
    })
  }, [])

  return (
    <section id="services" ref={sectionRef} className="py-24 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="services-title text-4xl md:text-5xl font-bold gradient-text">Our Premium Services</h2>
          <p className="services-title mt-4 text-gray-400 max-w-2xl mx-auto">
            We offer a comprehensive range of animation services to bring your creative vision to life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              ref={(el) => {
                if (el) cardsRef.current[index] = el
              }}
              className="relative h-80 border border-white/10 rounded-xl overflow-hidden hover:border-white/30 transition-all duration-300 group bg-black/20 backdrop-blur-sm"
            >
              <div className="absolute inset-0">
                <CosmicBackground isSection={true} key={`service-${index}`} />
              </div>
              <div className="relative h-full z-10 p-6 flex flex-col bg-gradient-to-b from-black/40 to-black/60">
                <div className="mb-4 text-shadow-lg">{service.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-white text-shadow-lg">{service.title}</h3>
                <p className="text-gray-300 text-shadow-sm mb-6">{service.description}</p>
                <div className="mt-auto">
                  <Link
                    href={service.link}
                    className="inline-flex items-center text-purple-300 hover:text-purple-200 transition-colors text-shadow-md group-hover:text-white"
                  >
                    View Projects <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div id="other-services" className="mt-20 text-center">
          <h3 className="text-3xl font-bold mb-8 gradient-text-alt">Additional Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Storyboarding",
                description: "Professional storyboarding to visualize your project before production."
              },
              {
                title: "Sound Design",
                description: "Custom sound effects and audio mixing to enhance your animations."
              },
              {
                title: "ILLUSTRATIONS",
                description: "Add vibrant, custom illustrations to make your content visually engaging and uniquely yours."
              }
            ].map((service, index) => (
              <div key={service.title} className="relative border border-white/30 rounded-lg overflow-hidden hover:border-white/70 transition-all duration-300 group">
                <div className="absolute inset-0">
                  <CosmicBackground isSection={true} key={`additional-${index}`} />
                </div>
                <div className="relative z-10 p-6 bg-gradient-to-b from-black/10 to-black/40">
                  <h4 className="text-xl font-bold mb-2 text-white text-shadow-lg">{service.title}</h4>
                  <p className="text-white text-shadow-sm">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services;
