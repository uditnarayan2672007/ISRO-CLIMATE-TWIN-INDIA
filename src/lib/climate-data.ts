export type StateData = {
  name: string;
  temp: number; // °C
  humidity: number; // %
  rainfall: number; // mm
  wind: number; // km/h
  score: number; // climate health
  risk: "low" | "moderate" | "high";
};

export const STATES: StateData[] = [
  { name: "Rajasthan", temp: 42.1, humidity: 28, rainfall: 4.2, wind: 19, score: 58, risk: "high" },
  { name: "Delhi", temp: 40.6, humidity: 41, rainfall: 6.0, wind: 14, score: 62, risk: "high" },
  { name: "Punjab", temp: 38.4, humidity: 48, rainfall: 9.1, wind: 11, score: 70, risk: "moderate" },
  { name: "Haryana", temp: 38.0, humidity: 46, rainfall: 8.4, wind: 12, score: 71, risk: "moderate" },
  { name: "Uttar Pradesh", temp: 37.8, humidity: 54, rainfall: 12.3, wind: 10, score: 73, risk: "moderate" },
  { name: "Madhya Pradesh", temp: 36.2, humidity: 51, rainfall: 14.8, wind: 12, score: 76, risk: "moderate" },
  { name: "Gujarat", temp: 37.5, humidity: 58, rainfall: 11.0, wind: 17, score: 72, risk: "moderate" },
  { name: "Maharashtra", temp: 34.9, humidity: 71, rainfall: 22.6, wind: 14, score: 80, risk: "low" },
  { name: "Karnataka", temp: 31.6, humidity: 74, rainfall: 28.4, wind: 12, score: 85, risk: "low" },
  { name: "Kerala", temp: 30.1, humidity: 86, rainfall: 41.2, wind: 13, score: 88, risk: "low" },
  { name: "Tamil Nadu", temp: 33.2, humidity: 78, rainfall: 18.4, wind: 16, score: 82, risk: "low" },
  { name: "Andhra Pradesh", temp: 34.5, humidity: 72, rainfall: 16.1, wind: 15, score: 79, risk: "low" },
  { name: "Telangana", temp: 35.4, humidity: 64, rainfall: 14.0, wind: 13, score: 77, risk: "moderate" },
  { name: "Odisha", temp: 34.0, humidity: 76, rainfall: 24.0, wind: 14, score: 81, risk: "low" },
  { name: "West Bengal", temp: 33.1, humidity: 81, rainfall: 31.2, wind: 12, score: 83, risk: "low" },
  { name: "Bihar", temp: 36.0, humidity: 62, rainfall: 13.4, wind: 10, score: 74, risk: "moderate" },
  { name: "Jharkhand", temp: 35.2, humidity: 60, rainfall: 16.7, wind: 9, score: 76, risk: "moderate" },
  { name: "Chhattisgarh", temp: 35.6, humidity: 63, rainfall: 17.9, wind: 10, score: 76, risk: "moderate" },
  { name: "Assam", temp: 31.2, humidity: 88, rainfall: 44.6, wind: 11, score: 84, risk: "moderate" },
  { name: "Meghalaya", temp: 26.4, humidity: 92, rainfall: 56.3, wind: 9, score: 86, risk: "moderate" },
  { name: "Arunachal Pradesh", temp: 24.6, humidity: 84, rainfall: 38.1, wind: 8, score: 87, risk: "low" },
  { name: "Manipur", temp: 27.0, humidity: 82, rainfall: 31.4, wind: 7, score: 86, risk: "low" },
  { name: "Nagaland", temp: 26.2, humidity: 81, rainfall: 29.7, wind: 7, score: 86, risk: "low" },
  { name: "Mizoram", temp: 25.9, humidity: 83, rainfall: 32.4, wind: 7, score: 87, risk: "low" },
  { name: "Tripura", temp: 28.4, humidity: 84, rainfall: 33.6, wind: 8, score: 85, risk: "low" },
  { name: "Sikkim", temp: 19.8, humidity: 78, rainfall: 30.2, wind: 9, score: 89, risk: "low" },
  { name: "Himachal Pradesh", temp: 22.4, humidity: 56, rainfall: 18.6, wind: 12, score: 88, risk: "low" },
  { name: "Uttarakhand", temp: 24.8, humidity: 60, rainfall: 21.2, wind: 11, score: 87, risk: "low" },
  { name: "Jammu & Kashmir", temp: 21.1, humidity: 52, rainfall: 14.7, wind: 13, score: 84, risk: "low" },
  { name: "Goa", temp: 30.8, humidity: 82, rainfall: 34.2, wind: 14, score: 86, risk: "low" },
];

const MONTHS = ["20 Apr","23 Apr","26 Apr","29 Apr","2 May","5 May","8 May","11 May","14 May","17 May","19 May"];

export function trendSeries(seed: number, base: number, amp: number, points = 30) {
  let s = seed;
  return Array.from({ length: points }, (_, i) => {
    s = (s * 9301 + 49297) % 233280;
    const noise = (s / 233280 - 0.5) * amp;
    const trend = (i / points) * amp * 0.6;
    const day = new Date();
    day.setDate(day.getDate() - (points - i));
    return {
      date: day.toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
      value: +(base + noise + trend).toFixed(1),
    };
  });
}

export const SHORT_LABELS = MONTHS;

export function riskColor(risk: StateData["risk"]) {
  return risk === "high" ? "var(--danger)" : risk === "moderate" ? "var(--warning)" : "var(--success)";
}
