"use client";

import { motion } from "framer-motion";

export type AppId = "profil" | "projets" | "parcours" | "terminal" | "certifs" | "contact";

/* macOS squircle path (Apple's superellipse, not a simple rounded rect) */
const squircle = "M22.8 0h74.4C109.5 0 120 10.5 120 22.8v74.4c0 12.3-10.5 22.8-22.8 22.8H22.8C10.5 120 0 109.5 0 97.2V22.8C0 10.5 10.5 0 22.8 0z";

/* Finder — the iconic two-tone blue face */
function FinderIcon() {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full">
      <defs>
        <linearGradient id="finder-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6dc5f7" />
          <stop offset="100%" stopColor="#2196f3" />
        </linearGradient>
      </defs>
      <path d={squircle} fill="url(#finder-bg)" />
      {/* Face */}
      <path d="M36 22h48c4 0 7 3 7 7v62c0 4-3 7-7 7H36c-4 0-7-3-7-7V29c0-4 3-7 7-7z" fill="white" />
      {/* Divider */}
      <line x1="60" y1="22" x2="60" y2="42" stroke="#2196f3" strokeWidth="2.5" />
      {/* Eyes */}
      <ellipse cx="47" cy="54" rx="4" ry="5" fill="#2196f3" />
      <ellipse cx="73" cy="54" rx="4" ry="5" fill="#2196f3" />
      {/* Mouth */}
      <path d="M44 72c0 0 8 10 16 10s16-10 16-10" stroke="#2196f3" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Nose line */}
      <line x1="60" y1="48" x2="60" y2="66" stroke="#2196f3" strokeWidth="2" />
    </svg>
  );
}

/* Safari — compass on white/blue */
function SafariIcon() {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full">
      <defs>
        <linearGradient id="safari-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#56ccf2" />
          <stop offset="100%" stopColor="#2f80ed" />
        </linearGradient>
      </defs>
      <path d={squircle} fill="url(#safari-bg)" />
      <circle cx="60" cy="60" r="36" fill="white" />
      <circle cx="60" cy="60" r="34" fill="none" stroke="#e0e0e0" strokeWidth="0.5" />
      {/* Compass needle */}
      <polygon points="60,28 54,60 60,66 66,60" fill="#ef4444" />
      <polygon points="60,92 66,60 60,54 54,60" fill="white" stroke="#ccc" strokeWidth="0.3" />
      {/* Tick marks */}
      {[0, 90, 180, 270].map((r) => (
        <line key={r} x1="60" y1="28" x2="60" y2="32" stroke="#888" strokeWidth="1" transform={`rotate(${r} 60 60)`} />
      ))}
    </svg>
  );
}

/* Terminal — black with green prompt, very recognizable */
function TerminalIcon() {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full">
      <defs>
        <linearGradient id="term-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2d2d2d" />
          <stop offset="100%" stopColor="#0a0a0a" />
        </linearGradient>
      </defs>
      <path d={squircle} fill="url(#term-bg)" />
      {/* Prompt arrow */}
      <path d="M32 40L54 60L32 80" stroke="#32d74b" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Cursor line */}
      <line x1="62" y1="76" x2="90" y2="76" stroke="#32d74b" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

/* Mail — blue gradient with white envelope */
function MailIcon() {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full">
      <defs>
        <linearGradient id="mail-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5ac8fa" />
          <stop offset="100%" stopColor="#007aff" />
        </linearGradient>
      </defs>
      <path d={squircle} fill="url(#mail-bg)" />
      {/* Envelope body */}
      <rect x="22" y="38" width="76" height="48" rx="5" fill="white" />
      {/* Envelope flap */}
      <path d="M22 42l38 26 38-26" stroke="#007aff" strokeWidth="2" fill="none" strokeLinejoin="round" opacity="0.4" />
    </svg>
  );
}

/* Messages — green bubble */
function MessagesIcon() {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full">
      <defs>
        <linearGradient id="msg-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5ef97e" />
          <stop offset="100%" stopColor="#34c759" />
        </linearGradient>
      </defs>
      <path d={squircle} fill="url(#msg-bg)" />
      {/* Chat bubble */}
      <path d="M26 38c0-6 5-11 11-11h46c6 0 11 5 11 11v28c0 6-5 11-11 11H58l-16 14v-14h-5c-6 0-11-5-11-11z" fill="white" />
      {/* Three dots */}
      <circle cx="47" cy="53" r="4" fill="#34c759" opacity="0.5" />
      <circle cx="60" cy="53" r="4" fill="#34c759" opacity="0.5" />
      <circle cx="73" cy="53" r="4" fill="#34c759" opacity="0.5" />
    </svg>
  );
}

