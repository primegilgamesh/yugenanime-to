export interface EpisodeInfo {
  num: number;
  title: string;
  views?: string;
  timeAgo?: string;
  type?: "recap" | "filler" | "normal";
}

export interface AnimeEntry {
  slug: string;
  title: string;
  titleRomaji?: string;
  titleEnglish?: string;
  titleNative?: string;
  synonyms?: string;
  season?: string;
  score?: number;
  cover: string;
  episodes?: number;
  episodesDub?: number;
  duration?: string;
  status?: string;
  premiered?: string;
  genres?: string;
  studios?: string;
  format?: string;
  synopsis?: string;
  dubbed?: boolean;
  views?: string;
  timeAgo?: string;
  favorites?: number;
  trailerUrl?: string;
  episodeList?: EpisodeInfo[];
}

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

export const heroPicks: AnimeEntry[] = [
  {
    slug: "meitantei-conan",
    title: "Meitantei Conan",
    titleRomaji: "Meitantei Conan",
    titleEnglish: "Detective Conan",
    titleNative: "名探偵コナン",
    season: "Winter 1996",
    score: 8.16,
    cover: gradients[0],
    episodes: 1100,
    duration: "25 min per ep",
    status: "Currently Airing",
    premiered: "Winter 1996",
    genres: "Mystery, Comedy, Police",
    studios: "TMS Entertainment",
    format: "TV",
    favorites: 2340,
    trailerUrl: "https://www.youtube.com/embed/t9SIi530sEE",
    synopsis: "Shinichi Kudou, a high school student of outstanding talent in detective work, is well-known for having solved several challenging cases. One day, he is attacked and poisoned by an unknown organization, causing him to shrink into a child.",
  },
  {
    slug: "frieren",
    title: "Sousou no Frieren",
    titleRomaji: "Sousou no Frieren",
    titleEnglish: "Frieren: Beyond Journey's End",
    titleNative: "葬送のフリーレン",
    synonyms: "Frieren at the Funeral",
    season: "Fall 2023",
    score: 9.17,
    cover: gradients[2],
    episodes: 28,
    episodesDub: 28,
    dubbed: true,
    duration: "24 min per ep",
    status: "Finished Airing",
    premiered: "Fall 2023",
    genres: "Adventure, Drama, Fantasy",
    studios: "Madhouse",
    format: "TV",
    favorites: 1217,
    trailerUrl: "https://www.youtube.com/embed/qgQBwRJVBdU",
    synopsis: "During their decade-long quest to defeat the Demon King, the members of the hero's party—Himmel himself, the priest Heiter, the dwarf warrior Eisen, and the elven mage Frieren—forge bonds through adventures and battles, creating unforgettable precious memories.",
    episodeList: [
      { num: 1, title: "The Journey's End", views: "45.2K", timeAgo: "about a year ago" },
      { num: 2, title: "It Didn't Have to Be Magic...", views: "38.1K", timeAgo: "about a year ago" },
      { num: 3, title: "Killing Magic", views: "35.6K", timeAgo: "about a year ago" },
      { num: 4, title: "The Land Where Souls Rest", views: "32.4K", timeAgo: "about a year ago" },
      { num: 5, title: "Phantoms of the Dead", views: "30.1K", timeAgo: "about a year ago" },
      { num: 6, title: "The Hero of the Village", views: "28.9K", timeAgo: "about a year ago" },
      { num: 7, title: "Like a Fairy Tale", views: "27.5K", timeAgo: "about a year ago" },
      { num: 8, title: "Frieren the Slayer", views: "26.8K", timeAgo: "about a year ago" },
      { num: 9, title: "Aura the Guillotine", views: "25.3K", timeAgo: "about a year ago" },
      { num: 10, title: "A Powerful Mage", views: "24.1K", timeAgo: "about a year ago" },
      { num: 11, title: "Winter in the Northern Lands", views: "23.5K", timeAgo: "about a year ago" },
      { num: 12, title: "A Real Hero", views: "22.8K", timeAgo: "about a year ago", type: "recap" },
      { num: 13, title: "Aversion to One's Own Kind", views: "21.4K", timeAgo: "about a year ago" },
      { num: 14, title: "Privilege of the Young", views: "20.9K", timeAgo: "about a year ago" },
      { num: 15, title: "Smells Like Trouble", views: "20.1K", timeAgo: "about a year ago" },
      { num: 16, title: "Long-Lived Friends", views: "19.5K", timeAgo: "about a year ago" },
      { num: 17, title: "Take Care", views: "18.8K", timeAgo: "about a year ago" },
      { num: 18, title: "First-Class Mage Exam", views: "18.2K", timeAgo: "about a year ago" },
      { num: 19, title: "Well-Laid Plans", views: "17.6K", timeAgo: "about a year ago" },
      { num: 20, title: "Necessary Killing", views: "17.1K", timeAgo: "about a year ago" },
      { num: 21, title: "The World of Magic", views: "16.5K", timeAgo: "about a year ago" },
      { num: 22, title: "Future Enemies", views: "16.0K", timeAgo: "about a year ago" },
      { num: 23, title: "Conquering the Labyrinth", views: "15.4K", timeAgo: "about a year ago" },
      { num: 24, title: "Perfect Replicas", views: "14.9K", timeAgo: "about a year ago" },
      { num: 25, title: "A Fatal Vulnerability", views: "14.3K", timeAgo: "about a year ago" },
      { num: 26, title: "The Height of Magic", views: "13.8K", timeAgo: "about a year ago" },
      { num: 27, title: "An Era of Humans", views: "13.2K", timeAgo: "about a year ago" },
      { num: 28, title: "Sousou no Frieren", views: "12.7K", timeAgo: "about a year ago" },
    ],
  },
  {
    slug: "one-piece",
    title: "One Piece",
    titleRomaji: "One Piece",
    titleEnglish: "One Piece",
    titleNative: "ワンピース",
    season: "Fall 1999",
    score: 8.72,
    cover: gradients[4],
    episodes: 1100,
    duration: "24 min per ep",
    status: "Currently Airing",
    premiered: "Fall 1999",
    genres: "Action, Adventure, Fantasy",
    studios: "Toei Animation",
    format: "TV",
    favorites: 5432,
    trailerUrl: "https://www.youtube.com/embed/MCb13lbVGE0",
    synopsis: "Gol D. Roger was known as the 'Pirate King,' the strongest and most infamous being to have sailed the Grand Line. The capture and execution of Roger by the World Government brought a change throughout the world.",
  },
];

