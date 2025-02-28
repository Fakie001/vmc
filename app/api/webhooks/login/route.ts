import { NextResponse } from "next/server"
import type { TebexLoginResponse } from "@/types/webhooks"

export const dynamic = "force-dynamic"

// Declare BANNED_USERS array. Populate with actual banned users as needed.
const BANNED_USERS = ["user1", "user2"] //Example - replace with your actual banned users

// Declare BANNED_COUNTRIES array. Populate with actual banned countries as needed.
const BANNED_COUNTRIES = ["CountryA", "CountryB"] //Example - replace with your actual banned countries

export async function GET(request: Request, { params }: { params: Record<string, string> }) {
  try {
    const { searchParams } = new URL(request.url)
    const ign = searchParams.get("ign")
    const ip = searchParams.get("ip")
    const country = searchParams.get("country")

    if (!ign || !ip || !country) {
      return NextResponse.json<TebexLoginResponse>(
        {
          verified: false,
          error: "Missing required parameters",
        },
        { status: 400 },
      )
    }

    // Log the verification attempt
    console.log(`Login verification attempt: ${ign} from ${country} (${ip})`)

    // Check if user is banned
    if (BANNED_USERS.includes(ign.toLowerCase())) {
      return NextResponse.json<TebexLoginResponse>({
        verified: false,
        error: "You are banned from accessing our store.",
      })
    }

    // Check if country is banned
    if (BANNED_COUNTRIES.includes(country)) {
      return NextResponse.json<TebexLoginResponse>({
        verified: false,
        error: "Access to the store is not available in your country.",
      })
    }

    // If all checks pass, allow login
    return NextResponse.json<TebexLoginResponse>({
      verified: true,
      message: `Welcome back, ${ign}!`,
    })
  } catch (error) {
    console.error("Login webhook error:", error)
    return NextResponse.json<TebexLoginResponse>(
      {
        verified: false,
        error: "An error occurred while processing your login.",
      },
      { status: 500 },
    )
  }
}

