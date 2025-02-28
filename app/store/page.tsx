import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { StoreSection } from "@/components/store-section"

export default function StorePage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-[#1F1A29]">
      <SiteHeader />
      <main className="flex-1">
        <StoreSection />
      </main>
      <SiteFooter />
    </div>
  )
}

