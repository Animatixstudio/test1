"use client"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import CosmicBackground from "@/components/cosmic-background"

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="text-5xl md:text-7xl font-bold mt-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            Join Our Team
          </h1>
          <p className="mt-4 text-gray-400 max-w-2xl">
            Be part of a creative team pushing the boundaries of animation and visual storytelling.
          </p>
        </div>

        <div className="relative border border-white/30 rounded-xl overflow-hidden hover:border-white/70 transition-all duration-300 my-12">
          <div className="absolute inset-0">
            <CosmicBackground />
          </div>
          <div className="relative z-10 p-12 flex flex-col items-center justify-center text-center">
            <h2 className="text-3xl font-bold mb-6 text-white text-shadow-lg">Job Postings Coming Soon</h2>
            <p className="text-xl text-white/80 max-w-2xl mb-8">
              We're preparing to expand our team with exciting new opportunities. Check back soon for job listings at
              Animatix Studio.
            </p>
            <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg">
              <p className="text-white/90">
                Interested in working with us? Send your portfolio and resume to{" "}
                <a href="mailto:animatixanimation@gmail.com" className="text-purple-400 hover:text-purple-300">
                  animatixanimation@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="relative border border-white/30 rounded-lg overflow-hidden hover:border-white/70 transition-all duration-300 p-6">
            <div className="absolute inset-0">
              <CosmicBackground />
            </div>
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-4 text-white text-shadow-lg">Creative Environment</h3>
              <p className="text-white/80">
                Work in a collaborative space that encourages innovation and creative expression.
              </p>
            </div>
          </div>
          <div className="relative border border-white/30 rounded-lg overflow-hidden hover:border-white/70 transition-all duration-300 p-6">
            <div className="absolute inset-0">
              <CosmicBackground />
            </div>
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-4 text-white text-shadow-lg">Cutting-Edge Technology</h3>
              <p className="text-white/80">
                Access to the latest tools and technologies in the animation and visual effects industry.
              </p>
            </div>
          </div>
          <div className="relative border border-white/30 rounded-lg overflow-hidden hover:border-white/70 transition-all duration-300 p-6">
            <div className="absolute inset-0">
              <CosmicBackground />
            </div>
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-4 text-white text-shadow-lg">Growth Opportunities</h3>
              <p className="text-white/80">
                Continuous learning and professional development in a rapidly evolving creative field.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
