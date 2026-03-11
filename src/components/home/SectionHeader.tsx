import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

interface SectionHeaderProps {
  icon: ReactNode;
  title: string;
  onViewAll?: () => void;
}

const SectionHeader = ({ icon, title, onViewAll }: SectionHeaderProps) => (
  <div className="flex items-center justify-between mb-4">
    <h2 className="font-display font-bold text-base md:text-lg text-foreground flex items-center gap-2">
      {icon}
      {title}
    </h2>
    {onViewAll && (
      <button onClick={onViewAll} className="text-muted-foreground hover:text-foreground transition-colors">
        <ArrowRight size={20} />
      </button>
    )}
  </div>
);

export default SectionHeader;
