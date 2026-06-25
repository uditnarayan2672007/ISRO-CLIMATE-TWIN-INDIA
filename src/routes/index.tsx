import { createFileRoute } from "@tanstack/react-router";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Thermometer, Droplets, CloudRain, Wind, Brain, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/PageHeader";
import { KpiCard } from "@/components/KpiCard";
import { HealthScore } from "@/components/HealthScore";
import { IndiaMap } from "@/components/IndiaMap";
import { ChartCard } from "@/components/ChartCard";
import { trendSeries } from "@/lib/climate-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard · Climate Twin of India" },
      { name: "description", content: "Real-time climate intelligence dashboard for India powered by AI." },
      { property: "og:title", content: "Climate Twin of India — Dashboard" },
      { property: "og:description", content: "Live KPIs, trends, India climate map and AI forecasts." },
    ],
  }),
  component: Dashboard,
});

const tempTrend = trendSeries(7, 32, 8);
const rainfallTrend = trendSeries(13, 24, 30).map((d) => ({ ...d, value: Math.max(0, d.value) }));
const humidityTrend = trendSeries(21, 60, 25);
const aiForecast = Array.from({ length: 7 }).map((_, i) => ({
  day: `Day ${i + 1}`,
  value: +(34 + Math.sin(i / 1.4) * 4 + i * 0.4).toFixed(1),
}));

function Dashboard() {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="AI-Powered" title="Climate Twin of India" subtitle="Real-time Insights · AI Predictions · Climate Resilience" />

      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-4">
        <KpiCard label="Avg Temperature" value="34.2°C" icon={Thermometer} accent="warning" trend={{ dir: "up", text: "1.8°C from yesterday" }} delay={0} />
        <KpiCard label="Avg Humidity" value="78%" icon={Droplets} accent="cyan" trend={{ dir: "down", text: "3% from yesterday" }} delay={0.05} />
        <KpiCard label="Total Rainfall" value="20.4 mm" icon={CloudRain} accent="blue" trend={{ dir: "up", text: "5.6 mm from yesterday" }} delay={0.1} />
        <KpiCard label="Wind Speed" value="15 km/h" icon={Wind} accent="purple" trend={{ dir: "same", text: "No change" }} delay={0.15} />
        <div className="col-span-2 md:col-span-4 xl:col-span-1">
          <HealthScore score={85} />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2">
          <ChartCard title="Temperature Trend" subtitle="(Last 30 days)" delay={0.1}>
            <div className="h-72">
              <ResponsiveContainer>
                <AreaChart data={tempTrend} margin={{ left: -20, right: 10, top: 10 }}>
                  <defs>
                    <linearGradient id="g-temp" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="var(--cyan-glow)" stopOpacity={0.7} />
                      <stop offset="100%" stopColor="var(--cyan-glow)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} tickLine={false} axisLine={false} />
                  <Tooltip content={<DarkTip suffix="°C" />} />
                  <Area type="monotone" dataKey="value" stroke="var(--cyan-glow)" strokeWidth={2.5} fill="url(#g-temp)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>
        <div className="xl:col-span-1">
          <IndiaMap />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <ChartCard title="Rainfall Trend" subtitle="(Last 30 days)" delay={0.15}>
          <div className="h-56">
            <ResponsiveContainer>
              <BarChart data={rainfallTrend} margin={{ left: -20 }}>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }} tickLine={false} axisLine={false} />
                <Tooltip content={<DarkTip suffix=" mm" />} />
                <Bar dataKey="value" fill="var(--blue-glow)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Humidity Trend" subtitle="(Last 30 days)" delay={0.2}>
          <div className="h-56">
            <ResponsiveContainer>
              <AreaChart data={humidityTrend} margin={{ left: -20 }}>
                <defs>
                  <linearGradient id="g-hum" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="var(--success)" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="var(--success)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }} tickLine={false} axisLine={false} />
                <Tooltip content={<DarkTip suffix="%" />} />
                <Area type="monotone" dataKey="value" stroke="var(--success)" strokeWidth={2.5} fill="url(#g-hum)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="glass-card p-5">
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground">Climate Alerts</h3>
          <div className="mt-3 space-y-2.5">
            <AlertRow level="high" title="Heatwave Alert" desc="High temperature expected in Rajasthan, Delhi and Punjab." />
            <AlertRow level="mod" title="Heavy Rainfall Alert" desc="Heavy rainfall expected in Assam, Meghalaya and Arunachal Pradesh." />
            <AlertRow level="low" title="High Humidity Alert" desc="High humidity levels in Coastal Maharashtra." />
          </div>
        </motion.div>
      </div>

      <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-5">
        <div className="mb-4 flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-purple-glow/15 border border-purple-glow/30 text-purple-glow">
            <Brain className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em]">AI Prediction</h3>
            <p className="text-xs text-muted-foreground">Next 7 days · Linear Regression on National Climate Data</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="rounded-xl border border-border bg-background/30 p-4">
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Predicted Avg Temperature</p>
            <p className="mt-1 font-[Orbitron] text-4xl font-bold text-purple-glow">36.5°C</p>
            <p className="mt-1 text-xs text-danger">▲ 2.3°C from current average</p>
          </div>
          <div className="md:col-span-2 h-44">
            <ResponsiveContainer>
              <LineChart data={aiForecast} margin={{ left: -20, top: 10 }}>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} tickLine={false} axisLine={false} domain={[25, 45]} />
                <Tooltip content={<DarkTip suffix="°C" />} />
                <Line type="monotone" dataKey="value" stroke="var(--purple-glow)" strokeWidth={2.5} dot={{ r: 5, fill: "var(--purple-glow)", strokeWidth: 0 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

function AlertRow({ level, title, desc }: { level: "high" | "mod" | "low"; title: string; desc: string }) {
  const map = {
    high: { c: "var(--danger)", label: "HIGH RISK", bg: "bg-danger/10 text-danger border-danger/30" },
    mod: { c: "var(--warning)", label: "MODERATE", bg: "bg-warning/10 text-warning border-warning/30" },
    low: { c: "var(--cyan-glow)", label: "LOW", bg: "bg-cyan-glow/10 text-cyan-glow border-cyan-glow/30" },
  } as const;
  const m = map[level];
  return (
    <div className="flex items-start gap-3 rounded-lg border border-border bg-background/30 p-3">
      <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" style={{ color: m.c }} />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold" style={{ color: m.c }}>{title}</p>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
      <span className={`shrink-0 rounded-md border px-2 py-1 text-[10px] font-bold ${m.bg}`}>{m.label}</span>
    </div>
  );
}

function DarkTip({ active, payload, label, suffix = "" }: { active?: boolean; payload?: Array<{ value: number }>; label?: string; suffix?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card px-3 py-2 text-xs">
      <p className="font-semibold text-cyan-glow">{label}</p>
      <p className="text-foreground">{payload[0].value}{suffix}</p>
    </div>
  );
}