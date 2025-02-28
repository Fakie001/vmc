"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Timer, Sparkles, ArrowRight, Check } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface VoteSite {
  id: number
  name: string
  url: string
  cooldown: string
  votes: number
  icon: string
}

const VOTE_SITES: VoteSite[] = [
  {
    id: 1,
    name: "MinecraftMP",
    url: "https://minecraft-mp.com/server/yourserver",
    cooldown: "24 hours",
    votes: 1,
    icon: "https://www.minecraft-mp.com/favicon.ico",
  },
  {
    id: 2,
    name: "PlanetMinecraft",
    url: "https://www.planetminecraft.com/server/yourserver",
    cooldown: "24 hours",
    votes: 1,
    icon: "https://static.planetminecraft.com/favicon.ico",
  },
  {
    id: 3,
    name: "Minecraft-Server.net",
    url: "https://minecraft-server.net/vote/yourserver",
    cooldown: "24 hours",
    votes: 1,
    icon: "/placeholder.svg",
  },
  {
    id: 4,
    name: "TopG",
    url: "https://topg.org/minecraft-servers/server-yourserver",
    cooldown: "24 hours",
    votes: 2,
    icon: "https://topg.org/favicon.ico",
  },
]

export function VoteSection() {
  const [totalVotes, setTotalVotes] = useState(0)
  const [votedSites, setVotedSites] = useState<number[]>([])
  const [showConfetti, setShowConfetti] = useState(false)

  const handleVote = (siteId: number) => {
    if (!votedSites.includes(siteId)) {
      setVotedSites([...votedSites, siteId])
      const site = VOTE_SITES.find((s) => s.id === siteId)
      if (site) {
        setTotalVotes((prev) => prev + site.votes)
        setShowConfetti(true)
        setTimeout(() => setShowConfetti(false), 3000)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1F1A29] to-[#2A2438]">
      {/* Hero Section */}
      <div className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 min-h-[200%]">
          {/* Animated particles */}
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: `rgba(157, 116, 255, ${Math.random() * 0.5 + 0.2})`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, -100],
                x: Math.random() * 40 - 20,
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="relative container">
          <div className="text-center space-y-8 max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-block">
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#9D74FF]/20 to-[#9D74FF]/10 border border-[#9D74FF]/20 backdrop-blur-sm">
                  <Sparkles className="w-5 h-5 text-[#9D74FF]" />
                  <span className="text-[#9D74FF] font-medium">Earn Amazing Rewards</span>
                </div>
              </div>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 text-transparent bg-clip-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Support Our Server
            </motion.h1>

            <motion.p
              className="text-xl text-gray-400 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Vote daily to unlock exclusive rewards and help us grow. Your support makes our community stronger!
            </motion.p>
          </div>
        </div>
      </div>

      <div className="container pb-32 space-y-24">
        {/* Voting Sites */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 rounded-xl bg-gradient-to-br from-[#9D74FF]/20 to-[#9D74FF]/5 border border-[#9D74FF]/20">
              <ExternalLink className="w-6 h-6 text-[#9D74FF]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Voting Sites</h2>
              <p className="text-gray-400">Click each site to cast your vote and earn rewards</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {VOTE_SITES.map((site) => (
              <Card
                key={site.id}
                className={cn(
                  "bg-[#2A2438]/50 backdrop-blur-sm border-[#9D74FF]/10",
                  "hover:border-[#9D74FF]/30 hover:shadow-lg hover:shadow-[#9D74FF]/5",
                  "transition-all duration-300 group",
                  votedSites.includes(site.id) && "opacity-75",
                )}
              >
                <a
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-6 flex items-center justify-between"
                  onClick={() => handleVote(site.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#9D74FF]/10 border border-[#9D74FF]/20 flex items-center justify-center p-2">
                      <img
                        src={site.icon || "/placeholder.svg"}
                        alt=""
                        className="w-full h-full object-contain opacity-70"
                      />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold text-white group-hover:text-[#9D74FF] transition-colors">
                        {site.name}
                      </h3>
                      <div className="flex items-center text-sm text-gray-400">
                        <Timer className="w-4 h-4 mr-2" />
                        {site.cooldown}
                      </div>
                    </div>
                  </div>
                  <Button
                    className={cn(
                      "relative overflow-hidden",
                      votedSites.includes(site.id)
                        ? "bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30"
                        : "bg-[#9D74FF] hover:bg-[#B594FF] text-white",
                    )}
                  >
                    {votedSites.includes(site.id) ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Voted
                      </>
                    ) : (
                      <>
                        Vote Now
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </a>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Confetti Effect */}
        <AnimatePresence>
          {showConfetti && (
            <div className="fixed inset-0 pointer-events-none">
              {[...Array(50)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-[#9D74FF]"
                  initial={{
                    opacity: 1,
                    top: "50%",
                    left: "50%",
                  }}
                  animate={{
                    opacity: 0,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    scale: [1, 0],
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 1 + Math.random() * 2,
                    ease: "easeOut",
                  }}
                />
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