export const recentlyReleased: AnimeEntry[] = [
  { slug: "oshi-no-ko-2nd-season", title: "Oshi no Ko 2nd Season", titleRomaji: "Oshi no Ko 2nd Season", titleEnglish: "[Oshi No Ko] Season 2", titleNative: "【推しの子】第2期", season: "Summer 2024", score: 8.5, cover: gradients[1], episodes: 13, views: "67 views", timeAgo: "about 3 hours ago", studios: "Doga Kobo", format: "TV", genres: "Drama, Supernatural", status: "Finished Airing", premiered: "Summer 2024", duration: "24 min per ep", favorites: 890, trailerUrl: "https://www.youtube.com/embed/B2BgSPn9RCk", synopsis: "Aquamarine and Ruby Hoshino continue to navigate the entertainment industry while searching for the truth behind their mother's death." },
  { slug: "bai-yao-pu-4th-season", title: "Bai Yao Pu 4th Season", titleRomaji: "Bai Yao Pu 4th Season", titleEnglish: "Legend of Exorcism Season 4", titleNative: "百妖谱 第四季", season: "ONA", score: 7.2, cover: gradients[2], episodes: 12, views: "48 views", timeAgo: "about 5 hours ago", studios: "Haoliners Animation", format: "ONA", genres: "Fantasy, Historical", status: "Finished Airing", premiered: "2024", duration: "20 min per ep", favorites: 120, synopsis: "The fourth season continues the adventures of the exorcist and his supernatural companions." },
  { slug: "shenyin-jiu-xiaojie-2nd-season", title: "Shenyin Jiu Xiaojie 2nd Season", titleRomaji: "Shenyin Jiu Xiaojie 2nd Season", titleEnglish: "The Lady of Mystery Season 2", titleNative: "神印九小姐 第二季", season: "ONA", score: 7.0, cover: gradients[3], episodes: 12, views: "112 views", timeAgo: "about 6 hours ago", studios: "Big Firebird Animation", format: "ONA", genres: "Fantasy, Romance", status: "Finished Airing", premiered: "2024", duration: "18 min per ep", favorites: 85, synopsis: "The second season follows the mysterious ninth lady as she uncovers deeper conspiracies." },
  { slug: "great-pretender-razbliuto", title: "Great Pretender: Razbliuto", titleRomaji: "Great Pretender: Razbliuto", titleEnglish: "Great Pretender: Razbliuto", titleNative: "GREAT PRETENDER razbliuto", season: "ONA", score: 7.8, cover: gradients[4], episodes: 10, views: "1.3K views", timeAgo: "about 12 hours ago", studios: "Wit Studio", format: "ONA", genres: "Action, Comedy, Mystery", status: "Finished Airing", premiered: "2024", duration: "24 min per ep", favorites: 340, synopsis: "Makoto Edamura and Laurent Thierry return for another thrilling con game that takes them around the world." },
  { slug: "yuuki-bakuhatsu-bang-bravern", title: "Yuuki Bakuhatsu Bang Bravern", titleRomaji: "Yuuki Bakuhatsu Bang Bravern", titleEnglish: "Brave Bang Bang!", titleNative: "勇気爆発バーンブレイバーン", season: "Winter 2024", score: 7.6, cover: gradients[5], episodes: 12, views: "216 views", timeAgo: "about 14 hours ago", studios: "CygamesPictures", format: "TV", genres: "Action, Mecha, Comedy", status: "Finished Airing", premiered: "Winter 2024", duration: "24 min per ep", favorites: 410, synopsis: "When alien machines attack Earth, a mysterious mecha named Bravern appears to save humanity with the power of courage." },
  { slug: "chikkun-takkun", title: "Chikkun Takkun", titleRomaji: "Chikkun Takkun", titleEnglish: "Chikkun Takkun", titleNative: "チックンタックン", season: "ONA", score: 6.5, cover: gradients[6], episodes: 6, views: "190 views", timeAgo: "about 15 hours ago", studios: "Tatsunoko Production", format: "ONA", genres: "Comedy, Kids", status: "Finished Airing", premiered: "1984", duration: "10 min per ep", favorites: 30, synopsis: "A lighthearted comedy following the misadventures of two quirky characters." },
  { slug: "urusei-yatsura-2022-2nd-season", title: "Urusei Yatsura (2022) 2nd Season", titleRomaji: "Urusei Yatsura (2022) 2nd Season", titleEnglish: "Urusei Yatsura Season 2", titleNative: "うる星やつら 第2期", season: "Winter 2024", score: 7.3, cover: gradients[7], episodes: 23, views: "304 views", timeAgo: "about 15 hours ago", studios: "david production", format: "TV", genres: "Comedy, Romance, Sci-Fi", status: "Finished Airing", premiered: "Winter 2024", duration: "24 min per ep", favorites: 280, synopsis: "The second season of the modern adaptation of Rumiko Takahashi's classic romantic comedy about an alien girl who falls in love with an unlucky Earth boy." },
  { slug: "jujutsu-kaisen-season-2", title: "Jujutsu Kaisen Season 2", titleRomaji: "Jujutsu Kaisen 2nd Season", titleEnglish: "Jujutsu Kaisen Season 2", titleNative: "呪術廻戦 第2期", season: "Summer 2023", score: 8.6, cover: gradients[8], episodes: 23, views: "416 views", timeAgo: "about 16 hours ago", studios: "MAPPA", format: "TV", genres: "Action, Fantasy, School", status: "Finished Airing", premiered: "Summer 2023", duration: "24 min per ep", favorites: 3200, trailerUrl: "https://www.youtube.com/embed/PKHQuQzn1dI", synopsis: "The past comes to light as Gojo's backstory is revealed, followed by the devastating Shibuya Incident arc." },
];

