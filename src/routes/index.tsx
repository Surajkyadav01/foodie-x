import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, MapPin, Star, Clock, IndianRupee, Tag } from "lucide-react";
import { useApp } from "@/lib/app-store";
import heroBanner from "@/assets/hero-banner.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FoodieX — Order food from your favourite restaurants" },
      { name: "description", content: "Browse restaurants, cuisines, and offers. Fast delivery to your door." },
    ],
  }),
  component: Home,
});

function Home() {
  const { restaurants, categories, offers, location, setLocation } = useApp();
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return restaurants
      .map((r) => {
        const matchesQuery = !q
          ? true
          : r.name.toLowerCase().includes(q) ||
            r.cuisine.toLowerCase().includes(q) ||
            r.menu.some((m) => m.name.toLowerCase().includes(q));
        const matchesCat = !activeCat
          ? true
          : r.cuisine.toLowerCase().includes(activeCat.toLowerCase()) ||
            r.menu.some((m) => m.category.toLowerCase().includes(activeCat.toLowerCase()));
        return matchesQuery && matchesCat ? r : null;
      })
      .filter(Boolean) as typeof restaurants;
  }, [restaurants, query, activeCat]);

  const matchedDishes = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const out: { dish: typeof restaurants[number]["menu"][number]; restaurantId: string; restaurantName: string }[] = [];
    restaurants.forEach((r) =>
      r.menu.forEach((m) => {
        if (m.name.toLowerCase().includes(q) || m.category.toLowerCase().includes(q)) {
          out.push({ dish: m, restaurantId: r.id, restaurantName: r.name });
        }
      }),
    );
    return out.slice(0, 6);
  }, [restaurants, query]);

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <img
          src={heroBanner}
          alt="Delicious assorted food banner"
          width={1920}
          height={1024}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.35_0.18_25/0.85)] via-[oklch(0.25_0.15_20/0.75)] to-[oklch(0.15_0.05_20/0.85)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_oklch(1_0_0/0.15),_transparent_55%)]" />
        <div className="relative max-w-6xl mx-auto px-4 pt-10 pb-24 text-brand-foreground">
          <div className="flex items-center gap-2 text-sm/6 opacity-90">
            <MapPin className="size-4" />
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-transparent border-b border-white/30 outline-none focus:border-white px-1 max-w-xs"
            />
          </div>
          <h1 className="mt-6 text-4xl md:text-5xl font-extrabold leading-tight">
            Hungry?<br />Get it delivered, <span className="underline decoration-white/40 underline-offset-4">faster.</span>
          </h1>
          <p className="mt-3 max-w-xl opacity-90">From sizzling biryanis to crispy pizzas — discover the best of your city on FoodieX.</p>

          <div className="mt-8 glass rounded-2xl p-2 flex items-center gap-2 max-w-2xl shadow-card">
            <Search className="size-5 text-foreground/70 ml-2" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for restaurants, dishes…"
              className="flex-1 bg-transparent outline-none text-foreground placeholder:text-foreground/60 py-2"
            />
          </div>
        </div>
      </section>

      {/* Search results dishes */}
      {matchedDishes.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 -mt-12 relative z-10">
          <div className="bg-card rounded-2xl shadow-card p-4 border">
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">Matching dishes</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {matchedDishes.map((m) => (
                <Link
                  key={m.dish.id}
                  to="/restaurant/$id"
                  params={{ id: m.restaurantId }}
                  className="flex gap-3 p-2 rounded-xl hover:bg-accent transition"
                >
                  <img src={m.dish.image} alt={m.dish.name} className="size-14 rounded-lg object-cover" />
                  <div className="min-w-0">
                    <div className="font-medium truncate">{m.dish.name}</div>
                    <div className="text-xs text-muted-foreground truncate">at {m.restaurantName}</div>
                    <div className="text-sm text-brand font-semibold">₹{m.dish.price}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Offers */}
      <section className="max-w-6xl mx-auto px-4 mt-10">
        <h2 className="text-lg font-bold mb-4">Today's offers</h2>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
          {offers.map((o) => (
            <div key={o.id} className={`min-w-[280px] rounded-2xl p-5 text-white bg-gradient-to-br ${o.color} shadow-soft`}>
              <Tag className="size-5 mb-2" />
              <div className="text-xl font-bold">{o.title}</div>
              <div className="text-sm opacity-90">{o.subtitle}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-6xl mx-auto px-4 mt-10">
        <h2 className="text-lg font-bold mb-4">What's on your mind?</h2>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {categories.map((c) => {
            const active = activeCat === c.name;
            return (
              <button
                key={c.name}
                onClick={() => setActiveCat(active ? null : c.name)}
                className={`min-w-[88px] flex flex-col items-center gap-1 rounded-2xl p-3 border transition ${
                  active ? "border-brand bg-brand/10" : "bg-card hover:border-brand/50"
                }`}
              >
                <span className="text-3xl">{c.emoji}</span>
                <span className="text-xs font-medium">{c.name}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Restaurants */}
      <section className="max-w-6xl mx-auto px-4 mt-10">
        <h2 className="text-lg font-bold mb-4">{filtered.length} restaurants near you</h2>
        {filtered.length === 0 ? (
          <p className="text-muted-foreground">No matches. Try a different search.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((r) => (
              <Link
                key={r.id}
                to="/restaurant/$id"
                params={{ id: r.id }}
                className="group bg-card rounded-2xl overflow-hidden border shadow-card hover:-translate-y-1 transition"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={r.image} alt={r.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  {r.offer && (
                    <div className="absolute bottom-2 left-2 bg-brand text-brand-foreground px-2 py-1 rounded-md text-xs font-semibold shadow">
                      {r.offer}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold truncate">{r.name}</h3>
                    <div className="flex items-center gap-1 bg-[oklch(0.65_0.17_145)] text-white px-1.5 py-0.5 rounded text-xs font-semibold">
                      <Star className="size-3 fill-white" /> {r.rating}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{r.cuisine}</p>
                  <div className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="size-3.5" />{r.deliveryTime}</span>
                    <span className="flex items-center gap-1"><IndianRupee className="size-3.5" />{r.priceForTwo} for two</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
