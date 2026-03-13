import { Star } from "lucide-react";
import { toast } from "sonner";

const infoColumns = [
  { label: "Romaji", value: "Frieren: Beyond Journey's End" },
  { label: "Native", value: "葬送のフリーレン" },
  { label: "Syno", value: "Frieren at the Funeral" },
];

const MobileAnimeInfo = () => {
  const isLoggedIn = false;

  const handleWriteReview = () => {
    if (!isLoggedIn) {
      toast.error("Please login first to write a review");
      return;
    }
  };

  return (
    <div className="md:hidden px-4 space-y-3">
      <div className="flex items-center gap-2">
        <Star size={16} className="text-score-star" fill="currentColor" />
        <span className="text-foreground text-sm">9.17 Average Score</span>
      </div>
      <div className="border-t border-border pt-3">
        <div className="grid grid-cols-3 gap-2">
          {infoColumns.map(({ label, value }) => (
            <div key={label}>
              <div className="text-primary text-xs font-medium">{label}</div>
              <div className="text-foreground text-xs">{value}</div>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={handleWriteReview}
        className="w-full bg-primary text-primary-foreground font-semibold text-sm py-2.5 rounded-md hover:opacity-90 transition"
      >
        Write a Review
      </button>
    </div>
  );
};

export default MobileAnimeInfo;
