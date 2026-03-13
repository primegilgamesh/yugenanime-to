export interface AnimeEntry {
  slug: string;
  title: string;
  season?: string;
  score?: number;
  cover: string; // gradient placeholder
  episodes?: number;
  dubbed?: boolean;
  views?: string;
  timeAgo?: string;
}

// Helper to generate a gradient based on slug hash
const gradients = [
  "from-blue-600 to-purple-700",
  "from-rose-600 to-orange-500",
  "from-emerald-600 to-teal-500",
  "from-amber-500 to-red-600",
  "from-indigo-600 to-blue-500",
  "from-pink-500 to-violet-600",
  "from-cyan-500 to-blue-600",
  "from-green-500 to-emerald-700",
  "from-orange-500 to-yellow-500",
  "from-violet-600 to-indigo-700",
  "from-red-500 to-pink-600",
  "from-teal-500 to-cyan-600",
];

export const getGradient = (index: number) => gradients[index % gradients.length];

export const heroPick: AnimeEntry = {
  slug: "meitantei-conan",
  title: "Meitantei Conan",
  season: "Winter 1996",
  score: 8.16,
  cover: gradients[0],
};

export const recentlyReleased: AnimeEntry[] = [
  { slug: "oshi-no-ko-2nd-season", title: "Oshi no Ko 2nd Season", season: "Summer 2024", score: 8.5, cover: gradients[1], episodes: 13, views: "67 views", timeAgo: "about 3 hours ago" },
  { slug: "bai-yao-pu-4th-season", title: "Bai Yao Pu 4th Season", season: "ONA", score: 7.2, cover: gradients[2], episodes: 12, views: "48 views", timeAgo: "about 5 hours ago" },
  { slug: "shenyin-jiu-xiaojie-2nd-season", title: "Shenyin Jiu Xiaojie 2nd Season", season: "ONA", score: 7.0, cover: gradients[3], episodes: 12, views: "112 views", timeAgo: "about 6 hours ago" },
  { slug: "great-pretender-razbliuto", title: "Great Pretender: Razbliuto", season: "ONA", score: 7.8, cover: gradients[4], episodes: 10, views: "1.3K views", timeAgo: "about 12 hours ago" },
  { slug: "yuuki-bakuhatsu-bang-bravern", title: "Yuuki Bakuhatsu Bang Bravern", season: "Winter 2024", score: 7.6, cover: gradients[5], episodes: 12, views: "216 views", timeAgo: "about 14 hours ago" },
  { slug: "chikkun-takkun", title: "Chikkun Takkun", season: "ONA", score: 6.5, cover: gradients[6], episodes: 6, views: "190 views", timeAgo: "about 15 hours ago" },
  { slug: "urusei-yatsura-2022-2nd-season", title: "Urusei Yatsura (2022) 2nd Season", season: "Winter 2024", score: 7.3, cover: gradients[7], episodes: 23, views: "304 views", timeAgo: "about 15 hours ago" },
  { slug: "jujutsu-kaisen-season-2", title: "Jujutsu Kaisen Season 2", season: "Summer 2023", score: 8.6, cover: gradients[8], episodes: 23, views: "416 views", timeAgo: "about 16 hours ago" },
];

export const trendingAiring: AnimeEntry[] = [
  { slug: "frieren", title: "Sousou no Frieren", season: "Fall 2023", score: 9.18, cover: gradients[0] },
  { slug: "kusuriya-no-hitorigoto", title: "Kusuriya no Hitorigoto", season: "Fall 2023", score: 8.83, cover: gradients[1] },
  { slug: "boku-no-kokoro-no-yabai-yatsu", title: "Boku no Kokoro no Yabai Yatsu", season: "Winter 2024", score: 8.47, cover: gradients[2] },
  { slug: "kingdom-5th-season", title: "Kingdom 5th Season", season: "Winter 2024", score: 8.46, cover: gradients[3] },
  { slug: "one-piece", title: "One Piece", season: "Fall 1999", score: 8.72, cover: gradients[4] },
  { slug: "ninja-kamui", title: "Ninja Kamui", season: "Winter 2024", score: 6.81, cover: gradients[5] },
];