export const trendingAiring: AnimeEntry[] = [
  { slug: "frieren", title: "Sousou no Frieren", titleRomaji: "Sousou no Frieren", titleEnglish: "Frieren: Beyond Journey's End", titleNative: "葬送のフリーレン", season: "Fall 2023", score: 9.18, cover: gradients[0], studios: "Madhouse", format: "TV", genres: "Adventure, Drama, Fantasy", episodes: 28, status: "Finished Airing", premiered: "Fall 2023", duration: "24 min per ep", favorites: 1217, trailerUrl: "https://www.youtube.com/embed/qgQBwRJVBdU", synopsis: "During their decade-long quest to defeat the Demon King, the members of the hero's party forge bonds through adventures and battles." },
  { slug: "kusuriya-no-hitorigoto", title: "Kusuriya no Hitorigoto", titleRomaji: "Kusuriya no Hitorigoto", titleEnglish: "The Apothecary Diaries", titleNative: "薬屋のひとりごと", season: "Fall 2023", score: 8.83, cover: gradients[1], studios: "TOHO Animation", format: "TV", genres: "Drama, Mystery, Historical", episodes: 24, status: "Finished Airing", premiered: "Fall 2023", duration: "24 min per ep", favorites: 980, trailerUrl: "https://www.youtube.com/embed/kkYRiO4dxjY", synopsis: "A young pharmacist named Maomao is kidnapped and sold to the emperor's palace. Using her pharmaceutical knowledge, she becomes involved in various incidents." },
  { slug: "boku-no-kokoro-no-yabai-yatsu", title: "Boku no Kokoro no Yabai Yatsu", titleRomaji: "Boku no Kokoro no Yabai Yatsu", titleEnglish: "The Dangers in My Heart", titleNative: "僕の心のヤバいやつ", season: "Winter 2024", score: 8.47, cover: gradients[2], studios: "Shin-Ei Animation", format: "TV", genres: "Comedy, Romance, School", episodes: 12, status: "Finished Airing", premiered: "Winter 2024", duration: "24 min per ep", favorites: 540, synopsis: "A middle school boy with dark fantasies unexpectedly develops a crush on a tall, popular girl in his class." },
  { slug: "kingdom-5th-season", title: "Kingdom 5th Season", titleRomaji: "Kingdom 5th Season", titleEnglish: "Kingdom Season 5", titleNative: "キングダム 第5シリーズ", season: "Winter 2024", score: 8.46, cover: gradients[3], studios: "Pierrot", format: "TV", genres: "Action, Historical, Military", episodes: 26, status: "Finished Airing", premiered: "Winter 2024", duration: "24 min per ep", favorites: 420, synopsis: "The epic tale of Xin's journey to become the greatest general under the heavens continues." },
  { slug: "one-piece", title: "One Piece", titleRomaji: "One Piece", titleEnglish: "One Piece", titleNative: "ワンピース", season: "Fall 1999", score: 8.72, cover: gradients[4], dubbed: true, studios: "Toei Animation", format: "TV", genres: "Action, Adventure, Fantasy", episodes: 1100, status: "Currently Airing", premiered: "Fall 1999", duration: "24 min per ep", favorites: 5432, trailerUrl: "https://www.youtube.com/embed/MCb13lbVGE0", synopsis: "Monkey D. Luffy sets out on an adventure to find the legendary treasure One Piece and become the Pirate King." },
  { slug: "ninja-kamui", title: "Ninja Kamui", titleRomaji: "Ninja Kamui", titleEnglish: "Ninja Kamui", titleNative: "ニンジャカムイ", season: "Winter 2024", score: 6.81, cover: gradients[5], studios: "E&H Production", format: "TV", genres: "Action, Sci-Fi", episodes: 13, status: "Finished Airing", premiered: "Winter 2024", duration: "24 min per ep", favorites: 210, synopsis: "A former ninja seeks revenge after his family is killed by the organization he once served." },
];

