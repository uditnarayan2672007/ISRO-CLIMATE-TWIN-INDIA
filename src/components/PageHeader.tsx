import { motion } from "framer-motion";
import { Calendar, MapPin, Sun } from "lucide-react";

export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  const now = new Date();
  const date = now.toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" });
  const day = now.toLocaleDateString("en-IN", { weekday: "long" });
  const time = now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

  return (
    <header className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">{eyebrow}</p>
        )}
        <h1 className="font-[Orbitron] text-3xl md:text-5xl font-black tracking-wide text-gradient drop-shadow-[0_0_25px_oklch(0.78_0.16_220_/_0.4)]">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-2 text-sm md:text-base text-muted-foreground">{subtitle}</p>
        )}
      </motion.div>
      <div className="flex flex-wrap gap-2.5">
        <InfoChip icon={<Calendar className="h-4 w-4 text-cyan-glow" />} label={date} sub={`${day}, ${time}`} />
        <InfoChip icon={<MapPin className="h-4 w-4 text-cyan-glow" />} label="New Delhi" sub="India" />
        <InfoChip icon={<Sun className="h-4 w-4 text-warning" />} label="34°C" sub="Sunny" />
      </div>
    </header>
  );
}

function InfoChip({ icon, label, sub }: { icon: React.ReactNode; label: string; sub: string }) {
  return (
    <div className="glass-card flex items-center gap-3 px-4 py-2.5">
      <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 border border-primary/20">
        {icon}
      </div>
      <div className="leading-tight">
        <p className="text-sm font-semibold text-foreground">{label}</p>
        <p className="text-[11px] text-muted-foreground">{sub}</p>
      </div>
    </div>
  );
}
