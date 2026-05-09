import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Lock, Plus, Trash2, ShieldCheck, UserCircle2, Package, LogOut } from "lucide-react";
import { useApp } from "@/lib/app-store";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
});

const ADMIN_PASSWORD = "4321";

function ProfilePage() {
  const { user, logout, customMenu, addCustomMenu, deleteCustomMenu, categories } = useApp();
  const [pwd, setPwd] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [form, setForm] = useState({ name: "", price: "", image: "", category: "Pizza", veg: true, desc: "" });

  const tryUnlock = () => {
    if (pwd === ADMIN_PASSWORD) {
      setUnlocked(true);
      setAdminOpen(true);
      toast.success("Admin access granted");
    } else {
      toast.error("Wrong password");
    }
    setPwd("");
  };

  const submit = () => {
    if (!form.name || !form.price || !form.image) {
      toast.error("Fill all required fields");
      return;
    }
    addCustomMenu({
      id: `custom-${Date.now()}`,
      name: form.name,
      price: Number(form.price),
      image: form.image,
      category: form.category,
      veg: form.veg,
      desc: form.desc,
    });
    setForm({ name: "", price: "", image: "", category: "Pizza", veg: true, desc: "" });
    toast.success("Menu item added!");
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 animate-fade-in">
      <div className="bg-card border rounded-3xl shadow-card p-6">
        <div className="flex items-center gap-4">
          <div className="size-16 rounded-full gradient-brand text-brand-foreground flex items-center justify-center">
            <UserCircle2 className="size-8" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{user ? `+91 ${user.phone}` : "Guest"}</h1>
            <p className="text-sm text-muted-foreground">{user ? "FoodieX member" : "Login to track orders"}</p>
          </div>
          {user && (
            <button onClick={logout} className="px-3 py-2 rounded-lg border text-sm hover:bg-destructive/10 hover:text-destructive transition">
              <LogOut className="size-4 inline mr-1" /> Logout
            </button>
          )}
        </div>

        <div className="grid sm:grid-cols-3 gap-3 mt-6">
          <div className="p-4 rounded-xl bg-accent/50 text-center">
            <Package className="size-5 mx-auto text-brand" />
            <div className="text-sm text-muted-foreground mt-1">Orders</div>
            <div className="font-bold">12</div>
          </div>
          <div className="p-4 rounded-xl bg-accent/50 text-center">
            <ShieldCheck className="size-5 mx-auto text-brand" />
            <div className="text-sm text-muted-foreground mt-1">Saved</div>
            <div className="font-bold">₹540</div>
          </div>
          <div className="p-4 rounded-xl bg-accent/50 text-center">
            <UserCircle2 className="size-5 mx-auto text-brand" />
            <div className="text-sm text-muted-foreground mt-1">Tier</div>
            <div className="font-bold">Gold</div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold mb-2">Order History</h3>
          <ul className="divide-y border rounded-xl">
            {[
              { id: "FX1024", item: "Butter Chicken & Naan", price: 350, status: "Delivered" },
              { id: "FX1019", item: "Pepperoni Pizza", price: 349, status: "Delivered" },
              { id: "FX1003", item: "Hakka Noodles", price: 180, status: "Delivered" },
            ].map((o) => (
              <li key={o.id} className="p-3 flex justify-between text-sm">
                <div>
                  <div className="font-medium">{o.item}</div>
                  <div className="text-muted-foreground">#{o.id} · {o.status}</div>
                </div>
                <div className="font-semibold">₹{o.price}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Admin Panel */}
      <div className="mt-6 bg-card border rounded-3xl shadow-card p-6">
        <div className="flex items-center gap-2 mb-2">
          <Lock className="size-5 text-brand" />
          <h2 className="font-bold">Admin Panel</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-4">Enter the admin password to manage the menu.</p>
        {!unlocked ? (
          <div className="flex gap-2">
            <input
              type="password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && tryUnlock()}
              placeholder="Admin password"
              className="flex-1 px-3 py-2 rounded-lg border bg-input/50 outline-none focus:ring-2 focus:ring-brand"
            />
            <button onClick={tryUnlock} className="px-4 py-2 rounded-lg gradient-brand text-brand-foreground font-medium">
              Unlock
            </button>
          </div>
        ) : (
          <button
            onClick={() => setAdminOpen(true)}
            className="w-full py-3 rounded-xl gradient-brand text-brand-foreground font-semibold"
          >
            Open Admin Panel
          </button>
        )}
      </div>

      <Dialog open={adminOpen} onOpenChange={setAdminOpen}>
        <DialogContent className="max-w-2xl max-h-[88vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShieldCheck className="size-5 text-brand" /> Admin Panel · Add Menu Items
            </DialogTitle>
          </DialogHeader>

          <div className="grid sm:grid-cols-2 gap-3 mt-2">
            <div className="sm:col-span-2">
              <label className="text-xs font-medium text-muted-foreground">Item name *</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-lg border bg-input/50 outline-none focus:ring-2 focus:ring-brand" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Price (₹) *</label>
              <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-lg border bg-input/50 outline-none focus:ring-2 focus:ring-brand" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Category</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-lg border bg-input/50 outline-none focus:ring-2 focus:ring-brand">
                {categories.map((c) => <option key={c.name}>{c.name}</option>)}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs font-medium text-muted-foreground">Image URL *</label>
              <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })}
                placeholder="https://…"
                className="w-full mt-1 px-3 py-2 rounded-lg border bg-input/50 outline-none focus:ring-2 focus:ring-brand" />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs font-medium text-muted-foreground">Description</label>
              <textarea value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} rows={2}
                className="w-full mt-1 px-3 py-2 rounded-lg border bg-input/50 outline-none focus:ring-2 focus:ring-brand" />
            </div>
            <label className="flex items-center gap-2 sm:col-span-2 text-sm">
              <input type="checkbox" checked={form.veg} onChange={(e) => setForm({ ...form, veg: e.target.checked })} />
              Vegetarian
            </label>
          </div>

          <button onClick={submit} className="w-full mt-4 py-3 rounded-xl gradient-brand text-brand-foreground font-semibold">
            <Plus className="size-4 inline mr-1" /> Add Menu Item
          </button>

          <h4 className="font-semibold mt-6 mb-2">Custom items ({customMenu.length})</h4>
          {customMenu.length === 0 ? (
            <p className="text-sm text-muted-foreground">No custom items yet.</p>
          ) : (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {customMenu.map((m) => (
                <div key={m.id} className="flex items-center gap-3 p-2 rounded-lg border">
                  <img src={m.image} alt={m.name} className="size-12 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{m.name}</div>
                    <div className="text-xs text-muted-foreground">₹{m.price} · {m.category} · {m.veg ? "Veg" : "Non-veg"}</div>
                  </div>
                  <button onClick={() => deleteCustomMenu(m.id)} className="p-2 rounded-lg hover:bg-destructive/10 text-destructive">
                    <Trash2 className="size-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