export const editorsPick: AnimeEntry[] = [
  { slug: "angel-beats", title: "Angel Beats!", titleRomaji: "Angel Beats!", titleEnglish: "Angel Beats!", titleNative: "Angel Beats!", season: "Spring 2010", score: 8.09, cover: gradients[6], dubbed: true, studios: "P.A.Works", format: "TV", genres: "Action, Comedy, Drama", episodes: 13, status: "Finished Airing", premiered: "Spring 2010", duration: "24 min per ep", favorites: 3100, trailerUrl: "https://www.youtube.com/embed/fIvC7pxPtKk", synopsis: "Otonashi awakens in the afterlife with no memories. He meets Yuri who leads a rebel group fighting against God." },
  { slug: "charlotte", title: "Charlotte", titleRomaji: "Charlotte", titleEnglish: "Charlotte", titleNative: "Charlotte", season: "Summer 2015", score: 7.79, cover: gradients[7], studios: "P.A.Works", format: "TV", genres: "Drama, School, Supernatural", episodes: 13, status: "Finished Airing", premiered: "Summer 2015", duration: "24 min per ep", favorites: 1800, synopsis: "Yuu Otosaka has the power to take over someone's body for five seconds. He uses this ability to live an easy life until he's caught." },
  { slug: "clannad", title: "Clannad", titleRomaji: "Clannad", titleEnglish: "Clannad", titleNative: "CLANNAD", season: "Fall 2007", score: 8.03, cover: gradients[8], dubbed: true, studios: "Kyoto Animation", format: "TV", genres: "Drama, Romance, School", episodes: 23, status: "Finished Airing", premiered: "Fall 2007", duration: "24 min per ep", favorites: 2700, synopsis: "Tomoya Okazaki is a delinquent who finds life dull. One day he meets a girl muttering to herself and his life begins to change." },
  { slug: "clannad-after-story", title: "Clannad: After Story", titleRomaji: "Clannad: After Story", titleEnglish: "Clannad: After Story", titleNative: "CLANNAD〜AFTER STORY〜", season: "Fall 2008", score: 9.06, cover: gradients[9], dubbed: true, studios: "Kyoto Animation", format: "TV", genres: "Drama, Romance, Supernatural", episodes: 24, status: "Finished Airing", premiered: "Fall 2008", duration: "24 min per ep", favorites: 4100, synopsis: "A continuation of the Clannad story, following Tomoya and Nagisa as they face the challenges of adult life together." },
  { slug: "death-note", title: "Death Note", titleRomaji: "Death Note", titleEnglish: "Death Note", titleNative: "デスノート", season: "Fall 2006", score: 8.63, cover: gradients[10], dubbed: true, studios: "Madhouse", format: "TV", genres: "Mystery, Supernatural, Thriller", episodes: 37, status: "Finished Airing", premiered: "Fall 2006", duration: "23 min per ep", favorites: 6800, trailerUrl: "https://www.youtube.com/embed/NlJZ-YgAt-c", synopsis: "A high school student discovers a supernatural notebook that kills anyone whose name is written in it. He decides to cleanse the world of evil." },
  { slug: "kanon-2006", title: "Kanon (2006)", titleRomaji: "Kanon (2006)", titleEnglish: "Kanon (2006)", titleNative: "Kanon", season: "Fall 2006", score: 8.00, cover: gradients[11], studios: "Kyoto Animation", format: "TV", genres: "Drama, Romance, Supernatural", episodes: 24, status: "Finished Airing", premiered: "Fall 2006", duration: "24 min per ep", favorites: 900, synopsis: "Yuuichi Aizawa returns to a city he last visited seven years ago. He has forgotten everything about his previous visit but begins to remember as he meets several girls." },
];

