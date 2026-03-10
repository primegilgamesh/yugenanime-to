import { useState } from "react";

const synopsis = `During their decade-long quest to defeat the Demon King, the members of the hero's party—Himmel himself, the priest Heiter, the dwarf warrior Eisen, and the elven mage Frieren—forge bonds through adventures and battles, creating unforgettable precious memories. However, the millennia-old Frieren struggles to understand the human concept of time, and before she knows it, her companions begin to pass away one by one. When Himmel dies, Frieren is struck by grief and regret, realizing that she barely knew anything about those she calls friends. Determined to understand humanity better, Frieren embarks on a new journey, retracing the steps of their original quest while seeking out new companions along the way.`;

const MobileDescription = () => {
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
