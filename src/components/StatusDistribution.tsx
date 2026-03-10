const statuses = [
  { label: "Watching", count: "2,802", color: "bg-status-watching", pct: 40 },
  { label: "Plan to Watch", count: "1,957", color: "bg-status-plan", pct: 28 },
  { label: "Completed", count: "163", color: "bg-status-completed", pct: 10 },
  { label: "On Hold", count: "80", color: "bg-status-hold", pct: 8 },
  { label: "Dropped", count: "20", color: "bg-status-dropped", pct: 4 },
];

const StatusDistribution = () => (
  <div className="space-y-3">
    <h3 className="text-foreground font-display font-semibold text-base">Status Distribution</h3>
    <div className="flex gap-2 flex-wrap">
      {statuses.map((s) => (
        <span key={s.label} className={`${s.color} text-primary-foreground text-xs font-medium px-3 py-1 rounded-full`}>
          {s.label}
        </span>
      ))}
    </div>
    <div className="text-xs text-muted-foreground flex gap-4 flex-wrap">
      {statuses.map((s) => (
        <span key={s.label}>{s.count} users</span>
      ))}
    </div>
    <div className="h-2 rounded-full overflow-hidden flex">
      {statuses.map((s) => (
        <div key={s.label} className={`${s.color} h-full`} style={{ width: `${s.pct}%` }} />
      ))}
    </div>
  </div>
);

export default StatusDistribution;