export const underratedSeries: AnimeEntry[] = [
  { slug: "death-parade", title: "Death Parade", titleRomaji: "Death Parade", titleEnglish: "Death Parade", titleNative: "デス・パレード", season: "Winter 2015", score: 8.21, cover: gradients[3], studios: "Madhouse", format: "TV", genres: "Drama, Mystery, Psychological", episodes: 12, status: "Finished Airing", premiered: "Winter 2015", duration: "23 min per ep", favorites: 2100, synopsis: "After death, humans are sent to bars run by bartenders who serve as arbiters to judge whether they will be reincarnated or sent to the void." },
  { slug: "gankutsuou", title: "Gankutsuou", titleRomaji: "Gankutsuou", titleEnglish: "Gankutsuou: The Count of Monte Cristo", titleNative: "巌窟王", season: "Fall 2004", score: 8.19, cover: gradients[4], studios: "Gonzo", format: "TV", genres: "Drama, Mystery, Sci-Fi", episodes: 24, status: "Finished Airing", premiered: "Fall 2004", duration: "24 min per ep", favorites: 580, synopsis: "A sci-fi retelling of The Count of Monte Cristo, set in a futuristic Paris where aristocrats rule." },
  { slug: "ergo-proxy", title: "Ergo Proxy", titleRomaji: "Ergo Proxy", titleEnglish: "Ergo Proxy", titleNative: "エルゴプラクシー", season: "Spring 2006", score: 7.91, cover: gradients[5], studios: "Manglobe", format: "TV", genres: "Mystery, Psychological, Sci-Fi", episodes: 23, status: "Finished Airing", premiered: "Spring 2006", duration: "25 min per ep", favorites: 1200, synopsis: "In a post-apocalyptic world, humans and androids coexist in domed cities. Inspector Re-l Mayer investigates a series of murders tied to mysterious beings called Proxies." },
  { slug: "higashi-no-eden", title: "Higashi no Eden", titleRomaji: "Higashi no Eden", titleEnglish: "Eden of the East", titleNative: "東のエデン", season: "Spring 2009", score: 7.64, cover: gradients[6], studios: "Production I.G", format: "TV", genres: "Action, Drama, Mystery, Romance", episodes: 11, status: "Finished Airing", premiered: "Spring 2009", duration: "23 min per ep", favorites: 780, synopsis: "A girl visiting Washington D.C. meets a man who has lost his memory but holds a phone loaded with billions of yen digital money." },
  { slug: "mushishi", title: "Mushishi", titleRomaji: "Mushishi", titleEnglish: "Mushi-Shi", titleNative: "蟲師", season: "Fall 2005", score: 8.71, cover: gradients[7], studios: "Artland", format: "TV", genres: "Adventure, Fantasy, Mystery, Slice of Life", episodes: 26, status: "Finished Airing", premiered: "Fall 2005", duration: "25 min per ep", favorites: 2300, synopsis: "Ginko travels from place to place researching Mushi, the most basic forms of life. He helps those who are afflicted by these entities." },
  { slug: "tokyo-magnitude", title: "Tokyo Magnitude 8.0", titleRomaji: "Tokyo Magnitude 8.0", titleEnglish: "Tokyo Magnitude 8.0", titleNative: "東京マグニチュード8.0", season: "Summer 2009", score: 8.14, cover: gradients[8], studios: "Bones, Kinema Citrus", format: "TV", genres: "Drama", episodes: 11, status: "Finished Airing", premiered: "Summer 2009", duration: "23 min per ep", favorites: 640, synopsis: "A massive earthquake strikes Tokyo. A middle school girl and her younger brother must find their way home through the devastation." },
];

