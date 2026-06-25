import { createFileRoute } from "@tanstack/react-router";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Legend,
  Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { PageHeader } from "@/components/PageHeader";
import { ChartCard } from "@/components/ChartCard";
import { trendSeries } from "@/lib/climate-data";

export const Route = createFileRoute("/climate-trends")({
  head: () => ({
    meta: [
      { title: "Climate Trends · Climate Twin of India" },
      { name: "description", content: "Advanced analytics for India's temperature, rainfall and humidity trends." },
    ],
  }),
  component: Trends,
});

const temp = trendSeries(11, 32, 8, 60);
const rain = trendSeries(31, 24, 30, 60).map((d) => ({ ...d, value: Math.max(0, d.value) }));
const hum = trendSeries(41, 60, 25, 60);

const seasons = [
  { season: "Winter", temp: 18, rain: 22, humidity: 58 },
  { season: "Summer", temp: 38, rain: 12, humidity: 42 },
  { season: "Monsoon", temp: 30, rain: 220, humidity: 84 },
  { season: "Post-Monsoon", temp: 26, rain: 60, humidity: 70 },
];

const tipStyle = {
  background: "oklch(0.18 0.04 260 / 0.9)",
  border: "1px solid var(--color-border)",
  borderRadius: 10,
  color: "var(--color-foreground)",
  fontSize: 12,
} as const;

function Trends() {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Historical Analytics" title="Climate Trends" subtitle="Interactive 60-day analytics across all key climate variables." />
      <ChartCard title="Temperature Trend" subtitle="(Last 60 days · °C)">
        <div className="h-72">
          <ResponsiveContainer>
            <AreaChart data={temp} margin={{ left: -10, top: 10 }}>
              <defs>
                <linearGradient id="t-tr" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="var(--cyan-glow)" stopOpacity={0.7} />
                  <stop offset="100%" stopColor="var(--cyan-glow)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tipStyle} />
              <Area dataKey="value" stroke="var(--cyan-glow)" strokeWidth={2.5} fill="url(#t-tr)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <ChartCard title="Rainfall Trend" subtitle="(mm)">
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={rain} margin={{ left: -10 }}>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={tipStyle} />
                <Bar dataKey="value" fill="var(--blue-glow)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
        <ChartCard title="Humidity Trend" subtitle="(%)">
          <div className="h-64">
            <ResponsiveContainer>
              <AreaChart data={hum} margin={{ left: -10 }}>
                <defs>
                  <linearGradient id="h-tr" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="var(--success)" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="var(--success)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={tipStyle} />
                <Area dataKey="value" stroke="var(--success)" strokeWidth={2.5} fill="url(#h-tr)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>
      <ChartCard title="Seasonal Climate Comparison" subtitle="(India avg)">
        <div className="h-72">
          <ResponsiveContainer>
            <LineChart data={seasons}>
              <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="season" tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }} />
              <YAxis tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tipStyle} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line type="monotone" dataKey="temp" stroke="var(--cyan-glow)" strokeWidth={2.5} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="rain" stroke="var(--blue-glow)" strokeWidth={2.5} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="humidity" stroke="var(--success)" strokeWidth={2.5} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  );
}