export const editorsPick: AnimeEntry[] = [
  { slug: "angel-beats", title: "Angel Beats!", season: "Spring 2010", score: 8.09, cover: gradients[6] },
  { slug: "charlotte", title: "Charlotte", season: "Summer 2015", score: 7.79, cover: gradients[7] },
  { slug: "clannad", title: "Clannad", season: "Fall 2007", score: 8.03, cover: gradients[8] },
  { slug: "clannad-after-story", title: "Clannad: After Story", season: "Fall 2008", score: 9.06, cover: gradients[9] },
  { slug: "death-note", title: "Death Note", season: "Fall 2006", score: 8.63, cover: gradients[10] },
  { slug: "kanon-2006", title: "Kanon (2006)", season: "Fall 2006", score: 8.00, cover: gradients[11] },
];

export const underratedSeries: AnimeEntry[] = [
  { slug: "death-parade", title: "Death Parade", season: "Winter 2015", score: 8.21, cover: gradients[3] },
  { slug: "gankutsuou", title: "Gankutsuou", season: "Fall 2004", score: 8.19, cover: gradients[4] },
  { slug: "ergo-proxy", title: "Ergo Proxy", season: "Spring 2006", score: 7.91, cover: gradients[5] },
  { slug: "higashi-no-eden", title: "Higashi no Eden", season: "Spring 2009", score: 7.64, cover: gradients[6] },
  { slug: "mushishi", title: "Mushishi", season: "Fall 2005", score: 8.71, cover: gradients[7] },
  { slug: "tokyo-magnitude", title: "Tokyo Magnitude 8.0", season: "Summer 2009", score: 8.14, cover: gradients[8] },
];

export const newOnYugen: AnimeEntry[] = [
  { slug: "bai-yao-pu-4th-season", title: "Bai Yao Pu 4th Season", season: "ONA", cover: gradients[9] },
  { slug: "great-pretender-razbliuto", title: "Great Pretender: Razbliuto", season: "ONA", cover: gradients[10] },
  { slug: "kimi-ni-todoke-3rd-season", title: "Kimi ni Todoke: Kataomoi", season: "TV Special", score: 9.17, cover: gradients[11] },
  { slug: "a-kite", title: "A Kite", season: "OVA", score: 6.53, cover: gradients[0] },
  { slug: "appleseed-xiii-movie", title: "Appleseed XIII Movie", season: "Movie", cover: gradients[1] },
  { slug: "zuanzhou-shanghan", title: "Zuanzhou Shanghan", season: "ONA", score: 6.9, cover: gradients[2] },
];

export const mostPopular: AnimeEntry[] = [
  { slug: "bleach-sennen-kessen-hen", title: "Bleach: Sennen Kessen-hen", season: "Fall 2022", score: 9.23, cover: gradients[0], dubbed: true },
  { slug: "fullmetal-alchemist-brotherhood", title: "Fullmetal Alchemist: Brotherhood", season: "Spring 2009", score: 9.22, cover: gradients[1], dubbed: true },
  { slug: "kaguya-sama-ultra-romantic", title: "Kaguya-sama wa Kokurasetai: Ultra Romantic", season: "Spring 2022", score: 9.17, cover: gradients[2], dubbed: true },
  { slug: "gintama-the-final", title: "Gintama: The Final", season: "Movie", score: 9.15, cover: gradients[3], dubbed: true },
  { slug: "shingeki-no-kyojin-final", title: "Shingeki no Kyojin: The Final Season", season: "Winter 2021", score: 9.15, cover: gradients[4], dubbed: true },
  { slug: "hunter-x-hunter-2011", title: "Hunter x Hunter (2011)", season: "Fall 2011", score: 9.12, cover: gradients[5], dubbed: true },
];

// All unique anime for generating pages
export const allAnime: AnimeEntry[] = [
  heroPick,
  ...recentlyReleased,
  ...trendingAiring,
  ...editorsPick,
  ...underratedSeries,
  ...newOnYugen,
  ...mostPopular,
].filter((a, i, arr) => arr.findIndex((b) => b.slug === a.slug) === i);
