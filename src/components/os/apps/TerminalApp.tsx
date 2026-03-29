"use client";

import { useState, useEffect, useRef } from "react";
import { commandResponses } from "@/data/terminal-commands";

type Line = { text: string; color: string };

const initLines = [
  { text: "Last login: " + new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }) + " on ttys000", color: "text-white/30" },
  { text: "", color: "" },
  { text: "nicolas@macbook ~ % whoami", color: "text-white/80" },
  { text: "Nicolas Segond — Développeur Fullstack", color: "text-white/60" },
  { text: "", color: "" },
  { text: "nicolas@macbook ~ % cat formation.txt", color: "text-white/80" },
  { text: "Bac+5 Mastère MAALSI @ CESI", color: "text-[#60A5FA]" },
  { text: "Bachelor CDA · BTS SIO SLAM", color: "text-[#60A5FA]" },
  { text: "", color: "" },
  { text: "nicolas@macbook ~ % cat experience.txt", color: "text-white/80" },
  { text: "3 ans alternance @ Topo Marketing Group, Villeneuve-d'Ascq", color: "text-[#FACC15]" },
  { text: "→ Dynamic Reports · Microservices · CI/CD · DevOps", color: "text-[#FACC15]/70" },
  { text: "→ Recueil de besoin · Gestion de projets", color: "text-[#FACC15]/70" },
  { text: "", color: "" },
  { text: "nicolas@macbook ~ % ls -la skills/", color: "text-white/80" },
  { text: "drwxr-xr-x  frontend/    React Next.js TypeScript Tailwind jQuery", color: "text-[#22D3EE]" },
  { text: "drwxr-xr-x  backend/     Symfony API-Platform Node.js PHP Python", color: "text-[#22D3EE]" },
  { text: "drwxr-xr-x  data/        PostgreSQL MySQL MongoDB Kafka RabbitMQ", color: "text-[#22D3EE]" },
  { text: "drwxr-xr-x  devops/      Docker Kubernetes CI/CD WSL Git", color: "text-[#22D3EE]" },
  { text: "drwxr-xr-x  infra/       Traefik Kong Keycloak Ory-Hydra", color: "text-[#22D3EE]" },
  { text: "drwxr-xr-x  monitoring/  Prometheus Grafana", color: "text-[#22D3EE]" },
  { text: "", color: "" },
  { text: "nicolas@macbook ~ % echo $STATUS", color: "text-white/80" },
  { text: "🟢 Disponible septembre 2026 — Ouvert aux opportunités", color: "text-[#4ADE80]" },
  { text: "", color: "" },
  { text: "nicolas@macbook ~ % neofetch", color: "text-white/80" },
  { text: "                    OS: macOS Portfolio 1.0", color: "text-[#EC4899]" },
  { text: "     ██████████     Host: nicolassegond.fr", color: "text-[#EC4899]" },
  { text: "   ██          ██   Kernel: Next.js 16 + React 19", color: "text-[#EC4899]" },
  { text: "  ██    ████    ██  Shell: zsh + TypeScript", color: "text-[#EC4899]" },
  { text: "  ██  ████████  ██  Theme: Tailwind CSS v4", color: "text-[#EC4899]" },
  { text: "   ██          ██   Terminal: Framer Motion", color: "text-[#EC4899]" },
  { text: "     ██████████     Uptime: 3 ans d'alternance", color: "text-[#EC4899]" },
  { text: "", color: "" },
  { text: "💡 Terminal interactif ! Tape 'help' pour voir les commandes.", color: "text-white/20" },
];


export function TerminalApp() {
  const [visible, setVisible] = useState(0);
  const [typing, setTyping] = useState("");
  const [done, setDone] = useState(false);
  const [history, setHistory] = useState<Line[]>([]);
  const [cleared, setCleared] = useState(false);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visible >= initLines.length) { setDone(true); return; }
    const line = initLines[visible];
    if (!line.text) { const t = setTimeout(() => setVisible((v) => v + 1), 150); return () => clearTimeout(t); }
    const isCmd = line.text.includes("~ %");
    if (!isCmd) { setTyping(line.text); const t = setTimeout(() => setVisible((v) => v + 1), 40); return () => clearTimeout(t); }
    let i = 0; setTyping("");
    const type = () => {
      if (i <= line.text.length) { setTyping(line.text.slice(0, i)); i++; setTimeout(type, 25); }
      else { setTimeout(() => setVisible((v) => v + 1), 200); }
    };
    const t = setTimeout(type, visible === 0 ? 400 : 60);
    return () => clearTimeout(t);
  }, [visible]);

  useEffect(() => { scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" }); }, [history, visible, done]);

  const handleCommand = (raw: string) => {
    const trimmed = raw.trim().toLowerCase();
    if (!trimmed) return;
    setCmdHistory((h) => [raw.trim(), ...h]);
    setHistIdx(-1);
    const newLines: Line[] = [{ text: `nicolas@macbook ~ % ${raw.trim()}`, color: "text-white/80" }];

    if (trimmed === "clear") { setHistory([]); setCleared(true); setInput(""); return; }
    if (trimmed === "cv") { window.open("/CV.pdf", "_blank"); }

    const response = commandResponses[trimmed];
    if (response) { newLines.push(...response.lines); }
    else { newLines.push({ text: `zsh: command not found: ${trimmed}`, color: "text-[#EF4444]" }, { text: "Tape 'help' pour les commandes dispos 💡", color: "text-white/15" }); }

    setHistory((h) => [...h, ...newLines]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleCommand(input);
    else if (e.key === "ArrowUp") { e.preventDefault(); const next = Math.min(histIdx + 1, cmdHistory.length - 1); setHistIdx(next); if (cmdHistory[next]) setInput(cmdHistory[next]); }
    else if (e.key === "ArrowDown") { e.preventDefault(); const next = histIdx - 1; setHistIdx(next); setInput(next < 0 ? "" : cmdHistory[next] ?? ""); }
    else if (e.key === "Tab") { e.preventDefault(); const cmds = Object.keys(commandResponses); const match = cmds.find((c) => c.startsWith(input.toLowerCase())); if (match) setInput(match); }
  };

  return (
    <div ref={scrollRef} className="h-full bg-[#0c0c0c] font-mono text-[13px] p-4 overflow-y-auto win-scroll leading-[1.6]" onClick={() => done && inputRef.current?.focus()}>
      {!cleared && initLines.slice(0, visible).map((l, i) => (<div key={i} className={l.color}>{l.text || "\u00A0"}</div>))}
      {!cleared && visible < initLines.length && (<div className={initLines[visible]?.color}>{typing}{initLines[visible]?.text.includes("~ %") && <span className="cursor-blink text-white/70">▋</span>}</div>)}
      {done && history.map((l, i) => (<div key={`h-${i}`} className={l.color}>{l.text || "\u00A0"}</div>))}
      {done && (
        <div className="flex items-center text-white/80">
          <span className="shrink-0">nicolas@macbook ~ %&nbsp;</span>
          <input ref={inputRef} type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown} className="flex-1 bg-transparent outline-none text-white/80 caret-white/70" spellCheck={false} autoComplete="off" />
        </div>
      )}
    </div>
  );
}
