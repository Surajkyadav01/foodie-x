export function Logo({ size = "md", tone = "default" }: { size?: "sm" | "md" | "lg"; tone?: "default" | "light" }) {
  const cls = size === "sm" ? "text-xl" : size === "lg" ? "text-4xl" : "text-2xl";
  return (
    <div className={`font-extrabold tracking-tight ${cls}`}>
      <span style={tone === "light" ? { color: "oklch(0.98 0.01 80)" } : undefined} className={tone === "light" ? "" : "text-foreground"}>Foodie</span>
      <span className="text-brand">X</span>
    </div>
  );
}
