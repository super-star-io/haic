type Props = { contributionDates: string[] };

const dateKey = (date: Date) => date.toISOString().slice(0, 10);

export default function ContributionCalendar({ contributionDates }: Props) {
  const today = new Date();
  const end = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - start.getUTCDay() - 52 * 7);
  const startKey = dateKey(start);
  const endKey = dateKey(end);
  const counts = new Map<string, number>();
  for (const date of contributionDates) {
    if (date >= startKey && date <= endKey) counts.set(date, (counts.get(date) ?? 0) + 1);
  }
  const weeks: Array<Array<{ key: string; count: number; future: boolean }>> = [];
  for (let week = 0; week < 53; week += 1) {
    const days = [];
    for (let day = 0; day < 7; day += 1) {
      const date = new Date(start);
      date.setUTCDate(start.getUTCDate() + week * 7 + day);
      const key = dateKey(date);
      days.push({ key, count: counts.get(key) ?? 0, future: date > end });
    }
    weeks.push(days);
  }

  const monthLabels = weeks.map((week, index) => {
    const firstDay = week.find((day) => day.key.slice(-2) === "01");
    if (!firstDay) return null;
    const date = new Date(`${firstDay.key}T00:00:00Z`);
    return <span key={index} style={{ gridColumn: index + 2 }}>{new Intl.DateTimeFormat("es", { month: "short", timeZone: "UTC" }).format(date)}</span>;
  });
  const total = Array.from(counts.values()).reduce((sum, count) => sum + count, 0);

  return <section className="contribution-panel" aria-labelledby="contribution-title">
    <div className="contribution-heading"><div><span className="kicker">ACTIVIDAD</span><h2 id="contribution-title">{total} proyectos publicados en el último año</h2></div><small>La actividad se cuenta por fecha de publicación.</small></div>
    <div className="contribution-scroll"><div className="contribution-months">{monthLabels}</div><div className="contribution-chart"><div className="contribution-weekdays"><span></span><span>Lun</span><span></span><span>Mié</span><span></span><span>Vie</span><span></span></div><div className="contribution-weeks">{weeks.map((week, weekIndex) => <div className="contribution-week" key={weekIndex}>{week.map(({ key, count, future }) => <span key={key} className={`contribution-day level-${count === 0 ? 0 : count === 1 ? 1 : count === 2 ? 2 : count === 3 ? 3 : 4}${future ? " future" : ""}`} title={`${count} ${count === 1 ? "publicación" : "publicaciones"} · ${key}`} aria-label={`${count} ${count === 1 ? "publicación" : "publicaciones"} · ${key}`} />)}</div>)}</div></div></div>
    <div className="contribution-legend"><span>Menos</span>{[0, 1, 2, 3, 4].map((level) => <i className={`contribution-day level-${level}`} key={level} />)}<span>Más</span></div>
  </section>;
}
