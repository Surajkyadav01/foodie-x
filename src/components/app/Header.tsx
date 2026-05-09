import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, MapPin, ShoppingCart, Moon, Sun, User, LogOut, X } from "lucide-react";
import { Logo } from "./Logo";
import { useApp } from "@/lib/app-store";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export function Header() {
  const { theme, toggleTheme, location, cart, user, logout } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const navigate = useNavigate();
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <header className="sticky top-0 z-40 glass border-b">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center gap-3">
        {/* Menu button */}
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger asChild>
            <button className="p-2 rounded-full hover:bg-accent transition" aria-label="Menu">
              <Menu className="size-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <SheetHeader>
              <SheetTitle><Logo /></SheetTitle>
            </SheetHeader>
            <nav className="mt-6 space-y-1">
              <Link to="/" onClick={() => setMenuOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-accent">Home</Link>
              <Link to="/cart" onClick={() => setMenuOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-accent">Cart</Link>
              <Link to="/order-tracking" onClick={() => setMenuOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-accent">Order Tracking</Link>
              <Link to="/auth" onClick={() => setMenuOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-accent">Login / Signup</Link>
              <Link to="/profile" onClick={() => setMenuOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-accent">Profile (Admin)</Link>
              <button
                onClick={() => { setMenuOpen(false); setInfoOpen(true); }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-accent"
              >
                About & Privacy
              </button>
            </nav>
          </SheetContent>
        </Sheet>

        <Link to="/" className="flex items-center gap-2 mr-auto">
          <Logo />
        </Link>

        <div className="hidden md:flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="size-4 text-brand" />
          <span className="max-w-[160px] truncate">{location}</span>
        </div>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-accent transition"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
        </button>

        <Link
          to="/profile"
          className="p-2 rounded-full hover:bg-accent transition"
          aria-label="Profile"
        >
          <User className="size-5" />
        </Link>

        {user && (
          <button onClick={logout} className="p-2 rounded-full hover:bg-accent" aria-label="Logout">
            <LogOut className="size-5" />
          </button>
        )}

        <button
          onClick={() => navigate({ to: "/cart" })}
          className="relative p-2 rounded-full hover:bg-accent transition"
          aria-label="Cart"
        >
          <ShoppingCart className="size-5" />
          {cartCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 bg-brand text-brand-foreground text-[10px] rounded-full size-4 flex items-center justify-center font-bold">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      {/* About / Privacy popup */}
      <Dialog open={infoOpen} onOpenChange={setInfoOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl"><Logo /></DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="about" className="mt-2">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
            </TabsList>
            <TabsContent value="about" className="space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p><strong className="text-foreground">FoodieX</strong> is a modern food delivery experience built for people who love great food, fast service, and a delightful interface.</p>
              <p>From local biryani to wood-fired pizzas, we bring the best restaurants of your city right to your door. Our mission is simple — make every meal memorable.</p>
              <p>Built with ❤️ in Suriyawan, Bhadohi UP. Crafted by Suraj Yadav.</p>
            </TabsContent>
            <TabsContent value="privacy" className="space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>We respect your privacy. FoodieX collects only the data needed to fulfil your orders — your name, contact, delivery address, and order history.</p>
              <p>We never sell your data. Payment information is handled via secure third-party processors. You may request deletion of your account at any time by contacting our support.</p>
              <p>For any privacy-related concerns, email <a href="mailto:ksurajyadav93@gmail.com" className="text-brand">ksurajyadav93@gmail.com</a>.</p>
            </TabsContent>
          </Tabs>
          <Button variant="outline" onClick={() => setInfoOpen(false)} className="mt-2">
            <X className="size-4 mr-1" /> Close
          </Button>
        </DialogContent>
      </Dialog>
    </header>
  );
}
