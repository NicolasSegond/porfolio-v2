"use client";

import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

export function TextReveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  // Split children text into words
  const text = typeof children === "string" ? children : "";
  const words = text.split(" ");

  if (!text) {
    return <span className={className}>{children}</span>;
  }

  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: "100%", opacity: 0 }}
            animate={
              isInView
                ? { y: "0%", opacity: 1 }
                : { y: "100%", opacity: 0 }
            }
            transition={{
              duration: 0.5,
              delay: i * 0.06,
              ease: [0.23, 1, 0.32, 1],
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && "\u00A0"}
        </span>
      ))}
    </span>
  );
}

/**
 * Variant that supports mixed content (plain text + JSX like <span>).
 * Wraps each segment: plain text words get the reveal, JSX nodes get a single reveal.
 */
export function TextRevealRich({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  // Flatten children into segments
  const segments: { type: "word"; text: string }[] | { type: "node"; node: ReactNode }[] = [];
  let wordIndex = 0;

  const flatten = (node: ReactNode) => {
    if (typeof node === "string") {
      node.split(" ").forEach((w, i, arr) => {
        if (w) (segments as { type: "word"; text: string }[]).push({ type: "word", text: w });
        if (i < arr.length - 1 && w) wordIndex++;
      });
    } else if (Array.isArray(node)) {
      node.forEach(flatten);
    } else if (node) {
      (segments as { type: "node"; node: ReactNode }[]).push({ type: "node", node });
    }
  };
  flatten(children);

  return (
    <span ref={ref} className={className}>
      {(segments as Array<{ type: string; text?: string; node?: ReactNode }>).map((seg, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: "100%", opacity: 0 }}
            animate={
              isInView
                ? { y: "0%", opacity: 1 }
                : { y: "100%", opacity: 0 }
            }
            transition={{
              duration: 0.5,
              delay: i * 0.06,
              ease: [0.23, 1, 0.32, 1],
            }}
          >
            {seg.type === "word" ? seg.text : seg.node}
          </motion.span>
          {i < segments.length - 1 && "\u00A0"}
        </span>
      ))}
    </span>
  );
}