/* Notes / Parcours — yellow notepad */
function NotesIcon() {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full">
      <defs>
        <linearGradient id="notes-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffd60a" />
          <stop offset="100%" stopColor="#f0a500" />
        </linearGradient>
      </defs>
      <path d={squircle} fill="url(#notes-bg)" />
      {/* Paper */}
      <rect x="28" y="20" width="64" height="80" rx="4" fill="white" />
      {/* Lines */}
      <line x1="36" y1="36" x2="84" y2="36" stroke="#ddd" strokeWidth="1" />
      <line x1="36" y1="48" x2="84" y2="48" stroke="#ddd" strokeWidth="1" />
      <line x1="36" y1="60" x2="84" y2="60" stroke="#ddd" strokeWidth="1" />
      <line x1="36" y1="72" x2="84" y2="72" stroke="#ddd" strokeWidth="1" />
      {/* Handwriting hint */}
      <path d="M36 33c8-4 16 2 24-1s12-5 20-2" stroke="#666" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M36 45c6-2 14 3 22 0s10-4 18-1" stroke="#666" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/* Photos / Certifs — rainbow flower */
function PhotosIcon() {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full">
      <defs>
        <linearGradient id="photos-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f8f8f8" />
          <stop offset="100%" stopColor="#e8e8e8" />
        </linearGradient>
      </defs>
      <path d={squircle} fill="url(#photos-bg)" />
      {/* Rainbow flower petals */}
      {[
        { cx: 60, cy: 38, color: "#ff3b30" },
        { cx: 78, cy: 48, color: "#ff9500" },
        { cx: 78, cy: 68, color: "#ffcc00" },
        { cx: 60, cy: 78, color: "#34c759" },
        { cx: 42, cy: 68, color: "#5ac8fa" },
        { cx: 42, cy: 48, color: "#af52de" },
      ].map((p, i) => (
        <ellipse key={i} cx={p.cx} cy={p.cy} rx="14" ry="18" fill={p.color} opacity="0.85" transform={`rotate(${i * 60} 60 58)`} />
      ))}
      <circle cx="60" cy="58" r="10" fill="white" />
    </svg>
  );
}

/* Preview / CV — PDF icon */
function PreviewIcon() {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full">
      <defs>
        <linearGradient id="preview-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#68a4f8" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
      </defs>
      <path d={squircle} fill="url(#preview-bg)" />
      {/* Page */}
      <rect x="32" y="20" width="56" height="76" rx="4" fill="white" />
      {/* Folded corner */}
      <path d="M72 20v16h16" fill="#d0d0d0" />
      <path d="M72 20l16 16" stroke="#bbb" strokeWidth="0.5" fill="none" />
      {/* PDF text */}
      <text x="60" y="70" textAnchor="middle" fill="#2563eb" fontSize="18" fontWeight="800" fontFamily="system-ui">PDF</text>
      {/* Lines */}
      <rect x="40" y="44" width="24" height="2.5" rx="1" fill="#ccc" />
      <rect x="40" y="52" width="32" height="2" rx="1" fill="#ddd" />
    </svg>
  );
}

const apps: { id: AppId | "cv"; icon: React.ReactNode; label: string }[] = [
  { id: "profil", icon: <FinderIcon />, label: "Finder — Profil" },
  { id: "projets", icon: <SafariIcon />, label: "Safari — Projets" },
  { id: "contact", icon: <MessagesIcon />, label: "Messages — Contact" },
  { id: "parcours", icon: <NotesIcon />, label: "Notes — Parcours" },
  { id: "terminal", icon: <TerminalIcon />, label: "Terminal" },
  { id: "certifs", icon: <PhotosIcon />, label: "Photos — Certifications" },
  { id: "cv", icon: <PreviewIcon />, label: "Aperçu — Télécharger CV" },
];

export function Dock({ openApps, onOpen }: { openApps: AppId[]; onOpen: (id: AppId) => void }) {
  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.15, type: "spring", damping: 24, stiffness: 200 }}
      className="fixed bottom-[4px] left-1/2 -translate-x-1/2 z-[200]"
    >
      <div
        className="flex items-end"
        style={{
          padding: "6px 12px",
          gap: "4px",
          background: "rgba(255,255,255,0.18)",
          backdropFilter: "blur(50px) saturate(1.8)",
          WebkitBackdropFilter: "blur(50px) saturate(1.8)",
          borderRadius: 22,
          border: "0.5px solid rgba(255,255,255,0.3)",
          boxShadow: "0 8px 40px rgba(0,0,0,0.18), inset 0 0.5px 0 rgba(255,255,255,0.25)",
        }}
      >
        {apps.map((app) => (
          <motion.button
            key={app.id}
            onClick={() => {
              if (app.id === "cv") { window.open("/CV.pdf", "_blank"); return; }
              onOpen(app.id as AppId);
            }}
            whileHover={{ scale: 1.3, y: -16 }}
            whileTap={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="relative flex flex-col items-center group"
          >
            <div className="w-[56px] h-[56px]" style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.15))" }}>
              {app.icon}
            </div>

            {/* Tooltip */}
            <div className="absolute -top-11 opacity-0 group-hover:opacity-100 transition-opacity duration-100 pointer-events-none">
              <div
                className="text-white text-[12px] font-medium px-3 py-[5px] whitespace-nowrap"
                style={{
                  background: "rgba(30,30,42,0.9)",
                  backdropFilter: "blur(20px)",
                  borderRadius: 7,
                  boxShadow: "0 3px 15px rgba(0,0,0,0.25)",
                  border: "0.5px solid rgba(255,255,255,0.1)",
                }}
              >
                {app.label}
              </div>
            </div>

            {/* Running dot */}
            {openApps.includes(app.id as AppId) && (
              <div className="w-[4px] h-[4px] rounded-full bg-black/30 mt-[2px]" />
            )}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
