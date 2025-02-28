import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Gift } from "lucide-react"
import { useBasket } from "@/contexts/basket-context"

interface PackageDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  pkg: {
    id: number
    name: string
    description: string
    price: number
    perks?: string[]
    commands?: string[]
    kits?: {
      name: string
      items: string[]
    }[]
  }
}

export function PackageDialog({ open, onOpenChange, pkg }: PackageDialogProps) {
  const { addItem } = useBasket()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-[#0a0b0f] border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white flex items-center gap-2">
            <Gift className="w-5 h-5 text-purple-400" />
            {pkg.name}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[70vh] pr-6">
          <div className="space-y-6 py-4">
            {/* Perks Section */}
            {pkg.perks && pkg.perks.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Perks:</h3>
                <ul className="space-y-2">
                  {pkg.perks.map((perk, index) => (
                    <li key={index} className="text-gray-300 flex items-start gap-2">
                      <span className="text-purple-400 mt-1">•</span>
                      {perk}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Commands Section */}
            {pkg.commands && pkg.commands.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Commands:</h3>
                <ul className="space-y-2">
                  {pkg.commands.map((command, index) => (
                    <li key={index} className="text-gray-300 flex items-start gap-2">
                      <code className="px-1.5 py-0.5 rounded bg-gray-800 text-purple-400 text-sm">{command}</code>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Kits Section */}
            {pkg.kits && pkg.kits.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Kits:</h3>
                {pkg.kits.map((kit, kitIndex) => (
                  <div key={kitIndex} className="mb-4">
                    <h4 className="text-purple-400 font-medium mb-2">{kit.name}</h4>
                    <ul className="space-y-1">
                      {kit.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-gray-300 flex items-start gap-2">
                          <span className="text-purple-400/50 mt-1">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="flex items-center justify-between pt-4 border-t border-gray-800">
          <div className="text-2xl font-bold text-purple-400">${pkg.price.toFixed(2)}</div>
          <Button
            onClick={() => {
              addItem(pkg.id.toString(), "username")
              onOpenChange(false)
            }}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

