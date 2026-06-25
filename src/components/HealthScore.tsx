import { motion } from "framer-motion";

export function HealthScore({ score, label = "Climate Health Score", size = 110 }: { score: number; label?: string; size?: number }) {
  const radius = size / 2 - 10;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (score / 100) * circ;
  const status = score >= 80 ? "Good" : score >= 65 ? "Stable" : score >= 50 ? "Caution" : "Critical";
  const color = score >= 80 ? "var(--success)" : score >= 65 ? "var(--cyan-glow)" : score >= 50 ? "var(--warning)" : "var(--danger)";

  return (
    <div className="glass-card flex items-center gap-4 p-5">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <defs>
            <linearGradient id="hs-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--success)" />
              <stop offset="50%" stopColor="var(--cyan-glow)" />
              <stop offset="100%" stopColor="var(--danger)" />
            </linearGradient>
          </defs>
          <circle cx={size / 2} cy={size / 2} r={radius} strokeWidth={8} stroke="var(--color-border)" fill="none" />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={8}
            stroke="url(#hs-grad)"
            strokeLinecap="round"
            fill="none"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{ filter: `drop-shadow(0 0 6px ${color})` }}
          />
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <div className="text-center leading-none">
            <p className="font-[Orbitron] text-2xl font-bold">{score}</p>
            <p className="text-[10px] text-muted-foreground">/100</p>
          </div>
        </div>
      </div>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
        <p className="mt-1 font-[Orbitron] text-xl font-bold" style={{ color }}>{status}</p>
      </div>
    </div>
  );
}
