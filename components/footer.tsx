"use client"

import Link from "next/link"
import { Instagram, Linkedin, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-4 gradient-text">Animatix Studio</h3>
            <p className="text-gray-400 mb-4">
              Creating premium animations and visual experiences for brands worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/2d" className="text-gray-400 hover:text-white transition-colors">
                  2D Animation
                </Link>
              </li>
              <li>
                <Link href="/3d" className="text-gray-400 hover:text-white transition-colors">
                  3D Animation
                </Link>
              </li>
              <li>
                <Link href="/2d" className="text-gray-400 hover:text-white transition-colors">
                  Logo Designs
                </Link>
              </li>
              <li>
                <Link href="/3d" className="text-gray-400 hover:text-white transition-colors">
                  Visual Effects
                </Link>
              </li>
              <li>
                <Link href="/2d" className="text-gray-400 hover:text-white transition-colors">
                  Character Design
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-400 hover:text-white transition-colors" prefetch={true}>
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Contact Us</h4>
            <address className="not-italic text-gray-400">
              <p className="mb-2">123 Animation Street</p>
              <p className="mb-2">Mumbai, India</p>
              <p className="mb-2">
                <a href="mailto:animatixanimation@gmail.com" className="hover:text-white transition-colors">
                  animatixanimation@gmail.com
                </a>
              </p>
              <p>
                <a href="tel:+1234567890" className="hover:text-white transition-colors">
                  +1 (234) 567-890
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Animatix Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
