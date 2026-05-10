import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, ChefHat, Bike, PackageCheck, MapPin, Phone, RotateCcw } from "lucide-react";

export const Route = createFileRoute("/order-tracking")({
  component: TrackingPage,
});

const steps = [
  { label: "Order Placed", icon: CheckCircle2, hint: "We've received your order" },
  { label: "Preparing", icon: ChefHat, hint: "Chef is cooking your meal" },
  { label: "Out for Delivery", icon: Bike, hint: "Rider is on the way" },
  { label: "Delivered", icon: PackageCheck, hint: "Enjoy your meal!" },
];

function TrackingPage() {
  const [active, setActive] = useState(0);
  const [eta, setEta] = useState(25 * 60);
  const orderId = useMemo(() => `FX${Math.floor(Math.random() * 9000) + 1000}`, []);

  useEffect(() => {
    const t = setInterval(() => setActive((a) => Math.min(a + 1, steps.length - 1)), 4000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (active >= steps.length - 1) return;
    const t = setInterval(() => setEta((e) => Math.max(0, e - 1)), 1000);
    return () => clearInterval(t);
  }, [active]);

  const mm = String(Math.floor(eta / 60)).padStart(2, "0");
  const ss = String(eta % 60).padStart(2, "0");
  const progress = ((active + 1) / steps.length) * 100;
  const delivered = active >= steps.length - 1;

  const restart = () => {
    setActive(0);
    setEta(25 * 60);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 animate-fade-in">
      <div className="bg-card rounded-3xl border shadow-card overflow-hidden">
        {/* Hero */}
        <div className="gradient-brand text-brand-foreground p-6 text-center">
          <div className="text-xs opacity-90">Order ID</div>
          <div className="text-lg font-bold tracking-wider">#{orderId}</div>
          <h1 className="text-2xl font-extrabold mt-3">
            {delivered ? "Order delivered 🎉" : "Your order is on its way"}
          </h1>
          {!delivered ? (
            <div className="mt-3 inline-flex items-center gap-2 bg-white/15 backdrop-blur px-4 py-1.5 rounded-full">
              <span className="text-sm opacity-90">Arriving in</span>
              <span className="text-lg font-bold tabular-nums">{mm}:{ss}</span>
            </div>
          ) : (
            <p className="mt-2 opacity-90 text-sm">Hope you enjoy your meal!</p>
          )}
        </div>

        {/* Progress bar */}
        <div className="px-6 pt-6">
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full gradient-brand transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Steps */}
        <div className="p-6 space-y-5">
          {steps.map((s, i) => {
            const Icon = s.icon;
            const done = i <= active;
            const current = i === active && !delivered;
            return (
              <div key={s.label} className="flex items-center gap-4">
                <div
                  className={`size-12 rounded-full flex items-center justify-center transition duration-300 ${
                    done ? "gradient-brand text-brand-foreground shadow-soft" : "bg-muted text-muted-foreground"
                  } ${current ? "ring-4 ring-brand/25 animate-pulse" : ""}`}
                >
                  <Icon className="size-5" />
                </div>
                <div className="flex-1">
                  <div className={`font-semibold ${done ? "" : "text-muted-foreground"}`}>{s.label}</div>
                  <div className="text-xs text-muted-foreground">{s.hint}</div>
                </div>
                {i < active && <span className="text-xs font-semibold text-[oklch(0.6_0.17_145)]">✓ Done</span>}
                {current && <span className="text-xs font-semibold text-brand">In progress…</span>}
              </div>
            );
          })}
        </div>

        {/* Delivery info */}
        <div className="px-6 pb-6 grid sm:grid-cols-2 gap-3">
          <div className="rounded-2xl border p-4 bg-accent/40">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
              <MapPin className="size-3.5" /> Delivery Address
            </div>
            <div className="text-sm font-medium">Suriyawan, Bhadohi UP</div>
          </div>
          <div className="rounded-2xl border p-4 bg-accent/40">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
              <Phone className="size-3.5" /> Rider
            </div>
            <div className="text-sm font-medium">Aman · +91 98XXX XX210</div>
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 pb-6 flex flex-col sm:flex-row gap-3">
          <button
            onClick={restart}
            className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-xl border hover:bg-accent active:scale-[0.98] transition"
          >
            <RotateCcw className="size-4" /> Restart demo
          </button>
          <Link
            to="/"
            className="flex-1 text-center py-3 rounded-xl gradient-brand text-brand-foreground font-semibold hover:opacity-90 active:scale-[0.98] transition"
          >
            Order something else
          </Link>
        </div>
      </div>
    </div>
  );
}
