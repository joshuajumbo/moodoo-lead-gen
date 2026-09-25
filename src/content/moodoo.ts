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

export const CHAPTERS: { id: string; number?: string; title: string; body: string[]; screen: ScreenId }[] = [
  {
    id: "intro",
    title: "Some things don't show up in a status update",
    body: [
      "A project can be on track while the people working on it feel disconnected",
      "Energy changes. Small frustrations build. People carry difficult moments into the rest of their day",
      "Without a simple way to reflect on these experiences, patterns can be difficult to notice",
    ],
    screen: "dash",
  },
  { id: "check-ins", number: "01", title: "Mood Check-ins", body: ["Track individual and team moods through simple, everyday check-ins."], screen: "low" },
  { id: "insights", number: "02", title: "Mood Insights", body: ["Visualize mood trends and patterns across individuals and teams"], screen: "insights" },
  { id: "resources", number: "03", title: "Uplifting Resources", body: ["Share quotes, articles, games, and other resources to support teammates who may be feeling low"], screen: "resources" },
  { id: "culture", number: "04", title: "Positive Team Culture", body: ["Encourage emotional awareness, empathy, and team connection through thoughtful activities and shared experiences."], screen: "culture" },
];

export const PERSONAS = [
  { id: "people-happiness", number: "01", title: "People & Happiness Managers", body: "You support the wellbeing of your organization, but employee experiences can be difficult to understand through occasional surveys", img: "/img/photos/persona-01-people-happiness.jpg", alt: "A small team talking together in a bright, plant-filled studio" },
  { id: "managers", number: "02", title: "Team Leads & Managers", body: "Your team’s mood can influence how people collaborate, communicate, and experience their work", img: "/img/photos/persona-02-team-leads.jpg", alt: "A team lead reviewing work on a laptop with two colleagues" },
  { id: "remote", number: "03", title: "Remote & Hybrid Teams", body: "When people work across locations, the small emotional signals of everyday work can be easy to miss", img: "/img/photos/persona-03-remote-hybrid.jpg", alt: "Colleagues in an office joined by teammates on a video call" },
  { id: "creatives", number: "04", title: "Creative Teams & Agencies", body: "Creative work depends on collaboration, energy, and openness. But deadlines and delivery pressures can make it difficult to notice", img: "/img/photos/persona-04-creative.jpg", alt: "A creative team gathered around a table covered in sketches and notes" },
  { id: "founders", number: "05", title: "Founders & Leadership Teams", body: "Business performance tells you what is happening. Team insights can help you understand more about how people are experiencing the work", img: "/img/photos/persona-05-founders.jpg", alt: "A leadership team in discussion around a meeting table" },
] as const;

export const NAV = [
  { label: "What is Moodoo", href: "#what-is-moodoo" },
  { label: "Why Moodoo", href: "#why-moodoo" },
  { label: "For Managers", href: "#for-managers" },
  { label: "For Remote Teams", href: "#for-remote" },
  { label: "For Creatives", href: "#for-creatives" },
] as const;

export const ROLES = [
  "People & Happiness",
  "Team Lead / Manager",
  "Founder / Leadership",
  "Individual contributor",
  "Other",
] as const;

export const TEAM_SIZES = ["1–10", "11–50", "51–200", "201–1,000", "1,000+"] as const;
