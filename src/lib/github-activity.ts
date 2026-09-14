import canonicalSnapshot from "@/data/github-contributions.json";

export type ContributionDay = { date: string; count: number; level: number };
export type GitHubActivity = {
  username: string;
  fetchedAt: string;
  total: number;
  days: ContributionDay[];
};
export const githubUsername = "zakianmaulana01";

export function getCanonicalActivity(): GitHubActivity {
  const start = new Date(`${canonicalSnapshot.startDate}T00:00:00Z`).getTime();
  const days = canonicalSnapshot.counts.map((count, index) => ({
    date: new Date(start + index * 86400000).toISOString().slice(0, 10),
    count,
    level: canonicalSnapshot.levels[index],
  }));
  return {
    username: canonicalSnapshot.username,
    fetchedAt: canonicalSnapshot.verifiedAt,
    total: canonicalSnapshot.total,
    days,
  };
}

export function parseContributions(html: string): GitHubActivity {
  const tooltips = new Map<string, number>();
  for (const match of html.matchAll(
    /<tool-tip\b([^>]*)>([\s\S]*?)<\/tool-tip>/g,
  )) {
    const id = match[1].match(/\bfor="([^"]+)"/)?.[1];
    const count = match[2]
      .replace(/<[^>]*>/g, "")
      .trim()
      .match(/^(No|[\d,]+) contributions? on /)?.[1];
    if (id && count)
      tooltips.set(id, count === "No" ? 0 : Number(count.replaceAll(",", "")));
  }
  const days: ContributionDay[] = [];
  for (const match of html.matchAll(/<td\b[^>]*\bdata-date="[^>]*>/g)) {
    const attr = Object.fromEntries(
      [...match[0].matchAll(/([\w-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]),
    );
    const count = tooltips.get(attr.id);
    const level = Number(attr["data-level"]);
    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(attr["data-date"]) ||
      count === undefined ||
      !Number.isInteger(level) ||
      level < 0 ||
      level > 4
    )
      throw new Error("Invalid contribution cell");
    days.push({ date: attr["data-date"], count, level });
  }
  days.sort((a, b) => a.date.localeCompare(b.date));
  if (
    days.length < 350 ||
    days.length > 378 ||
    new Set(days.map((d) => d.date)).size !== days.length
  )
    throw new Error("Incomplete contribution calendar");
  const total = days.reduce((sum, day) => sum + day.count, 0);
  const sourceTotal = html.match(
    /([\d,]+)\s+contributions\s+in the last year/,
  )?.[1];
  if (sourceTotal && Number(sourceTotal.replaceAll(",", "")) !== total)
    throw new Error("Contribution total mismatch");
  return {
    username: githubUsername,
    fetchedAt: new Date().toISOString(),
    total,
    days,
  };
}

export async function getGitHubActivity(): Promise<{
  data: GitHubActivity;
  fallback: boolean;
}> {
  return { data: getCanonicalActivity(), fallback: true };
}
