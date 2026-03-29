"use client";

import { useEffect, useState } from "react";

export function MenuBar({ onAppleClick }: { onAppleClick?: () => void }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleDateString("fr-FR", { weekday: "short" }).replace(".", "") +
          " " + now.getDate() + " " +
          now.toLocaleDateString("fr-FR", { month: "short" }).replace(".", "") +
          " " +
          now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
      );
    };
    update();
    const i = setInterval(update, 10_000);
    return () => clearInterval(i);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[25px] flex items-center justify-between px-[14px] z-[201] select-none"
      style={{
        background: "rgba(255,255,255,0.25)",
        backdropFilter: "blur(50px) saturate(2)",
        WebkitBackdropFilter: "blur(50px) saturate(2)",
        borderBottom: "0.5px solid rgba(0,0,0,0.08)",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', var(--font-sans), sans-serif",
        fontSize: "13px",
        fontWeight: 500,
        color: "rgba(0,0,0,0.85)",
      }}
    >
      <div className="flex items-center gap-[18px]">
        <button onClick={onAppleClick} className="hover:opacity-70 transition-opacity">
          <svg width="12" height="15" viewBox="0 0 814 1000" fill="rgba(0,0,0,0.85)">
            <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57.8-155.5-127.4c-58.5-81.6-105.4-207.3-105.4-327.1 0-192.8 125.2-295.2 248.8-295.2 65.6 0 120.3 43.1 161.5 43.1 39.2 0 100.3-45.8 174.6-45.8 28.2 0 129.6 2.6 196.1 99.4zM554.1 159.4c31.1-36.9 53.1-88.1 53.1-139.4 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.2 32.4-55.1 83.6-55.1 135.5 0 7.8.6 15.6 1.3 18.2 2.6.6 6.4 1.3 10.2 1.3 45.4 0 103.8-30.7 139.5-71.3z"/>
          </svg>
        </button>
        <span className="font-semibold" style={{ color: "rgba(0,0,0,0.88)" }}>Portfolio</span>
        <span style={{ color: "rgba(0,0,0,0.55)" }}>Fichier</span>
        <span style={{ color: "rgba(0,0,0,0.55)" }}>Édition</span>
        <span style={{ color: "rgba(0,0,0,0.55)" }} className="hidden sm:inline">Présentation</span>
        <span style={{ color: "rgba(0,0,0,0.55)" }}>Fenêtre</span>
        <span style={{ color: "rgba(0,0,0,0.55)" }}>Aide</span>
      </div>
      <div className="flex items-center gap-[12px]">
        <svg width="14" height="11" viewBox="0 0 16 12" fill="rgba(0,0,0,0.7)">
          <path d="M8 10.5a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5z"/>
          <path d="M4.93 7.82a4.5 4.5 0 016.14 0" stroke="rgba(0,0,0,0.7)" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
          <path d="M2.34 5.23a8 8 0 0111.32 0" stroke="rgba(0,0,0,0.7)" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
          <path d="M.4 2.65A11 11 0 0115.6 2.65" stroke="rgba(0,0,0,0.7)" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
        </svg>
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
          <circle cx="6.5" cy="6.5" r="5" stroke="rgba(0,0,0,0.6)" strokeWidth="1.5"/>
          <path d="M10.5 10.5L14.5 14.5" stroke="rgba(0,0,0,0.6)" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <rect x="1" y="1" width="6" height="6" rx="1.5" stroke="rgba(0,0,0,0.6)" strokeWidth="1.2"/>
          <rect x="9" y="1" width="6" height="6" rx="1.5" stroke="rgba(0,0,0,0.6)" strokeWidth="1.2"/>
          <rect x="1" y="9" width="6" height="6" rx="1.5" stroke="rgba(0,0,0,0.6)" strokeWidth="1.2"/>
          <rect x="9" y="9" width="6" height="6" rx="1.5" stroke="rgba(0,0,0,0.6)" strokeWidth="1.2"/>
        </svg>
        <span style={{ color: "rgba(0,0,0,0.75)", fontWeight: 500, fontSize: "12px" }}>{time}</span>
      </div>
    </div>
  );
}
