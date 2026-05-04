import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { weeklySchedule } from "@/data/scheduleData";

const dayOrder = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"] as const;

const ScheduleModal = () => {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const timeStr = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  const todayKey = dayOrder[now.getDay()];
  const todayLabel = now.toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" });

  const ordered = [...weeklySchedule].sort((a, b) => {
    const ai = (dayOrder.indexOf(a.day) - dayOrder.indexOf(todayKey) + 7) % 7;
    const bi = (dayOrder.indexOf(b.day) - dayOrder.indexOf(todayKey) + 7) % 7;
    return ai - bi;
  });

  return (
    <div className="space-y-6">
      <div>
        <p className="text-foreground font-display font-bold text-2xl">
          {timeStr} <span className="text-muted-foreground text-sm font-normal">Local time</span>
        </p>
        <p className="text-muted-foreground text-sm">{todayLabel} · Estimated simulcast times</p>
      </div>
      {ordered.map((day) => (
        <div key={day.day}>
          <h3 className={`font-bold text-sm mb-2 ${day.day === todayKey ? "text-primary" : "text-foreground"}`}>
            {day.day}{day.day === todayKey ? " · Today" : ""}
          </h3>
          <div className="space-y-1">
            {day.entries.map((entry, i) => (
              <div key={i} className="flex gap-3 py-1">
                <span className="text-primary text-sm font-medium w-12 flex-shrink-0">{entry.time}</span>
                <Link to={`/anime/${entry.slug}`} className="text-muted-foreground text-sm hover:text-primary transition-colors flex-1 truncate">
                  {entry.title}
                  {entry.episode ? <span className="text-[11px] text-muted-foreground/70 ml-2">EP {entry.episode}</span> : null}
                </Link>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScheduleModal;
