const statuses = [
  { label: "Watching", count: "2,802", color: "bg-status-watching", pct: 50 },
  { label: "Plan to Watch", count: "1,957", color: "bg-status-plan", pct: 28 },
  { label: "Completed", count: "163", color: "bg-status-completed", pct: 10 },
  { label: "On Hold", count: "80", color: "bg-status-hold", pct: 8 },
  { label: "Dropped", count: "20", color: "bg-status-dropped", pct: 4 },
];

const StatusDistribution = () => (
  <div className="space-y-3">
    <h3 className="text-foreground font-display font-semibold text-base">Status Distribution</h3>
    {/* Romaji-style horizontal scroll row */}
    <div className="overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0">
      <div className="flex gap-3 min-w-max">
        {statuses.map((s) => (
          <div key={s.label} className="bg-card border border-border rounded-md px-4 py-2.5 flex flex-col gap-0.5 min-w-[140px]">
            <div className="flex items-center gap-2">
              <span className={`${s.color} w-2 h-2 rounded-full`} />
              <span className="text-foreground text-sm font-semibold">{s.label}</span>
            </div>
            <span className="text-muted-foreground text-xs">{s.count} users · {s.pct}%</span>
          </div>
        ))}
      </div>
    </div>
    <div className="h-2 rounded-full overflow-hidden flex">
      {statuses.map((s) => (
        <div key={s.label} className={`${s.color} h-full`} style={{ width: `${s.pct}%` }} />
      ))}
    </div>
  </div>
);

export default StatusDistribution;
