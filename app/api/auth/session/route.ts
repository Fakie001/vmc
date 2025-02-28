import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const cookieStore = cookies()
    const sessionToken = cookieStore.get("session_token")

    if (!sessionToken) {
      return NextResponse.json({ user: null })
    }

    // Mock user data instead of verifying with Tebex
    const userData = {
      id: "1",
      username: "Player1",
      minecraft_username: "Player1",
    }

    return NextResponse.json({
      user: {
        id: userData.id,
        username: userData.username,
        minecraft_username: userData.minecraft_username,
        avatar_url: `https://mc-heads.net/avatar/${userData.minecraft_username}`,
      },
    })
  } catch (error) {
    console.error("Session verification error:", error)
    return NextResponse.json({ user: null })
  }
}

