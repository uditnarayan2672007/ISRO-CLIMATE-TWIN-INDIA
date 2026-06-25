import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Globe2, Leaf, Rocket, Users } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About · Climate Twin of India" },
      { name: "description", content: "About the AI-Powered Digital Twin of India's Climate by The Elite Coders." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="ISRO Antariksh Hackathon" title="About the Project" subtitle="A Digital Twin for India's climate — built for scientists, agencies and citizens." />
      <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-7">
        <div className="flex items-center gap-3">
          <Rocket className="h-5 w-5 text-cyan-glow" />
          <h2 className="font-[Orbitron] text-xl font-bold">Problem Statement</h2>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          India faces accelerating climate risk — heatwaves, erratic monsoons, droughts and floods threaten lives, agriculture and infrastructure.
          This project builds an <b className="text-foreground">AI-Powered Digital Twin of India's Climate</b> using national open data,
          providing real-time monitoring, prediction and what-if simulation to support resilience planning.
        </p>
      </motion.section>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="glass-card p-7">
          <div className="flex items-center gap-3">
            <Users className="h-5 w-5 text-purple-glow" />
            <h2 className="font-[Orbitron] text-xl font-bold">Team</h2>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">Crafted by</p>
          <p className="mt-1 font-[Orbitron] text-3xl font-bold text-gradient">The Elite Coders</p>
          <p className="mt-2 text-xs text-muted-foreground">Together for a Greener India 🇮🇳</p>
        </motion.section>
        <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }} className="glass-card p-7">
          <div className="flex items-center gap-3">
            <Leaf className="h-5 w-5 text-success" />
            <h2 className="font-[Orbitron] text-xl font-bold">Mission</h2>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Build an intelligent climate monitoring, prediction and simulation platform for India — empowering decision-makers
            with accurate, real-time insight so we can act on climate change before it acts on us.
          </p>
        </motion.section>
      </div>
      <motion.section initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.24 }} className="glass-card relative overflow-hidden p-10 text-center">
        <div className="absolute inset-0 opacity-40" style={{ background: "radial-gradient(ellipse at center, oklch(0.78 0.16 220 / 0.3), transparent 60%)" }} />
        <Globe2 className="relative mx-auto h-14 w-14 text-cyan-glow" />
        <p className="relative mt-4 font-[Orbitron] text-2xl font-bold text-gradient">Building a Smarter Planet</p>
        <p className="relative mt-2 text-sm text-muted-foreground max-w-lg mx-auto">A digital twin is more than a dashboard — it's a living mirror of our environment that helps us simulate the future and steer toward it.</p>
      </motion.section>
    </div>
  );
}