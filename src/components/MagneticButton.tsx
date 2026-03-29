"use client";

import { useRef, useState, useCallback, ReactNode } from "react";

export function MagneticButton({
  children,
  className = "",
  strength = 4,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0 });

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = Math.max(rect.width, rect.height);

      if (dist < maxDist) {
        const factor = (1 - dist / maxDist) * strength;
        setTransform({
          x: (dx / maxDist) * factor * 10,
          y: (dy / maxDist) * factor * 10,
        });
      }
    },
    [strength]
  );

  const onMouseLeave = useCallback(() => {
    setTransform({ x: 0, y: 0 });
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={className}
      style={{
        transform: `translate(${transform.x}px, ${transform.y}px)`,
        transition: transform.x === 0 && transform.y === 0 ? "transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)" : "transform 0.15s cubic-bezier(0.23, 1, 0.32, 1)",
        display: "inline-block",
      }}
    >
      {children}
    </div>
  );
}
