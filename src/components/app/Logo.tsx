export function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const cls = size === "sm" ? "text-xl" : size === "lg" ? "text-4xl" : "text-2xl";
  return (
    <div className={`font-extrabold tracking-tight ${cls}`}>
      <span className="text-foreground">Foodie</span>
      <span className="text-brand">X</span>
    </div>
  );
}
