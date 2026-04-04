import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { type LucideIcon } from "lucide-react";

interface SectionHeaderProps {
  icon: LucideIcon;
  title: string;
  iconColor?: string;
  href?: string;
}

const SectionHeader = ({ icon: Icon, title, iconColor = "text-primary", href }: SectionHeaderProps) => (
  <div className="flex items-center justify-between mb-3">
    <div className="flex items-center gap-2">
      <Icon size={16} className={iconColor} />
      <h2 className="font-display font-bold text-foreground text-sm md:text-base">{title}</h2>
    </div>
    {href ? (
      <Link to={href} className="text-muted-foreground hover:text-foreground transition-colors">
        <ArrowRight size={16} />
      </Link>
    ) : (
      <ArrowRight size={16} className="text-muted-foreground" />
    )}
  </div>
);

export default SectionHeader;
