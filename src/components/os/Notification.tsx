"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function Notification() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShow(true), 1500);
    const t2 = setTimeout(() => setShow(false), 7000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed top-[35px] right-3 z-[300] w-[340px]"
          onClick={() => setShow(false)}
        >
          <div
            className="rounded-2xl p-3 flex items-start gap-3 cursor-pointer"
            style={{
              background: "rgba(50,50,65,0.85)",
              backdropFilter: "blur(40px) saturate(1.8)",
              WebkitBackdropFilter: "blur(40px) saturate(1.8)",
              border: "0.5px solid rgba(255,255,255,0.12)",
              boxShadow: "0 12px 40px rgba(0,0,0,0.4), 0 0 0 0.5px rgba(0,0,0,0.3)",
            }}
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#7C3AED] to-[#EC4899] flex items-center justify-center shrink-0 text-white text-[16px] font-black">N</div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-[12px] font-semibold text-white/80">Portfolio</span>
                <span className="text-[10px] text-white/25">maintenant</span>
              </div>
              <p className="text-[12px] text-white/50 leading-snug">Bienvenue ! Explore le dock en bas pour découvrir mon parcours, mes projets et me contacter.</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
