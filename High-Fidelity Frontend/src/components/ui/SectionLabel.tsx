export function SectionLabel({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-10">
      <span className="text-[10px] font-bold tracking-[0.28em] uppercase text-muted-foreground">{n}</span>
      <span className="block w-8 h-px bg-border" />
      <span className="text-[10px] font-semibold tracking-[0.22em] uppercase text-muted-foreground">{label}</span>
    </div>
  );
}