export const newOnYugen: AnimeEntry[] = [
  { slug: "bai-yao-pu-4th-season-new", title: "Bai Yao Pu 4th Season", titleRomaji: "Bai Yao Pu 4th Season", titleEnglish: "Legend of Exorcism Season 4", titleNative: "百妖谱 第四季", season: "ONA", cover: gradients[9], studios: "Haoliners Animation", format: "ONA", genres: "Fantasy, Historical", episodes: 12, status: "Finished Airing", favorites: 120, synopsis: "The fourth season continues the supernatural adventures." },
  { slug: "great-pretender-razbliuto-new", title: "Great Pretender: Razbliuto", titleRomaji: "Great Pretender: Razbliuto", titleEnglish: "Great Pretender: Razbliuto", titleNative: "GREAT PRETENDER razbliuto", season: "ONA", cover: gradients[10], studios: "Wit Studio", format: "ONA", genres: "Action, Comedy, Mystery", episodes: 10, status: "Finished Airing", favorites: 340, synopsis: "Another round of thrilling cons around the world." },
  { slug: "kimi-ni-todoke-3rd-season", title: "Kimi ni Todoke: Kataomoi", titleRomaji: "Kimi ni Todoke 3rd Season", titleEnglish: "Kimi ni Todoke: From Me to You", titleNative: "君に届け 3RD SEASON", season: "TV Special", score: 9.17, cover: gradients[11], studios: "Production I.G", format: "TV Special", genres: "Romance, School", episodes: 12, status: "Finished Airing", favorites: 1500, synopsis: "The third and final season follows Sawako and Kazehaya as their relationship deepens." },
  { slug: "a-kite", title: "A Kite", titleRomaji: "A Kite", titleEnglish: "Kite", titleNative: "A KITE", season: "OVA", score: 6.53, cover: gradients[0], studios: "Arms", format: "OVA", genres: "Action, Drama", episodes: 2, status: "Finished Airing", favorites: 180, synopsis: "A young girl becomes an assassin to avenge her parents' murder." },
  { slug: "appleseed-xiii-movie", title: "Appleseed XIII Movie", titleRomaji: "Appleseed XIII Movie", titleEnglish: "Appleseed XIII", titleNative: "アップルシード XIII", season: "Movie", cover: gradients[1], studios: "Production I.G", format: "Movie", genres: "Action, Mecha, Sci-Fi", episodes: 1, status: "Finished Airing", favorites: 90, synopsis: "In a utopian city, a female soldier and her cyborg partner protect the peace." },
  { slug: "zuanzhou-shanghan", title: "Zuanzhou Shanghan", titleRomaji: "Zuanzhou Shanghan", titleEnglish: "Zuanzhou Shanghan", titleNative: "钻石商行", season: "ONA", score: 6.9, cover: gradients[2], studios: "bilibili", format: "ONA", genres: "Drama", episodes: 12, status: "Finished Airing", favorites: 50, synopsis: "A story about the diamond trade and the people involved." },
];

