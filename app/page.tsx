"use client"
import Hero from "@/components/hero"
import Navbar from "@/components/navbar"
import Services from "@/components/services"
import PricingPlans from "@/components/pricing-plans"
import ContactForm from "@/components/contact-form"
import Footer from "@/components/footer"
import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

// Dynamically import CosmicBackground with SSR disabled
const CosmicBackground = dynamic(() => import("@/components/cosmic-background"), { ssr: false })

export default function Home() {
  // Add a state to force re-rendering of the background
  const [backgroundKey, setBackgroundKey] = useState(Date.now())

  // Force re-render of the background when the component mounts
  useEffect(() => {
    setBackgroundKey(Date.now())
  }, [])

  return (
    <main className="min-h-screen bg-black text-white relative">
      <Navbar />
      <div className="absolute inset-0 -z-10">
        <CosmicBackground key={backgroundKey} forceRender={backgroundKey} />
      </div>
      <Hero />
      <Services />
      <PricingPlans />
      <ContactForm />
      <Footer />
    </main>
  )
}
