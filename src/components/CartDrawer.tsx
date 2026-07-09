import { Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2, ShieldCheck } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/data/site";
import { toast } from "sonner";

export function CartDrawer() {
  const { items, isOpen, close, subtotal, setQty, removeItem, count } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={(o) => !o && close()}>
      <SheetContent className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b border-border px-5 py-4">
          <SheetTitle className="flex items-center gap-2 text-left">
            <ShoppingBag className="h-5 w-5" />
            Your Cart {count > 0 && `(${count})`}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            <p className="text-muted-foreground">Your cart is empty.</p>
            <Button asChild onClick={close}>
              <Link to="/shop">Shop products</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <ul className="flex flex-col gap-4">
                {items.map((item) => (
                  <li key={item.key} className="flex gap-3">
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-border bg-cream">
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        className="h-full w-full object-contain p-1.5"
                      />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <p className="text-sm font-semibold leading-snug text-foreground">
                        {item.title}
                      </p>
                      {item.variantTitle && (
                        <p className="text-xs text-muted-foreground">{item.variantTitle}</p>
                      )}
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <div className="flex items-center rounded-md border border-border">
                          <button
                            className="grid h-8 w-8 place-items-center text-muted-foreground hover:text-foreground"
                            onClick={() => setQty(item.key, item.qty - 1)}
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">{item.qty}</span>
                          <button
                            className="grid h-8 w-8 place-items-center text-muted-foreground hover:text-foreground"
                            onClick={() => setQty(item.key, item.qty + 1)}
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <span className="text-sm font-bold">
                          {formatPrice(item.price * item.qty)}
                        </span>
                      </div>
                    </div>
                    <button
                      className="self-start text-muted-foreground hover:text-destructive"
                      onClick={() => removeItem(item.key)}
                      aria-label={`Remove ${item.title}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <SheetFooter className="border-t border-border px-5 py-4">
              <div className="flex w-full flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Subtotal</span>
                  <span className="text-lg font-bold">{formatPrice(subtotal)}</span>
                </div>
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                  30-day money back guarantee · Secure checkout
                </p>
                <Button
                  size="lg"
                  className="w-full"
                  onClick={() =>
                    toast("Checkout", {
                      description:
                        "Connect your store to enable live checkout. Your cart is saved.",
                    })
                  }
                >
                  Checkout · {formatPrice(subtotal)}
                </Button>
                <Button variant="outline" className="w-full" onClick={close}>
                  Continue shopping
                </Button>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
