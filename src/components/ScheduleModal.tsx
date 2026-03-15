const schedule = [
  {
    day: "TUE",
    entries: [
      { time: "14:00", title: "Touken Ranbu Kai: Kyoden Moyuru Honn..." },
      { time: "14:30", title: "Rinkai!" },
      { time: "14:30", title: "Unnamed Memory" },
      { time: "15:00", title: "Boukyaku Battery (TV)" },
    ],
  },
  {
    day: "WED",
    entries: [
      { time: "02:00", title: "Xiao Lu He Xiao Lan 5th Season" },
      { time: "12:00", title: "Seiyuu Radio no Uraomote" },
      { time: "13:30", title: "Kaii to Otome to Kamikakushi" },
      { time: "14:00", title: "Kono Subarashii Sekai ni Shukufuku wo! 3" },
      { time: "14:30", title: "Date A Live V" },
      { time: "15:00", title: "Bartender: Kami no Glass" },
      { time: "15:55", title: "Kenka Dokugaku" },
    ],
  },
  {
    day: "THU",
    entries: [
      { time: "13:00", title: "Jantama Kan!!" },
      { time: "13:30", title: "Dungeon Meshi" },
      { time: "14:00", title: "Yuru Camp△ Season 3" },
      { time: "14:56", title: "Hananoi-kun to Koi no Yamai" },
      { time: "15:26", title: "Wind Breaker" },
      { time: "15:55", title: "Urusei Yatsura (2022) 2nd Season" },
      { time: "16:00", title: "Maou no Ore ga Dorei Elf wo Yome ni Shit..." },
      { time: "16:28", title: "Henjin no Salad Bowl" },
    ],
  },
  {
    day: "FRI",
    entries: [
      { time: "09:25", title: "Beyblade X" },
      { time: "09:40", title: "Fushigi Dagashiya: Zenitendou" },
      { time: "09:55", title: "Pokemon (2023)" },
      { time: "11:00", title: "Odekake Kozame" },
      { time: "14:15", title: "Tensei shitara Slime Datta Ken 3rd Season" },
      { time: "14:30", title: "Mahouka Koukou no Rettousei 3rd Season" },
      { time: "15:30", title: "Girls Band Cry" },
    ],
  },
  {
    day: "SAT",
    entries: [
      { time: "00:30", title: "Shadowverse Flame: Arc-hen" },
      { time: "01:00", title: "Ooi! Tonbo" },
      { time: "07:30", title: "Crayon Shin-chan" },
      { time: "08:00", title: "Doraemon (2005)" },
      { time: "08:30", title: "Boku no Hero Academia 7th Season" },
      { time: "09:00", title: "Meitantei Conan" },
      { time: "14:00", title: "Kaijuu 8-gou" },
      { time: "16:00", title: "Yoru no Kurage wa Oyogenai" },
    ],
  },
  {
    day: "SUN",
    entries: [
      { time: "00:00", title: "Tousouchuu: Great Mission" },
      { time: "00:30", title: "One Piece" },
      { time: "01:00", title: "Himitsu no AiPri" },
      { time: "08:00", title: "Hibike! Euphonium 3" },
      { time: "08:30", title: "Captain Tsubasa Season 2: Junior Youth..." },
      { time: "13:00", title: "Shinigami Bocchan to Kuro Maid 3rd Sea..." },
    ],
  },
];

const ScheduleModal = () => {
  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  return (
    <div className="space-y-6">
      <div>
        <p className="text-foreground font-display font-bold text-2xl">{timeStr} <span className="text-muted-foreground text-sm font-normal">GMT-0</span></p>
        <p className="text-muted-foreground text-sm">Release time is estimated</p>
      </div>
      {schedule.map((day) => (
        <div key={day.day}>
          <h3 className="text-foreground font-bold text-sm mb-2">{day.day}</h3>
          <div className="space-y-1">
            {day.entries.map((entry, i) => (
              <div key={i} className="flex gap-3 py-1">
                <span className="text-primary text-sm font-medium w-12 flex-shrink-0">{entry.time}</span>
                <span className="text-muted-foreground text-sm">{entry.title}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScheduleModal;