export const mostPopular: AnimeEntry[] = [
  {
    slug: "bleach-sennen-kessen-hen",
    title: "Bleach: Sennen Kessen-hen",
    titleRomaji: "Bleach: Sennen Kessen-hen",
    titleEnglish: "Bleach: Thousand-Year Blood War",
    titleNative: "BLEACH 千年血戦篇",
    synonyms: "Bleach: Thousand-Year Blood War Arc",
    season: "Fall 2022",
    score: 9.23,
    cover: gradients[0],
    dubbed: true,
    studios: "Pierrot",
    format: "TV",
    genres: "Action, Adventure, Fantasy",
    episodes: 13,
    episodesDub: 13,
    status: "Finished Airing",
    premiered: "Fall 2022",
    duration: "24 min per ep",
    favorites: 4500,
    trailerUrl: "https://www.youtube.com/embed/1ksNMBhEfnQ",
    synopsis: "Substitute Soul Reaper Ichigo Kurosaki spends his days fighting against Hollows, dangerous evil spirits that threaten Karakura Town. Ichigo carries out his quest with his closest allies: Orihime Inoue, his childhood friend with a talent for healing; Yasutora Sado, a classmate with incredible strength; and Uryuu Ishida, a Quincy with a grudge against Soul Reapers.",
    episodeList: [
      { num: 1, title: "The Blood Warfare", views: "52.5K", timeAgo: "about a year ago" },
      { num: 2, title: "Foundation Stones", views: "25K", timeAgo: "about a year ago" },
      { num: 3, title: "March of the Starcross", views: "28.6K", timeAgo: "about a year ago" },
      { num: 4, title: "Kill the Shadow", views: "21.4K", timeAgo: "about a year ago" },
      { num: 5, title: "Wrath as a Lightning", views: "19.8K", timeAgo: "about a year ago" },
      { num: 6, title: "The Fire", views: "22.6K", timeAgo: "about a year ago" },
      { num: 7, title: "Born in the Dark", views: "22.9K", timeAgo: "about a year ago" },
      { num: 8, title: "The Shooting Star Project (Zero Mix)", views: "20.4K", timeAgo: "about a year ago" },
      { num: 9, title: "The Drop", views: "21.5K", timeAgo: "about a year ago" },
      { num: 10, title: "The Battle", views: "23.1K", timeAgo: "about a year ago" },
      { num: 11, title: "Everything but the Rain", views: "24.5K", timeAgo: "about a year ago", type: "recap" },
      { num: 12, title: 'Everything but the Rain "June Truth"', views: "24.5K", timeAgo: "about a year ago" },
      { num: 13, title: "The Blade Is Me", views: "38.6K", timeAgo: "about a year ago" },
    ],
  },
  { slug: "fullmetal-alchemist-brotherhood", title: "Fullmetal Alchemist: Brotherhood", titleRomaji: "Hagane no Renkinjutsushi: Fullmetal Alchemist", titleEnglish: "Fullmetal Alchemist: Brotherhood", titleNative: "鋼の錬金術師 FULLMETAL ALCHEMIST", season: "Spring 2009", score: 9.22, cover: gradients[1], dubbed: true, studios: "Bones", format: "TV", genres: "Action, Adventure, Drama, Fantasy", episodes: 64, status: "Finished Airing", premiered: "Spring 2009", duration: "24 min per ep", favorites: 8900, trailerUrl: "https://www.youtube.com/embed/--IcmZkvL0Q", synopsis: "Two brothers search for the Philosopher's Stone to restore their bodies after a failed attempt to bring their mother back to life through alchemy." },
  { slug: "kaguya-sama-ultra-romantic", title: "Kaguya-sama wa Kokurasetai: Ultra Romantic", titleRomaji: "Kaguya-sama wa Kokurasetai: Ultra Romantic", titleEnglish: "Kaguya-sama: Love Is War -Ultra Romantic-", titleNative: "かぐや様は告らせたい-ウルトラロマンティック-", season: "Spring 2022", score: 9.17, cover: gradients[2], dubbed: true, studios: "A-1 Pictures", format: "TV", genres: "Comedy, Romance, School", episodes: 13, status: "Finished Airing", premiered: "Spring 2022", duration: "24 min per ep", favorites: 3800, synopsis: "The battle of wits between Kaguya and Miyuki reaches its climax in the third season." },
  { slug: "gintama-the-final", title: "Gintama: The Final", titleRomaji: "Gintama: The Final", titleEnglish: "Gintama: The Very Final", titleNative: "銀魂 THE FINAL", season: "Movie", score: 9.15, cover: gradients[3], dubbed: true, studios: "Bandai Namco Pictures", format: "Movie", genres: "Action, Comedy, Drama", episodes: 1, status: "Finished Airing", premiered: "2021", duration: "1 hr 44 min", favorites: 2100, synopsis: "The final chapter of the Gintama saga brings the story to its epic conclusion." },
  { slug: "shingeki-no-kyojin-final", title: "Shingeki no Kyojin: The Final Season", titleRomaji: "Shingeki no Kyojin: The Final Season", titleEnglish: "Attack on Titan: The Final Season", titleNative: "進撃の巨人 The Final Season", season: "Winter 2021", score: 9.15, cover: gradients[4], dubbed: true, studios: "MAPPA", format: "TV", genres: "Action, Drama, Fantasy, Military", episodes: 16, status: "Finished Airing", premiered: "Winter 2021", duration: "24 min per ep", favorites: 7200, trailerUrl: "https://www.youtube.com/embed/M_OauHnAFc8", synopsis: "The final season follows Eren's plan to end the conflict between Marley and Eldia once and for all.", episodeList: [
    { num: 1, title: "The Other Side of the Sea", views: "89.2K", timeAgo: "2 years ago" },
    { num: 2, title: "Midnight Train", views: "72.1K", timeAgo: "2 years ago" },
    { num: 3, title: "The Door of Hope", views: "68.4K", timeAgo: "2 years ago" },
    { num: 4, title: "From One Hand to Another", views: "65.3K", timeAgo: "2 years ago" },
    { num: 5, title: "Declaration of War", views: "95.1K", timeAgo: "2 years ago" },
    { num: 6, title: "The War Hammer Titan", views: "82.7K", timeAgo: "2 years ago" },
    { num: 7, title: "Assault", views: "71.9K", timeAgo: "2 years ago" },
    { num: 8, title: "Assassin's Bullet", views: "78.3K", timeAgo: "2 years ago" },
    { num: 9, title: "Brave Volunteers", views: "59.4K", timeAgo: "2 years ago", type: "filler" },
    { num: 10, title: "A Sound Argument", views: "61.2K", timeAgo: "2 years ago" },
    { num: 11, title: "Deceiver", views: "64.8K", timeAgo: "2 years ago" },
    { num: 12, title: "Guides", views: "58.1K", timeAgo: "2 years ago" },
    { num: 13, title: "Children of the Forest", views: "67.5K", timeAgo: "2 years ago", type: "recap" },
    { num: 14, title: "Savagery", views: "73.9K", timeAgo: "2 years ago" },
    { num: 15, title: "Sole Salvation", views: "69.2K", timeAgo: "2 years ago" },
    { num: 16, title: "Above and Below", views: "88.7K", timeAgo: "2 years ago" },
  ] },
  { slug: "hunter-x-hunter-2011", title: "Hunter x Hunter (2011)", titleRomaji: "Hunter x Hunter (2011)", titleEnglish: "Hunter x Hunter", titleNative: "HUNTER×HUNTER(2011)", season: "Fall 2011", score: 9.12, cover: gradients[5], dubbed: true, studios: "Madhouse", format: "TV", genres: "Action, Adventure, Fantasy", episodes: 148, status: "Finished Airing", premiered: "Fall 2011", duration: "23 min per ep", favorites: 7600, trailerUrl: "https://www.youtube.com/embed/D9iTQRB4XRk", synopsis: "Gon Freecss discovers his father is a legendary Hunter. He decides to become a Hunter himself to find his father.", episodeList: [
    { num: 1, title: "Departure × And × Friends", views: "120K", timeAgo: "3 years ago" },
    { num: 2, title: "Test × Of × Tests", views: "95K", timeAgo: "3 years ago" },
    { num: 3, title: "Rivals × For × Survival", views: "88K", timeAgo: "3 years ago" },
    { num: 4, title: "Hope × And × Ambition", views: "82K", timeAgo: "3 years ago" },
    { num: 5, title: "Hisoka × Is × Sneaky", views: "91K", timeAgo: "3 years ago" },
    { num: 6, title: "A × Surprising × Challenge", views: "78K", timeAgo: "3 years ago" },
    { num: 7, title: "Showdown × On × The Airship", views: "75K", timeAgo: "3 years ago", type: "filler" },
    { num: 8, title: "Decision × By × Majority?", views: "72K", timeAgo: "3 years ago" },
    { num: 9, title: "Beware × Of × Prisoners", views: "69K", timeAgo: "3 years ago" },
    { num: 10, title: "Trick × To × The Trick", views: "66K", timeAgo: "3 years ago" },
    { num: 11, title: "Gamble × Resignation", views: "63K", timeAgo: "3 years ago" },
    { num: 12, title: "A × Close × Encounter", views: "85K", timeAgo: "3 years ago" },
    { num: 13, title: "Letter × From × Gon", views: "60K", timeAgo: "3 years ago", type: "recap" },
  ] },
];

// All unique anime for generating pages
export const allAnime: AnimeEntry[] = [
  ...heroPicks,
  ...recentlyReleased,
  ...trendingAiring,
  ...editorsPick,
  ...underratedSeries,
  ...newOnYugen,
  ...mostPopular,
].filter((a, i, arr) => arr.findIndex((b) => b.slug === a.slug) === i);
