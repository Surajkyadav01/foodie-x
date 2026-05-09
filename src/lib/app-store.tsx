import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { seedRestaurants, seedCategories, seedOffers, type Restaurant, type MenuItem } from "./seed-data";

type CartItem = MenuItem & { qty: number; restaurantId: string };

type AppState = {
  theme: "light" | "dark";
  toggleTheme: () => void;
  location: string;
  setLocation: (l: string) => void;
  user: { phone: string } | null;
  login: (phone: string) => void;
  logout: () => void;
  cart: CartItem[];
  addToCart: (item: MenuItem, restaurantId: string) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  customMenu: MenuItem[];
  addCustomMenu: (item: MenuItem) => void;
  deleteCustomMenu: (id: string) => void;
  restaurants: Restaurant[];
  categories: typeof seedCategories;
  offers: typeof seedOffers;
};

const Ctx = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [location, setLocation] = useState("Suriyawan, Bhadohi");
  const [user, setUser] = useState<{ phone: string } | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customMenu, setCustomMenu] = useState<MenuItem[]>([]);

  useEffect(() => {
    const t = (localStorage.getItem("fx_theme") as "light" | "dark") || "light";
    setTheme(t);
    const u = localStorage.getItem("fx_user");
    if (u) setUser(JSON.parse(u));
    const c = localStorage.getItem("fx_cart");
    if (c) setCart(JSON.parse(c));
    const m = localStorage.getItem("fx_menu");
    if (m) setCustomMenu(JSON.parse(m));
    const l = localStorage.getItem("fx_loc");
    if (l) setLocation(l);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("fx_theme", theme);
  }, [theme]);

  useEffect(() => { localStorage.setItem("fx_cart", JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem("fx_menu", JSON.stringify(customMenu)); }, [customMenu]);
  useEffect(() => { localStorage.setItem("fx_loc", location); }, [location]);

  const value: AppState = {
    theme,
    toggleTheme: () => setTheme((t) => (t === "light" ? "dark" : "light")),
    location,
    setLocation,
    user,
    login: (phone) => {
      const u = { phone };
      setUser(u);
      localStorage.setItem("fx_user", JSON.stringify(u));
    },
    logout: () => {
      setUser(null);
      localStorage.removeItem("fx_user");
    },
    cart,
    addToCart: (item, restaurantId) =>
      setCart((c) => {
        const ex = c.find((i) => i.id === item.id);
        if (ex) return c.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
        return [...c, { ...item, qty: 1, restaurantId }];
      }),
    removeFromCart: (id) => setCart((c) => c.filter((i) => i.id !== id)),
    updateQty: (id, qty) =>
      setCart((c) => (qty <= 0 ? c.filter((i) => i.id !== id) : c.map((i) => (i.id === id ? { ...i, qty } : i)))),
    clearCart: () => setCart([]),
    customMenu,
    addCustomMenu: (item) => setCustomMenu((m) => [...m, item]),
    deleteCustomMenu: (id) => setCustomMenu((m) => m.filter((i) => i.id !== id)),
    restaurants: seedRestaurants,
    categories: seedCategories,
    offers: seedOffers,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useApp() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useApp must be used within AppProvider");
  return c;
}
