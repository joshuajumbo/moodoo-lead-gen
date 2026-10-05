/**
 * Page content and choreography data. Every string and asset reference comes
 * from Figma file 0hJxVjyUUXUnL81whE0RCT; node IDs are kept alongside so the
 * source of truth stays traceable.
 */

export type ScreenId = "high" | "mid" | "low" | "dash" | "insights" | "resources" | "culture";

export const SCREENS: Record<ScreenId, { src: string; alt: string; node: string }> = {
  high: { src: "/img/screens/high.png", alt: "Moodoo check-in screen showing a high-energy, pleasant mood mandala", node: "788:66547" },
  mid: { src: "/img/screens/mid.png", alt: "Moodoo check-in screen showing a balanced mood mandala", node: "788:52134" },
  low: { src: "/img/screens/low.png", alt: "Moodoo check-in screen showing a low-energy mood mandala", node: "788:59340" },
  dash: { src: "/img/screens/dash.png", alt: "Team Mood dashboard with today's vibe and team participation", node: "801:154512" },
  insights: { src: "/img/screens/insights.png", alt: "Mood insights showing participation trends and vote patterns", node: "805:286633" },
  resources: { src: "/img/screens/resources.png", alt: "Find Inspiration screen with shared music, videos and articles", node: "805:301380" },
  culture: { src: "/img/screens/culture.png", alt: "Team culture activities library", node: "805:315964" },
};

/** Hero phone cycles through the three mood variants (838:44385 → 838:29973 → 838:37179). */
export const HERO_CYCLE: ScreenId[] = ["high", "mid", "low"];
export const HERO_CYCLE_MS = 2800;

export type Chip = { role: string; name: string; bg: string; label: string };

export const HERO_CHIPS: (Chip & { x: number; y: number; node: string })[] = [
  // offsets are relative to the phone's unrotated top-left (823, 170.75)
  { role: "Software engineer", name: "Anika Vihaan", bg: "#c4bd74", label: "#cf8516", x: 587 - 823, y: 388 - 170.75, node: "801:154459" },
  { role: "Manager", name: "Murthy Adhitya", bg: "#7daeb9", label: "#386570", x: 1066 - 823, y: 550 - 170.75, node: "788:7299" },
];

export const WHAT_CHIP: Chip & { x: number; y: number; node: string } = {
  role: "Customer support", name: "Ishaan Kabir", bg: "#95a38b", label: "#386570",
  // 801:250338 sits at +247,+243 from the phone's rotated bbox (809, 862)
  x: 809 + 247 - 813, y: 862 + 243 - 863.75, node: "801:250338",
};

/**
 * The What-section chip walks through who Moodoo is for, one persona per state
 * (intro + chapters 01–04). Index 0 is Figma's chip (801:250338); the rest cover
 * the audiences from "Built for the people" (the hero already shows a Manager).
 * Chip colours and label tones come from Figma's three chips.
 */
export const CHAPTER_CHIPS: Chip[] = [
  { role: "Customer support", name: "Ishaan Kabir", bg: "#95a38b", label: "#386570" },
  { role: "Remote engineer", name: "Meera Nair", bg: "#7daeb9", label: "#386570" },
  { role: "People & culture", name: "Priya Raman", bg: "#c4bd74", label: "#cf8516" },
  { role: "Creative lead", name: "Rohan Mehta", bg: "#95a38b", label: "#386570" },
  { role: "Founder", name: "Aarav Kapoor", bg: "#7daeb9", label: "#386570" },
];

export const CHAPTERS: { id: string; number?: string; title: string; body: string[]; screen: ScreenId }[] = [
  {
    id: "intro",
    title: "The emotional pulse of your workplace, without another survey.",
    body: [
      "People’s experience at work changes every day.",
      "Moodoo creates a lightweight way for teams to express how they feel, while helping people leaders understand what is changing over time without constantly asking, surveying or monitoring individuals.",
    ],
    screen: "dash",
  },
  { id: "check-in", number: "01", title: "Check in, without filling a form", body: ["Employees capture how they feel through a quick, intuitive mood check-in that takes only a few seconds."], screen: "low" },
  { id: "team", number: "02", title: "See how the team is doing", body: ["Moodoo turns individual check-ins into collective signals, helping people leaders understand shifts in mood, energy and team experience."], screen: "insights" },
  { id: "respond", number: "03", title: "Respond to what the moment needs", body: ["A dip may call for support, a break or something uplifting. A high may be the right moment for recognition, appreciation or celebration."], screen: "culture" },
  { id: "lift", number: "04", title: "Help the team lift each other", body: ["People can share music, articles, memes, activities and small moments of inspiration with teammates."], screen: "resources" },
];

export const PERSONAS = [
  { id: "people-culture", number: "01", title: "People & Culture Teams", body: "Understand emotional patterns across teams and make better-informed decisions around engagement, support, recognition and culture.", img: "/img/photos/persona-01-people-happiness.jpg", alt: "A small team talking together in a bright, plant-filled studio" },
  { id: "founders", number: "02", title: "Founders & Business Leaders", body: "Stay close to how people are experiencing work as the organisation grows, even when you cannot personally check in with everyone.", img: "/img/photos/persona-05-founders.jpg", alt: "A leadership team in discussion around a meeting table" },
  { id: "managers", number: "03", title: "Team Leads & Managers", body: "See shifts in team energy and sentiment that may not appear in project updates or performance metrics.", img: "/img/photos/persona-02-team-leads.jpg", alt: "A team lead reviewing work on a laptop with two colleagues" },
  { id: "teams", number: "04", title: "Employees & Teams", body: "A simple space to reflect, share inspiration and contribute to a healthier team experience together.", img: "/img/photos/persona-04-creative.jpg", alt: "A team gathered around a table, sharing ideas" },
] as const;

export const NAV = [
  { label: "What is Moodoo", href: "#what-is-moodoo" },
  { label: "Why Moodoo", href: "#why-moodoo" },
  { label: "For People & Culture", href: "#for-people-culture" },
  { label: "For Founders", href: "#for-founders" },
  { label: "For Managers", href: "#for-managers" },
] as const;

export const ROLES = [
  "People & Happiness",
  "Team Lead / Manager",
  "Founder / Leadership",
  "Individual contributor",
  "Other",
] as const;

export const TEAM_SIZES = ["1–10", "11–50", "51–200", "201–1,000", "1,000+"] as const;
