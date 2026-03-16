import { Play } from "lucide-react";
import { useState } from "react";

interface Props {
  trailerUrl?: string;
}

const TrailerSection = ({ trailerUrl }: Props) => {
  const [playing, setPlaying] = useState(false);

  if (!trailerUrl) return null;

  return (
    <div className="space-y-2">
      <h3 className="text-foreground font-display font-semibold text-base">Trailer</h3>
      <div className="relative w-full aspect-video bg-secondary rounded-md overflow-hidden">
        {playing ? (
          <iframe
            src={`${trailerUrl}?autoplay=1`}
            className="absolute inset-0 w-full h-full"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="Trailer"
          />
        ) : (
          <button
            onClick={() => setPlaying(true)}
            className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/40 hover:bg-black/30 transition-colors group"
          >
            <div className="w-14 h-14 rounded-full bg-background/80 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Play size={24} className="text-foreground ml-1" />
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default TrailerSection;
