export interface AnimeItem {
  id: number;
  title: string;
  image: string;
  season?: string;
  score?: number;
  dubbed?: boolean;
  episodes?: string;
  views?: string;
  timeAgo?: string;
}

export interface ReviewItem {
  id: number;
  animeTitle: string;
  image: string;
  reviewer: string;
  quote: string;
  timeAgo: string;
  likes: number;
}

export const recentlyReleased: AnimeItem[] = [
  { id: 1, title: "Class Fuhajin Ken Otoko Kaizokudan", image: "https://cdn.myanimelist.net/images/anime/1015/138006.jpg", episodes: "Ep 9", views: "17 views", timeAgo: "about 6 hours ago" },
  { id: 2, title: "Bai Yao Pu 4th Season", image: "https://cdn.myanimelist.net/images/anime/1908/141673.jpg", episodes: "Ep 52", views: "68 views", timeAgo: "about 3 hours ago" },
  { id: 3, title: "Shenyin Ju Xiaojie 2nd Season", image: "https://cdn.myanimelist.net/images/anime/1247/143318.jpg", episodes: "Ep 14", views: "112 views", timeAgo: "about 8 hours ago" },
  { id: 4, title: "Great Pretender Razbliuto", image: "https://cdn.myanimelist.net/images/anime/1044/141375.jpg", episodes: "ONA", views: "1.3K views", timeAgo: "about 12 hours ago" },
  { id: 5, title: "Youbi Bakufutsu Sougi Busou", image: "https://cdn.myanimelist.net/images/anime/1263/145008.jpg", episodes: "Ep 4", views: "216 views", timeAgo: "about 14 hours ago" },
  { id: 6, title: "Chiikawa", image: "https://cdn.myanimelist.net/images/anime/1505/121741.jpg", episodes: "Ep 301", views: "190 views", timeAgo: "about 15 hours ago" },
  { id: 7, title: "Urusei Yatsura (2022) 2nd Season", image: "https://cdn.myanimelist.net/images/anime/1243/139620.jpg", episodes: "Ep 23", views: "500 views", timeAgo: "about 15 hours ago" },
  { id: 8, title: "Joshikao Musoku Ryugi", image: "https://cdn.myanimelist.net/images/anime/1300/145007.jpg", episodes: "Ep 5", views: "416 views", timeAgo: "about 16 hours ago" },
];

export const trendingAiring: AnimeItem[] = [
  { id: 1, title: "Sousou no Frieren", image: "https://cdn.myanimelist.net/images/anime/1015/138006.jpg", season: "Fall 2023", score: 9.13 },
  { id: 2, title: "Kusuriya no Hitorigoto", image: "https://cdn.myanimelist.net/images/anime/1708/138033.jpg", season: "Fall 2023", score: 8.93 },
  { id: 3, title: "Boku no Kokoro no Yabai Yatsu", image: "https://cdn.myanimelist.net/images/anime/1251/139394.jpg", season: "Winter 2024", score: 8.66 },
  { id: 4, title: "Kingdom 5th Season", image: "https://cdn.myanimelist.net/images/anime/1611/132487.jpg", season: "Winter 2024", score: 8.45 },
  { id: 5, title: "One Piece", image: "https://cdn.myanimelist.net/images/anime/1244/138851.jpg", season: "Fall 1999", score: 8.72 },
  { id: 6, title: "Ninja Kamui", image: "https://cdn.myanimelist.net/images/anime/1139/140471.jpg", season: "Winter 2024", score: 8.41 },
];

export const editorsPick: AnimeItem[] = [
  { id: 1, title: "Angel Beats!", image: "https://cdn.myanimelist.net/images/anime/1636/99644.jpg", season: "Spring 2010", score: 8.09, dubbed: true },
  { id: 2, title: "Charlotte", image: "https://cdn.myanimelist.net/images/anime/12/74683.jpg", season: "Summer 2015", score: 7.78, dubbed: true },
  { id: 3, title: "Clannad", image: "https://cdn.myanimelist.net/images/anime/1804/95033.jpg", season: "Fall 2007", score: 8.03, dubbed: true },
  { id: 4, title: "Clannad: After Story", image: "https://cdn.myanimelist.net/images/anime/1299/110774.jpg", season: "Fall 2008", score: 8.93, dubbed: true },
  { id: 5, title: "Death Note", image: "https://cdn.myanimelist.net/images/anime/9/9453.jpg", season: "Fall 2006", score: 8.63, dubbed: true },
  { id: 6, title: "Kanon (2006)", image: "https://cdn.myanimelist.net/images/anime/1065/114733.jpg", season: "Fall 2006", score: 7.90, dubbed: true },
];

