"use client"

import { useState } from "react"
import { motion } from "framer-motion"

export function HeroSection() {
  const [serverStatus, setServerStatus] = useState({
    online: true,
    players: { online: 256, max: 1000 },
  })

  // Falling cherry blossom animation variants
  const blossom = {
    initial: {
      y: -20,
      x: 0,
      opacity: 0,
      rotate: 0,
    },
    animate: {
      y: ["0%", "100%"],
      x: ["0%", "50%", "-50%", "0%"],
      opacity: [0, 1, 1, 0],
      rotate: [0, 45, -45, 0],
      transition: {
        duration: 5,
        ease: "linear",
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop",
        delay: Math.random() * 5,
      },
    },
  }

  const serverIP = "vanquishmc.com"

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/backgrond1.png-OxqdqwvCiqPQOIojHe6aglphrF6KNt.webp)`,
          backgroundPosition: "center center",
          backgroundSize: "cover",
        }}
      />
      <div className="absolute inset-0 bg-black/50" />

      {/* Animated Cherry Blossoms */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 bg-pink-400/20 rounded-full"
          variants={blossom}
          initial="initial"
          animate="animate"
          style={{
            left: `${Math.random() * 100}%`,
            top: -20,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 text-center space-y-8 px-4 max-w-4xl mx-auto">
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight bg-gradient-to-br from-rose-300 via-purple-400 to-indigo-500 text-transparent bg-clip-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to Our Minecraft Server
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-white/90"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Join the adventure, build, explore, and make new friends!
        </motion.p>

        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="space-y-4">
            <p className="text-white/80">Server IP:</p>
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-2">
                <code className="px-3 py-2 rounded-lg bg-black/30 backdrop-blur-sm text-gray-100 font-mono text-sm">
                  {serverIP}
                </code>
                <div
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-black/30 backdrop-blur-sm"
                  aria-live="polite"
                >
                  <div
                    className={`w-2 h-2 rounded-full ${serverStatus.online ? "bg-green-500" : "bg-red-500"}`}
                    role="status"
                    aria-label={`Server is ${serverStatus.online ? "online" : "offline"}`}
                  />
                  <span className="text-sm text-gray-300">
                    {serverStatus.players.online}/{serverStatus.players.max} Online
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

