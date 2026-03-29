"use client";

import { useEffect, useState } from "react";
import { personalInfo } from "@/data/portfolio";

type Stats = { publicRepos: number; totalStars: number; topLangs: string[] } | null;

const username = personalInfo.github.replace("https://github.com/", "");

export function GitHubStats() {
  const [stats, setStats] = useState<Stats>(null);

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, { signal: controller.signal });
        if (!res.ok) return;
        const repos = await res.json();
        const totalStars = repos.reduce((sum: number, r: any) => sum + (r.stargazers_count || 0), 0);
        const langMap: Record<string, number> = {};
        repos.forEach((r: any) => { if (r.language) langMap[r.language] = (langMap[r.language] || 0) + 1; });
        const topLangs = Object.entries(langMap).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([l]) => l);
        setStats({ publicRepos: repos.length, totalStars, topLangs });
      } catch {}
    })();
    return () => controller.abort();
  }, []);

  if (!stats) return null;

  return (
    <div className="bg-white/[0.03] rounded-xl border border-white/[0.06] p-4 mt-4">
      <div className="flex items-center gap-2 mb-3">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="text-white/30"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
        <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-white/30">GitHub</span>
      </div>
      <div className="grid grid-cols-3 gap-3 mb-3">
        <div className="text-center">
          <p className="text-xl font-black text-white">{stats.publicRepos}</p>
          <p className="text-[10px] text-white/30">Repos</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-black text-white">{stats.totalStars}</p>
          <p className="text-[10px] text-white/30">Stars</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-black text-white">{stats.topLangs.length}</p>
          <p className="text-[10px] text-white/30">Langages</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {stats.topLangs.map((l) => (
          <span key={l} className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#7C3AED]/15 text-[#7C3AED]">{l}</span>
        ))}
      </div>
    </div>
  );
}
