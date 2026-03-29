"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const lines = [
  { text: "$ whoami", color: "text-term-green", delay: 300 },
  { text: "Nicolas Segond — Développeur Fullstack", color: "text-white", delay: 80 },
  { text: "", color: "", delay: 200 },
  { text: "$ cat formation.txt", color: "text-term-green", delay: 300 },
  { text: "Bac+5 Mastère MAALSI @ CESI", color: "text-term-blue", delay: 80 },
  { text: "Bachelor CDA · BTS SIO SLAM", color: "text-term-blue", delay: 80 },
  { text: "", color: "", delay: 200 },
  { text: "$ cat experience.txt", color: "text-term-green", delay: 300 },
  { text: "3 ans alternance @ Topo Marketing Group", color: "text-term-yellow", delay: 80 },
  { text: "Dynamic Reports · Microservices · CI/CD", color: "text-term-yellow", delay: 80 },
  { text: "", color: "", delay: 200 },
  { text: "$ ls skills/", color: "text-term-green", delay: 300 },
  { text: "React  Next.js  TypeScript  Symfony  Node.js", color: "text-term-cyan", delay: 60 },
  { text: "Docker  Kubernetes  PostgreSQL  MongoDB  Kafka", color: "text-term-cyan", delay: 60 },
  { text: "Keycloak  Traefik  Prometheus  Grafana  Git", color: "text-term-cyan", delay: 60 },
  { text: "", color: "", delay: 200 },
  { text: "$ echo $STATUS", color: "text-term-green", delay: 300 },
  { text: "Disponible septembre 2026 — Ouvert aux opportunités", color: "text-term-pink", delay: 80 },
];

export function Terminal() {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [typingLine, setTypingLine] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (visibleLines >= lines.length) {
      setIsTyping(false);
      return;
    }

    const line = lines[visibleLines];

    if (line.text === "") {
      const t = setTimeout(() => setVisibleLines((v) => v + 1), line.delay);
      return () => clearTimeout(t);
    }

    let charIndex = 0;
    setTypingLine("");

    const typeChar = () => {
      if (charIndex <= line.text.length) {
        setTypingLine(line.text.slice(0, charIndex));
        charIndex++;
        setTimeout(typeChar, line.text.startsWith("$") ? 50 : 15);
      } else {
        setTimeout(() => setVisibleLines((v) => v + 1), line.delay);
      }
    };

    const startDelay = setTimeout(typeChar, visibleLines === 0 ? 800 : 100);
    return () => clearTimeout(startDelay);
  }, [visibleLines]);

  return (
    <div className="terminal w-full max-w-2xl">
      <div className="terminal-bar">
        <div className="terminal-dot bg-term-red" />
        <div className="terminal-dot bg-term-yellow" />
        <div className="terminal-dot bg-term-green" />
        <span className="text-term-muted text-xs font-mono ml-2">nicolas@portfolio ~ </span>
      </div>
      <div className="p-5 md:p-6 font-mono text-sm md:text-base min-h-[360px] leading-relaxed">
        {lines.slice(0, visibleLines).map((line, i) => (
          <div key={i} className={line.color}>
            {line.text || "\u00A0"}
          </div>
        ))}
        {visibleLines < lines.length && (
          <div className={lines[visibleLines]?.color}>
            {typingLine}
            <span className="cursor-blink text-term-green">▋</span>
          </div>
        )}
        {!isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-term-green mt-2"
          >
            $ <span className="cursor-blink">▋</span>
          </motion.div>
        )}
      </div>
    </div>
  );
}
