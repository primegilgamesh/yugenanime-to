import { useState } from "react";
import { ThumbsUp, Trash2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useReviews } from "@/contexts/ReviewsContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

// Seed-based review generator per anime (community placeholder reviews)
const reviewTemplates = [
  { templates: [
    "Absolutely loved this anime! The animation quality is top-notch.",
    "A masterpiece that everyone should watch at least once.",
    "The storytelling is phenomenal, kept me hooked throughout.",
    "One of the best shows I've watched this year, highly recommend!",
    "The character development is exceptional.",
  ], likeRange: [25, 50] },
  { templates: [
    "Pretty good anime overall, some episodes are better than others.",
    "Solid show with great moments, though pacing could be better.",
    "Enjoyable watch, the art style really stands out.",
    "Good storyline but I wish they developed some characters more.",
    "Worth watching, especially if you're into this genre.",
  ], likeRange: [10, 25] },
  { templates: [
    "Decent anime, not the best but definitely not bad either.",
    "The animation carries the show, story is average.",
    "Had its moments but felt a bit rushed towards the end.",
  ], likeRange: [3, 12] },
];

const userNames = [
  "AniChiwa", "MadSlime", "TimmyFlame", "Maya_cato78", "NightShade587",
  "StarGazer22", "AnimeFan99", "OtakuKing", "SakuraWind", "MoonlitSky",
];

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function generateReviews(slug: string) {
  let seed = 0;
  for (let i = 0; i < slug.length; i++) seed += slug.charCodeAt(i) * (i + 1);
  const count = 3 + Math.floor(seededRandom(seed) * 4);
  const reviews: { text: string; likes: number; user: string }[] = [];
  for (let i = 0; i < count; i++) {
    const tier = reviewTemplates[Math.min(Math.floor(seededRandom(seed + i * 7) * reviewTemplates.length), reviewTemplates.length - 1)];
    const text = tier.templates[Math.floor(seededRandom(seed + i * 13) * tier.templates.length)];
    const user = userNames[Math.floor(seededRandom(seed + i * 17) * userNames.length)];
    const likes = tier.likeRange[0] + Math.floor(seededRandom(seed + i * 23) * (tier.likeRange[1] - tier.likeRange[0]));
    reviews.push({ text, likes, user });
  }
  return reviews.sort((a, b) => b.likes - a.likes);
}

interface Props {
  slug?: string;
}

const ReviewsSection = ({ slug = "default" }: Props) => {
  const { user, isLoggedIn } = useAuth();
  const { getReviewsForAnime, addReview, removeReview } = useReviews();
  const [writing, setWriting] = useState(false);
  const [text, setText] = useState("");

  const seeded = generateReviews(slug);
  const userReviews = getReviewsForAnime(slug);

  const handleSubmit = () => {
    if (!isLoggedIn || !user) {
      toast("Please login to write a review", { position: "top-right" });
      return;
    }
    const trimmed = text.trim();
    if (trimmed.length < 5) {
      toast("Review must be at least 5 characters", { position: "top-right" });
      return;
    }
    if (trimmed.length > 1000) {
      toast("Review must be under 1000 characters", { position: "top-right" });
      return;
    }
    addReview(slug, user.username, trimmed, user.avatar);
    setText("");
    setWriting(false);
    toast("Review posted", {
      style: { background: "hsla(28, 90%, 55%, 0.9)", color: "white", border: "none" },
      position: "top-right",
    });
  };

  const handleWriteClick = () => {
    if (!isLoggedIn) {
      toast("Please login to write a review", { position: "top-right" });
      return;
    }
    setWriting((v) => !v);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-foreground font-display font-semibold text-base">Reviews</h3>
        <Button size="sm" onClick={handleWriteClick}>
          {writing ? "Cancel" : "Write a review"}
        </Button>
      </div>

      {writing && (
        <div className="bg-secondary rounded-md p-3 space-y-2">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={`Share your thoughts about this anime...`}
            maxLength={1000}
            className="min-h-[100px] bg-background"
          />
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">{text.length}/1000</span>
            <Button size="sm" onClick={handleSubmit}>Post review</Button>
          </div>
        </div>
      )}

      {userReviews.map((r) => (
        <div key={r.id} className="bg-secondary rounded-md p-4 flex items-start gap-3">
          {r.avatar ? (
            <img src={r.avatar} alt={r.user} className="w-8 h-8 rounded-full flex-shrink-0 object-cover" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-muted flex-shrink-0" />
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <p className="text-foreground text-xs font-semibold">{r.user}</p>
              <span className="text-[10px] text-muted-foreground">{new Date(r.createdAt).toLocaleDateString()}</span>
            </div>
            <p className="text-foreground text-sm leading-relaxed whitespace-pre-wrap break-words">{r.text}</p>
          </div>
          {user?.username === r.user && (
            <button onClick={() => removeReview(r.id)} className="text-muted-foreground hover:text-destructive transition" aria-label="Delete review">
              <Trash2 size={14} />
            </button>
          )}
        </div>
      ))}

      {seeded.map((r, i) => (
        <div key={`s-${i}`} className="bg-secondary rounded-md p-4 flex items-start gap-3">
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
