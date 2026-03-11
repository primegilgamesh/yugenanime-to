import conanHero from "@/assets/conan-hero.jpg";
import { Play, Eye } from "lucide-react";

const HomeHero = () => (
  <div className="relative w-full h-[200px] md:h-[320px] overflow-hidden">
    <img src={conanHero} alt="Meitantei Conan" className="w-full h-full object-cover" />
    <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
    <div className="absolute bottom-6 left-4 right-4 md:bottom-10 md:left-8 md:right-8 max-w-xl">
      <span className="text-primary text-[10px] md:text-xs font-bold uppercase tracking-wider mb-1 block">
        ✦ Editor's Pick
      </span>
      <h1 className="font-display text-xl md:text-3xl font-bold text-foreground mb-2">
        Meitantei Conan
      </h1>
      <p className="text-secondary-foreground text-xs md:text-sm leading-relaxed mb-4 line-clamp-2 md:line-clamp-3">
        Shinichi Kudo, a high school student of outstanding prowess in detective work, is well-known for having
        solved several challenging cases. One day, when Shinichi spots two suspicious men...
      </p>
      <div className="flex items-center gap-3">
        <button className="bg-primary text-primary-foreground font-semibold text-xs md:text-sm px-4 md:px-5 py-2 rounded-md hover:opacity-90 transition flex items-center gap-2">
          <Play size={14} fill="currentColor" />
          Watch Now
        </button>
        <button className="bg-secondary text-secondary-foreground font-semibold text-xs md:text-sm px-4 md:px-5 py-2 rounded-md hover:bg-secondary/80 transition flex items-center gap-2">
          <Eye size={14} />
          View Details
        </button>
      </div>
    </div>
  </div>
);

export default HomeHero;
