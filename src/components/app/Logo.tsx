export function Logo({ size = "md", tone = "default" }: { size?: "sm" | "md" | "lg"; tone?: "default" | "light" }) {
  const cls = size === "sm" ? "text-xl" : size === "lg" ? "text-4xl" : "text-2xl";
  const main = tone === "light" ? "text-white" : "text-foreground";
  return (
    <div className={`font-extrabold tracking-tight ${cls}`}>
      <span className={main}>Foodie</span>
      <span className="text-brand">X</span>
    </div>
  );
}
