import { Phone, Mail, MapPin, MessageCircle, Instagram, Twitter, Facebook } from "lucide-react";
import { Logo } from "./Logo";
import { Link } from "@tanstack/react-router";

export function Footer() {
  const wa = `https://wa.me/916393869405?text=${encodeURIComponent("Hi! I want to know more about FoodieX")}`;
  return (
    <footer className="mt-16 border-t" style={{ background: "linear-gradient(180deg, oklch(0.93 0.04 50), oklch(0.88 0.05 40))" }}>
      <div className="max-w-6xl mx-auto px-4 py-12 grid gap-10 md:grid-cols-4">
        <div className="space-y-3">
          <Logo size="lg" />
          <p className="text-sm text-muted-foreground leading-relaxed">
            Premium food delivery, faster than your hunger. Discover restaurants, savings, and joy in every bite.
          </p>
          <div className="flex gap-3 pt-2">
            <a href={wa} target="_blank" rel="noreferrer"
              className="size-10 rounded-full bg-[oklch(0.7_0.18_145)] text-white flex items-center justify-center hover:scale-110 transition shadow-soft"
              aria-label="WhatsApp">
              <MessageCircle className="size-5" />
            </a>
            <a href="#" className="size-10 rounded-full bg-accent flex items-center justify-center hover:scale-110 transition" aria-label="Instagram">
              <Instagram className="size-5" />
            </a>
            <a href="#" className="size-10 rounded-full bg-accent flex items-center justify-center hover:scale-110 transition" aria-label="Twitter">
              <Twitter className="size-5" />
            </a>
            <a href="#" className="size-10 rounded-full bg-accent flex items-center justify-center hover:scale-110 transition" aria-label="Facebook">
              <Facebook className="size-5" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-brand">Home</Link></li>
            <li><Link to="/cart" className="hover:text-brand">Cart</Link></li>
            <li><Link to="/order-tracking" className="hover:text-brand">Order Tracking</Link></li>
            <li><Link to="/auth" className="hover:text-brand">Login</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2"><Phone className="size-4 text-brand shrink-0 mt-0.5" /><a href="tel:6393869405" className="hover:text-brand">+91 63938 69405</a></li>
            <li className="flex gap-2"><Mail className="size-4 text-brand shrink-0 mt-0.5" /><a href="mailto:ksurajyadav93@gmail.com" className="hover:text-brand break-all">ksurajyadav93@gmail.com</a></li>
            <li className="flex gap-2"><MapPin className="size-4 text-brand shrink-0 mt-0.5" /><span>Suriyawan 221404, Dist. Bhadohi, UP</span></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Subscribe</h4>
          <p className="text-sm text-muted-foreground mb-3">Get offers in your inbox</p>
          <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
            <input
              type="email"
              placeholder="you@email.com"
              className="flex-1 px-3 py-2 rounded-lg bg-input/50 border text-sm focus:outline-none focus:ring-2 focus:ring-brand"
            />
            <button className="px-4 py-2 rounded-lg gradient-brand text-brand-foreground text-sm font-medium hover:opacity-90">Join</button>
          </form>
        </div>
      </div>

      <div className="border-t">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row gap-2 justify-between items-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} FoodieX. All rights reserved.</p>
          <p>Made with ❤️ by Suraj Yadav · Suriyawan, Bhadohi UP</p>
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
