import heroBanner from "@/assets/hero-banner.jpg";
import frierenCover from "@/assets/frieren-cover.jpg";
import { Heart } from "lucide-react";

const HeroBanner = () => (
  <div className="relative w-full h-[240px] md:h-[340px] overflow-hidden">
    <img src={heroBanner} alt="Sousou no Frieren" className="w-full h-full object-cover" />
    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
    <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6">
      <div className="flex items-end gap-3 mb-2 md:mb-0">
        {/* Mini cover image */}
        <img
          src={frierenCover}
          alt="Sousou no Frieren cover"
          className="w-[80px] h-[110px] md:w-[100px] md:h-[140px] rounded-md object-cover border-2 border-background shadow-lg flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 md:hidden mb-2 justify-end">
            <button className="bg-primary text-primary-foreground font-semibold text-xs px-4 py-2 rounded-md hover:opacity-90 transition">
              Add to List
            </button>
            <button className="bg-heart/20 text-heart p-2 rounded-md hover:bg-heart/30 transition">
              <Heart size={16} fill="currentColor" />
            </button>
          </div>
          <h1 className="font-display text-2xl md:text-3xl font-bold mb-2">Sousou no Frieren</h1>
          <p className="text-sm text-secondary-foreground max-w-2xl leading-relaxed mb-4 hidden md:block">
            During their decade-long quest to defeat the Demon King, the members of the hero's party—Himmel
            himself, the priest Heiter, the dwarf warrior Eisen, and the elven mage Frieren—forge bonds through
            adventures and battles, creating unforgettable precious memories...
          </p>
          <div className="hidden md:flex items-center gap-3">
            <button className="bg-primary text-primary-foreground font-semibold text-sm px-5 py-2 rounded-md hover:opacity-90 transition">
              Add to List
            </button>
            <button className="bg-heart/20 text-heart p-2 rounded-md hover:bg-heart/30 transition">
              <Heart size={18} fill="currentColor" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default HeroBanner;
