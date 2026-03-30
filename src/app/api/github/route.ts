import { NextResponse } from "next/server";

const USERNAME = "NicolasSegond";
const TOKEN = process.env.GITHUB_TOKEN;

const QUERY = `
query($login: String!) {
  user(login: $login) {
    repositories(first: 100, ownerAffiliations: OWNER, orderBy: {field: UPDATED_AT, direction: DESC}) {
      totalCount
      nodes {
        stargazerCount
        primaryLanguage { name }
      }
    }
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            date
            contributionCount
            contributionLevel
          }
        }
      }
    }
  }
}`;

const LEVEL_MAP: Record<string, number> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

export async function GET() {
  if (!TOKEN) {
    return NextResponse.json({ error: "GITHUB_TOKEN not set" }, { status: 500 });
  }

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: QUERY, variables: { login: USERNAME } }),
    });

    if (!res.ok) {
      return NextResponse.json({ error: "GitHub API error" }, { status: res.status });
    }

    const { data } = await res.json();
    const user = data.user;

    // Stats
    const repos = user.repositories.nodes;
    const publicRepos = user.repositories.totalCount;
    const totalStars = repos.reduce((sum: number, r: any) => sum + (r.stargazerCount || 0), 0);

    const langMap: Record<string, number> = {};
    repos.forEach((r: any) => {
      if (r.primaryLanguage?.name) {
        langMap[r.primaryLanguage.name] = (langMap[r.primaryLanguage.name] || 0) + 1;
      }
    });
    const langTotal = Object.values(langMap).reduce((a, b) => a + b, 0);
    const topLangs = Object.entries(langMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([name, count]) => ({ name, count, pct: Math.round((count / langTotal) * 100) }));

    // Contributions
    const calendar = user.contributionsCollection.contributionCalendar;
    const contributions = calendar.weeks.flatMap((w: any) =>
      w.contributionDays.map((d: any) => ({
        date: d.date,
        count: d.contributionCount,
        level: LEVEL_MAP[d.contributionLevel] ?? 0,
      }))
    );

    return NextResponse.json(
      {
        stats: { publicRepos, totalStars, topLangs },
        contributions,
        totalContributions: calendar.totalContributions,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        },
      }
    );
  } catch {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
