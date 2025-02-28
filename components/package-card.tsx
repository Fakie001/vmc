"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Info, ShoppingCart } from "lucide-react"
import { cn } from "@/lib/utils"
import { useBasket } from "@/contexts/basket-context"
import { PackageDialog } from "./package-dialog"
import { motion, AnimatePresence } from "framer-motion"

interface Package {
  id: number
  name: string
  description: string
  price: number
  image: string | null
  perks?: string[]
  commands?: string[]
  kits?: {
    name: string
    items: string[]
  }[]
}

interface PackageCardProps {
  pkg: Package
}

export function PackageCard({ pkg }: PackageCardProps) {
  const [showDialog, setShowDialog] = useState(false)
  const { addItem } = useBasket()
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // Ripple effect state
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([])
  let rippleCount = 0

  const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget
    const rect = button.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    const newRipple = {
      x,
      y,
      id: rippleCount++,
    }

    setRipples((prevRipples) => [...prevRipples, newRipple])

    // Clean up ripple after animation
    setTimeout(() => {
      setRipples((prevRipples) => prevRipples.filter((ripple) => ripple.id !== newRipple.id))
    }, 1000)
  }

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    createRipple(e)
    addItem({
      id: pkg.id.toString(),
      name: pkg.name,
      price: pkg.price,
      image: pkg.image,
    })
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <Card
          ref={cardRef}
          className={cn(
            "group relative bg-[#2A2438] border-[#9D74FF]/10 overflow-hidden",
            "hover:border-[#9D74FF]/30 hover:shadow-lg hover:shadow-[#9D74FF]/10 transition-all duration-300",
            "transform hover:-translate-y-1",
          )}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => setShowDialog(true)}
        >
          <div className="relative p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="relative"
              >
                {/* Item Image with Hover Effect */}
                <motion.div
                  className="relative w-32 h-32 mx-auto mb-4"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="absolute inset-0 bg-[#9D74FF]/10 rounded-lg" />
                  <img src={pkg.image || "/placeholder.svg"} alt={pkg.name} className="w-full h-full object-contain" />
                </motion.div>

                {/* Package Info */}
                <div className="text-center space-y-4">
                  <motion.h3
                    className="text-lg font-bold text-[#F0F0F0] group-hover:text-[#9D74FF] transition-colors"
                    whileHover={{ scale: 1.02 }}
                  >
                    {pkg.name}
                  </motion.h3>
                  <motion.p
                    className="text-2xl font-bold text-[#9D74FF]"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    ${pkg.price.toFixed(2)}
                  </motion.p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Actions */}
            <div className="flex gap-4 mt-6">
              <Button
                size="icon"
                variant="outline"
                className={cn(
                  "h-10 w-10 rounded-md relative overflow-hidden",
                  "bg-[#221D2E] border-gray-700 hover:bg-[#2A2438] hover:border-[#9D74FF]/50",
                  "transition-all duration-300",
                )}
                onClick={(e) => {
                  e.stopPropagation()
                  createRipple(e)
                  setShowDialog(true)
                }}
              >
                <Info className="h-4 w-4 text-[#BBB8C3] relative z-10" />
                {/* Ripple Effects */}
                {ripples.map((ripple) => (
                  <span
                    key={ripple.id}
                    className="absolute bg-[#9D74FF]/20 rounded-full animate-ripple"
                    style={{
                      left: ripple.x,
                      top: ripple.y,
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                ))}
              </Button>

              <Button
                className={cn(
                  "w-full relative overflow-hidden",
                  "bg-[#9D74FF] hover:bg-[#B594FF] text-white",
                  "transition-all duration-300",
                  "transform active:scale-95",
                )}
                onClick={handleAddToCart}
              >
                <motion.div
                  className="flex items-center justify-center relative z-10"
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to cart
                </motion.div>
                {/* Ripple Effects */}
                {ripples.map((ripple) => (
                  <span
                    key={ripple.id}
                    className="absolute bg-white/20 rounded-full animate-ripple"
                    style={{
                      left: ripple.x,
                      top: ripple.y,
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                ))}
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>

      <PackageDialog open={showDialog} onOpenChange={setShowDialog} pkg={pkg} />
    </>
  )
}

