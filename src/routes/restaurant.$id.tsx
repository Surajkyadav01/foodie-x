import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Star, Clock, IndianRupee, ArrowLeft, Plus, Minus, Leaf } from "lucide-react";
import { useApp } from "@/lib/app-store";
import { toast } from "sonner";

export const Route = createFileRoute("/restaurant/$id")({
  component: RestaurantPage,
});

function RestaurantPage() {
  const { id } = Route.useParams();
  const { restaurants, customMenu, cart, addToCart, updateQty } = useApp();
  const restaurant = restaurants.find((r) => r.id === id);
  const [filter, setFilter] = useState<"All" | "Veg" | "Non-veg">("All");

  if (!restaurant) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Restaurant not found</h1>
        <Link to="/" className="text-brand mt-4 inline-block">← Back to home</Link>
      </div>
    );
  }

  const allItems = useMemo(() => {
    return [...restaurant.menu, ...customMenu.map((m) => ({ ...m }))];
  }, [restaurant, customMenu]);

  const grouped = useMemo(() => {
    const items = allItems.filter((i) =>
      filter === "All" ? true : filter === "Veg" ? i.veg : !i.veg,
    );
    const map: Record<string, typeof items> = {};
    items.forEach((i) => {
      (map[i.category] ||= []).push(i);
    });
    return map;
  }, [allItems, filter]);

  const qtyOf = (id: string) => cart.find((c) => c.id === id)?.qty ?? 0;

  return (
    <div className="animate-fade-in">
      <div className="relative h-64 md:h-80">
        <img src={restaurant.image} alt={restaurant.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <Link to="/" className="absolute top-4 left-4 size-10 rounded-full glass flex items-center justify-center text-white">
          <ArrowLeft className="size-5" />
        </Link>
        <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-extrabold">{restaurant.name}</h1>
            <p className="opacity-90">{restaurant.cuisine}</p>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
              <span className="flex items-center gap-1 bg-[oklch(0.65_0.17_145)] px-2 py-1 rounded font-semibold">
                <Star className="size-3.5 fill-white" /> {restaurant.rating} (1k+ reviews)
              </span>
              <span className="flex items-center gap-1"><Clock className="size-4" />{restaurant.deliveryTime}</span>
              <span className="flex items-center gap-1"><IndianRupee className="size-4" />{restaurant.priceForTwo} for two</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex gap-2 mb-6">
          {(["All", "Veg", "Non-veg"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition ${
                filter === f ? "bg-brand text-brand-foreground border-brand" : "bg-card hover:border-brand/50"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {Object.entries(grouped).map(([cat, items]) => (
          <section key={cat} className="mb-10">
            <h2 className="text-xl font-bold mb-4">{cat} <span className="text-muted-foreground text-sm font-normal">({items.length})</span></h2>
            <div className="grid md:grid-cols-2 gap-4">
              {items.map((item) => {
                const q = qtyOf(item.id);
                return (
                  <div key={item.id} className="bg-card border rounded-2xl p-4 flex gap-4 shadow-card">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`size-4 border-2 flex items-center justify-center rounded-sm ${item.veg ? "border-green-600" : "border-red-600"}`}>
                          <span className={`size-1.5 rounded-full ${item.veg ? "bg-green-600" : "bg-red-600"}`} />
                        </span>
                        <h3 className="font-semibold truncate">{item.name}</h3>
                      </div>
                      <div className="font-bold mt-1">₹{item.price}</div>
                      {item.desc && <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{item.desc}</p>}
                    </div>
                    <div className="relative w-28 shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-24 object-cover rounded-xl" />
                      {q === 0 ? (
                        <button
                          onClick={() => {
                            addToCart(item, restaurant.id);
                            toast.success(`Added ${item.name}`);
                          }}
                          className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-card border-2 border-brand text-brand font-semibold text-sm px-4 py-1 rounded-lg shadow-soft hover:bg-brand hover:text-brand-foreground transition"
                        >
                          ADD
                        </button>
                      ) : (
                        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-brand text-brand-foreground rounded-lg flex items-center shadow-soft">
                          <button onClick={() => updateQty(item.id, q - 1)} className="px-2 py-1"><Minus className="size-3.5" /></button>
                          <span className="px-2 font-semibold text-sm">{q}</span>
                          <button onClick={() => updateQty(item.id, q + 1)} className="px-2 py-1"><Plus className="size-3.5" /></button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
