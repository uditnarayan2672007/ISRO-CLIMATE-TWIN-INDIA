import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, Thermometer, Droplets, CloudRain, Wind } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";
import { PageHeader } from "@/components/PageHeader";
import { HealthScore } from "@/components/HealthScore";
import { STATES, trendSeries, riskColor } from "@/lib/climate-data";

export const Route = createFileRoute("/state-analysis")({
  head: () => ({
    meta: [
      { title: "State Analysis · Climate Twin of India" },
      { name: "description", content: "Per-state climate breakdown for all Indian states and union territories." },
    ],
  }),
  component: StateAnalysis,
});

function StateAnalysis() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(STATES[9]);
  const filtered = useMemo(
    () => STATES.filter((s) => s.name.toLowerCase().includes(query.toLowerCase())),
    [query],
  );
  const mini = (seed: number, base: number, amp: number) => trendSeries(seed, base, amp, 14);

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Per-State Drilldown" title="State Climate Analysis" subtitle="Search any state to see live metrics, trends and risk profile." />
      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-5">
        <div className="glass-card p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search a state…"
              className="w-full rounded-lg border border-border bg-background/50 pl-9 pr-3 py-2 text-sm outline-none focus:border-cyan-glow focus:ring-2 focus:ring-cyan-glow/30"
            />
          </div>
          <ul className="mt-3 max-h-[560px] overflow-auto pr-1 space-y-1">
            {filtered.map((s) => (
              <li key={s.name}>
                <button
                  onClick={() => setSelected(s)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-all ${
                    selected.name === s.name
                      ? "bg-gradient-to-r from-primary/25 to-blue-glow/10 text-foreground"
                      : "hover:bg-sidebar-accent/40 text-muted-foreground"
                  }`}
                >
                  <span>{s.name}</span>
                  <span className="h-2 w-2 rounded-full" style={{ background: riskColor(s.risk), boxShadow: `0 0 6px ${riskColor(s.risk)}` }} />
                </button>
              </li>
            ))}
          </ul>
        </div>
        <motion.div key={selected.name} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
          <div className="glass-card p-6">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Selected state</p>
                <h2 className="font-[Orbitron] text-3xl font-bold text-gradient">{selected.name}</h2>
              </div>
              <span className="rounded-md border px-3 py-1 text-xs font-bold uppercase tracking-wider" style={{ color: riskColor(selected.risk), borderColor: riskColor(selected.risk) }}>
                {selected.risk} risk
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Metric icon={Thermometer} label="Temperature" value={`${selected.temp}°C`} series={mini(1, selected.temp, 4)} color="var(--warning)" />
            <Metric icon={Droplets} label="Humidity" value={`${selected.humidity}%`} series={mini(2, selected.humidity, 8)} color="var(--cyan-glow)" />
            <Metric icon={CloudRain} label="Rainfall" value={`${selected.rainfall} mm`} series={mini(3, selected.rainfall, 6)} color="var(--blue-glow)" />
            <Metric icon={Wind} label="Wind Speed" value={`${selected.wind} km/h`} series={mini(4, selected.wind, 3)} color="var(--purple-glow)" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <HealthScore score={selected.score} label={`${selected.name} climate score`} size={130} />
            <div className="glass-card p-5">
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em]">Summary</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {selected.name} is currently in a <span style={{ color: riskColor(selected.risk) }}>{selected.risk}-risk</span> band.
                Temperature is hovering around <b>{selected.temp}°C</b> with humidity at <b>{selected.humidity}%</b>.
                Recent rainfall stands at <b>{selected.rainfall} mm</b>. AI-derived climate stability score: <b>{selected.score}/100</b>.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Metric({ icon: Icon, label, value, series, color }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string; series: { value: number; date: string }[]; color: string }) {
  return (
    <div className="glass-card p-4">
      <div className="flex items-center justify-between">
        <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
        <Icon className="h-4 w-4" />
      </div>
      <p className="mt-1 font-[Orbitron] text-2xl font-bold" style={{ color }}>{value}</p>
      <div className="mt-2 h-12">
        <ResponsiveContainer>
          <AreaChart data={series}>
            <defs>
              <linearGradient id={`mini-${label}`} x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.7} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Tooltip cursor={false} contentStyle={{ display: "none" }} />
            <Area dataKey="value" stroke={color} strokeWidth={2} fill={`url(#mini-${label})`} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}