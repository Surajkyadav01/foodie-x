import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CheckCircle2, ChefHat, Bike, PackageCheck } from "lucide-react";

export const Route = createFileRoute("/order-tracking")({
  component: TrackingPage,
});

const steps = [
  { label: "Order Placed", icon: CheckCircle2 },
  { label: "Preparing", icon: ChefHat },
  { label: "Out for Delivery", icon: Bike },
  { label: "Delivered", icon: PackageCheck },
];

function TrackingPage() {
  const [active, setActive] = useState(1);

  useEffect(() => {
    const t = setInterval(() => setActive((a) => Math.min(a + 1, steps.length - 1)), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 animate-fade-in">
      <div className="bg-card rounded-3xl border shadow-card p-6">
        <div className="text-center">
          <div className="text-sm text-muted-foreground">Order #FX{Math.floor(Math.random() * 9000) + 1000}</div>
          <h1 className="text-2xl font-bold mt-1">{active < steps.length - 1 ? "Your order is on its way" : "Order delivered 🎉"}</h1>
          <p className="text-muted-foreground mt-1">Estimated arrival in 25 minutes</p>
        </div>

        <div className="mt-8 space-y-6">
          {steps.map((s, i) => {
            const Icon = s.icon;
            const done = i <= active;
            return (
              <div key={s.label} className="flex items-center gap-4">
                <div className={`size-12 rounded-full flex items-center justify-center transition ${done ? "gradient-brand text-brand-foreground" : "bg-muted text-muted-foreground"}`}>
                  <Icon className="size-5" />
                </div>
                <div className="flex-1">
                  <div className={`font-semibold ${done ? "" : "text-muted-foreground"}`}>{s.label}</div>
                  {i === active && <div className="text-xs text-brand">In progress…</div>}
                </div>
                {done && i < active && <span className="text-xs text-[oklch(0.65_0.17_145)]">✓ Done</span>}
              </div>
            );
          })}
        </div>

        <Link to="/" className="block text-center mt-8 py-3 rounded-xl border hover:bg-accent transition">
          Order something else
        </Link>
      </div>
    </div>
  );
}
