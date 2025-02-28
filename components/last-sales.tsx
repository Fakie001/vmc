"use client"

import { useState } from "react"

interface Sale {
  username: string
  item: string
  price: number
  avatar: string
  timestamp: string
}

const MOCK_SALES: Sale[] = [
  {
    username: "Player1",
    item: "Warrior Rank",
    price: 9.99,
    avatar: "https://mc-heads.net/avatar/Player1",
    timestamp: new Date().toISOString(),
  },
  {
    username: "Player2",
    item: "Common Key",
    price: 4.99,
    avatar: "https://mc-heads.net/avatar/Player2",
    timestamp: new Date().toISOString(),
  },
]

export function LastSales() {
  const [sales] = useState<Sale[]>(MOCK_SALES)
  return <div></div>
}

