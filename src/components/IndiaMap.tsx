import { useState } from "react";
import { motion } from "framer-motion";
import { STATES, type StateData, riskColor } from "@/lib/climate-data";

// Stylized bubble-cluster "map" — visually evokes the geography without requiring
// a heavy SVG topology file. Each bubble is roughly placed over its region.
const POS: Record<string, { x: number; y: number; r: number }> = {
  "Jammu & Kashmir": { x: 32, y: 8, r: 22 },
  "Himachal Pradesh": { x: 36, y: 18, r: 14 },
  "Punjab": { x: 30, y: 22, r: 13 },
  "Haryana": { x: 34, y: 26, r: 12 },
  "Delhi": { x: 38, y: 28, r: 7 },
  "Uttarakhand": { x: 42, y: 22, r: 12 },
  "Rajasthan": { x: 22, y: 32, r: 26 },
  "Uttar Pradesh": { x: 46, y: 32, r: 22 },
  "Bihar": { x: 58, y: 34, r: 16 },
  "Sikkim": { x: 64, y: 30, r: 7 },
  "Arunachal Pradesh": { x: 78, y: 30, r: 16 },
  "Assam": { x: 72, y: 36, r: 14 },
  "Meghalaya": { x: 70, y: 40, r: 10 },
  "Nagaland": { x: 80, y: 38, r: 8 },
  "Manipur": { x: 80, y: 44, r: 8 },
  "Mizoram": { x: 78, y: 50, r: 8 },
  "Tripura": { x: 74, y: 46, r: 8 },
  "West Bengal": { x: 62, y: 42, r: 14 },
  "Jharkhand": { x: 56, y: 42, r: 12 },
  "Odisha": { x: 56, y: 52, r: 16 },
  "Chhattisgarh": { x: 48, y: 48, r: 14 },
  "Madhya Pradesh": { x: 38, y: 42, r: 22 },
  "Gujarat": { x: 18, y: 44, r: 18 },
  "Maharashtra": { x: 32, y: 56, r: 22 },
  "Telangana": { x: 42, y: 60, r: 14 },
  "Andhra Pradesh": { x: 46, y: 70, r: 18 },
  "Karnataka": { x: 34, y: 72, r: 18 },
  "Goa": { x: 26, y: 70, r: 7 },
  "Tamil Nadu": { x: 42, y: 84, r: 16 },
  "Kerala": { x: 32, y: 88, r: 12 },
};

export function IndiaMap() {
  const [hover, setHover] = useState<StateData | null>(null);
  return (
    <div className="glass-card relative overflow-hidden p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">Live Climate Map of India</h3>
        <Legend />
      </div>
      <div className="relative aspect-[4/5] w-full">
        {/* faint starfield */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(2px 2px at 20% 30%, rgba(255,255,255,.5), transparent), radial-gradient(1px 1px at 70% 60%, rgba(255,255,255,.4), transparent), radial-gradient(1.5px 1.5px at 40% 80%, rgba(255,255,255,.35), transparent)",
          }}
        />
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
          {STATES.map((s, i) => {
            const p = POS[s.name];
            if (!p) return null;
            const color = riskColor(s.risk);
            return (
              <motion.g
                key={s.name}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.02, duration: 0.4, ease: "easeOut" }}
                onMouseEnter={() => setHover(s)}
                onMouseLeave={() => setHover(null)}
                style={{ cursor: "pointer" }}
              >
                <circle cx={p.x} cy={p.y} r={p.r / 4 + 3} fill={color} opacity={0.18} />
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={p.r / 6 + 1.4}
                  fill={color}
                  style={{ filter: `drop-shadow(0 0 4px ${color})` }}
                />
              </motion.g>
            );
          })}
        </svg>

        {hover && (
          <div className="pointer-events-none absolute right-3 top-3 glass-card px-3 py-2 text-xs">
            <p className="font-[Orbitron] text-sm font-bold text-cyan-glow">{hover.name}</p>
            <div className="mt-1 grid grid-cols-2 gap-x-3 gap-y-0.5">
              <span className="text-muted-foreground">Temp</span><span>{hover.temp}°C</span>
              <span className="text-muted-foreground">Humidity</span><span>{hover.humidity}%</span>
              <span className="text-muted-foreground">Rainfall</span><span>{hover.rainfall} mm</span>
              <span className="text-muted-foreground">Score</span><span>{hover.score}/100</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Legend() {
  return (
    <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
      <Swatch color="var(--success)" label="Low" />
      <Swatch color="var(--warning)" label="Mod" />
      <Swatch color="var(--danger)" label="High" />
    </div>
  );
}
function Swatch({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1">
      <span className="h-2 w-2 rounded-full" style={{ background: color, boxShadow: `0 0 6px ${color}` }} />
      {label}
    </span>
  );
}
