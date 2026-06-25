import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Sparkles } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { HealthScore } from "@/components/HealthScore";

export const Route = createFileRoute("/simulator")({
  head: () => ({
    meta: [
      { title: "Future Simulator · Climate Twin of India" },
      { name: "description", content: "Run climate what-if scenarios — adjust temperature, rainfall and humidity to see future impact." },
    ],
  }),
  component: Simulator,
});

function Simulator() {
  const [tempDelta, setTempDelta] = useState(1.5);
  const [rainDelta, setRainDelta] = useState(-10);
  const [humDelta, setHumDelta] = useState(0);

  const score = useMemo(() => {
    let s = 85;
    s -= Math.abs(tempDelta) * 4;
    s -= Math.max(0, -rainDelta) * 0.4;
    s -= Math.abs(humDelta) * 0.3;
    return Math.max(10, Math.min(100, Math.round(s)));
  }, [tempDelta, rainDelta, humDelta]);

  const forecast = useMemo(() =>
    Array.from({ length: 12 }).map((_, i) => ({
      m: `+${i + 1}m`,
      temp: +(34 + tempDelta * (i / 12) + Math.sin(i) * 0.4).toFixed(2),
      rain: Math.max(0, +(22 + rainDelta * (i / 12) + Math.cos(i) * 1.5).toFixed(2)),
    })),
  [tempDelta, rainDelta]);

  const risk = score >= 80
    ? { label: "Sustainable", c: "var(--success)" }
    : score >= 60
      ? { label: "Caution", c: "var(--warning)" }
      : { label: "Critical", c: "var(--danger)" };

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Digital Twin" title="Future Climate Simulator" subtitle="Adjust drivers, watch the twin react in real time." />
      <div className="grid grid-cols-1 xl:grid-cols-[420px_1fr] gap-5">
        <div className="glass-card p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-purple-glow/15 border border-purple-glow/30 text-purple-glow">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em]">Simulation Controls</h3>
              <p className="text-xs text-muted-foreground">Drag to perturb the climate twin</p>
            </div>
          </div>
          <Slider label="Temperature Increase" unit="°C" min={-3} max={6} step={0.1} value={tempDelta} onChange={setTempDelta} color="var(--warning)" />
          <Slider label="Rainfall Change" unit="%" min={-50} max={50} step={1} value={rainDelta} onChange={setRainDelta} color="var(--blue-glow)" />
          <Slider label="Humidity Change" unit="%" min={-30} max={30} step={1} value={humDelta} onChange={setHumDelta} color="var(--cyan-glow)" />
          <button onClick={() => { setTempDelta(0); setRainDelta(0); setHumDelta(0); }} className="w-full rounded-lg border border-border bg-background/40 py-2 text-sm font-medium hover:bg-sidebar-accent/50 transition-colors">
            Reset to baseline
          </button>
        </div>
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <HealthScore score={score} label="Projected health" size={130} />
            <motion.div whileHover={{ y: -4 }} className="glass-card p-5 flex flex-col justify-between">
              <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Risk Indicator</p>
              <p className="font-[Orbitron] text-3xl font-bold" style={{ color: risk.c }}>{risk.label}</p>
              <p className="text-xs text-muted-foreground">based on combined deltas</p>
            </motion.div>
            <motion.div whileHover={{ y: -4 }} className="glass-card p-5">
              <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Drivers Applied</p>
              <ul className="mt-2 space-y-1 text-sm">
                <li>Δ Temp: <span className="font-[Orbitron]" style={{ color: "var(--warning)" }}>{tempDelta.toFixed(1)}°C</span></li>
                <li>Δ Rain: <span className="font-[Orbitron]" style={{ color: "var(--blue-glow)" }}>{rainDelta}%</span></li>
                <li>Δ Humid: <span className="font-[Orbitron]" style={{ color: "var(--cyan-glow)" }}>{humDelta}%</span></li>
              </ul>
            </motion.div>
          </div>
          <div className="glass-card p-5">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em]">Projected Climate · Next 12 Months</h3>
            <div className="mt-3 h-72">
              <ResponsiveContainer>
                <AreaChart data={forecast} margin={{ left: -10 }}>
                  <defs>
                    <linearGradient id="sim-t" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="var(--warning)" stopOpacity={0.7} />
                      <stop offset="100%" stopColor="var(--warning)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="sim-r" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="var(--blue-glow)" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="var(--blue-glow)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="m" tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: "oklch(0.18 0.04 260 / 0.9)", border: "1px solid var(--color-border)", borderRadius: 10, fontSize: 12 }} />
                  <Area dataKey="temp" stroke="var(--warning)" strokeWidth={2.5} fill="url(#sim-t)" name="Temp °C" />
                  <Area dataKey="rain" stroke="var(--blue-glow)" strokeWidth={2.5} fill="url(#sim-r)" name="Rainfall mm" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Slider({ label, unit, min, max, step, value, onChange, color }: { label: string; unit: string; min: number; max: number; step: number; value: number; onChange: (n: number) => void; color: string }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-muted-foreground">{label}</span>
        <span className="font-[Orbitron] text-base font-bold" style={{ color }}>{value > 0 ? "+" : ""}{value}{unit}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="mt-2 h-1.5 w-full cursor-pointer appearance-none rounded-full"
        style={{ background: `linear-gradient(to right, ${color} 0%, ${color} ${pct}%, oklch(0.25 0.04 260) ${pct}%, oklch(0.25 0.04 260) 100%)` }}
      />
    </div>
  );
}