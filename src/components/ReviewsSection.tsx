import { ThumbsUp } from "lucide-react";

// Seed-based review generator per anime
const reviewTemplates = [
  { templates: [
    "Absolutely loved this anime! The animation quality is top-notch.",
    "A masterpiece that everyone should watch at least once.",
    "The story telling in this is phenomenal, kept me hooked throughout.",
    "One of the best shows I've watched this year, highly recommend!",
    "The character development is exceptional, you really grow to care about everyone.",
  ], likeRange: [25, 50] },
  { templates: [
    "Pretty good anime overall, some episodes are better than others.",
    "Solid show with great moments, though the pacing could be better.",
    "Enjoyable watch, the art style really stands out.",
    "Good storyline but I wish they developed some characters more.",
    "Worth watching, especially if you're into this genre.",
  ], likeRange: [10, 25] },
  { templates: [
    "Decent anime, not the best but definitely not bad either.",
    "The animation carries the show, story is average.",
    "Had its moments but felt a bit rushed towards the end.",
    "Not bad for a casual watch, wouldn't call it a must-see though.",
    "Some episodes were great, others felt like filler.",
  ], likeRange: [3, 12] },
  { templates: [
    "Not really my cup of tea, but I can see why others like it.",
    "Started strong but lost me halfway through.",
    "The premise is interesting but the execution could be better.",
  ], likeRange: [1, 5] },
];

const userNames = [
  "AniChiwa", "MadSlime", "TimmyFlame", "Maya_cato78", "Treyennes",
  "NightShade587", "StarGazer22", "AnimeFan99", "OtakuKing", "SakuraWind",
  "MoonlitSky", "DragonPulse", "CrystalEye", "ThunderBolt", "PhoenixRise",
  "SilverFang", "GoldenDawn", "IronWill", "CosmicDust", "NeonBlaze",
];

function seededRandom(seed: number) {
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function generateReviews(slug: string) {
  let seed = 0;
  for (let i = 0; i < slug.length; i++) seed += slug.charCodeAt(i) * (i + 1);
  
  const count = 4 + Math.floor(seededRandom(seed) * 7); // 4-10 reviews
  const reviews: { text: string; likes: number; user: string }[] = [];
  
  for (let i = 0; i < count; i++) {
    const tierIdx = Math.min(Math.floor(seededRandom(seed + i * 7) * reviewTemplates.length), reviewTemplates.length - 1);
    const tier = reviewTemplates[tierIdx];
    const templateIdx = Math.floor(seededRandom(seed + i * 13) * tier.templates.length);
    const userIdx = Math.floor(seededRandom(seed + i * 17) * userNames.length);
    const likes = tier.likeRange[0] + Math.floor(seededRandom(seed + i * 23) * (tier.likeRange[1] - tier.likeRange[0]));
    reviews.push({ text: tier.templates[templateIdx], likes, user: userNames[userIdx] });
  }
  
  return reviews.sort((a, b) => b.likes - a.likes);
}

interface Props {
  slug?: string;
}

const ReviewsSection = ({ slug }: Props) => {
  const reviews = generateReviews(slug || "default");

  return (
    <div className="space-y-3">
      <h3 className="text-foreground font-display font-semibold text-base mb-4">Reviews</h3>
      {reviews.map((r, i) => (
        <div key={i} className="bg-secondary rounded-md p-4 flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-muted flex-shrink-0" />
          <div className="flex-1">
            <p className="text-muted-foreground text-[10px] mb-1">{r.user}</p>
            <p className="text-foreground text-sm leading-relaxed">{r.text}</p>
          </div>
          <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition text-xs flex-shrink-0">
            <ThumbsUp size={12} />
            <span>{r.likes}</span>
          </button>
        </div>
      ))}
    </div>
  );
};

export default ReviewsSection;
