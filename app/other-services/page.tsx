import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import CosmicBackground from "@/components/cosmic-background"
import ConceptArtShowcase from "@/components/concept-art-showcase"
import Image from "next/image"

export default function OtherServicesPage() {
    // Additional services with descriptions
    const additionalServices = [
        {
            title: "Caricatures",
            description: "Stylized and exaggerated portraits that capture personality with artistic flair.",
            icon: "🎭",
        },
        {
            title: "Portraits (Sketches)",
            description: "Detailed hand-drawn sketches capturing likeness and character with precision.",
            icon: "✏️",
        },
        {
            title: "Environment Design",
            description: "Custom background designs creating immersive worlds for your characters and stories.",
            icon: "🏞️",
        },
        {
            title: "Logo Design",
            description: "Distinctive and memorable brand identities that stand out in the marketplace.",
            icon: "🎨",
        },
        {
            title: "Flip Book Animation",
            description: "Traditional hand-drawn animation creating charming sequential motion effects.",
            icon: "📚",
        },
        {
            title: "3D Art",
            description: "Static 3D artwork and models with detailed texturing and lighting.",
            icon: "🖼️",
        },
    ]

    const additionalArtworks = [
        {
            title: "Caricature",
            description: "Fun, exaggerated caricature capturing personality with humor.",
            imageSrc: "/Caricature.jpg",
            client: "Various Clients",
            tags: ["Caricature", "Portrait"],
        },
        {
            title: "Environment Design",
            description: "Dreamy treehouse painting with a fairy-tale feel.",
            imageSrc: "/treehouse.jpg",
            client: "Game Studios",
            tags: ["Environment", "Background"],
        },
        {
            title: "Illustrations",
            description: "Clean and detailed illustration with great storytelling elements.",
            imageSrc: "/Illustrations.jpg",
            client: "Publishing Houses",
            tags: ["Illustration", "Vector Art"],
        },
        {
            title: "2D Art",
            description: "Stylized digital art with soft textures and playful vibes.",
            imageSrc: "/2d_art.jpg",
            client: "Art Collectors",
            tags: ["2D Art", "Digital"],
        },
        {
            title: "Logo",
            description: "Sleek and modern logo with strong brand identity.",
            imageSrc: "/logo.jpg",
            client: "Brands",
            tags: ["Logo", "Branding"],
        },
        {
            title: "Poster",
            description: "Bold poster with striking visuals and clear message.",
            imageSrc: "/poster.jpg",
            client: "Movie Studios",
            tags: ["Poster", "Movie"],
        },
    ]

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
                        Additional Services
                    </h1>
                    <p className="mt-4 text-gray-400 max-w-2xl">
                        Beyond our core animation offerings, we provide a range of specialized creative services to meet all your
                        visual needs.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-12">
                    {additionalServices.map((service, index) => (
                        <div
                            key={index}
                            className="relative border border-white/30 rounded-xl overflow-hidden hover:border-white/70 transition-all duration-300 group"
                        >
                            <div className="absolute inset-0">
                                <CosmicBackground />
                            </div>
                            <div className="relative z-10 p-8 flex flex-col items-center text-center">
                                <div className="text-4xl mb-4">{service.icon}</div>
                                <h3 className="text-2xl font-bold mb-3 text-white text-shadow-lg">{service.title}</h3>
                                <p className="text-white/80">{service.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16">
                    <h2 className="text-3xl font-bold mb-8 gradient-text">Additional Services Artwork</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                        {additionalArtworks.map((art, idx) => (
                            <ConceptArtShowcase
                                key={idx}
                                title={art.title}
                                description={art.description}
                                imageSrc={art.imageSrc}
                                client={art.client}
                                tags={art.tags}
                            />
                        ))}
                    </div>
                </div>

                {/* Call to Action Section (only once, here) */}
                <div className="mt-20 text-center">
                    <h3 className="text-2xl font-bold mb-4 gradient-text">
                        Ready to bring your ideas to life?
                    </h3>
                    <p className="text-gray-400 max-w-2xl mx-auto mb-8">
                        Contact us today to discuss your project requirements and how our services can help you achieve your creative vision.
                    </p>
                    <Link
                        href="/#contact"
                        className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all duration-300 inline-flex items-center neon-button"
                    >
                        Get in Touch
                    </Link>
                </div>
            </div>
            <Footer />
        </main>
    )
}