export const underratedSeries: AnimeItem[] = [
  { id: 1, title: "Death Parade", image: "https://cdn.myanimelist.net/images/anime/5/71553.jpg", season: "Winter 2015", score: 8.18 },
  { id: 2, title: "Gankutsuou", image: "https://cdn.myanimelist.net/images/anime/11/35937.jpg", season: "Spring 2007", score: 8.18 },
  { id: 3, title: "Ergo Proxy", image: "https://cdn.myanimelist.net/images/anime/13/7840.jpg", season: "Winter 2006", score: 7.90 },
  { id: 4, title: "Higashi no Eden", image: "https://cdn.myanimelist.net/images/anime/8/29519.jpg", season: "Spring 2009", score: 7.68 },
  { id: 5, title: "Mushishi", image: "https://cdn.myanimelist.net/images/anime/2/73862.jpg", season: "Fall 2005", score: 8.70 },
  { id: 6, title: "Tokyo Magnitude 8.0", image: "https://cdn.myanimelist.net/images/anime/4/12651.jpg", season: "Summer 2009", score: 8.01 },
];

export const newOnYugen: AnimeItem[] = [
  { id: 1, title: "Bai Yao Pu 4th Season", image: "https://cdn.myanimelist.net/images/anime/1908/141673.jpg", season: "ONA" },
  { id: 2, title: "Great Pretender Razbliuto", image: "https://cdn.myanimelist.net/images/anime/1044/141375.jpg", season: "ONA" },
  { id: 3, title: "Kimi ni Todoke: Kataomoi", image: "https://cdn.myanimelist.net/images/anime/1890/140915.jpg", season: "TV Special", score: 9.07 },
  { id: 4, title: "A Kite", image: "https://cdn.myanimelist.net/images/anime/1382/91038.jpg", season: "OVA", score: 6.53 },
  { id: 5, title: "Appleseed XIII Movie", image: "https://cdn.myanimelist.net/images/anime/9/42883.jpg", season: "Movie" },
  { id: 6, title: "Zuoshou Shanghai", image: "https://cdn.myanimelist.net/images/anime/1503/131025.jpg", season: "ONA", score: 6.9 },
];

export const mostPopular: AnimeItem[] = [
  { id: 1, title: "Bleach: Sennen Kessen-hen", image: "https://cdn.myanimelist.net/images/anime/1908/135431.jpg", season: "Fall 2022", score: 9.23, dubbed: true },
  { id: 2, title: "Fullmetal Alchemist: Brotherhood", image: "https://cdn.myanimelist.net/images/anime/1208/94745.jpg", season: "Spring 2009", score: 9.22, dubbed: true },
  { id: 3, title: "Kaguya-sama wa Kokurasetai: Ultra...", image: "https://cdn.myanimelist.net/images/anime/1160/122627.jpg", season: "Spring 2022", score: 9.07, dubbed: true },
  { id: 4, title: "Gintama: The Final", image: "https://cdn.myanimelist.net/images/anime/1245/116760.jpg", season: "Movie", score: 9.15 },
  { id: 5, title: "Shingeki no Kyojin: The Final Season", image: "https://cdn.myanimelist.net/images/anime/1000/120439.jpg", season: "Winter 2021", score: 9.15, dubbed: true },
  { id: 6, title: "Hunter x Hunter (2011)", image: "https://cdn.myanimelist.net/images/anime/1337/99013.jpg", season: "Fall 2011", score: 9.12, dubbed: true },
];

export const recentReviews: ReviewItem[] = [
  { id: 1, animeTitle: "I've Got a Million Skill Points", image: "https://cdn.myanimelist.net/images/anime/1015/138006.jpg", reviewer: "MadSlime", quote: "when will this be out i kinda want to watch it so bad its hurting my last brain cell, c'mon guys release it already, i caaaan't", timeAgo: "about 6 hours ago", likes: 0 },
  { id: 2, animeTitle: "Plastic Memories", image: "https://cdn.myanimelist.net/images/anime/1636/99644.jpg", reviewer: "TimmyFloww", quote: "Heartfelt story with interesting takeaways", timeAgo: "about 14 hours ago", likes: 7 },
  { id: 3, animeTitle: "Kusuriya no Hitorigoto", image: "https://cdn.myanimelist.net/images/anime/1708/138033.jpg", reviewer: "Maya_cat678", quote: "TALENTED OHMGG AHHHHHHHHHHH", timeAgo: "a day ago", likes: 7 },
  { id: 4, animeTitle: "Youkoso Jitsuryoku Shijou Shugi no Classroom e 3rd Season", image: "https://cdn.myanimelist.net/images/anime/1908/141673.jpg", reviewer: "Freyannies", quote: "School sense at it's best", timeAgo: "a day ago", likes: 4 },
  { id: 5, animeTitle: "Sousou no Frieren", image: "https://cdn.myanimelist.net/images/anime/1015/138006.jpg", reviewer: "Arachnea", quote: "Best anime in this genre!", timeAgo: "a day ago", likes: 0 },
  { id: 6, animeTitle: "I've Got a Million Skill Points", image: "https://cdn.myanimelist.net/images/anime/1263/145008.jpg", reviewer: "NightShade587", quote: "Seems like generic Isekai but after the anime is over I remember it existently has no description", timeAgo: "3 days ago", likes: 7 },
];
