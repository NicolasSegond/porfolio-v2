"use client";

import { useState, useEffect, useRef } from "react";

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
  { text: "🟢 Disponible 2026 — Ouvert aux opportunités", color: "text-[#4ADE80]" },
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

type Line = { text: string; color: string };

const cmd = (lines: Line[]): { lines: Line[] } => ({ lines });

const commandResponses: Record<string, { lines: Line[] }> = {
  help: cmd([
    { text: "╭──────────────────────────────────────────────╮", color: "text-white/20" },
    { text: "│  📋 Commandes disponibles                     │", color: "text-white/60" },
    { text: "├──────────────────────────────────────────────┤", color: "text-white/20" },
    { text: "│  whoami        → Qui suis-je                  │", color: "text-[#22D3EE]" },
    { text: "│  experience    → Mon parcours pro complet     │", color: "text-[#FACC15]" },
    { text: "│  formation     → Mes diplômes                 │", color: "text-[#60A5FA]" },
    { text: "│  skills        → Stack technique complète     │", color: "text-[#4ADE80]" },
    { text: "│  projects      → Liste des projets            │", color: "text-[#EC4899]" },
    { text: "│  contact       → Me contacter                 │", color: "text-[#F97316]" },
    { text: "│  cv            → Télécharger mon CV           │", color: "text-white/50" },
    { text: "│  clear         → Effacer le terminal          │", color: "text-white/50" },
    { text: "├──────────────────────────────────────────────┤", color: "text-white/20" },
    { text: "│  🎮 Easter eggs: essaie des trucs...          │", color: "text-white/30" },
    { text: "│  sudo, coffee, matrix, ping, fortune,         │", color: "text-white/20" },
    { text: "│  vim, git blame, npm install, 42, exit...     │", color: "text-white/20" },
    { text: "╰──────────────────────────────────────────────╯", color: "text-white/20" },
  ]),
  whoami: cmd([
    { text: "┌─ Nicolas Segond ─────────────────────────────┐", color: "text-white/30" },
    { text: "│ 👤 Développeur Fullstack                      │", color: "text-white/70" },
    { text: "│ 🎓 Bac+5 Mastère MAALSI @ CESI               │", color: "text-[#60A5FA]" },
    { text: "│ 🏢 3 ans alternance @ Topo Marketing Group    │", color: "text-[#FACC15]" },
    { text: "│ 📍 Villeneuve-d'Ascq                          │", color: "text-white/40" },
    { text: "│ 🟢 Disponible 2026                            │", color: "text-[#4ADE80]" },
    { text: "│                                               │", color: "text-white/10" },
    { text: "│ \"Je build des apps de A à Z — du design       │", color: "text-white/40" },
    { text: "│  system au pipeline Kubernetes.\"               │", color: "text-white/40" },
    { text: "└───────────────────────────────────────────────┘", color: "text-white/30" },
  ]),
  experience: cmd([
    { text: "📂 experience/ — Parcours professionnel", color: "text-[#FACC15]" },
    { text: "", color: "" },
    { text: "🏢 Développeur Fullstack — Topo Marketing Group", color: "text-white/80" },
    { text: "   📍 Villeneuve-d'Ascq · 2023 — 2026 (3 ans, alternance)", color: "text-white/40" },
    { text: "   ├── Création de Dynamic Reports (dashboards interactifs)", color: "text-[#FACC15]/70" },
    { text: "   ├── Maintenance et évolution d'applications en production", color: "text-[#FACC15]/70" },
    { text: "   ├── Architecture microservices (Kafka, RabbitMQ, Kong)", color: "text-[#FACC15]/70" },
    { text: "   ├── Mise en place CI/CD, pipelines de déploiement", color: "text-[#FACC15]/70" },
    { text: "   ├── Monitoring : Prometheus + Grafana", color: "text-[#FACC15]/70" },
    { text: "   ├── Auth : Keycloak, Ory Hydra", color: "text-[#FACC15]/70" },
    { text: "   ├── Gestion de projets, recueil de besoins clients", color: "text-[#FACC15]/70" },
    { text: "   └── Stack : React, Symfony, TypeScript, Docker, K8s", color: "text-[#FACC15]/70" },
    { text: "", color: "" },
    { text: "🏢 Stagiaire Développeur Web — Diggit-All", color: "text-white/80" },
    { text: "   📍 Lens · 2023 (7 semaines)", color: "text-white/40" },
    { text: "   ├── Développement sites WordPress/Divi", color: "text-[#F97316]/70" },
    { text: "   ├── Création supports print (plaquettes, cartes visite)", color: "text-[#F97316]/70" },
    { text: "   └── Relation client directe", color: "text-[#F97316]/70" },
    { text: "", color: "" },
    { text: "🏢 Stagiaire Développeur Web — Allographique", color: "text-white/80" },
    { text: "   📍 Divion · 2022 (4 semaines)", color: "text-white/40" },
    { text: "   ├── Intégration de 6 sites vitrines WordPress/Elementor", color: "text-[#F97316]/70" },
    { text: "   └── Maquettes et cahiers des charges clients", color: "text-[#F97316]/70" },
  ]),
  formation: cmd([
    { text: "🎓 formation/ — Diplômes & certifications", color: "text-[#60A5FA]" },
    { text: "", color: "" },
    { text: "📘 Mastère MAALSI (Bac+5) — 2024-2026", color: "text-white/80" },
    { text: "   CESI · En alternance chez Topo Marketing Group", color: "text-white/40" },
    { text: "   Architecture logicielle, management SI, sécurité, DevOps", color: "text-[#60A5FA]/70" },
    { text: "", color: "" },
    { text: "📘 Bachelor CDA — Concepteur Développeur d'Applications (Bac+3) — 2023-2024", color: "text-white/80" },
    { text: "   CESI · En alternance chez Topo Marketing Group", color: "text-white/40" },
    { text: "   Conception logicielle, architecture, méthodologies agiles", color: "text-[#60A5FA]/70" },
    { text: "", color: "" },
    { text: "📘 BTS SIO option SLAM — 2021-2023", color: "text-white/80" },
    { text: "   Lycée André Malraux, Béthune", color: "text-white/40" },
    { text: "   PHP/Symfony, Java Android, C#/.NET, SQL", color: "text-[#60A5FA]/70" },
    { text: "", color: "" },
    { text: "📘 Baccalauréat Général — Mention Bien — 2021", color: "text-white/80" },
    { text: "   Lycée Albert Chatelet · Spé NSI, Maths, Physique-Chimie", color: "text-white/40" },
  ]),
  skills: cmd([
    { text: "📦 skills/ — Stack technique complète", color: "text-[#4ADE80]" },
    { text: "", color: "" },
    { text: "  Languages     TypeScript · JavaScript · PHP · Python · SQL · HTML · CSS", color: "text-[#22D3EE]" },
    { text: "  Frontend      React · Next.js · Tailwind CSS · jQuery · Vue.js", color: "text-[#22D3EE]" },
    { text: "  Backend       Symfony · API Platform · Node.js", color: "text-[#22D3EE]" },
    { text: "  Data          PostgreSQL · MySQL · MongoDB · Kafka · RabbitMQ", color: "text-[#22D3EE]" },
    { text: "  DevOps        Docker · Kubernetes · CI/CD · WSL · Linux", color: "text-[#22D3EE]" },
    { text: "  Infra & Auth  Traefik · Kong · Keycloak · Ory Hydra", color: "text-[#22D3EE]" },
    { text: "  Monitoring    Prometheus · Grafana", color: "text-[#22D3EE]" },
    { text: "  Outils        Git (Hub & Lab) · WordPress · Figma", color: "text-[#22D3EE]" },
    { text: "", color: "" },
    { text: "  Total: 30+ technologies · En constante évolution 📈", color: "text-white/30" },
  ]),
  projects: cmd([
    { text: "📁 projects/ — 10+ projets réalisés", color: "text-[#EC4899]" },
    { text: "", color: "" },
    { text: "  🌐 GSB Extranet       PHP/Symfony · MySQL · Gestion de frais médicaux", color: "text-white/60" },
    { text: "  📱 GSB Mobile         Java · Android · API REST · SQLite", color: "text-white/60" },
    { text: "  🖥️  GSB Client Lourd   C# · .NET · Windows Forms · SQL Server", color: "text-white/60" },
    { text: "  📸 Clone Instagram    PHP · MySQL · JS · Réseau social complet", color: "text-white/60" },
    { text: "  🌿 Les Petites Graines Pro   WordPress · Divi · Site vitrine bio", color: "text-white/60" },
    { text: "  🛒 Les Petites Graines       WordPress · WooCommerce · E-commerce", color: "text-white/60" },
    { text: "  ⚖️  CDA Avocats       WordPress · Elementor · Cabinet d'avocats", color: "text-white/60" },
    { text: "  💼 DbConsult          WordPress · Elementor · Consulting", color: "text-white/60" },
    { text: "  🔧 AssainiConcept     WordPress · Divi · Assainissement", color: "text-white/60" },
    { text: "  🌐 Diggit All         WordPress · Divi · Agence web", color: "text-white/60" },
    { text: "", color: "" },
    { text: "  Ouvre l'app Safari dans le dock pour les détails ! 🧭", color: "text-white/20" },
  ]),
  contact: cmd([
    { text: "📬 contact/ — Me joindre", color: "text-[#F97316]" },
    { text: "", color: "" },
    { text: "  📧  Email     contact@nicolassegond.fr", color: "text-white/60" },
    { text: "  🐙  GitHub    github.com/TurboNicoo", color: "text-white/60" },
    { text: "  💼  LinkedIn  linkedin.com/in/nicolassegond", color: "text-white/60" },
    { text: "", color: "" },
    { text: "  🟢 Disponible à partir de 2026", color: "text-[#4ADE80]" },
    { text: "  📍 Villeneuve-d'Ascq / Remote", color: "text-white/40" },
  ]),
  cv: cmd([
    { text: "📄 Ouverture du CV...", color: "text-white/60" },
    { text: "  → Le PDF s'ouvre dans un nouvel onglet", color: "text-[#60A5FA]" },
  ]),
  // ── Easter eggs ──
  "sudo rm -rf /": cmd([
    { text: "🚨 ALERTE ROUGE 🚨", color: "text-[#EF4444]" },
    { text: "sudo: impossible de détruire ce portfolio.", color: "text-[#EF4444]" },
    { text: "Il est protégé par 30+ technologies et 3 ans d'alternance.", color: "text-white/40" },
    { text: "Nice try though 😏", color: "text-white/30" },
  ]),
  "sudo rm -rf": cmd([
    { text: "🚨 Permission denied. Ce portfolio est incassable. 💪", color: "text-[#EF4444]" },
    { text: "Et toi, tu oses sudo sans le / ? Amateur. 😏", color: "text-white/30" },
  ]),
  sudo: cmd([
    { text: "Password: ********", color: "text-white/40" },
    { text: "Sorry, user recruteur is not in the sudoers file.", color: "text-[#EF4444]" },
    { text: "This incident will be reported. 📝", color: "text-white/30" },
    { text: "(non j'rigole, mais pas de sudo ici 😄)", color: "text-white/20" },
  ]),
  coffee: cmd([
    { text: "", color: "" },
    { text: "        )", color: "text-[#FACC15]/50" },
    { text: "       ( )", color: "text-[#FACC15]/50" },
    { text: "      .) (", color: "text-[#FACC15]/50" },
    { text: "     ._____.", color: "text-white/30" },
    { text: "     |     |]", color: "text-white/30" },
    { text: "     |     |", color: "text-white/30" },
    { text: "     |_____|", color: "text-white/30" },
    { text: "", color: "" },
    { text: "  ☕ Café servi ! Merci de patienter pendant la compilation...", color: "text-[#FACC15]" },
    { text: "  Le dev, c'est 10% de code et 90% de café.", color: "text-white/30" },
  ]),
  matrix: cmd([
    { text: "Wake up, recruteur...", color: "text-[#4ADE80]" },
    { text: "The Matrix has you...", color: "text-[#4ADE80]/50" },
    { text: "Follow the white rabbit. 🐰", color: "text-[#4ADE80]/30" },
    { text: "", color: "" },
    { text: "Indice: tape le Konami Code sur ton clavier (↑↑↓↓←→←→BA)", color: "text-white/15" },
  ]),
  ping: cmd([
    { text: "PING nicolassegond.fr (127.0.0.1): 56 data bytes", color: "text-white/50" },
    { text: "64 bytes from 127.0.0.1: icmp_seq=0 ttl=64 time=0.042 ms", color: "text-white/40" },
    { text: "64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.038 ms", color: "text-white/40" },
    { text: "64 bytes from 127.0.0.1: icmp_seq=2 ttl=64 time=0.001 ms ← oui c'est rapide 😎", color: "text-[#4ADE80]" },
    { text: "--- nicolassegond.fr ping statistics ---", color: "text-white/30" },
    { text: "3 packets transmitted, 3 received, 0% packet loss", color: "text-white/30" },
    { text: "Conclusion: le portfolio est UP et le dev aussi. 🟢", color: "text-white/20" },
  ]),
  fortune: cmd([
    { text: [
      "🔮 \"Le code le mieux écrit est celui que tu n'as pas besoin d'écrire.\"",
      "🔮 \"Il y a 2 problèmes difficiles en informatique : le cache, le nommage, et les erreurs de décalage.\"",
      "🔮 \"Un bon développeur est un développeur fainéant — il automatise tout.\"",
      "🔮 \"En prod, ça marche. On ne touche plus. Jamais.\"",
      "🔮 \"99 bugs dans le code, 99 bugs. Tu en fixes un... 127 bugs dans le code.\"",
      "🔮 \"Le front-end, c'est facile. — Personne qui a fait du CSS.\"",
    ][Math.floor(Math.random() * 6)], color: "text-[#EC4899]" },
  ]),
  vim: cmd([
    { text: "Vim s'est ouvert. Bonne chance pour en sortir. 😈", color: "text-[#EF4444]" },
    { text: "... je rigole. :q! et ça dégage.", color: "text-white/30" },
    { text: "(perso je suis team VS Code, déso pas déso)", color: "text-white/20" },
  ]),
  "git blame": cmd([
    { text: "a3f8d2e (Nicolas Segond 2024-03-15) Ce portfolio", color: "text-white/50" },
    { text: "7c1b4a9 (Nicolas Segond 2024-03-15) est entièrement", color: "text-white/50" },
    { text: "e92d1f3 (Nicolas Segond 2024-03-15) ma faute.", color: "text-white/50" },
    { text: "", color: "" },
    { text: "C'est toujours la faute de celui qui a fait le dernier commit. 🤷", color: "text-white/20" },
  ]),
  "npm install": cmd([
    { text: "added 847 packages, and audited 848 packages in 2s", color: "text-white/50" },
    { text: "312 packages are looking for funding", color: "text-[#FACC15]" },
    { text: "  run `npm fund` for details", color: "text-white/30" },
    { text: "found 0 vulnerabilities (enfin on espère 🤞)", color: "text-[#4ADE80]" },
    { text: "", color: "" },
    { text: "node_modules fait maintenant 2.3 Go. Classic. 📦", color: "text-white/20" },
  ]),
  "42": cmd([{ text: "🌌 La réponse à la grande question sur la vie, l'univers et le reste.", color: "text-[#EC4899]" }, { text: "Mais quelle était la question déjà ? 🤔", color: "text-white/30" }]),
  hello: cmd([{ text: "Hello World! 👋 Le premier programme de tout dev. Tape 'help' pour la suite.", color: "text-white/60" }]),
  "hire me": cmd([
    { text: "🚀 RECRUTEMENT DÉTECTÉ", color: "text-[#4ADE80]" },
    { text: "", color: "" },
    { text: "  ✅ 3 ans d'alternance en conditions réelles", color: "text-white/60" },
    { text: "  ✅ Bac+5 MAALSI (Architecture & SI)", color: "text-white/60" },
    { text: "  ✅ 30+ technologies maîtrisées", color: "text-white/60" },
    { text: "  ✅ Disponible 2026", color: "text-white/60" },
    { text: "  ✅ Café inclus ☕", color: "text-white/60" },
    { text: "", color: "" },
    { text: "  → contact@nicolassegond.fr", color: "text-[#60A5FA]" },
    { text: "  → linkedin.com/in/nicolassegond", color: "text-[#60A5FA]" },
    { text: "", color: "" },
    { text: "  Let's talk! 🤝", color: "text-[#4ADE80]" },
  ]),
  exit: cmd([
    { text: "logout", color: "text-white/40" },
    { text: "Saving session...", color: "text-white/30" },
    { text: "...copying shared history...", color: "text-white/30" },
    { text: "...saving history...truncating history files...", color: "text-white/30" },
    { text: "", color: "" },
    { text: "Nah j'rigole, tu peux pas partir comme ça. 😄", color: "text-[#EC4899]" },
    { text: "Explore un peu plus ! Tape 'help' ou clique sur le dock.", color: "text-white/20" },
  ]),
  ls: cmd([
    { text: "about.txt    experience/  formation/   skills/", color: "text-[#22D3EE]" },
    { text: "projects/    contact.txt  CV.pdf       README.md", color: "text-[#22D3EE]" },
    { text: "node_modules/ (on en parle pas)", color: "text-white/20" },
  ]),
  pwd: cmd([{ text: "/Users/nicolas/portfolio", color: "text-white/60" }]),
  date: cmd([{ text: new Date().toLocaleString("fr-FR", { dateStyle: "full", timeStyle: "medium" }), color: "text-white/60" }]),
  uptime: cmd([{ text: "up 3 years, 0 days, ∞ coffees, 0 burnouts (pour l'instant)", color: "text-white/60" }]),
  "cat README.md": cmd([
    { text: "# Portfolio Nicolas Segond 🚀", color: "text-white/80" },
    { text: "", color: "" },
    { text: "Un portfolio qui ressemble à macOS. Parce que pourquoi pas.", color: "text-white/50" },
    { text: "", color: "" },
    { text: "## Tech Stack", color: "text-white/70" },
    { text: "Next.js 16 · React 19 · TypeScript · Tailwind v4 · Framer Motion", color: "text-[#22D3EE]" },
    { text: "", color: "" },
    { text: "## Easter Eggs", color: "text-white/70" },
    { text: "Il y en a plusieurs. Trouve-les tous. 🥚", color: "text-white/30" },
  ]),
  man: cmd([
    { text: "NICOLAS(1)         Développeur Fullstack Manual         NICOLAS(1)", color: "text-white/60" },
    { text: "", color: "" },
    { text: "NAME", color: "text-white/80" },
    { text: "       nicolas — développeur fullstack polyvalent", color: "text-white/50" },
    { text: "", color: "" },
    { text: "SYNOPSIS", color: "text-white/80" },
    { text: "       nicolas [--react] [--symfony] [--docker] [--kubernetes]", color: "text-white/50" },
    { text: "", color: "" },
    { text: "DESCRIPTION", color: "text-white/80" },
    { text: "       Développe des applications web complètes, du front au back,", color: "text-white/50" },
    { text: "       en passant par le DevOps et l'infrastructure. N'a pas peur", color: "text-white/50" },
    { text: "       du YAML. Survit au CSS. Parle couramment TypeScript.", color: "text-white/50" },
    { text: "", color: "" },
    { text: "BUGS", color: "text-white/80" },
    { text: "       Aucun bug connu. (enfin, en prod du moins)", color: "text-white/30" },
  ]),
  "git status": cmd([
    { text: "On branch main", color: "text-white/60" },
    { text: "Your branch is up to date with 'origin/main'.", color: "text-white/40" },
    { text: "", color: "" },
    { text: "Changes to be committed:", color: "text-[#4ADE80]" },
    { text: "  new file:   portfolio-v2/", color: "text-[#4ADE80]" },
    { text: "  new file:   3-ans-experience.txt", color: "text-[#4ADE80]" },
    { text: "  new file:   bac+5-maalsi.txt", color: "text-[#4ADE80]" },
    { text: "  deleted:    bugs-en-prod.log (on en avait plus besoin)", color: "text-[#EF4444]" },
  ]),
};

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
