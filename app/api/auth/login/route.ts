import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  // Get the current origin
  const origin = request.headers.get("origin") || "http://localhost:3000"

  // Create a mock login URL (replace with your actual login URL)
  const loginUrl = `${origin}/login`

  return NextResponse.redirect(loginUrl)
}

