"use client"
import { useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import PortfolioShowcase from "@/components/portfolio-showcase"
import dynamic from "next/dynamic"

// Dynamically import CosmicBackground with SSR disabled
const CosmicBackground = dynamic(() => import("@/components/cosmic-background"), { ssr: false })

export default function PortfolioPage() {
    // Add a state to force re-rendering of the background
    const [backgroundKey, setBackgroundKey] = useState(Date.now())

    // Force re-render of the background when the component mounts
    useEffect(() => {
        setBackgroundKey(Date.now())
    }, [])

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
                        Our Portfolio
                    </h1>
                    <p className="mt-4 text-gray-400 max-w-2xl">
                        Explore our collection of stunning animations and artwork created for clients across various industries.
                        Each project showcases our commitment to storytelling and visual excellence, from concept to final artwork.
                    </p>
                </div>

                <PortfolioShowcase />
            </div>
            <Footer />
        </main>
    )
}
