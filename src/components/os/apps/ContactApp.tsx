"use client";

import { personalInfo } from "@/data/portfolio";
import { Send, Phone, Video, Info, Paperclip, Smile } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { useState } from "react";
import { useContainerWidth } from "@/components/os/useContainerWidth";
import Image from "next/image";

export function ContactApp() {
  const [sent, setSent] = useState(false);
  const { ref: containerRef, compact } = useContainerWidth();

  return (
    <div ref={containerRef} className="h-full flex">
      {/* iMessage sidebar — hidden when compact */}
      {!compact && <div className="w-[220px] shrink-0 bg-[#1a1a28] border-r border-white/[0.06] flex flex-col">
        {/* Search */}
        <div className="p-2 border-b border-white/[0.06]">
          <div className="flex items-center gap-2 bg-white/[0.05] rounded-lg px-3 py-[5px]">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><circle cx="6.5" cy="6.5" r="5" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5"/><path d="M10.5 10.5L14.5 14.5" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeLinecap="round"/></svg>
            <span className="text-[12px] text-white/25">Rechercher</span>
          </div>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto">
          {/* Active conversation */}
          <div className="flex items-center gap-3 px-3 py-3 bg-[#3B82F6]/15 border-l-2 border-[#3B82F6]">
            <div className="relative shrink-0">
              <Image src={personalInfo.photo} alt="" width={40} height={40} className="rounded-full w-10 h-10 object-cover" />
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#22C55E] border-2 border-[#1a1a28]" />
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-semibold text-white truncate">Nicolas Segond</p>
              <p className="text-[11px] text-white/35 truncate">Ouvert aux opportunités...</p>
            </div>
            <span className="text-[10px] text-white/20 shrink-0">Maint.</span>
          </div>

          {/* Links as "contacts" */}
          <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-3 px-3 py-3 hover:bg-white/[0.03] transition-colors">
            <div className="w-10 h-10 rounded-full bg-[#7C3AED]/20 flex items-center justify-center shrink-0">
              <span className="text-lg">✉️</span>
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-medium text-white/70">Email direct</p>
              <p className="text-[11px] text-white/25 truncate">{personalInfo.email}</p>
            </div>
          </a>
          <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-3 py-3 hover:bg-white/[0.03] transition-colors">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 text-white/60">
              <GitHubIcon size={18} />
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-medium text-white/70">GitHub</p>
              <p className="text-[11px] text-white/25">TurboNicoo</p>
            </div>
          </a>
          <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-3 py-3 hover:bg-white/[0.03] transition-colors">
            <div className="w-10 h-10 rounded-full bg-[#0284C7]/20 flex items-center justify-center shrink-0 text-[#0284C7]">
              <LinkedInIcon size={18} />
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-medium text-white/70">LinkedIn</p>
              <p className="text-[11px] text-white/25">nicolassegond</p>
            </div>
          </a>
        </div>
      </div>}

      {/* Chat area */}
      <div className="flex-1 flex flex-col bg-[#1e1e2e]">
        {/* Chat header — iMessage style */}
        <div className="flex items-center justify-between px-4 py-2 bg-[#28283c]/50 border-b border-white/[0.06] shrink-0">
          <div className="flex items-center gap-3">
            <Image src={personalInfo.photo} alt="" width={28} height={28} className="rounded-full w-7 h-7 object-cover" />
            <div>
              <p className="text-[13px] font-semibold text-white/80">Nicolas Segond</p>
              <p className="text-[10px] text-[#22C55E]">En ligne</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button className="p-2 rounded-md text-white/20 hover:text-white/50 hover:bg-white/[0.06] transition-all"><Phone size={14} /></button>
            <button className="p-2 rounded-md text-white/20 hover:text-white/50 hover:bg-white/[0.06] transition-all"><Video size={14} /></button>
            <button className="p-2 rounded-md text-white/20 hover:text-white/50 hover:bg-white/[0.06] transition-all"><Info size={14} /></button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto win-scroll p-5 space-y-4">
          {/* Date separator */}
          <div className="text-center">
            <span className="text-[10px] text-white/15 bg-white/[0.03] px-3 py-1 rounded-full">Aujourd&apos;hui</span>
          </div>

          {/* Received messages */}
          <div className="flex gap-2 max-w-[80%]">
            <Image src={personalInfo.photo} alt="" width={28} height={28} className="rounded-full w-7 h-7 object-cover shrink-0 mt-1" />
            <div className="space-y-1">
              <div className="bg-[#2a2a40] rounded-2xl rounded-tl-sm px-4 py-2.5">
                <p className="text-[13px] text-white/75 leading-relaxed">Hey ! 👋 Bienvenue sur mon portfolio.</p>
              </div>
              <div className="bg-[#2a2a40] rounded-2xl rounded-tl-sm px-4 py-2.5">
                <p className="text-[13px] text-white/75 leading-relaxed">
                  Je suis développeur fullstack avec 3 ans d&apos;alternance chez Topo Marketing Group. J&apos;ai travaillé sur des Dynamic Reports, des architectures microservices, du CI/CD...
                </p>
              </div>
              <div className="bg-[#2a2a40] rounded-2xl rounded-tl-sm px-4 py-2.5">
                <p className="text-[13px] text-white/75 leading-relaxed">
                  Un projet, une opportunité, ou juste envie d&apos;échanger tech ? Envoyez-moi un message ! 🚀
                </p>
              </div>
              <p className="text-[10px] text-white/15 px-1">Lu</p>
            </div>
          </div>

          {sent && (
            <div className="flex justify-end">
              <div className="max-w-[70%]">
                <div className="bg-[#3B82F6] rounded-2xl rounded-tr-sm px-4 py-2.5">
                  <p className="text-[13px] text-white leading-relaxed">Bonjour Nicolas ! Je serais intéressé pour échanger. 👋</p>
                </div>
                <p className="text-[10px] text-white/15 text-right px-1 mt-0.5">Distribué</p>
              </div>
            </div>
          )}
        </div>

        {/* Input bar — iMessage style */}
        <div className="px-3 py-2 border-t border-white/[0.06]">
          <div className="flex items-center gap-2 bg-white/[0.04] rounded-2xl border border-white/[0.06] px-3 py-1">
            <button className="p-1.5 text-white/20 hover:text-white/50 transition-colors"><Paperclip size={16} /></button>
            <a
              href={`mailto:${personalInfo.email}`}
              onClick={() => setSent(true)}
              className="flex-1 text-[13px] text-white/30 py-1.5 cursor-pointer hover:text-white/50 transition-colors"
            >
              Envoyer un message...
            </a>
            <button className="p-1.5 text-white/20 hover:text-white/50 transition-colors"><Smile size={16} /></button>
            <a href={`mailto:${personalInfo.email}`} onClick={() => setSent(true)} className="p-1.5 rounded-full bg-[#3B82F6] text-white hover:bg-[#2563EB] transition-colors">
              <Send size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
