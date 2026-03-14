import { useState } from "react";

interface Props {
  synopsis: string;
}

const MobileDescription = ({ synopsis }: Props) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="md:hidden px-4 space-y-2">
      <h3 className="text-foreground font-display font-semibold text-base">Description</h3>
      <p className={`text-secondary-foreground text-sm leading-relaxed ${!expanded ? "line-clamp-4" : ""}`}>
        {synopsis}
      </p>
      {!expanded && (
        <button
          onClick={() => setExpanded(true)}
          className="bg-secondary text-foreground text-xs font-medium px-3 py-1.5 rounded-md"
        >
          Read More
        </button>
      )}
    </div>
  );
};

export default MobileDescription;
