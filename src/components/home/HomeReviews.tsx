import { MessageSquare, ThumbsUp } from "lucide-react";
import { recentReviews } from "@/data/homeData";
import SectionHeader from "./SectionHeader";

const HomeReviews = () => (
  <section>
    <SectionHeader
      icon={<MessageSquare size={18} className="text-primary" />}
      title="Recent YugenAnime Reviews"
      onViewAll={() => {}}
    />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {recentReviews.map((review) => (
        <div key={review.id} className="bg-card rounded-lg overflow-hidden border border-border">
          <img
            src={review.image}
            alt={review.animeTitle}
            className="w-full h-32 object-cover"
            loading="lazy"
          />
          <div className="p-3 space-y-2">
            <p className="text-primary text-xs font-medium">
              Review of {review.animeTitle} by {review.reviewer}
            </p>
            <p className="text-secondary-foreground text-xs italic line-clamp-2">
              "{review.quote}"
            </p>
            <div className="flex items-center justify-between text-[10px] text-muted-foreground">
              <span>{review.timeAgo}</span>
              <span className="flex items-center gap-1">
                <ThumbsUp size={10} />
                {review.likes}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default HomeReviews;
