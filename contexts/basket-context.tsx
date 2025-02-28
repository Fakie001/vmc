"use client"

import type React from "react"

import { createContext, useContext, useReducer, useState } from "react"
import { toast } from "sonner"

interface BasketItem {
  id: string
  name: string
  price: number
  quantity: number
  image?: string | null
}

interface BasketState {
  items: BasketItem[]
  total: number
}

type BasketAction =
  | { type: "ADD_ITEM"; payload: BasketItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_BASKET" }

const initialState: BasketState = {
  items: [],
  total: 0,
}

function basketReducer(state: BasketState, action: BasketAction): BasketState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find((item) => item.id === action.payload.id)
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item,
          ),
          total: state.total + action.payload.price,
        }
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
        total: state.total + action.payload.price,
      }
    }
    case "REMOVE_ITEM": {
      const item = state.items.find((i) => i.id === action.payload)
      if (!item) return state
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.payload),
        total: state.total - item.price * item.quantity,
      }
    }
    case "UPDATE_QUANTITY": {
      const item = state.items.find((i) => i.id === action.payload.id)
      if (!item) return state
      const quantityDiff = action.payload.quantity - item.quantity
      return {
        ...state,
        items: state.items.map((i) => (i.id === action.payload.id ? { ...i, quantity: action.payload.quantity } : i)),
        total: state.total + item.price * quantityDiff,
      }
    }
    case "CLEAR_BASKET":
      return initialState
    default:
      return state
  }
}

interface BasketContextType {
  basket: BasketState
  isOpen: boolean
  openBasket: () => void
  closeBasket: () => void
  addItem: (item: Omit<BasketItem, "quantity">) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearBasket: () => void
}

const BasketContext = createContext<BasketContextType | undefined>(undefined)

export function BasketProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(basketReducer, initialState)
  const [isOpen, setIsOpen] = useState(false)

  const addItem = (item: Omit<BasketItem, "quantity">) => {
    dispatch({ type: "ADD_ITEM", payload: { ...item, quantity: 1 } })
    toast.success("Item added to basket")
    setIsOpen(true)
  }

  const removeItem = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id })
    toast.success("Item removed from basket")
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(id)
      return
    }
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })
  }

  const clearBasket = () => {
    dispatch({ type: "CLEAR_BASKET" })
  }

  return (
    <BasketContext.Provider
      value={{
        basket: state,
        isOpen,
        openBasket: () => setIsOpen(true),
        closeBasket: () => setIsOpen(false),
        addItem,
        removeItem,
        updateQuantity,
        clearBasket,
      }}
    >
      {children}
    </BasketContext.Provider>
  )
}

export function useBasket() {
  const context = useContext(BasketContext)
  if (!context) {
    throw new Error("useBasket must be used within BasketProvider")
  }
  return context
}

