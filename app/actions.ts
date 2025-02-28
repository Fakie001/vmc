"use server"

import { cookies } from "next/headers"

interface BasketItem {
  id: string
  name: string
  price: number
  quantity: number
}

interface Basket {
  id: string
  items: BasketItem[]
  total: number
}

// Mock basket storage (in a real app, use a database)
const baskets = new Map<string, Basket>()

export async function getOrCreateBasket(minecraftUsername?: string) {
  const cookieStore = cookies()
  let basketId = cookieStore.get("basketId")?.value

  if (!basketId || !minecraftUsername) {
    basketId = Math.random().toString(36).substring(7)
    baskets.set(basketId, {
      id: basketId,
      items: [],
      total: 0,
    })
    cookieStore.set("basketId", basketId)
  }

  return basketId
}

export async function addToBasket(packageId: number, minecraftUsername?: string) {
  try {
    if (!minecraftUsername) {
      throw new Error("Minecraft username is required")
    }

    const basketId = await getOrCreateBasket(minecraftUsername)
    const basket = baskets.get(basketId)

    if (!basket) {
      throw new Error("Basket not found")
    }

    // Mock item data (in a real app, fetch from your database)
    const item = {
      id: packageId.toString(),
      name: "Package " + packageId,
      price: 9.99,
      quantity: 1,
    }

    basket.items.push(item)
    basket.total += item.price

    return { success: true, data: basket }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to add item to basket",
    }
  }
}

export async function removeFromBasket(packageId: number) {
  try {
    const basketId = cookies().get("basketId")?.value
    if (!basketId) throw new Error("No basket found")

    const basket = baskets.get(basketId)
    if (!basket) throw new Error("Basket not found")

    basket.items = basket.items.filter((item) => {
      if (item.id === packageId.toString()) {
        basket.total -= item.price * item.quantity
        return false
      }
      return true
    })

    return { success: true, data: basket }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to remove item from basket",
    }
  }
}

export async function checkout() {
  try {
    const basketId = cookies().get("basketId")?.value
    if (!basketId) throw new Error("No basket found")

    // Mock checkout URL (in a real app, create a checkout session)
    const url = "/checkout/success"
    cookies().delete("basketId")
    baskets.delete(basketId)

    return { success: true, url }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create checkout",
    }
  }
}

