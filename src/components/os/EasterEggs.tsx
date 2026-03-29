"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Konami Code → Matrix rain ──
function useKonami(callback: () => void) {
  useEffect(() => {
    const code = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
    let index = 0;
    const handler = (e: KeyboardEvent) => {
      if (e.key === code[index]) {
        index++;
        if (index === code.length) { callback(); index = 0; }
      } else { index = 0; }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [callback]);
}

function MatrixRain() {
  const [cols, setCols] = useState<{ x: number; chars: string[]; speed: number }[]>([]);

  useEffect(() => {
    const w = window.innerWidth;
    const columns = [];
    for (let x = 0; x < w; x += 18) {
      const chars = [];
      const len = 10 + Math.floor(Math.random() * 20);
      for (let j = 0; j < len; j++) {
        chars.push(String.fromCharCode(0x30A0 + Math.random() * 96));
      }
      columns.push({ x, chars, speed: 0.5 + Math.random() * 1.5 });
    }
    setCols(columns);
  }, []);

  return (
    <div className="fixed inset-0 z-[300] pointer-events-none overflow-hidden bg-black/80">
      {cols.map((col, i) => (
        <motion.div
          key={i}
          initial={{ y: -600 }}
          animate={{ y: window.innerHeight + 200 }}
          transition={{ duration: 3 / col.speed, delay: Math.random() * 2, ease: "linear" }}
          className="absolute text-[14px] font-mono leading-[18px]"
          style={{ left: col.x }}
        >
          {col.chars.map((c, j) => (
            <div key={j} style={{ color: j === 0 ? "#fff" : `rgba(0,255,70,${1 - j / col.chars.length})` }}>{c}</div>
          ))}
        </motion.div>
      ))}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1 }}>
          <p className="text-[#00ff46] text-4xl font-mono font-bold text-center drop-shadow-lg">
            Wake up, recruteur...
          </p>
          <p className="text-[#00ff46]/50 text-lg font-mono text-center mt-2">
            The Matrix has you.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

// ── "À propos de ce Mac" modal ──
function AboutThisMac({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[250] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-[#28283c] rounded-2xl w-[340px] overflow-hidden shadow-2xl border border-white/10"
      >
        <div className="text-center p-8 pb-4">
          {/* macOS Apple logo */}
          <div className="text-5xl mb-3">🍎</div>
          <h2 className="text-xl font-bold text-white">portfolioOS</h2>
          <p className="text-[13px] text-white/40 mt-1">Version 1.0.0</p>
        </div>

        <div className="px-6 pb-6 space-y-2 text-[12px]">
          <div className="flex justify-between">
            <span className="text-white/30">Processeur</span>
            <span className="text-white/60">Nicolas Segond (Fullstack)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/30">Mémoire</span>
            <span className="text-white/60">30+ technologies</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/30">Stockage</span>
            <span className="text-white/60">3 ans d&apos;expérience</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/30">Graphique</span>
            <span className="text-white/60">Next.js 16 + Tailwind v4</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/30">N° de série</span>
            <span className="text-white/60 font-mono">NS-2026-MAALSI</span>
          </div>
        </div>

        <div className="px-6 pb-6 flex justify-center gap-2">
          <a href="/CV.pdf" className="px-4 py-1.5 rounded-md bg-[#3B82F6] text-white text-[12px] font-medium hover:bg-[#2563EB] transition-colors">
            Télécharger CV
          </a>
          <button onClick={onClose} className="px-4 py-1.5 rounded-md bg-white/10 text-white/60 text-[12px] font-medium hover:bg-white/15 transition-colors">
            OK
          </button>
        </div>

        <div className="px-6 pb-4 text-center">
          <p className="text-[10px] text-white/15">™ et © {new Date().getFullYear()} Nicolas Segond. Tous droits réservés.</p>
          <p className="text-[10px] text-white/10 mt-0.5">↑↑↓↓←→←→BA pour un secret...</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function EasterEggs({ onAppleClick }: { onAppleClick: boolean }) {
  const [matrix, setMatrix] = useState(false);
  const [aboutMac, setAboutMac] = useState(false);

  useKonami(useCallback(() => setMatrix(true), []));

  // Auto-dismiss matrix after 5s
  useEffect(() => {
    if (matrix) {
      const t = setTimeout(() => setMatrix(false), 5000);
      return () => clearTimeout(t);
    }
  }, [matrix]);

  // Apple click trigger
  useEffect(() => {
    if (onAppleClick) setAboutMac(true);
  }, [onAppleClick]);

  return (
    <>
      <AnimatePresence>{matrix && <MatrixRain />}</AnimatePresence>
      <AnimatePresence>{aboutMac && <AboutThisMac onClose={() => setAboutMac(false)} />}</AnimatePresence>
    </>
  );
}
