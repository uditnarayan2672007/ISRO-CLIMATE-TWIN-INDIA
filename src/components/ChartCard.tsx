import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function ChartCard({
  title,
  subtitle,
  right,
  children,
  delay = 0,
}: {
  title: string;
  subtitle?: string;
  right?: ReactNode;
  children: ReactNode;
  delay?: number;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="glass-card p-5"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground">
            {title}
            {subtitle && <span className="ml-2 text-[11px] font-normal normal-case tracking-normal text-muted-foreground">{subtitle}</span>}
          </h3>
        </div>
        {right}
      </div>
      {children}
    </motion.section>
  );
}
