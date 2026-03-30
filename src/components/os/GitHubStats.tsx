"use client";

import React, { useEffect, useState } from "react";
import { personalInfo } from "@/data/portfolio";
import { ActivityCalendar, type Activity } from "react-activity-calendar";

type Stats = { publicRepos: number; totalStars: number; topLangs: { name: string; count: number; pct: number }[] };
type GHData = { stats: Stats; contributions: Activity[]; totalContributions: number };

const username = personalInfo.github.replace("https://github.com/", "");

const langColors: Record<string, string> = {
  TypeScript: "#3178C6", JavaScript: "#F7DF1E", PHP: "#777BB4", Python: "#3572A5",
  Dart: "#00B4AB", Vue: "#41B883", HTML: "#E34F26", CSS: "#563D7C", "C++": "#F34B7D",
  "C#": "#178600", Java: "#B07219", Go: "#00ADD8", Rust: "#DEA584", Ruby: "#CC342D",
  Swift: "#F05138", Kotlin: "#A97BFF", Shell: "#89E051", CMake: "#DA3434",
};

export function GitHubStats() {
  const [data, setData] = useState<GHData | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/github", { signal: controller.signal })
      .then((r) => r.ok ? r.json() : null)
      .then((d) => { if (d) setData(d); })
      .catch(() => {});
    return () => controller.abort();
  }, []);

  const stats = data?.stats;
  const activities = data?.contributions;

  return (
    <div className="bg-white/[0.03] rounded-xl border border-white/[0.06] p-5 mt-4">
      <div className="flex items-center gap-2 mb-4">
        <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" className="text-white/40"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
        <span className="text-[12px] font-bold text-white/50">GitHub</span>
        <span className="text-[10px] text-white/20 ml-auto">@{username}</span>
      </div>

      {stats && (
        <>
          <div className="grid grid-cols-2 gap-3 mb-5">
            <div className="bg-white/[0.04] rounded-xl p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#7C3AED]/15 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round"><path d="M6 3v10M10 3v10M2 6h12M2 10h12"/></svg>
              </div>
              <div>
                <p className="text-2xl font-black text-white leading-none">{stats.publicRepos}</p>
                <p className="text-[10px] text-white/30 mt-0.5">Repositories</p>
              </div>
            </div>
            <div className="bg-white/[0.04] rounded-xl p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#EAB308]/15 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="#EAB308"><path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"/></svg>
              </div>
              <div>
                <p className="text-2xl font-black text-white leading-none">{stats.totalStars}</p>
                <p className="text-[10px] text-white/30 mt-0.5">Stars</p>
              </div>
            </div>
          </div>

          <div className="mb-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-white/25 mb-3">Langages utilisés</p>
            <div className="h-2 rounded-full overflow-hidden flex mb-2.5">
              {stats.topLangs.map((l) => (
                <div key={l.name} className="h-full transition-all" style={{ width: `${l.pct}%`, background: langColors[l.name] || "#6b6b80" }} />
              ))}
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {stats.topLangs.map((l) => (
                <div key={l.name} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ background: langColors[l.name] || "#6b6b80" }} />
                  <span className="text-[11px] text-white/50">{l.name}</span>
                  <span className="text-[10px] text-white/20">{l.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {activities ? (
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-white/25">Contributions</p>
            <p className="text-[10px] text-white/30">{data?.totalContributions} contributions cette année</p>
          </div>
          <ActivityCalendar
            data={activities}
            theme={{ dark: ["#1a1a2e", "#4a2d7a", "#7C3AED", "#a855f7", "#d8b4fe"] }}
            colorScheme="dark"
            blockSize={11}
            blockRadius={2}
            blockMargin={3}
            fontSize={11}
            hideColorLegend
            renderBlock={(block, activity) => (
              <g>
                {React.cloneElement(block, {
                  style: { ...block.props.style, cursor: "pointer" },
                })}
                <title>{`${activity.count} contribution${activity.count !== 1 ? "s" : ""} le ${activity.date}`}</title>
              </g>
            )}
            labels={{
              months: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Aoû", "Sep", "Oct", "Nov", "Déc"],
              weekdays: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
              totalCount: "{{count}} contributions cette année",
            }}
          />
          <div className="flex items-center justify-end gap-1.5 mt-3">
            <span className="text-[10px] text-white/40">Moins</span>
            {["#1a1a2e", "#4a2d7a", "#7C3AED", "#a855f7", "#d8b4fe"].map((c) => (
              <div key={c} className="w-[10px] h-[10px] rounded-[2px]" style={{ background: c }} />
            ))}
            <span className="text-[10px] text-white/40">Plus</span>
          </div>
        </div>
      ) : (
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-white/25 mb-3">Contributions</p>
          <div className="h-24 flex items-center justify-center text-white/20 text-xs">Chargement...</div>
        </div>
      )}
    </div>
  );
}
