"use client";

import { timeline } from "@/data/portfolio";
import { MapPin, Search } from "lucide-react";
import { useContainerWidth } from "@/components/os/useContainerWidth";

function hash(i: number) {
  return ["a3f8d2e", "7c1b4a9", "e92d1f3", "4b6e8c1", "d5a9f72", "1f3c7b8", "8e2d6a4"][i % 7];
}

export function ParcoursApp() {
  const { ref: containerRef, compact } = useContainerWidth();

  return (
    <div ref={containerRef} className="h-full flex bg-[#1e1e2e]">
      {/* Notes sidebar */}
      {!compact && <div className="w-52 shrink-0 bg-[#1a1a28] border-r border-white/[0.06] flex flex-col">
        {/* Search */}
        <div className="p-2 border-b border-white/[0.06]">
          <div className="flex items-center gap-2 bg-white/[0.06] rounded-md px-2 py-1.5">
            <Search size={12} className="text-white/30" />
            <span className="text-[11px] text-white/30">Rechercher</span>
          </div>
        </div>
        {/* Notes list */}
        <div className="flex-1 overflow-y-auto p-1.5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/20 px-2 py-2">Toutes les notes</p>
          {[...timeline].reverse().map((item, i) => (
            <div key={i} className={`px-2 py-2 rounded-md mb-0.5 ${i === 0 ? "bg-[#7C3AED]/20" : "hover:bg-white/5"} transition-colors cursor-default`}>
              <p className="text-[11px] font-semibold text-white/80 truncate">{item.title}</p>
              <p className="text-[10px] text-white/30 truncate">{item.year}</p>
            </div>
          ))}
        </div>
      </div>}

      {/* Terminal git log */}
      <div className="flex-1 bg-[#0c0c14] font-mono text-sm overflow-y-auto win-scroll">
        <div className="sticky top-0 bg-[#0c0c14]/95 backdrop-blur-sm border-b border-white/[0.04] px-4 py-2 text-white/30 text-xs z-10">
          <span className="text-[#22C55E]">$</span> git log --oneline --graph --all
        </div>
        <div className="p-4 space-y-0">
          {[...timeline].reverse().map((item, i) => (
            <div key={i} className="flex gap-3 py-3 border-b border-white/[0.04] last:border-0 group">
              <div className="flex items-start gap-2 shrink-0 pt-0.5">
                <span className="text-[#22C55E]">*</span>
                <span className="text-[#EAB308]">{hash(i)}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-white/90 font-bold group-hover:text-[#22C55E] transition-colors">{item.title}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${item.type === "formation" ? "bg-[#3B82F6]/20 text-[#3B82F6]" : "bg-[#F97316]/20 text-[#F97316]"}`}>
                    {item.type}
                  </span>
                </div>
                <p className="text-white/40 mt-1 leading-relaxed">{item.description}</p>
                <div className="flex items-center gap-3 mt-1 text-[11px] text-white/25">
                  <span>{item.year}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1"><MapPin size={10} />{item.location}</span>
                </div>
              </div>
            </div>
          ))}
          <div className="pt-3 text-white/15">* <span className="text-[#EAB308]/30">0000000</span> Initial commit — la passion du code commence</div>
        </div>
      </div>
    </div>
  );
}
