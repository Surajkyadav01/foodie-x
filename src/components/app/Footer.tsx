import { Phone, Mail, MapPin, MessageCircle, Instagram, Twitter, Facebook, Home, ShoppingCart, Truck, LogIn } from "lucide-react";
import { Logo } from "./Logo";
import { Link } from "@tanstack/react-router";

export function Footer() {
  const wa = `https://wa.me/916393869405?text=${encodeURIComponent("Hi! I want to know more about FoodieX")}`;
  return (
    <footer className="mt-16 border-t" style={{ background: "linear-gradient(180deg, oklch(0.32 0.025 25), oklch(0.26 0.03 25))", color: "oklch(0.96 0.01 80)" }}>
      <div className="max-w-6xl mx-auto px-4 py-12 grid gap-10 md:grid-cols-4">
        <div className="space-y-3">
          <Logo size="lg" tone="light" />
          <p className="text-sm leading-relaxed" style={{ color: "oklch(0.82 0.02 60)" }}>
            Premium food delivery, faster than your hunger. Discover restaurants, savings, and joy in every bite.
          </p>
          <div className="flex gap-3 pt-2">
            <a href={wa} target="_blank" rel="noreferrer"
              className="size-10 rounded-full bg-[oklch(0.7_0.18_145)] text-white flex items-center justify-center hover:scale-110 transition shadow-soft"
              aria-label="WhatsApp">
              <MessageCircle className="size-5" />
            </a>
            <a href="https://instagram.com/its_.surajx01" target="_blank" rel="noreferrer" className="size-10 rounded-full flex items-center justify-center hover:scale-110 transition" style={{ background: "linear-gradient(135deg, oklch(0.65 0.2 30), oklch(0.55 0.22 330))", color: "white" }} aria-label="Instagram">
              <Instagram className="size-5" />
            </a>
            <a href="#" className="size-10 rounded-full flex items-center justify-center hover:scale-110 transition" style={{ background: "oklch(0.55 0.15 240)", color: "white" }} aria-label="Twitter">
              <Twitter className="size-5" />
            </a>
            <a href="#" className="size-10 rounded-full flex items-center justify-center hover:scale-110 transition" style={{ background: "oklch(0.5 0.18 260)", color: "white" }} aria-label="Facebook">
              <Facebook className="size-5" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3" style={{ color: "oklch(0.98 0.01 60)" }}>Quick Links</h4>
          <ul className="space-y-2 text-sm" style={{ color: "oklch(0.82 0.02 60)" }}>
            <li>
              <Link to="/" className="group inline-flex items-center gap-2 hover:text-brand transition">
                <span className="size-7 rounded-full flex items-center justify-center transition group-hover:scale-110" style={{ background: "oklch(1 0 0 / 0.08)", color: "oklch(0.85 0.12 60)" }}>
                  <Home className="size-3.5" />
                </span>
                Home
              </Link>
            </li>
            <li>
              <Link to="/cart" className="group inline-flex items-center gap-2 hover:text-brand transition">
                <span className="size-7 rounded-full flex items-center justify-center transition group-hover:scale-110" style={{ background: "oklch(1 0 0 / 0.08)", color: "oklch(0.8 0.14 35)" }}>
                  <ShoppingCart className="size-3.5" />
                </span>
                Cart
              </Link>
            </li>
            <li>
              <Link to="/order-tracking" className="group inline-flex items-center gap-2 hover:text-brand transition">
                <span className="size-7 rounded-full flex items-center justify-center transition group-hover:scale-110" style={{ background: "oklch(1 0 0 / 0.08)", color: "oklch(0.8 0.15 145)" }}>
                  <Truck className="size-3.5" />
                </span>
                Order Tracking
              </Link>
            </li>
            <li>
              <Link to="/auth" className="group inline-flex items-center gap-2 hover:text-brand transition">
                <span className="size-7 rounded-full flex items-center justify-center transition group-hover:scale-110" style={{ background: "oklch(1 0 0 / 0.08)", color: "oklch(0.8 0.14 260)" }}>
                  <LogIn className="size-3.5" />
                </span>
                Login
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3" style={{ color: "oklch(0.98 0.01 60)" }}>Contact</h4>
          <ul className="space-y-2 text-sm" style={{ color: "oklch(0.82 0.02 60)" }}>
            <li className="flex gap-2"><Phone className="size-4 text-brand shrink-0 mt-0.5" /><a href="tel:6393869405" className="hover:text-brand">+91 63938 69405</a></li>
            <li className="flex gap-2"><Mail className="size-4 text-brand shrink-0 mt-0.5" /><a href="mailto:ksurajyadav93@gmail.com" className="hover:text-brand break-all">ksurajyadav93@gmail.com</a></li>
            <li className="flex gap-2"><MapPin className="size-4 text-brand shrink-0 mt-0.5" /><span>Suriyawan 221404, Dist. Bhadohi, UP</span></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3" style={{ color: "oklch(0.98 0.01 60)" }}>Subscribe</h4>
          <p className="text-sm mb-3" style={{ color: "oklch(0.82 0.02 60)" }}>Get offers in your inbox</p>
          <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
            <input
              type="email"
              placeholder="you@email.com"
              className="flex-1 px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-brand"
              style={{ background: "oklch(1 0 0 / 0.08)", color: "oklch(0.98 0.01 60)", borderColor: "oklch(1 0 0 / 0.15)" }}
            />
            <button className="px-4 py-2 rounded-lg gradient-brand text-brand-foreground text-sm font-medium hover:opacity-90">Join</button>
          </form>
        </div>
      </div>

      <div className="border-t" style={{ background: "oklch(0.22 0.03 25)" }}>
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row gap-2 justify-between items-center text-sm" style={{ color: "oklch(0.97 0.01 80)" }}>
          <p className="font-medium">© {new Date().getFullYear()} FoodieX. All rights reserved.</p>
          <p style={{ color: "oklch(0.88 0.02 80)" }}>Made with ❤️ by Suraj Yadav · Suriyawan, Bhadohi UP</p>
        </div>
      </div>

      <a
        href={wa}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-5 right-5 z-50 size-14 rounded-full bg-[oklch(0.7_0.18_145)] text-white flex items-center justify-center shadow-soft hover:scale-110 transition animate-fade-in"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="size-7" />
      </a>
    </footer>
  );
}
