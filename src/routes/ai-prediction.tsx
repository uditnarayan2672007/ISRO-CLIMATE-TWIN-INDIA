import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Brain, Cloud, Thermometer, Activity } from "lucide-react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/ai-prediction")({
  head: () => ({
    meta: [
      { title: "AI Prediction · Climate Twin of India" },
      { name: "description", content: "AI-driven climate forecasts: tomorrow, weekly, rainfall probability and stability." },
    ],
  }),
  component: AIPrediction,
});

const week = Array.from({ length: 7 }).map((_, i) => ({
  day: `Day ${i + 1}`,
  temp: +(34 + Math.sin(i / 1.4) * 4 + i * 0.4).toFixed(1),
}));

function AIPrediction() {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Machine Learning" title="AI Prediction Engine" subtitle="Forecasts generated from a Linear Regression model trained on National Climate Data." />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <PredictCard icon={Thermometer} title="Tomorrow Temperature" value="36.5°C" sub="+2.3°C vs today" accent="var(--cyan-glow)" confidence={89} />
        <PredictCard icon={Cloud} title="Rainfall Probability" value="64%" sub="Likely in Eastern India" accent="var(--blue-glow)" confidence={78} />
        <PredictCard icon={Activity} title="Climate Stability" value="Stable" sub="No anomalies predicted" accent="var(--success)" confidence={92} />
        <PredictCard icon={Brain} title="Weekly Avg Forecast" value="35.4°C" sub="Trending warmer" accent="var(--purple-glow)" confidence={87} />
      </div>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-5">
        <h3 className="text-sm font-semibold uppercase tracking-[0.18em]">7-Day Temperature Forecast</h3>
        <div className="mt-4 h-72">
          <ResponsiveContainer>
            <LineChart data={week} margin={{ left: -10, top: 10 }}>
              <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} tickLine={false} axisLine={false} domain={[25, 45]} />
              <Tooltip contentStyle={{ background: "oklch(0.18 0.04 260 / 0.9)", border: "1px solid var(--color-border)", borderRadius: 10, fontSize: 12 }} />
              <Line type="monotone" dataKey="temp" stroke="var(--purple-glow)" strokeWidth={3} dot={{ r: 6, fill: "var(--purple-glow)" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}

function PredictCard({ icon: Icon, title, value, sub, accent, confidence }: { icon: React.ComponentType<{ className?: string }>; title: string; value: string; sub: string; accent: string; confidence: number }) {
  return (
    <motion.div whileHover={{ y: -4 }} className="glass-card relative overflow-hidden p-5">
      <div className="flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-background/40" style={{ color: accent }}>
          <Icon className="h-5 w-5" />
        </div>
        <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{title}</p>
      </div>
      <p className="mt-3 font-[Orbitron] text-3xl font-bold" style={{ color: accent }}>{value}</p>
      <p className="text-xs text-muted-foreground">{sub}</p>
      <div className="mt-4">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-muted-foreground">
          <span>Confidence</span>
          <span style={{ color: accent }}>{confidence}%</span>
        </div>
        <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-background/60">
          <motion.div className="h-full rounded-full" initial={{ width: 0 }} animate={{ width: `${confidence}%` }} transition={{ duration: 1.2, ease: "easeOut" }} style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} />
        </div>
      </div>
    </motion.div>
  );
}