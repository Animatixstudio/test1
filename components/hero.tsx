"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
// Fix the import by adding the .js extension
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { gsap } from "gsap"

// No need for declare module statement

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const rocketsRef = useRef<THREE.Group[]>([])
  const animationFrameRef = useRef<number | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

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

    // Make sure the container is empty before appending
    while (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild)
    }

    containerRef.current.appendChild(renderer.domElement)

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enableZoom = false
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.5

    // Particles
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 2000

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
    const starsCount = 200

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

    // Create rocket function
    const createRocket = () => {
      // Rocket group
      const rocketGroup = new THREE.Group()

      // Rocket body
      const bodyGeometry = new THREE.ConeGeometry(0.05, 0.2, 8)
      const bodyMaterial = new THREE.MeshPhongMaterial({
        color: Math.random() > 0.5 ? 0x3b82f6 : 0x8b5cf6,
        emissive: 0x222222,
        shininess: 30,
      })
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial)
      body.rotation.x = Math.PI
      rocketGroup.add(body)

      // Rocket fins
      const finGeometry = new THREE.BoxGeometry(0.08, 0.02, 0.08)
      const finMaterial = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        emissive: 0x111111,
        shininess: 30,
      })
      const fin1 = new THREE.Mesh(finGeometry, finMaterial)
      fin1.position.y = 0.08
      fin1.position.x = 0.04
      rocketGroup.add(fin1)

      const fin2 = new THREE.Mesh(finGeometry, finMaterial)
      fin2.position.y = 0.08
      fin2.position.x = -0.04
      rocketGroup.add(fin2)

      const fin3 = new THREE.Mesh(finGeometry, finMaterial)
      fin3.position.y = 0.08
      fin3.position.z = 0.04
      fin3.rotation.y = Math.PI / 2
      rocketGroup.add(fin3)

      const fin4 = new THREE.Mesh(finGeometry, finMaterial)
      fin4.position.y = 0.08
      fin4.position.z = -0.04
      fin4.rotation.y = Math.PI / 2
      rocketGroup.add(fin4)

      // Rocket exhaust/trail
      const trailGeometry = new THREE.ConeGeometry(0.03, 0.15, 8)
      const trailMaterial = new THREE.MeshBasicMaterial({
        color: 0xff9500,
        transparent: true,
        opacity: 0.7,
      })
      const trail = new THREE.Mesh(trailGeometry, trailMaterial)
      trail.position.y = 0.17
      rocketGroup.add(trail)

      // Position rocket outside the scene
      const side = Math.floor(Math.random() * 4) // 0: top, 1: right, 2: bottom, 3: left
      const position = new THREE.Vector3()
      const target = new THREE.Vector3()

      // Set random starting position on one edge of the scene
      switch (side) {
        case 0: // top
          position.set((Math.random() - 0.5) * 10, 6, (Math.random() - 0.5) * 10)
          target.set((Math.random() - 0.5) * 10, -6, (Math.random() - 0.5) * 10)
          break
        case 1: // right
          position.set(6, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10)
          target.set(-6, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10)
          break
        case 2: // bottom
          position.set((Math.random() - 0.5) * 10, -6, (Math.random() - 0.5) * 10)
          target.set((Math.random() - 0.5) * 10, 6, (Math.random() - 0.5) * 10)
          break
        case 3: // left
          position.set(-6, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10)
          target.set(6, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10)
          break
      }

      rocketGroup.position.copy(position)

      // Calculate direction vector
      const direction = new THREE.Vector3()
      direction.subVectors(target, position).normalize()

      // Rotate rocket to face the direction of travel
      const quaternion = new THREE.Quaternion()
      quaternion.setFromUnitVectors(new THREE.Vector3(0, -1, 0), direction)
      rocketGroup.setRotationFromQuaternion(quaternion)

      // Add to scene
      scene.add(rocketGroup)

      // Store rocket data for animation
      const rocketData = {
        group: rocketGroup,
        direction: direction,
        speed: 0.03 + Math.random() * 0.03, // Random speed
        distanceTraveled: 0,
        maxDistance: 15, // Maximum distance before removal
      }

      return rocketData
    }

    // Rockets array
    const rockets: {
      group: THREE.Group
      direction: THREE.Vector3
      speed: number
      distanceTraveled: number
      maxDistance: number
    }[] = []

    // Launch rockets periodically
    const launchRocket = () => {
      if (rockets.length < 10) {
        // Limit number of rockets
        const rocket = createRocket()
        rockets.push(rocket)
      }

      // Schedule next rocket launch
      setTimeout(launchRocket, 1000 + Math.random() * 2000)
    }

    // Start launching rockets
    setTimeout(launchRocket, 1000)

    // Animation
    let time = 0
    const animate = () => {
      time += 0.01

      // Update star twinkling
      if (starsShaderMaterial.uniforms) {
        starsShaderMaterial.uniforms.time.value = time
      }

      // Update rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const rocket = rockets[i]

        // Move rocket
        rocket.group.position.addScaledVector(rocket.direction, rocket.speed)
        rocket.distanceTraveled += rocket.speed

        // Remove rocket if it's gone too far
        if (rocket.distanceTraveled > rocket.maxDistance) {
          scene.remove(rocket.group)
          rockets.splice(i, 1)
        }
      }

      particlesMesh.rotation.x += 0.0005
      particlesMesh.rotation.y += 0.0005

      controls.update()

      renderer.render(scene, camera)
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return

      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight
      camera.updateProjectionMatrix()

      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    }

    window.addEventListener("resize", handleResize)

    // Ensure animation frame is properly canceled on cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }

      if (containerRef.current && renderer.domElement && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement)
      }

      // Dispose of all resources
      scene.traverse((object) => {
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

      renderer.dispose()
      scene.clear()
    }
  }, [isHovered])

  useEffect(() => {
    if (isHovered) {
      gsap.to(".hero-text", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      })
    } else {
      gsap.to(".hero-text", {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: "power3.in",
      })
    }
  }, [isHovered])

  return (
    <div
      className="relative h-screen w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div ref={containerRef} className="absolute inset-0" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
        <h1 className="hero-text text-5xl md:text-7xl lg:text-8xl font-bold opacity-0 transform translate-y-8 gradient-text">
          CRAFTING DREAMS IN MOTION
        </h1>
        <p className="hero-text mt-6 text-xl md:text-2xl text-gray-300 max-w-2xl opacity-0 transform translate-y-8">
          Where imagination takes shape
        </p>
        <button className="hero-text mt-8 px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-all duration-300 opacity-0 transform translate-y-8 neon-button">
          Explore Our Work
        </button>
      </div>
    </div>
  )
}
