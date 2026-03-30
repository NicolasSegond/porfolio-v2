"use client";

import { motion } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";
import { MOBILE_TAB_BAR_H } from "./Dock";

const MENUBAR_H = 25;
const DOCK_H = 90;

type Props = {
  id: string;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
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
  defaultSize = { w: 700, h: 500 },
  zIndex,
  onFocus,
  onClose,
  onMinimize,
  onMaximizeChange,
}: Props) {
  const [maximized, setMaximized] = useState(false);
  const [size, setSize] = useState(defaultSize);
  const [pos, setPos] = useState({ x: 0, y: MENUBAR_H });
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    const x = Math.max(0, (window.innerWidth - defaultSize.w) / 2);
    const y = Math.max(MENUBAR_H, (window.innerHeight - defaultSize.h) / 2);
    setPos({ x, y });
  }, []);
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
      const curW = size.w;
      const clamp = (rawX: number, rawY: number) => {
        const minVis = 100;
        return {
          x: Math.max(-curW + minVis, Math.min(rawX, window.innerWidth - minVis)),
          y: Math.max(MENUBAR_H, Math.min(rawY, window.innerHeight - 40)),
        };
      };
      const onMove = (ev: PointerEvent) => {
        if (!el) return;
        const { x, y } = clamp(
          dragStart.current.px + (ev.clientX - dragStart.current.mx),
          dragStart.current.py + (ev.clientY - dragStart.current.my),
        );
        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
      };
      const onUp = (ev: PointerEvent) => {
        const clamped = clamp(
          dragStart.current.px + (ev.clientX - dragStart.current.mx),
          dragStart.current.py + (ev.clientY - dragStart.current.my),
        );
        setPos(clamped);
        if (el) { el.style.left = `${clamped.x}px`; el.style.top = `${clamped.y}px`; }
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
      };
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
    },
    [maximized, pos, size]
  );

  const onEdgeResize = useCallback(
    (e: React.PointerEvent, edges: { top?: boolean; bottom?: boolean; left?: boolean; right?: boolean }) => {
      e.preventDefault();
      e.stopPropagation();
      const start = { mx: e.clientX, my: e.clientY, w: size.w, h: size.h, x: pos.x, y: pos.y };
      const el = (e.target as HTMLElement).closest("[data-window]") as HTMLElement;
      const calc = (ev: { clientX: number; clientY: number }) => {
        const dx = ev.clientX - start.mx;
        const dy = ev.clientY - start.my;
        let newW = start.w, newH = start.h, newX = start.x, newY = start.y;
        if (edges.right) newW = Math.max(520, start.w + dx);
        if (edges.bottom) {
          newH = Math.max(380, start.h + dy);
        }
        if (edges.left) { newW = Math.max(520, start.w - dx); newX = start.x + start.w - newW; }
        if (edges.top) { newH = Math.max(380, start.h - dy); newY = Math.max(MENUBAR_H, start.y + start.h - newH); }
        return { newW, newH, newX, newY };
      };
      const onMove = (ev: PointerEvent) => {
        if (!el) return;
        const { newW, newH, newX, newY } = calc(ev);
        el.style.width = `${newW}px`;
        el.style.height = `${newH}px`;
        el.style.left = `${newX}px`;
        el.style.top = `${newY}px`;
      };
      const onUp = (ev: PointerEvent) => {
        const { newW, newH, newX, newY } = calc(ev);
        setSize({ w: newW, h: newH });
        setPos({ x: newX, y: newY });
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
      };
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
    },
    [size, pos]
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

      {!maximized && !isMobile && <>
        <div className="absolute top-0 left-[6px] right-[6px] h-[4px] cursor-ns-resize z-10" onPointerDown={(e) => onEdgeResize(e, { top: true })} />
        <div className="absolute bottom-0 left-[6px] right-[6px] h-[4px] cursor-ns-resize z-10" onPointerDown={(e) => onEdgeResize(e, { bottom: true })} />
        <div className="absolute left-0 top-[6px] bottom-[6px] w-[4px] cursor-ew-resize z-10" onPointerDown={(e) => onEdgeResize(e, { left: true })} />
        <div className="absolute right-0 top-[6px] bottom-[6px] w-[4px] cursor-ew-resize z-10" onPointerDown={(e) => onEdgeResize(e, { right: true })} />
        <div className="absolute top-0 left-0 w-[6px] h-[6px] cursor-nwse-resize z-10" onPointerDown={(e) => onEdgeResize(e, { top: true, left: true })} />
        <div className="absolute top-0 right-0 w-[6px] h-[6px] cursor-nesw-resize z-10" onPointerDown={(e) => onEdgeResize(e, { top: true, right: true })} />
        <div className="absolute bottom-0 left-0 w-[6px] h-[6px] cursor-nesw-resize z-10" onPointerDown={(e) => onEdgeResize(e, { bottom: true, left: true })} />
        <div className="absolute bottom-0 right-0 w-[6px] h-[6px] cursor-nwse-resize z-10" onPointerDown={(e) => onEdgeResize(e, { bottom: true, right: true })} />
      </>}
    </motion.div>
  );
}
