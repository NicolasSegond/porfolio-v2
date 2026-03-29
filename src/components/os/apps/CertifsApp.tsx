"use client";

import Image from "next/image";
import { certifications } from "@/data/portfolio";
import { Search, SlidersHorizontal, Grid3x3, LayoutList, Heart } from "lucide-react";
import { useState } from "react";
import { useContainerWidth } from "@/components/os/useContainerWidth";

export function CertifsApp() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const { ref: containerRef, compact } = useContainerWidth();

  return (
    <div ref={containerRef} className="h-full flex bg-[#1e1e2e]">
      {/* Photos sidebar */}
      {!compact && <div className="w-[170px] shrink-0 bg-[#1a1a28] border-r border-white/[0.06] flex flex-col py-2">
        <p className="text-[10px] font-bold uppercase tracking-widest text-white/20 px-4 mb-1">Photothèque</p>
        <button className="w-full flex items-center gap-2.5 px-4 py-[5px] text-[12px] font-medium bg-[#3B82F6]/15 text-white">
          <span className="text-[13px]">🏷️</span> Toutes
        </button>
        <button className="w-full flex items-center gap-2.5 px-4 py-[5px] text-[12px] font-medium text-white/40 hover:bg-white/[0.04] transition-all">
          <span className="text-[13px]">🎓</span> LinkedIn
        </button>
        <button className="w-full flex items-center gap-2.5 px-4 py-[5px] text-[12px] font-medium text-white/40 hover:bg-white/[0.04] transition-all">
          <span className="text-[13px]">🔐</span> Pix
        </button>

        <p className="text-[10px] font-bold uppercase tracking-widest text-white/20 px-4 mb-1 mt-6">Albums</p>
        <button className="w-full flex items-center gap-2.5 px-4 py-[5px] text-[12px] font-medium text-white/40 hover:bg-white/[0.04] transition-all">
          <Heart size={13} className="text-[#EF4444]" /> Favoris
        </button>
      </div>}

      {/* Content */}
      <div className="flex-1 flex flex-col">
        {/* Photos toolbar */}
        <div className="flex items-center justify-between px-4 py-[6px] bg-[#28283c]/50 border-b border-white/[0.06] shrink-0">
          <div className="flex items-center gap-2">
            <button onClick={() => setView("grid")} className={`p-1.5 rounded-md transition-all ${view === "grid" ? "bg-white/10 text-white/70" : "text-white/25 hover:text-white/50"}`}>
              <Grid3x3 size={14} />
            </button>
            <button onClick={() => setView("list")} className={`p-1.5 rounded-md transition-all ${view === "list" ? "bg-white/10 text-white/70" : "text-white/25 hover:text-white/50"}`}>
              <LayoutList size={14} />
            </button>
          </div>
          <h2 className="text-[12px] font-semibold text-white/50">
            {certifications.length} certifications
          </h2>
          <div className="flex items-center gap-2">
            <button className="p-1.5 rounded-md text-white/25 hover:text-white/50 hover:bg-white/[0.06] transition-all"><SlidersHorizontal size={14} /></button>
            <div className="flex items-center gap-1.5 bg-white/[0.05] rounded-lg px-2.5 py-[4px]">
              <Search size={11} className="text-white/25" />
              <span className="text-[11px] text-white/20">Rechercher</span>
            </div>
          </div>
        </div>

        {/* Photos grid / list */}
        <div className="flex-1 overflow-y-auto win-scroll p-4">
          {view === "grid" ? (
            <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))" }}>
              {certifications.map((c) => (
                <div key={c.name} className="group cursor-pointer">
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-white/[0.06] group-hover:border-[#3B82F6]/40 transition-all">
                    <Image src={c.image} alt={c.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="200px" />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/10 backdrop-blur-md rounded-lg px-3 py-1.5 text-[11px] text-white font-medium">
                        Voir
                      </div>
                    </div>
                  </div>
                  <p className="text-[12px] font-semibold text-white/70 mt-2 truncate">{c.name}</p>
                  <p className="text-[10px] text-white/25">{c.source}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-1">
              {certifications.map((c) => (
                <div key={c.name} className="flex items-center gap-4 p-2 rounded-lg hover:bg-white/[0.04] transition-colors">
                  <div className="relative w-16 h-12 rounded-md overflow-hidden shrink-0 border border-white/[0.06]">
                    <Image src={c.image} alt={c.name} fill className="object-cover" sizes="80px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-white/80 truncate">{c.name}</p>
                    <p className="text-[11px] text-white/30">{c.source}</p>
                  </div>
                  <span className="text-[10px] text-white/15 shrink-0">Certification</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
