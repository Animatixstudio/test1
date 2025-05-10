"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Check } from "lucide-react"
import CosmicBackground from "./cosmic-background"

gsap.registerPlugin(ScrollTrigger)

const plans = [
  {
    name: "Basic",
    price: "$",
    description: "Perfect for small businesses and startups",
    features: [
      "2D Animation (30 seconds)",
      "Basic Character Design",
      "Background Design",
      "Storyboarding",
      "2 Revisions",
      "Standard Delivery (14 days)",
    ],
    popular: false,
    buttonText: "Get Started",
  },
  {
    name: "Premium",
    price: "$",
    description: "Ideal for growing businesses and marketing teams",
    features: [
      "2D/3D Animation (60 seconds)",
      "Advanced Character Design",
      "Custom Environment Design",
      "Storyboarding & Animatic",
      "Sound Effects & Music",
      "4 Revisions",
      "Fast Delivery (10 days)",
    ],
    popular: true,
    buttonText: "Choose Premium",
  },
  {
    name: "Enterprise",
    price: "$",
    description: "For large projects and professional productions",
    features: [
      "Premium 3D Animation (90+ seconds)",
      "Complex Character Rigging",
      "Photorealistic Rendering",
      "Full Production Pipeline",
      "Custom Sound Design",
      "Unlimited Revisions",
      "Priority Delivery (7 days)",
    ],
    popular: false,
    buttonText: "Contact Us",
  },
]

export default function PricingPlans() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    // Animate section title
    gsap.fromTo(
      ".pricing-title",
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
          delay: 0.2 + index * 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        },
      )
    })
  }, [])

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="pricing-title text-4xl md:text-5xl font-bold gradient-text">Pricing Plans</h2>
          <p className="pricing-title mt-4 text-gray-400 max-w-2xl mx-auto">
            Choose the perfect animation package for your project needs and budget.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              ref={(el: HTMLDivElement | null) => {
                if (el) cardsRef.current[index] = el
              }}
              className={`relative rounded-xl transition-all duration-300 ${plan.popular ? "md:-translate-y-4 z-10" : ""}`}
            >

              {/* Card container with border */}
              <div
                className={`h-full overflow-hidden rounded-xl ${plan.popular
                    ? "border-2 border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                    : "border border-white/30 hover:border-white/70"
                  }`}
              >
                {/* Cosmic background */}
                <div className="absolute inset-0">
                  <CosmicBackground />
                </div>

                {/* Content with subtle gradient overlay */}
                <div className="relative z-10 p-8 bg-gradient-to-b from-black/10 to-black/40 h-full flex flex-col">
                  {plan.popular && (
                    <div className="absolute -top-4 left-0 right-0 mx-auto w-max px-4 py-1 bg-purple-600 text-white text-sm font-medium rounded-full shadow-[0_0_10px_rgba(139,92,246,0.5)]">
                      Most Popular
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-2 text-white text-shadow-lg">{plan.name}</h3>
                    <div className="text-3xl font-bold mb-2">
                      <span className="gradient-text text-shadow-sm">{plan.price}</span>
                    </div>
                    <p className="text-white text-shadow-sm">{plan.description}</p>
                  </div>

                  <ul className="space-y-3 mb-8 flex-grow">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <Check className="h-5 w-5 text-green-400 mr-2 mt-0.5 drop-shadow-md" />
                        <span className="text-white text-shadow-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`w-full py-3 rounded-lg transition-all duration-300 ${plan.popular
                        ? "bg-purple-600 hover:bg-purple-700 text-white neon-button shadow-[0_0_10px_rgba(139,92,246,0.3)]"
                        : "bg-white/20 hover:bg-white/30 text-white border border-white/30"
                      }`}
                  >
                    {plan.buttonText}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
