"use client";

import { useState } from "react";
import Image from "next/image";
import { personalInfo, skills } from "@/data/portfolio";
import { useContainerWidth } from "@/components/os/useContainerWidth";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { ChevronRight, Clock, Folder, Star, Tag, HardDrive, User, Code, BarChart3 } from "lucide-react";

const catColors: Record<string, string> = {
  Languages: "bg-[#7C3AED]/15 text-[#7C3AED]", Frontend: "bg-[#E11D48]/15 text-[#E11D48]",
  Backend: "bg-[#EA580C]/15 text-[#EA580C]", Data: "bg-[#0284C7]/15 text-[#0284C7]",
  DevOps: "bg-[#059669]/15 text-[#059669]", "Infra & Auth": "bg-[#06B6D4]/15 text-[#06B6D4]",
  Monitoring: "bg-[#EC4899]/15 text-[#EC4899]", Outils: "bg-[#EAB308]/15 text-[#EAB308]",
};

export function ProfileApp() {
  const [tab, setTab] = useState("profil");
  const { ref: containerRef, compact } = useContainerWidth();

  const sidebarItems = [
    { section: "Favoris", items: [
      { id: "profil", label: "À propos", icon: <User size={14} className="text-[#3B82F6]" /> },
      { id: "skills", label: "Compétences", icon: <Code size={14} className="text-[#8B5CF6]" /> },
      { id: "stats", label: "Statistiques", icon: <BarChart3 size={14} className="text-[#22C55E]" /> },
    ]},
    { section: "Tags", items: [
      { id: "link-gh", label: "GitHub", icon: <Tag size={14} className="text-[#F97316]" />, href: personalInfo.github },
      { id: "link-li", label: "LinkedIn", icon: <Tag size={14} className="text-[#0284C7]" />, href: personalInfo.linkedin },
    ]},
  ];

  return (
    <div ref={containerRef} className="h-full flex">
      {/* Finder sidebar — hidden when compact */}
      {!compact && <div className="w-[180px] shrink-0 bg-[#1a1a28]/80 border-r border-white/[0.06] py-2 flex flex-col overflow-y-auto">
        {sidebarItems.map((group) => (
          <div key={group.section} className="mb-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/20 px-4 mb-1">{group.section}</p>
            {group.items.map((item) => {
              const isLink = "href" in item && item.href;
              const isActive = tab === item.id;
              const El = isLink ? "a" : "button";
              const props = isLink ? { href: (item as {href: string}).href, target: "_blank", rel: "noopener noreferrer" } : { onClick: () => setTab(item.id) };
              return (
                <El key={item.id} {...(props as any)} className={`w-full flex items-center gap-2 px-4 py-[5px] text-[12px] transition-all ${isActive ? "bg-[#3B82F6]/20 text-white font-medium" : "text-white/50 hover:bg-white/[0.04]"}`}>
                  {item.icon}
                  <span className="truncate">{item.label}</span>
                </El>
              );
            })}
          </div>
        ))}
        {/* Disk info — Finder style */}
        <div className="mt-auto px-4 py-3 border-t border-white/[0.04]">
          <div className="flex items-center gap-2 text-white/20">
            <HardDrive size={12} />
            <span className="text-[10px]">Macintosh HD</span>
          </div>
        </div>
      </div>}

      {/* Toolbar */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center gap-2 px-4 py-[6px] bg-[#28283c]/50 border-b border-white/[0.06] shrink-0">
          <div className="flex items-center gap-1 text-white/30 text-[12px]">
            <ChevronRight size={12} />
            <span className="text-white/60 font-medium">{tab === "profil" ? "À propos" : tab === "skills" ? "Compétences" : "Statistiques"}</span>
          </div>
          <div className="flex-1" />
          <div className="flex items-center gap-1 bg-white/[0.06] rounded-md px-2 py-1">
            <svg width="11" height="11" viewBox="0 0 16 16" fill="none"><circle cx="6.5" cy="6.5" r="5" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/><path d="M10.5 10.5L14.5 14.5" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round"/></svg>
            <span className="text-[11px] text-white/25">Rechercher</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto win-scroll p-6 bg-[#1e1e2e]">
          {tab === "profil" && (
            <>
              {/* Card profil style Finder preview */}
              <div className="bg-[#232338] rounded-2xl border border-white/[0.06] p-6 mb-6 flex items-center gap-6">
                <div className="relative shrink-0">
                  <div className="absolute -inset-1.5 bg-gradient-to-br from-[#7C3AED] via-[#EC4899] to-[#EA580C] rounded-full blur-md opacity-30" />
                  <Image src={personalInfo.photo} alt={personalInfo.name} width={96} height={96} className="relative rounded-full w-24 h-24 object-cover border-2 border-white/10" />
                </div>
                <div className="min-w-0">
                  <h1 className="text-3xl font-black tracking-tight text-white">{personalInfo.name}</h1>
                  <p className="text-white/40 font-medium text-lg">{personalInfo.title}</p>
                  <div className="flex items-center gap-3 mt-2 flex-wrap">
                    <span className="text-[12px] text-[#22C55E] font-semibold">● Disponible septembre 2026</span>
                    <span className="text-white/15">|</span>
                    <span className="text-[12px] text-white/30">Bac+5 MAALSI @ CESI</span>
                    <span className="text-white/15">|</span>
                    <a href={`mailto:${personalInfo.email}`} className="text-[12px] text-[#60A5FA] hover:text-[#93C5FD] transition-colors">{personalInfo.email}</a>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="px-3 py-1 rounded-md bg-white/[0.06] border border-white/[0.06] text-white/60 text-[11px] font-medium hover:bg-white/10 hover:text-white transition-all flex items-center gap-1.5">
                      <GitHubIcon size={12} /> GitHub
                    </a>
                    <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="px-3 py-1 rounded-md bg-white/[0.06] border border-white/[0.06] text-white/60 text-[11px] font-medium hover:bg-white/10 hover:text-white transition-all flex items-center gap-1.5">
                      <LinkedInIcon size={12} /> LinkedIn
                    </a>
                    <a href="/CV.pdf" className="px-3 py-1 rounded-md bg-[#3B82F6]/20 border border-[#3B82F6]/20 text-[#60A5FA] text-[11px] font-medium hover:bg-[#3B82F6]/30 transition-all">
                      Télécharger CV
                    </a>
                  </div>
                </div>
              </div>

              {/* Info grid — Finder-style metadata */}
              <div className="bg-white/[0.03] rounded-xl border border-white/[0.06] divide-y divide-white/[0.04]">
                {[
                  { label: "Bio", value: personalInfo.bio },
                  { label: "Formation", value: "Mastère MAALSI (Bac+5) — CESI" },
                  { label: "Alternance", value: "Topo Marketing Group — Villeneuve-d'Ascq — 3 ans" },
                  { label: "Spécialités", value: "Dynamic Reports · Microservices · CI/CD · DevOps" },
                ].map((row) => (
                  <div key={row.label} className="flex gap-4 px-4 py-3">
                    <span className="text-[12px] text-white/40 font-medium w-24 shrink-0 text-right">{row.label}</span>
                    <span className="text-[13px] text-white/60 leading-relaxed">{row.value}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {tab === "skills" && (
            <div className="space-y-6">
              {Object.entries(skills).map(([cat, items]) => (
                <div key={cat} className="bg-white/[0.03] rounded-xl border border-white/[0.06] overflow-hidden">
                  <div className="px-4 py-2.5 bg-white/[0.02] border-b border-white/[0.04]">
                    <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-white/30">{cat}</p>
                  </div>
                  <div className="p-3 flex flex-wrap gap-2">
                    {items.map((s) => (
                      <span key={s} className={`text-[12px] font-semibold px-3 py-1.5 rounded-lg ${catColors[cat] ?? "bg-white/5 text-white/50"} hover:scale-105 transition-transform cursor-default`}>{s}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "stats" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { val: "6", label: "Projets", icon: <Folder size={18} />, color: "text-[#7C3AED] bg-[#7C3AED]/10" },
                  { val: "30+", label: "Technologies", icon: <Code size={18} />, color: "text-[#E11D48] bg-[#E11D48]/10" },
                  { val: "3 ans", label: "Expérience", icon: <Clock size={18} />, color: "text-[#EA580C] bg-[#EA580C]/10" },
                  { val: "4", label: "Certifications", icon: <Star size={18} />, color: "text-[#059669] bg-[#059669]/10" },
                ].map((s) => (
                  <div key={s.label} className="bg-white/[0.03] rounded-xl border border-white/[0.06] p-5 text-center">
                    <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center mx-auto mb-3`}>{s.icon}</div>
                    <p className="text-3xl font-black text-white">{s.val}</p>
                    <p className="text-[11px] text-white/30 font-medium mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
