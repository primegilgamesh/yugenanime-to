// Realistic weekly anime release schedule, modeled after Crunchyroll / AnimeKai listings.
// Times are local-time estimates of the simulcast slot in JST converted-ish; treat as approximate.
// Each entry references an anime slug — pages are auto-generated from this list.

import { allAnime, AnimeEntry } from "./animeData";

export interface ScheduleEntry {
  slug: string;
  title: string;
  time: string; // 24h "HH:MM"
  episode: number; // current/next episode number
  totalEpisodes?: number;
}

export interface ScheduleDay {
  day: "SUN" | "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT";
  entries: ScheduleEntry[];
}

// Currently airing slate — Fall 2025 / Winter 2026 simulcast season inspired by Crunchyroll listings.
export const weeklySchedule: ScheduleDay[] = [
  {
    day: "MON",
    entries: [
      { slug: "spy-x-family-s3", title: "Spy x Family Season 3", time: "23:00", episode: 8, totalEpisodes: 12 },
      { slug: "bleach-tybw-3", title: "Bleach: TYBW Cour 3", time: "23:30", episode: 9, totalEpisodes: 13 },
    ],
  },
  {
    day: "TUE",
    entries: [
      { slug: "one-punch-man-s3", title: "One Punch Man Season 3", time: "00:35", episode: 7, totalEpisodes: 12 },
      { slug: "dandadan-s2", title: "Dandadan Season 2", time: "23:30", episode: 10, totalEpisodes: 12 },
    ],
  },
  {
    day: "WED",
    entries: [
      { slug: "kaijuu-8-gou-s2", title: "Kaiju No. 8 Season 2", time: "00:00", episode: 6, totalEpisodes: 12 },
      { slug: "ranma-1-2-2024-s2", title: "Ranma ½ (2024) Season 2", time: "01:00", episode: 4, totalEpisodes: 12 },
    ],
  },
  {
    day: "THU",
    entries: [
      { slug: "blue-lock-s2", title: "Blue Lock Season 2", time: "01:00", episode: 9, totalEpisodes: 14 },
      { slug: "trillion-game", title: "Trillion Game", time: "23:30", episode: 12, totalEpisodes: 24 },
    ],
  },
  {
    day: "FRI",
    entries: [
      { slug: "demon-slayer-infinity-castle", title: "Demon Slayer: Infinity Castle Arc", time: "23:00", episode: 5, totalEpisodes: 12 },
      { slug: "to-be-hero-x", title: "To Be Hero X", time: "23:30", episode: 8, totalEpisodes: 26 },
    ],
  },
  {
    day: "SAT",
    entries: [
      { slug: "my-hero-academia-s8", title: "My Hero Academia Season 8 (Final)", time: "17:30", episode: 7, totalEpisodes: 12 },
      { slug: "one-piece", title: "One Piece (Egghead Arc)", time: "09:30", episode: 1141 },
      { slug: "boruto-tbsv", title: "Boruto: Two Blue Vortex", time: "10:30", episode: 6 },
    ],
  },
  {
    day: "SUN",
    entries: [
      { slug: "frieren-s2", title: "Sousou no Frieren Season 2", time: "23:00", episode: 4, totalEpisodes: 24 },
      { slug: "jujutsu-kaisen-s3", title: "Jujutsu Kaisen Season 3", time: "23:45", episode: 3, totalEpisodes: 24 },
      { slug: "chainsaw-man-s2", title: "Chainsaw Man Season 2", time: "00:30", episode: 2, totalEpisodes: 12 },
    ],
  },
];

// Auto-create anime entries for any scheduled title not already present.
const gradientPool = [
  "from-blue-600 to-purple-700",
  "from-rose-600 to-orange-500",
  "from-emerald-600 to-teal-500",
  "from-amber-500 to-red-600",
  "from-indigo-600 to-blue-500",
  "from-pink-500 to-violet-600",
  "from-cyan-500 to-blue-600",
];

weeklySchedule.forEach((day) => {
  day.entries.forEach((entry) => {
    const existing = allAnime.find((a) => a.slug === entry.slug);
    if (!existing) {
      const stub: AnimeEntry = {
        slug: entry.slug,
        title: entry.title,
        titleEnglish: entry.title,
        season: "Fall 2025",
        score: 0,
        cover: gradientPool[Math.abs(entry.slug.length) % gradientPool.length],
        episodes: entry.totalEpisodes || entry.episode,
        dubbed: false,
        format: "TV",
        status: "Currently Airing",
        synopsis: `${entry.title} is currently airing. New episodes are released every ${day.day}.`,
      };
      allAnime.push(stub);
    } else {
      // Continue updating episodes if a newer one was released
      if (entry.episode && (existing.episodes ?? 0) < entry.episode) {
        existing.episodes = Math.max(entry.episode, existing.episodes ?? 0);
      }
      if (entry.totalEpisodes && (existing.episodes ?? 0) < entry.totalEpisodes) {
        existing.episodes = entry.totalEpisodes;
      }
      if (existing.status === "Not Yet Aired") existing.status = "Currently Airing";
    }
  });
});
