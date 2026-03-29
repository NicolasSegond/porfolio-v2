"use client";

import { useState, useMemo, useRef, useCallback } from "react";
import { Lock, Plus, CheckCircle2, ChevronLeft, ChevronRight, RotateCw, Globe, ExternalLink, Code2, ArrowRight } from "lucide-react";
import Image from "next/image";
import { projects, projectCategories } from "@/data/portfolio";
import { motion, AnimatePresence } from "framer-motion";

const tagColors = ["bg-[#7C3AED]/15 text-[#7C3AED]", "bg-[#E11D48]/15 text-[#E11D48]", "bg-[#0284C7]/15 text-[#0284C7]", "bg-[#EA580C]/15 text-[#EA580C]", "bg-[#059669]/15 text-[#059669]"];

type Project = (typeof projects)[0];

const ITEMS_PER_PAGE = 6;

export function ProjectsApp() {
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<Project | null>(null);
  const [page, setPage] = useState(0);
  const [slideDir, setSlideDir] = useState(1);

  const filtered = filter === "all" ? projects : projects.filter((p) => p.category === filter);
  const rest = filtered.slice(1); // first one is featured
  const totalPages = Math.ceil(rest.length / ITEMS_PER_PAGE);
  const pageItems = rest.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);

  const goPage = (p: number) => {
    setSlideDir(p > page ? 1 : -1);
    setPage(p);
  };
  const prev = () => { if (page > 0) goPage(page - 1); };
  const next = () => { if (page < totalPages - 1) goPage(page + 1); };

  // Reset page when filter changes
  const handleFilter = (v: string) => { setFilter(v); setPage(0); };

  return (
    <div className="h-full flex flex-col bg-[#12121f]">
      {/* Tab bar */}
      <div className="flex items-center gap-1 px-2 py-[4px] bg-[#28283c] border-b border-white/[0.04] shrink-0">
        <div className="flex-1 flex items-center bg-[#1e1e30] rounded-lg px-3 py-[4px] text-[11px] text-white/50 border border-white/[0.06] gap-2">
          <div className="w-3 h-3 rounded-full bg-[#7C3AED]/30 shrink-0" />
          <span className="truncate">Portfolio — Projets</span>
          <button className="ml-auto text-white/20 hover:text-white/50 text-[10px]">✕</button>
        </div>
        <button className="p-1 text-white/20 hover:text-white/40"><Plus size={13} /></button>
      </div>
      {/* URL bar */}
      <div className="flex items-center gap-2 px-3 py-[5px] bg-[#232336] border-b border-white/[0.06] shrink-0 relative z-10">
        <button onClick={() => selected && setSelected(null)} className={`p-1 rounded-md ${selected ? "text-white/50 hover:bg-white/[0.06]" : "text-white/15"} transition-all`}>
          <ChevronLeft size={16} strokeWidth={2.5} />
        </button>
        <button className="p-1 rounded-md text-white/15"><ChevronRight size={16} strokeWidth={2.5} /></button>
        <div className="flex-1 max-w-2xl mx-auto flex items-center justify-center gap-2 bg-[#181828] rounded-lg px-4 py-[6px] border border-white/[0.06]">
          <Lock size={11} className="text-[#4ADE80]/60" />
          <span className="text-[12px] text-white/40 truncate font-medium">nicolassegond.fr{selected ? `/projets/${selected.slug}` : "/projets"}</span>
        </div>
        <button className="p-1 rounded-md text-white/25 hover:bg-white/[0.06]"><RotateCw size={14} /></button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto win-scroll">
        <AnimatePresence mode="wait">
          {selected ? (
            /* ── DETAIL ── */
            <motion.div key="detail" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.25 }} className="bg-[#12121f]">
              <div className="relative aspect-[21/9] max-h-[280px] w-full">
                <Image src={selected.image} alt={selected.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12121f] via-[#12121f]/50 to-transparent" />
              </div>
              <div className="max-w-3xl mx-auto px-8 pb-12 -mt-20 relative">
                <div className="flex flex-wrap gap-2 mb-3">
                  {selected.tech.map((t, i) => (<span key={t} className={`text-[11px] font-bold px-3 py-1 rounded-full ${tagColors[i % tagColors.length]}`}>{t}</span>))}
                </div>
                <p className="text-[11px] font-bold text-[#7C3AED] uppercase tracking-widest mb-1">{selected.subtitle}</p>
                <h1 className="text-3xl font-black tracking-tight text-white mb-2">{selected.title}</h1>
                <p className="text-white/40 text-[15px] leading-relaxed mb-4">{selected.description}</p>
                <div className="flex gap-2 mb-8">
                  {selected.repo && (<a href={selected.repo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/[0.06] border border-white/[0.08] text-[12px] font-semibold text-white/60 hover:text-white hover:bg-white/[0.1] transition-all"><Code2 size={14} /> Code source</a>)}
                  {selected.demo && (<a href={selected.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#7C3AED]/15 border border-[#7C3AED]/20 text-[12px] font-semibold text-[#7C3AED] hover:bg-[#7C3AED]/25 transition-all"><Globe size={14} /> Voir le site</a>)}
                  {!selected.repo && !selected.demo && (<span className="text-[11px] text-white/20 italic">Liens à venir</span>)}
                </div>
                <div className="grid md:grid-cols-2 gap-3 mb-4">
                  <div className="bg-white/[0.04] rounded-2xl border border-white/[0.06] p-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/25 mb-3">📋 Contexte</p>
                    <p className="text-white/50 text-[13px] leading-relaxed">{selected.details.context}</p>
                  </div>
                  <div className="bg-[#7C3AED]/8 rounded-2xl border border-[#7C3AED]/15 p-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#7C3AED]/70 mb-3">👨‍💻 Mon rôle</p>
                    <p className="text-white/70 text-[13px] font-medium leading-relaxed">{selected.details.role}</p>
                  </div>
                </div>
                <div className="bg-white/[0.03] rounded-2xl border border-white/[0.06] p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/25 mb-4">✅ Fonctionnalités</p>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {selected.details.features.map((f, i) => (
                      <div key={i} className="flex items-start gap-2 p-3 rounded-xl bg-white/[0.03] border border-white/[0.04]">
                        <CheckCircle2 size={14} className="text-[#22C55E] mt-0.5 shrink-0" />
                        <span className="text-white/45 text-[12px] leading-relaxed">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            /* ── HOMEPAGE ── */
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* Hero — featured project */}
              {filtered.length > 0 && (
                <button onClick={() => setSelected(filtered[0])} className="group w-full text-left relative block">
                  <div className="relative aspect-[21/9] max-h-[240px] w-full overflow-hidden">
                    <Image src={filtered[0].image} alt={filtered[0].title} fill className="object-cover group-hover:scale-[1.03] transition-transform duration-1000" sizes="100%" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#12121f]/95 via-[#12121f]/70 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#12121f] via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 p-8 max-w-md">
                      <p className="text-[10px] font-bold text-[#7C3AED] uppercase tracking-[0.2em] mb-2">Projet à la une</p>
                      <h2 className="text-2xl font-black text-white tracking-tight leading-tight mb-2">{filtered[0].title}</h2>
                      <p className="text-white/30 text-[13px] leading-relaxed line-clamp-2 mb-3">{filtered[0].description}</p>
                      <div className="flex gap-1.5">
                        {filtered[0].tech.slice(0, 4).map((t, i) => (<span key={t} className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${tagColors[i % tagColors.length]}`}>{t}</span>))}
                      </div>
                    </div>
                    <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all">
                      <div className="flex items-center gap-2 bg-[#7C3AED] text-white text-[12px] font-semibold px-4 py-2 rounded-full shadow-lg shadow-[#7C3AED]/30">
                        Voir le projet <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                </button>
              )}

              {/* Section header + filters */}
              <div className="flex items-center justify-between px-6 pt-5 pb-4">
                <div className="flex gap-1.5">
                  {projectCategories.map((c) => (
                    <button key={c.value} onClick={() => handleFilter(c.value)}
                      className={`px-3.5 py-1.5 rounded-full text-[11px] font-semibold transition-all ${filter === c.value ? "bg-[#7C3AED] text-white" : "bg-white/[0.04] text-white/30 hover:text-white/60 hover:bg-white/[0.07]"}`}
                    >{c.label}</button>
                  ))}
                </div>
                {totalPages > 1 && (
                  <span className="text-[11px] text-white/20">{page + 1} / {totalPages}</span>
                )}
              </div>

              {/* Paginated carousel */}
              <div className="relative px-6 pb-6">
                {/* Cards grid — 2x2 */}
                <div className="relative overflow-hidden min-h-[300px]">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={page}
                      initial={{ opacity: 0, x: slideDir * 80 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: slideDir * -80 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3"
                    >
                      {pageItems.map((p, i) => (
                        <button
                          key={p.slug}
                          onClick={() => setSelected(p)}
                          className="group text-left rounded-2xl overflow-hidden border border-white/[0.06] hover:border-[#7C3AED]/30 transition-all duration-300 bg-[#181828]"
                        >
                          <div className="relative aspect-video overflow-hidden">
                            <Image src={p.image} alt={p.title} fill className="object-cover group-hover:scale-[1.05] transition-transform duration-700" sizes="400px" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#181828] via-transparent to-transparent opacity-80" />
                            {/* Badge */}
                            <div className="absolute top-2 left-2">
                              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-md text-white/70 uppercase tracking-wider">{p.subtitle}</span>
                            </div>
                            {/* Hover CTA */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                              <div className="bg-[#7C3AED] rounded-full p-2.5 scale-75 group-hover:scale-100 transition-transform shadow-lg shadow-[#7C3AED]/30">
                                <ExternalLink size={14} className="text-white" />
                              </div>
                            </div>
                          </div>
                          <div className="p-4">
                            <h3 className="text-[14px] font-bold text-white/90 group-hover:text-[#7C3AED] transition-colors mb-1 truncate">{p.title}</h3>
                            <p className="text-[11px] text-white/25 line-clamp-2 leading-relaxed mb-3">{p.description}</p>
                            <div className="flex flex-wrap gap-1">
                              {p.tech.slice(0, 3).map((t, ti) => (
                                <span key={t} className={`text-[9px] font-semibold px-2 py-0.5 rounded-md ${tagColors[ti % tagColors.length]}`}>{t}</span>
                              ))}
                              {p.tech.length > 3 && <span className="text-[9px] font-semibold px-2 py-0.5 rounded-md bg-white/[0.04] text-white/20">+{p.tech.length - 3}</span>}
                            </div>
                          </div>
                        </button>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Navigation — arrows + dots */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-3 mt-5">
                    <button
                      onClick={prev}
                      disabled={page === 0}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${page === 0 ? "text-white/10" : "text-white/50 hover:text-white bg-white/[0.04] hover:bg-white/[0.08]"}`}
                    >
                      <ChevronLeft size={16} />
                    </button>

                    <div className="flex items-center gap-1.5">
                      {Array.from({ length: totalPages }).map((_, i) => (
                        <button
                          key={i}
                          onClick={() => goPage(i)}
                          className={`rounded-full transition-all duration-300 ${
                            i === page
                              ? "w-6 h-2 bg-[#7C3AED]"
                              : "w-2 h-2 bg-white/15 hover:bg-white/30"
                          }`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={next}
                      disabled={page === totalPages - 1}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${page === totalPages - 1 ? "text-white/10" : "text-white/50 hover:text-white bg-white/[0.04] hover:bg-white/[0.08]"}`}
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
