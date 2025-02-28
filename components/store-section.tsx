"use client"

import { useState } from "react"
import { StoreBanner } from "./store-banner"
import { HotItems } from "./hot-items"
import { cn } from "@/lib/utils"
import { LastSales } from "./last-sales"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { HelpCircle } from "lucide-react"

interface CategoryType {
  label: string
  value: "Ranks" | "Keys" | "Kits" | "Tags" | "Pickaxes" | "Upgrade" | "Summoners" | "Disguises" | "Boosters"
}
interface ServerType {
  label: string
  value: "Factions" | "Prison"
}

interface StoreProps {
  serverType?: ServerType
}

const CATEGORY_ICONS = {
  Ranks: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-L8qDZxN0VoGHUQk1mveRemmc1d9uXl.png",
  Upgrade: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-vbXGRmamuJ50vJ9Qi3oLa5DvSogb1u.png",
  Keys: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-z4xyvb8HFyu9g7GheP0aEv6TjOfFKM.png",
  Kits: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-H1q5rqpGPN2SZ8AtBIRtRg3rHimSem.png",
  Summoners: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-RfIgrZvkrfBN33l2FyzgnR2FsenPmx.png",
  Disguises: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-4xBlW56Jvh2YlPp3uzqafeWSbZkd1i.png",
  Boosters: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ymwE1HXIc4Lhseg3GykckYOIWlOhTu.png",
  Tags: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-IcIss8WkkmYJPbGx4sifFzxIsT0wUZ.png",
}

const SERVERS = {
  Factions: { description: "Classic factions gameplay" },
  Prison: { description: "A challenging prison experience" },
}

// Pre-calculate particle positions
const PARTICLES = Array.from({ length: 15 }, () => ({
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  delay: `${Math.random() * 5}s`,
  duration: `${5 + Math.random() * 5}s`,
}))

