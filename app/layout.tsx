import type React from "react"
import "@/app/globals.css"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import { Mona_Sans as FontSans } from "next/font/google"
import { Fira_Mono as FontMono } from "next/font/google"
import Script from "next/script"

// Load fonts with proper weight specifications
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = FontMono({
  weight: "400", // Adding the required weight parameter
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Animatix Studio - Premium Animation Services",
  description: "Futuristic animation studio specializing in 2D and 3D animations, visual effects, and motion graphics.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${fontSans.variable} ${fontMono.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-black font-sans antialiased" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        {/* Script to clean up Grammarly attributes after hydration */}
        <Script id="handle-hydration-attributes" strategy="afterInteractive">
          {`
            // This helps prevent hydration mismatches from extensions like Grammarly
            if (typeof window !== 'undefined') {
              const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                  if (mutation.attributeName && mutation.attributeName.startsWith('data-gr-')) {
                    const target = mutation.target;
                    if (target && target instanceof HTMLElement) {
                      // Remove the attribute that caused the mismatch
                      target.removeAttribute(mutation.attributeName);
                    }
                  }
                });
              });
              
              // Start observing the document body for attribute changes
              observer.observe(document.body, { 
                attributes: true,
                subtree: true,
                attributeFilter: ['data-gr-ext-installed', 'data-new-gr-c-s-check-loaded']
              });
            }
          `}
        </Script>
      </body>
    </html>
  )
}
