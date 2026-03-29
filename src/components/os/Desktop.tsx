"use client";

import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { User, FolderGit2, Briefcase, Terminal, Award, Mail } from "lucide-react";
import { MenuBar } from "./MenuBar";
import { Dock, type AppId } from "./Dock";
import { EasterEggs } from "./EasterEggs";
import { Window } from "./Window";
import { ProfileApp } from "./apps/ProfileApp";
import { TerminalApp } from "./apps/TerminalApp";
import { ProjectsApp } from "./apps/ProjectsApp";
import { ParcoursApp } from "./apps/ParcoursApp";
import { CertifsApp } from "./apps/CertifsApp";
import { ContactApp } from "./apps/ContactApp";

type WinState = { id: AppId; zIndex: number; minimized: boolean; maximized: boolean };

const appConfig: Record<AppId, {
  title: string;
  icon: React.ReactNode;
  component: React.ReactNode;
  defaultPos: { x: number; y: number };
  defaultSize: { w: number; h: number };
}> = {
  profil: { title: "Finder — Nicolas Segond", icon: <User size={11} />, component: <ProfileApp />, defaultPos: { x: 60, y: 10 }, defaultSize: { w: 900, h: 560 } },
  projets: { title: "Safari — Projets", icon: <FolderGit2 size={11} />, component: <ProjectsApp />, defaultPos: { x: 80, y: 10 }, defaultSize: { w: 1000, h: 600 } },
  parcours: { title: "Notes — Parcours", icon: <Briefcase size={11} />, component: <ParcoursApp />, defaultPos: { x: 70, y: 10 }, defaultSize: { w: 950, h: 560 } },
  terminal: { title: "Terminal — nicolas@portfolio", icon: <Terminal size={11} />, component: <TerminalApp />, defaultPos: { x: 90, y: 10 }, defaultSize: { w: 960, h: 580 } },
  certifs: { title: "Photos — Certifications", icon: <Award size={11} />, component: <CertifsApp />, defaultPos: { x: 100, y: 10 }, defaultSize: { w: 880, h: 540 } },
  contact: { title: "Messages — Contact", icon: <Mail size={11} />, component: <ContactApp />, defaultPos: { x: 80, y: 10 }, defaultSize: { w: 940, h: 560 } },
};

export function Desktop() {
  const [windows, setWindows] = useState<WinState[]>([
    { id: "profil", zIndex: 1, minimized: false, maximized: false },
  ]);
  const [topZ, setTopZ] = useState(2);
  const [appleClicked, setAppleClicked] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const openApp = useCallback((id: AppId) => {
    if (isMobile) {
      setWindows([{ id, zIndex: topZ, minimized: false, maximized: true }]);
    } else {
      setWindows((prev) => {
        const existing = prev.find((w) => w.id === id);
        if (existing) return prev.map((w) => w.id === id ? { ...w, minimized: false, zIndex: topZ } : w);
        return [...prev, { id, zIndex: topZ, minimized: false, maximized: false }];
      });
    }
    setTopZ((z) => z + 1);
  }, [topZ, isMobile]);

  const focusApp = useCallback((id: AppId) => {
    setWindows((prev) => prev.map((w) => w.id === id ? { ...w, zIndex: topZ } : w));
    setTopZ((z) => z + 1);
  }, [topZ]);

  const closeApp = useCallback((id: AppId) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  }, []);

  const minimizeApp = useCallback((id: AppId) => {
    setWindows((prev) => prev.map((w) => w.id === id ? { ...w, minimized: true } : w));
  }, []);

  const onMaxChange = useCallback((id: AppId, max: boolean) => {
    setWindows((prev) => prev.map((w) => w.id === id ? { ...w, maximized: max } : w));
  }, []);

  const visibleApps = windows.filter((w) => !w.minimized);
  const anyMaximized = visibleApps.some((w) => w.maximized);
  const activeApp = visibleApps.length > 0 ? visibleApps.reduce((a, b) => a.zIndex > b.zIndex ? a : b).id : undefined;

  return (
    <div className="h-screen w-screen overflow-hidden relative">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/wallpaper.jpg')" }} />

      <MenuBar onAppleClick={() => setAppleClicked((p) => !p)} />
      <EasterEggs onAppleClick={appleClicked} />

      <AnimatePresence>
        {visibleApps.map((w) => {
          const cfg = appConfig[w.id];
          return (
            <Window
              key={w.id}
              id={w.id}
              title={cfg.title}
              icon={cfg.icon}
              defaultPos={cfg.defaultPos}
              defaultSize={cfg.defaultSize}
              zIndex={w.zIndex}
              onFocus={() => focusApp(w.id)}
              onClose={() => closeApp(w.id)}
              onMinimize={() => minimizeApp(w.id)}
              onMaximizeChange={(max) => onMaxChange(w.id, max)}
            >
              {cfg.component}
            </Window>
          );
        })}
      </AnimatePresence>

      {isMobile ? (
        <Dock openApps={visibleApps.map((w) => w.id)} onOpen={openApp} isMobile activeApp={activeApp} />
      ) : (
        <motion.div
          initial={false}
          animate={{ y: anyMaximized ? 100 : 0, opacity: anyMaximized ? 0 : 1 }}
          whileHover={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed bottom-0 left-0 right-0 h-[80px] flex items-end justify-center z-[200]"
        >
          <Dock openApps={visibleApps.map((w) => w.id)} onOpen={openApp} />
        </motion.div>
      )}
    </div>
  );
}
