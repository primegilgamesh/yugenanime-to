import { ThumbsUp } from "lucide-react";

const reviews = [
  { text: "Sousou no Frieren is a new gen masterpiece. watch it", likes: 42 },
  { text: "A Masterpiece, that's all I can say!", likes: 38 },
  { text: "Masterpiece (if it lives up to the manga)", likes: 22 },
  { text: "This is an absolute masterpiece, it's slow and healing but at the same time it wasn't? just give it 1-2 episodes chance", likes: 19 },
  { text: "Best anime in this genre!", likes: 15 },
  { text: "A breathtaking adaptation.", likes: 14 },
  { text: "It is a very enjoyable piece, that makes you fall in love with this fantasy world. The art and music really make it beautiful.", likes: 12 },
  { text: "Watch this if you are into chill animes to watch during breaks", likes: 8 },
  { text: "Animation is carrying, story is mid and characters are as well", likes: 5 },
  { text: "Finally, I found a way to weep and get all the waste outta my body)", likes: 4 },
  { text: "This anime feels like a spin-off to me. 3/10.", likes: 2 },
];

const ReviewsSection = () => (
  <div className="space-y-3">
    <h3 className="text-foreground font-display font-semibold text-base mb-4">Reviews</h3>
    {reviews.map((r, i) => (
      <div key={i} className="bg-secondary rounded-md p-4 flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-muted flex-shrink-0" />
        <div className="flex-1">
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

export default ReviewsSection;
