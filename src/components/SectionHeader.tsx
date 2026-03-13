import { ArrowRight } from "lucide-react";
import { type LucideIcon } from "lucide-react";

interface SectionHeaderProps {
  icon: LucideIcon;
  title: string;
  iconColor?: string;
}

const SectionHeader = ({ icon: Icon, title, iconColor = "text-primary" }: SectionHeaderProps) => (
  <div className="flex items-center justify-between mb-3">
    <div className="flex items-center gap-2">
      <Icon size={16} className={iconColor} />
      <h2 className="font-display font-bold text-foreground text-sm md:text-base">{title}</h2>
    </div>
    <ArrowRight size={16} className="text-muted-foreground" />
  </div>
);

export default SectionHeader;
