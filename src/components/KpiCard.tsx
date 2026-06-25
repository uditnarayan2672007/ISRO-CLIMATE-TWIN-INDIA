import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { ArrowDown, ArrowRight, ArrowUp } from "lucide-react";

type Props = {
  label: string;
  value: string;
  icon: LucideIcon;
  accent: "cyan" | "blue" | "purple" | "warning" | "success";
  trend?: { dir: "up" | "down" | "same"; text: string };
  delay?: number;
};

const accents: Record<Props["accent"], string> = {
  cyan: "from-cyan-glow/30 to-cyan-glow/0 text-cyan-glow",
  blue: "from-blue-glow/30 to-blue-glow/0 text-blue-glow",
  purple: "from-purple-glow/30 to-purple-glow/0 text-purple-glow",
  warning: "from-warning/30 to-warning/0 text-warning",
  success: "from-success/30 to-success/0 text-success",
};

export function KpiCard({ label, value, icon: Icon, accent, trend, delay = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="glass-card group relative overflow-hidden p-5"
    >
      <div
        className={`absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-br opacity-60 blur-2xl transition-opacity group-hover:opacity-100 ${accents[accent]}`}
      />
      <div className="relative flex items-start gap-4">
        <div className={`grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-background/40 border border-border ${accents[accent].split(" ").slice(-1)[0]}`}>
          <Icon className="h-7 w-7" strokeWidth={1.8} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
          <p className="mt-1 font-[Orbitron] text-3xl font-bold tracking-wide text-foreground">{value}</p>
          {trend && (
            <div className="mt-1 flex items-center gap-1 text-xs">
              {trend.dir === "up" && <ArrowUp className="h-3 w-3 text-danger" />}
              {trend.dir === "down" && <ArrowDown className="h-3 w-3 text-success" />}
              {trend.dir === "same" && <ArrowRight className="h-3 w-3 text-muted-foreground" />}
              <span
                className={
                  trend.dir === "up"
                    ? "text-danger"
                    : trend.dir === "down"
                      ? "text-success"
                      : "text-muted-foreground"
                }
              >
                {trend.text}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