export function StoreSection({ storeInfo }: StoreProps) {
  const [selectedServer, setSelectedServer] = useState<string>("Factions")
  const [selectedCategory, setSelectedCategory] = useState<string>("Ranks")
  const [index, setIndex] = useState(0)
  const [isCycling, setIsCycling] = useState(false)

  const categories = ["Ranks", "Upgrade", "Keys", "Kits", "Summoners", "Disguises", "Boosters", "Tags"]

  return (
    <div className="min-h-screen bg-[#1F1A29] pt-8 md:pt-12 pb-24">
      <div className="container py-16 relative">
        {/* Minecraft Leaf Particles */}
        {PARTICLES.map((particle, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rotate-45 bg-purple-500/20 rounded-sm animate-float"
            style={{
              left: particle.left,
              top: particle.top,
              animationDelay: particle.delay,
              animationDuration: particle.duration,
            }}
          />
        ))}
        <StoreBanner />
        {/* Server Selection - Mobile Friendly */}
        <div className="text-center mt-16 mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[#F0F0F0]">Our Game Modes</h2>
          <p className="text-[#BBB8C3] mt-2">Choose your preferred game mode to start browsing</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
          {Object.entries(SERVERS).map(([serverName, serverConfig]) => (
            <button
              key={serverName}
              onClick={() => setSelectedServer(serverName as string)}
              className={cn(
                "p-4 rounded-lg text-left transition-all h-[120px]",
                "bg-gradient-to-br relative group overflow-hidden",
                "from-[#9D74FF]/50 to-[#9D74FF]/30 border-[#9D74FF]",
                "border hover:border-[#9D74FF]/50",
                selectedServer === serverName && "ring-2 ring-[#9D74FF]",
              )}
            >
              <div className="relative z-10">
                <h3 className="font-bold text-[#F0F0F0]">{serverName}</h3>
                <p className="text-xs text-[#BBB8C3]">{serverConfig.description}</p>
              </div>
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{
                  backgroundImage:
                    serverName === "Factions"
                      ? `url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/weffew.png-5rCRnR0udd8jgb1kzRUwja1rAemF6w.webp)`
                      : `url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/prison-bg.png-OxqdqwvCiqPQOIojHe6aglphrF6KNt.webp)`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/50 to-transparent" />
            </button>
          ))}
        </div>
        {/* Hot Items Section */}
        <HotItems serverType={selectedServer} />
        <div className="flex flex-col md:flex-row gap-8 w-full mt-24">
          {/* Main Content Area */}
          <div className="w-full space-y-8">
            {/* Categories - Mobile Friendly */}
            <div className="relative mb-16">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-[#1F1A29] rounded-2xl border border-purple-500/10">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category as string)}
                    className={cn(
                      "px-4 py-3 rounded-lg text-left transition-all flex items-center gap-2",
                      "hover:bg-[#9D74FF]/10 hover:shadow-lg hover:shadow-[#9D74FF]/5",
                      "w-full",
                      selectedCategory === category
                        ? "bg-[#2A2438] text-[#F0F0F0] border border-[#9D74FF]/20"
                        : "text-[#BBB8C3] border border-transparent",
                    )}
                  >
                    <img
                      src={CATEGORY_ICONS[category] || "/placeholder.svg"}
                      alt={`${category} icon`}
                      className={cn(
                        "w-6 h-6 object-contain transition-transform",
                        selectedCategory === category && "transform scale-110",
                      )}
                    />
                    <span className="font-medium text-sm">{category}</span>
                  </button>
                ))}
              </div>
              <div className="absolute left-0 right-0 bottom-0 h-4 bg-gradient-to-t from-[#1F1A29] to-transparent md:hidden" />
            </div>

            {/* Empty State */}
            <div className="text-center py-12">
              <p className="text-[#BBB8C3]">No items available in this category.</p>
            </div>

            {/* Last Sales Section */}
            <div className="mt-24 pt-16 border-t border-gray-800">
              <LastSales />
            </div>

            {/* FAQ Section */}
            <div className="mt-32 pt-24 border-t border-gray-800 flex flex-col items-center">
              <div className="flex items-center gap-3 mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#9D74FF]/30 blur-xl animate-pulse rounded-full" />
                  <div className="p-2 rounded-lg bg-[#9D74FF]/10 relative animate-float backdrop-blur-sm border border-[#9D74FF]/20">
                    <HelpCircle className="w-6 h-6 text-[#9D74FF] animate-wiggle" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-[#F0F0F0]">Frequently Asked Questions</h2>
              </div>
              <Accordion type="single" collapsible className="w-full space-y-4">
                <AccordionItem value="item-1" className="border-[#9D74FF]/10">
                  <AccordionTrigger className="text-[#F0F0F0] hover:text-[#9D74FF] hover:no-underline text-base">
                    How do I receive my items after purchase?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    Items are automatically delivered to your account in-game immediately after a successful purchase.
                    Simply join the server and your items will be waiting for you. If you experience any delays, please
                    contact our support team.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="border-[#9D74FF]/10">
                  <AccordionTrigger className="text-[#F0F0F0] hover:text-[#9D74FF] hover:no-underline text-base">
                    What payment methods do you accept?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    We accept all major credit cards, PayPal, and various local payment methods. All transactions are
                    processed securely through our payment provider. Cryptocurrency payments are also available upon
                    request.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className="border-[#9D74FF]/10">
                  <AccordionTrigger className="text-[#F0F0F0] hover:text-[#9D74FF] hover:no-underline text-base">
                    Are purchases permanent?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    Yes, all purchases are permanent and will remain on your account as long as you play on our server.
                    Ranks, kits, and other perks are tied to your username and will not expire unless explicitly stated
                    in the item description.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4" className="border-[#9D74FF]/10">
                  <AccordionTrigger className="text-[#F0F0F0] hover:text-[#9D74FF] hover:no-underline text-base">
                    What happens if I change my username?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    If you change your Minecraft username, your purchases will automatically transfer to your new
                    username. However, please contact our support team to ensure a smooth transition and verify your
                    account ownership.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5" className="border-[#9D74FF]/10">
                  <AccordionTrigger className="text-[#F0F0F0] hover:text-[#9D74FF] hover:no-underline text-base">
                    Do you offer refunds?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    As stated in our refund policy, we do not offer refunds on digital items once they have been
                    delivered. Please make sure to read item descriptions carefully before making a purchase. If you
                    experience any technical issues, our support team is here to help.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

