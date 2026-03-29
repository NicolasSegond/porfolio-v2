"use client";

import { motion } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";
import { MOBILE_TAB_BAR_H } from "./Dock";

const MENUBAR_H = 25;

type Props = {
  id: string;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultPos?: { x: number; y: number };
  defaultSize?: { w: number; h: number };
  zIndex: number;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onMaximizeChange?: (maximized: boolean) => void;
};

export function Window({
  id,
  title,
  icon,
  children,
  defaultPos = { x: 100, y: 60 },
  defaultSize = { w: 700, h: 500 },
  zIndex,
  onFocus,
  onClose,
  onMinimize,
  onMaximizeChange,
}: Props) {
  const [maximized, setMaximized] = useState(false);
  const [size, setSize] = useState(defaultSize);
  const [pos, setPos] = useState({ x: defaultPos.x, y: defaultPos.y + MENUBAR_H });
  const dragStart = useRef({ mx: 0, my: 0, px: 0, py: 0 });
  const resizeStart = useRef({ mx: 0, my: 0, w: 0, h: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [focused, setFocused] = useState(true);
  const preMax = useRef({ pos: { x: 0, y: 0 }, size: { w: 0, h: 0 } });

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile && !maximized) {
        setMaximized(true);
        onMaximizeChange?.(true);
      }
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const onDragStart = useCallback(
    (e: React.PointerEvent) => {
      if (maximized) return;
      e.preventDefault();
      dragStart.current = { mx: e.clientX, my: e.clientY, px: pos.x, py: pos.y };
      const el = (e.target as HTMLElement).closest("[data-window]") as HTMLElement;
      const onMove = (ev: PointerEvent) => {
        if (!el) return;
        el.style.left = `${dragStart.current.px + (ev.clientX - dragStart.current.mx)}px`;
        el.style.top = `${Math.max(MENUBAR_H, dragStart.current.py + (ev.clientY - dragStart.current.my))}px`;
      };
      const onUp = (ev: PointerEvent) => {
        setPos({ x: dragStart.current.px + (ev.clientX - dragStart.current.mx), y: Math.max(MENUBAR_H, dragStart.current.py + (ev.clientY - dragStart.current.my)) });
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
      };
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
    },
    [maximized, pos]
  );

  const onResizeStart = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      e.stopPropagation();
      resizeStart.current = { mx: e.clientX, my: e.clientY, w: size.w, h: size.h };
      const el = (e.target as HTMLElement).closest("[data-window]") as HTMLElement;
      const onMove = (ev: PointerEvent) => {
        if (!el) return;
        el.style.width = `${Math.max(520, resizeStart.current.w + (ev.clientX - resizeStart.current.mx))}px`;
        el.style.height = `${Math.max(380, resizeStart.current.h + (ev.clientY - resizeStart.current.my))}px`;
      };
      const onUp = (ev: PointerEvent) => {
        setSize({ w: Math.max(520, resizeStart.current.w + (ev.clientX - resizeStart.current.mx)), h: Math.max(380, resizeStart.current.h + (ev.clientY - resizeStart.current.my)) });
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
      };
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
    },
    [size]
  );

  const toggleMaximize = () => {
    if (isMobile) return;
    const next = !maximized;
    if (next) {
      preMax.current = { pos, size };
    } else {
      setPos(preMax.current.pos);
      setSize(preMax.current.size);
    }
    setMaximized(next);
    onMaximizeChange?.(next);
  };

  const bottomInset = isMobile ? MOBILE_TAB_BAR_H : 0;
  const style: React.CSSProperties = maximized
    ? { zIndex, position: "absolute", left: 0, top: MENUBAR_H, width: "100vw", height: `calc(100vh - ${MENUBAR_H}px - ${bottomInset}px)`, borderRadius: 0, transition: "left .3s ease, top .3s ease, width .3s ease, height .3s ease, border-radius .2s ease" }
    : { zIndex, position: "absolute", left: pos.x, top: pos.y, width: size.w, height: size.h, borderRadius: 12, transition: "border-radius .2s ease" };

  return (
    <motion.div
      data-window={id}
      initial={{ opacity: 0, scale: 0.5, y: 200 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.5, y: 200, transition: { duration: 0.2, ease: "easeIn" } }}
      transition={{ type: "spring", damping: 28, stiffness: 300, mass: 0.6 }}
      style={{ ...style, filter: "drop-shadow(0 25px 45px rgba(0,0,0,0.40)) drop-shadow(0 0 2px rgba(0,0,0,0.50))" }}
      className="flex flex-col overflow-hidden"
      onPointerDown={() => { onFocus(); setFocused(true); }}
    >
      {isMobile ? (
        <div
          className="h-[28px] flex items-center justify-center shrink-0 select-none"
          style={{ background: "linear-gradient(to bottom, #3c3c4a, #333342)", borderBottom: "0.5px solid rgba(0,0,0,0.4)" }}
        >
          <div className="flex items-center gap-[6px]">
            <span className="text-white/25" style={{ fontSize: 11 }}>{icon}</span>
            <span className="text-[12px] text-white/50 truncate max-w-[250px]" style={{ fontWeight: 500 }}>{title}</span>
          </div>
        </div>
      ) : (
        <div
          className="h-[28px] flex items-center shrink-0 select-none"
          style={{ background: focused ? "linear-gradient(to bottom, #3c3c4a, #333342)" : "#2a2a38", borderBottom: "0.5px solid rgba(0,0,0,0.4)", cursor: "default" }}
          onPointerDown={onDragStart}
          onDoubleClick={toggleMaximize}
        >
          <div className="flex items-center ml-[7px] gap-[8px]" onPointerDown={(e) => e.stopPropagation()}>
            <button onClick={onClose} className="w-[13px] h-[13px] rounded-full flex items-center justify-center group" style={{ background: focused ? "#ed6a5f" : "#ddd", border: `0.5px solid ${focused ? "#e24b41" : "#d1d0d2"}` }}>
              <svg width="6" height="6" viewBox="0 0 6 6" className="opacity-0 group-hover:opacity-100"><path d="M0.5 0.5L5.5 5.5M5.5 0.5L0.5 5.5" stroke={focused ? "#4a0002" : "#666"} strokeWidth="1.1" /></svg>
            </button>
            <button onClick={onMinimize} className="w-[13px] h-[13px] rounded-full flex items-center justify-center group" style={{ background: focused ? "#f6be50" : "#ddd", border: `0.5px solid ${focused ? "#e1a73e" : "#d1d0d2"}` }}>
              <svg width="6" height="1.5" viewBox="0 0 6 1.5" className="opacity-0 group-hover:opacity-100"><path d="M0.5 0.75H5.5" stroke={focused ? "#995700" : "#666"} strokeWidth="1.1" /></svg>
            </button>
            <button onClick={toggleMaximize} className="w-[13px] h-[13px] rounded-full flex items-center justify-center group" style={{ background: focused ? "#61c555" : "#ddd", border: `0.5px solid ${focused ? "#2dac2f" : "#d1d0d2"}` }}>
              <svg width="6" height="6" viewBox="0 0 6 6" className="opacity-0 group-hover:opacity-100"><path d="M0.5 3.5V5.5H2.5M5.5 2.5V0.5H3.5" stroke={focused ? "#006500" : "#666"} strokeWidth="1" fill="none" /></svg>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center gap-[6px] pointer-events-none -ml-[55px]">
            <span className="text-white/25" style={{ fontSize: 11 }}>{icon}</span>
            <span className="text-[12px] text-white/40 truncate max-w-[250px]" style={{ fontWeight: 500 }}>{title}</span>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-hidden bg-[#1e1e2e]">{children}</div>

      {!maximized && !isMobile && (
        <div className="absolute bottom-0 right-0 w-[8px] h-[8px] cursor-nwse-resize z-10" onPointerDown={onResizeStart} />
      )}
    </motion.div>
  );
}
