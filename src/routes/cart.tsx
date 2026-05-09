import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Minus, Trash2, ShoppingBag, BadgePercent } from "lucide-react";
import { useApp } from "@/lib/app-store";
import { toast } from "sonner";

export const Route = createFileRoute("/cart")({
  component: CartPage,
});

const COUPONS: Record<string, number> = { FOODIE50: 0.5, FREESHIP: 0, NEW20: 0.2 };

function CartPage() {
  const { cart, updateQty, removeFromCart, clearCart, user } = useApp();
  const [coupon, setCoupon] = useState("");
  const [applied, setApplied] = useState<{ code: string; discount: number } | null>(null);
  const navigate = useNavigate();

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const discount = applied ? Math.round(subtotal * applied.discount) : 0;
  const delivery = subtotal > 199 || applied?.code === "FREESHIP" ? 0 : 29;
  const total = subtotal - discount + delivery;

  const apply = () => {
    const code = coupon.trim().toUpperCase();
    if (code in COUPONS) {
      setApplied({ code, discount: COUPONS[code] });
      toast.success(`Coupon ${code} applied!`);
    } else {
      toast.error("Invalid coupon code");
    }
  };

  const checkout = () => {
    if (!user) {
      toast.info("Please login to continue");
      navigate({ to: "/auth" });
      return;
    }
    clearCart();
    toast.success("Order placed! 🎉");
    navigate({ to: "/order-tracking" });
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center animate-fade-in">
        <div className="size-24 mx-auto rounded-full bg-accent flex items-center justify-center mb-4">
          <ShoppingBag className="size-12 text-brand" />
        </div>
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
        <p className="text-muted-foreground mt-2">Add delicious food to get started</p>
        <Link to="/" className="inline-block mt-6 px-6 py-3 rounded-full gradient-brand text-brand-foreground font-medium">Browse restaurants</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-3xl font-extrabold mb-6">Your Cart</h1>

      <div className="bg-card rounded-2xl border shadow-card divide-y">
        {cart.map((item) => (
          <div key={item.id} className="p-4 flex items-center gap-4">
            <img src={item.image} alt={item.name} className="size-16 rounded-xl object-cover" />
            <div className="flex-1 min-w-0">
              <div className="font-semibold truncate">{item.name}</div>
              <div className="text-sm text-muted-foreground">₹{item.price} × {item.qty}</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-brand text-brand-foreground rounded-lg">
                <button onClick={() => updateQty(item.id, item.qty - 1)} className="px-2 py-1.5"><Minus className="size-3.5" /></button>
                <span className="px-2 font-semibold text-sm">{item.qty}</span>
                <button onClick={() => updateQty(item.id, item.qty + 1)} className="px-2 py-1.5"><Plus className="size-3.5" /></button>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="p-2 rounded-lg hover:bg-destructive/10 text-destructive">
                <Trash2 className="size-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-card rounded-2xl border shadow-card p-5">
        <div className="flex items-center gap-2 mb-3">
          <BadgePercent className="size-5 text-brand" />
          <h3 className="font-semibold">Apply coupon</h3>
        </div>
        <div className="flex gap-2">
          <input
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            placeholder="Try FOODIE50, FREESHIP, NEW20"
            className="flex-1 px-3 py-2 rounded-lg bg-input/50 border outline-none focus:ring-2 focus:ring-brand"
          />
          <button onClick={apply} className="px-4 py-2 rounded-lg gradient-brand text-brand-foreground font-medium">Apply</button>
        </div>
        {applied && <p className="text-sm text-[oklch(0.65_0.17_145)] mt-2">✓ {applied.code} applied — saved ₹{discount}</p>}
      </div>

      <div className="mt-6 bg-card rounded-2xl border shadow-card p-5 space-y-2 text-sm">
        <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>₹{subtotal}</span></div>
        {discount > 0 && <div className="flex justify-between text-[oklch(0.65_0.17_145)]"><span>Discount</span><span>-₹{discount}</span></div>}
        <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span>{delivery === 0 ? "FREE" : `₹${delivery}`}</span></div>
        <div className="flex justify-between font-bold text-lg pt-2 border-t"><span>Total</span><span>₹{total}</span></div>
      </div>

      <button
        onClick={checkout}
        className="w-full mt-6 py-4 rounded-2xl gradient-brand text-brand-foreground font-bold text-lg shadow-soft hover:opacity-95 transition"
      >
        Proceed to Checkout · ₹{total}
      </button>
    </div>
  );
}
