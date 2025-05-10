"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function CosmicBackground({ forceRender = Date.now() }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)

  // Use the forceRender prop to ensure the component re-initializes
  useEffect(() => {
    if (!containerRef.current) return

    // Clear any existing content
    while (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild)
    }

    // Scene setup
    const scene = new THREE.Scene()

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000,
    )
    camera.position.z = 5

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Particles
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 500 // Fewer particles for cards

    const posArray = new Float32Array(particlesCount * 3)
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))

    // Materials
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0x8b5cf6,
      transparent: true,
      blending: THREE.AdditiveBlending,
    })

    // Mesh
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)

    // Add some colored lights
    const purpleLight = new THREE.PointLight(0x8b5cf6, 1, 100)
    purpleLight.position.set(2, 2, 2)
    scene.add(purpleLight)

    const blueLight = new THREE.PointLight(0x3b82f6, 1, 100)
    blueLight.position.set(-2, -2, 2)
    scene.add(blueLight)

    // Create shining stars
    const starColors = [0xffffff, 0xffffcc, 0xccffff, 0xffccff, 0xccccff]
    const starsGeometry = new THREE.BufferGeometry()
    const starsCount = 50 // Fewer stars for cards

    const starsPositions = new Float32Array(starsCount * 3)
    const starsSizes = new Float32Array(starsCount)
    const starsColorArray = new Float32Array(starsCount * 3)
    const starsTwinkleSpeed = new Float32Array(starsCount)
    const starsTwinkleOffset = new Float32Array(starsCount)

    for (let i = 0; i < starsCount; i++) {
      const i3 = i * 3

      // Position stars throughout the scene
      starsPositions[i3] = (Math.random() - 0.5) * 15
      starsPositions[i3 + 1] = (Math.random() - 0.5) * 15
      starsPositions[i3 + 2] = (Math.random() - 0.5) * 15

      // Random sizes for stars
      starsSizes[i] = 0.05 + Math.random() * 0.15

      // Random twinkle speeds and offsets
      starsTwinkleSpeed[i] = 0.5 + Math.random() * 2
      starsTwinkleOffset[i] = Math.random() * Math.PI * 2

      // Random star colors
      const color = new THREE.Color(starColors[Math.floor(Math.random() * starColors.length)])
      starsColorArray[i3] = color.r
      starsColorArray[i3 + 1] = color.g
      starsColorArray[i3 + 2] = color.b
    }

    starsGeometry.setAttribute("position", new THREE.BufferAttribute(starsPositions, 3))
    starsGeometry.setAttribute("size", new THREE.BufferAttribute(starsSizes, 1))
    starsGeometry.setAttribute("color", new THREE.BufferAttribute(starsColorArray, 3))
    starsGeometry.setAttribute("twinkleSpeed", new THREE.BufferAttribute(starsTwinkleSpeed, 1))
    starsGeometry.setAttribute("twinkleOffset", new THREE.BufferAttribute(starsTwinkleOffset, 1))

    // Create a star texture
    const starCanvas = document.createElement("canvas")
    starCanvas.width = 32
    starCanvas.height = 32
    const starContext = starCanvas.getContext("2d")

    if (starContext) {
      const gradient = starContext.createRadialGradient(16, 16, 0, 16, 16, 16)
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)")
      gradient.addColorStop(0.2, "rgba(255, 255, 255, 0.8)")
      gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.4)")
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)")

      starContext.fillStyle = gradient
      starContext.fillRect(0, 0, 32, 32)
    }

    const starTexture = new THREE.CanvasTexture(starCanvas)

    // Star shader material for twinkling effect
    const starsShaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        starTexture: { value: starTexture },
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        attribute float twinkleSpeed;
        attribute float twinkleOffset;
        varying vec3 vColor;
        uniform float time;
        
        void main() {
          vColor = color;
          
          // Calculate twinkling effect
          float twinkle = sin(time * twinkleSpeed + twinkleOffset) * 0.5 + 0.5;
          
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z) * (0.3 + 0.7 * twinkle);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        uniform sampler2D starTexture;
        
        void main() {
          gl_FragColor = vec4(vColor, 1.0) * texture2D(starTexture, gl_PointCoord);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    const stars = new THREE.Points(starsGeometry, starsShaderMaterial)
    scene.add(stars)

    // Animation
    let time = 0
    const animate = () => {
      time += 0.01

      // Update star twinkling
      if (starsShaderMaterial.uniforms) {
        starsShaderMaterial.uniforms.time.value = time
      }

      particlesMesh.rotation.x += 0.0005
      particlesMesh.rotation.y += 0.0005

      renderer.render(scene, camera)
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    // Start animation
    animate()

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return

      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight
      camera.updateProjectionMatrix()

      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }

      if (containerRef.current && renderer.domElement && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement)
      }

      window.removeEventListener("resize", handleResize)

      // Dispose geometries and materials
      particlesGeometry.dispose()
      particlesMaterial.dispose()
      starsGeometry.dispose()
      starsShaderMaterial.dispose()
      starTexture.dispose()

      // Dispose of scene and renderer
      scene.traverse((object: THREE.Object3D) => {
        if (object instanceof THREE.Mesh) {
          if (object.geometry) object.geometry.dispose()
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach((material) => material.dispose())
            } else {
              object.material.dispose()
            }
          }
        }
      })

      scene.clear()
      renderer.dispose()
      rendererRef.current = null
    }
  }, [forceRender])

  return <div ref={containerRef} className="w-full h-full" />
}
