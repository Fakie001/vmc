"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Flower } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function SpringThemeToggle() {
  const [enabled, setEnabled] = useState(true)

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative h-10 w-10 rounded-full bg-pink-500/10 hover:bg-pink-500/20"
      onClick={() => setEnabled(!enabled)}
    >
      <AnimatePresence>
        {enabled && (
          <motion.div
            className="absolute inset-0 rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-pink-400/50 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.2,
                }}
                style={{
                  left: "50%",
                  top: "50%",
                  transform: `rotate(${i * 45}deg) translate(12px, 0)`,
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <Flower className={`h-4 w-4 ${enabled ? "text-pink-400" : "text-gray-400"}`} />
    </Button>
  )
}

