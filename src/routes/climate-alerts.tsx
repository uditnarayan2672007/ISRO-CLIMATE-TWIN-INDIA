import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { AlertTriangle, Flame, Droplets, CloudRain, Sun } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/climate-alerts")({
  head: () => ({
    meta: [
      { title: "Climate Alerts · Climate Twin of India" },
      { name: "description", content: "Live heatwave, flood, rainfall and drought alerts across Indian states." },
    ],
  }),
  component: Alerts,
});

const alerts = [
  { icon: Flame, type: "Heatwave Alert", level: "high", region: "Rajasthan, Delhi, Punjab", action: "Advise public to limit outdoor exposure 12pm–4pm. Hydration centers on standby.", color: "var(--danger)" },
  { icon: CloudRain, type: "Heavy Rainfall Alert", level: "moderate", region: "Assam, Meghalaya, Arunachal Pradesh", action: "Monitor riverbanks. Pre-position NDRF teams in low-lying districts.", color: "var(--warning)" },
  { icon: Droplets, type: "Flood Risk Alert", level: "high", region: "Bihar, East UP", action: "Open relief shelters. Coordinate with state disaster management.", color: "var(--danger)" },
  { icon: Sun, type: "Drought Alert", level: "moderate", region: "Marathwada, Vidarbha", action: "Activate water-tanker supply. Issue crop advisory.", color: "var(--warning)" },
  { icon: Droplets, type: "High Humidity Alert", level: "low", region: "Coastal Maharashtra, Goa", action: "Health advisory for elderly and respiratory patients.", color: "var(--cyan-glow)" },
] as const;

function Alerts() {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="National Risk Center" title="Climate Alerts" subtitle="Active advisories generated from real-time observations and AI risk models." />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {alerts.map((a, i) => {
          const Icon = a.icon;
          const levelLabel = a.level === "high" ? "HIGH RISK" : a.level === "moderate" ? "MODERATE RISK" : "LOW RISK";
          return (
            <motion.div key={a.type} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} whileHover={{ y: -4 }} className="glass-card relative overflow-hidden p-5">
              <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full blur-3xl opacity-50" style={{ background: a.color }} />
              <div className="relative flex items-start gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-xl border" style={{ borderColor: a.color, color: a.color, background: "oklch(0.18 0.04 260 / 0.6)" }}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-[Orbitron] text-lg font-bold" style={{ color: a.color }}>{a.type}</h3>
                    <span className="rounded-md border px-2 py-1 text-[10px] font-bold uppercase tracking-wider" style={{ borderColor: a.color, color: a.color }}>{levelLabel}</span>
                  </div>
                  <p className="mt-1 text-sm font-medium text-foreground">{a.region}</p>
                  <div className="mt-3 flex items-start gap-2 rounded-lg border border-border bg-background/40 p-3 text-xs text-muted-foreground">
                    <AlertTriangle className="h-4 w-4 shrink-0" style={{ color: a.color }} />
                    <span><b className="text-foreground">Recommended action: </b>{a.action}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}