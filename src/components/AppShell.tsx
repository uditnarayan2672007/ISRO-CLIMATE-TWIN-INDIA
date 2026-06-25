import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Map,
  TrendingUp,
  Brain,
  AlertTriangle,
  Sparkles,
  Info,
  Globe2,
  Leaf,
} from "lucide-react";
import type { ReactNode } from "react";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/state-analysis", label: "State Analysis", icon: Map },
  { to: "/climate-trends", label: "Climate Trends", icon: TrendingUp },
  { to: "/ai-prediction", label: "AI Prediction", icon: Brain },
  { to: "/climate-alerts", label: "Climate Alerts", icon: AlertTriangle },
  { to: "/simulator", label: "Future Simulator", icon: Sparkles },
  { to: "/about", label: "About Project", icon: Info },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="flex min-h-screen w-full text-foreground">
      <aside className="hidden lg:flex sticky top-0 h-screen w-64 shrink-0 flex-col border-r border-border/60 bg-sidebar/80 backdrop-blur-xl">
        <div className="flex flex-col items-center gap-2 px-6 pt-6 pb-4 border-b border-border/40">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative"
          >
            <div className="absolute inset-0 rounded-full bg-primary/30 blur-2xl" />
            <div className="relative grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-cyan-glow/40 to-purple-glow/40 border border-primary/40">
              <Globe2 className="h-9 w-9 text-cyan-glow" strokeWidth={1.5} />
            </div>
          </motion.div>
          <div className="text-center">
            <p className="font-[Orbitron] text-sm font-bold tracking-wider text-foreground">THE ELITE CODERS</p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Building a Smarter Planet</p>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {nav.map((item) => {
            const active = pathname === item.to;
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                  active
                    ? "bg-gradient-to-r from-primary/25 to-blue-glow/10 text-foreground shadow-[0_0_20px_-5px_var(--cyan-glow)]"
                    : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full bg-cyan-glow shadow-[0_0_10px_var(--cyan-glow)]"
                  />
                )}
                <Icon className={`h-4 w-4 ${active ? "text-cyan-glow" : ""}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mx-3 mb-3 rounded-xl border border-border/40 bg-card/40 p-4 backdrop-blur">
          <p className="text-xs font-semibold text-cyan-glow">Our Mission</p>
          <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
            Leveraging AI and National Data to build a Digital Twin of India's Climate for a Sustainable Future.
          </p>
          <Leaf className="mt-2 h-4 w-4 text-success" />
        </div>
        <div className="mx-3 mb-4 rounded-xl border border-border/40 bg-card/40 p-3 text-center">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Team</p>
          <p className="font-[Orbitron] text-xs font-bold tracking-wider">THE ELITE CODERS</p>
          <p className="mt-0.5 text-[10px] text-muted-foreground">Together for a Greener India</p>
        </div>
      </aside>

      <main className="min-w-0 flex-1">
        {/* Mobile top brand bar */}
        <div className="lg:hidden flex items-center gap-3 border-b border-border/60 bg-sidebar/80 px-4 py-3 backdrop-blur">
          <Globe2 className="h-6 w-6 text-cyan-glow" />
          <span className="font-[Orbitron] text-sm font-bold tracking-wider">THE ELITE CODERS</span>
        </div>
        <div className="px-4 sm:px-6 lg:px-8 py-6">{children}</div>
        <footer className="border-t border-border/40 px-6 py-4 text-center text-xs text-muted-foreground">
          🌱 Let's build a climate resilient India together · © 2026 The Elite Coders
        </footer>
      </main>
    </div>
  );
}
