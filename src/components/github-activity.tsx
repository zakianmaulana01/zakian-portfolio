import { GithubLogo, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { getGitHubActivity } from "@/lib/github-activity";

export async function GitHubActivity() {
  const { data, fallback } = await getGitHubActivity();
  const start = new Date(`${data.days[0].date}T00:00:00Z`).getTime();
  const firstDay = new Date(start).getUTCDay();
  const weeks = Math.ceil((data.days.length + firstDay) / 7);
  const width = weeks * 15 + 35;
  const monthLabels: { x: number; label: string }[] = [];
  let previousMonth = -1;
  for (let week = 0; week < weeks; week++) {
    const date = new Date(start + week * 7 * 86400000);
    if (date.getUTCMonth() !== previousMonth && week < weeks - 1)
      monthLabels.push({
        x: 35 + week * 15,
        label: date.toLocaleDateString("id-ID", {
          month: "short",
          timeZone: "UTC",
        }),
      });
    previousMonth = date.getUTCMonth();
  }
  const period = `${data.days[0].date} sampai ${data.days.at(-1)!.date}`;
  return (
    <section className="github-activity" aria-labelledby="github-title">
      <div className="github-heading">
        <div>
          <h2 id="github-title">GitHub Contributions</h2>
          <p className="github-subtitle">
            {data.total.toLocaleString("id-ID")} kontribusi dalam setahun
          </p>
        </div>
        <a
          href={`https://github.com/${data.username}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubLogo size={18} /> Lihat GitHub <ArrowUpRight size={15} />
        </a>
      </div>
      <div
        className="contribution-scroll"
        role="region"
        aria-label="Kalender kontribusi GitHub, geser untuk melihat semua bulan"
        tabIndex={0}
      >
        <svg
          className="contribution-chart"
          viewBox={`0 0 ${width} 135`}
          role="img"
          aria-labelledby="contribution-title contribution-description"
        >
          <title id="contribution-title">
            {`${data.total.toLocaleString("id-ID")} kontribusi GitHub dalam periode yang ditampilkan`}
          </title>
          <desc id="contribution-description">
            {`Aktivitas gabungan publik dan privat akun ${data.username}, ${period}. Kotak semakin hijau menunjukkan semakin banyak kontribusi.`}
          </desc>
          {monthLabels.map(({ x, label }) => (
            <text key={x} x={x} y={12}>
              {label}
            </text>
          ))}
          {["Sen", "Rab", "Jum"].map((day, i) => (
            <text key={day} x={0} y={45 + i * 30}>
              {day}
            </text>
          ))}
          {data.days.map((day, i) => (
            <rect
              key={day.date}
              className={`contribution-level-${day.level}${day.level > 1 ? " contribution-spark" : ""}`}
              data-phase={i % 5}
              x={35 + Math.floor((i + firstDay) / 7) * 15}
              y={23 + ((i + firstDay) % 7) * 15}
              width={11}
              height={11}
              rx={2}
            >
              <title>{`${day.date}: ${day.count} kontribusi`}</title>
            </rect>
          ))}
        </svg>
      </div>
      <div className="github-footnote">
        <p>
          <strong>{data.total.toLocaleString("id-ID")}</strong> kontribusi ·{" "}
          {period}
          {fallback && (
            <span>
              {" "}
              · Data tersimpan{" "}
              {new Date(data.fetchedAt).toLocaleDateString("id-ID", {
                timeZone: "Asia/Jakarta",
              })}
            </span>
          )}
        </p>
        <div aria-hidden="true">
          Sedikit{" "}
          {[0, 1, 2, 3, 4].map((level) => (
            <i key={level} className={`contribution-level-${level}`} />
          ))}{" "}
          Banyak
        </div>
      </div>
      <p className="github-privacy-note">
        Kalender ini memakai kontribusi GitHub publik dan privat secara anonim.
        Data terakhir diverifikasi pada {data.fetchedAt}; nama repository dan
        kode privat tidak pernah ditampilkan.
      </p>
    </section>
  );
}
