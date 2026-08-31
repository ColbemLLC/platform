export function StatusDot({
  status = "offline",
  className = "",
}: {
  status?: "online" | "idle" | "dnd" | "offline";
  className?: string;
}) {
  const color = {
    online: "bg-emerald-500",
    idle: "bg-amber-500",
    dnd: "bg-red-500",
    offline: "bg-muted-foreground/50",
  }[status];

  return (
    <span
      className={`block h-2.5 w-2.5 rounded-full ring-2 ring-background ${color} ${className}`}
    />
  );
}