"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

type Project = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  image: string;
  details: {
    context: string;
    features: string[];
    role: string;
  };
};

const tagColors = [
  "bg-v/10 text-v",
  "bg-r/10 text-r",
  "bg-s/10 text-s",
  "bg-o/10 text-o",
  "bg-e/10 text-e",
];

const tabs = [
  { key: "context", label: "Contexte" },
  { key: "features", label: "Fonctionnalités" },
  { key: "role", label: "Mon rôle" },
] as const;

type TabKey = (typeof tabs)[number]["key"];

export function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState<TabKey>("context");

  // Reset tab when project changes
  useEffect(() => {
    if (project) setActiveTab("context");
  }, [project]);

  // Lock body scroll
  useEffect(() => {
    if (project) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  // Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          onClick={onClose}
        >
          {/* Blurred background image */}
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={project.image}
              alt=""
              fill
              className="object-cover scale-110 blur-[60px] brightness-50"
              priority
            />
            <div className="absolute inset-0 bg-fg/60 backdrop-blur-sm" />
          </div>

          {/* Close button — top right */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.2 }}
            onClick={onClose}
            className="absolute top-4 right-4 md:top-8 md:right-8 z-[102] w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all group"
          >
            <X size={20} className="text-white group-hover:rotate-90 transition-transform duration-300" />
          </motion.button>

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300, mass: 0.8 }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-[101] w-full max-w-3xl max-h-[90vh] bg-card rounded-3xl overflow-hidden shadow-2xl shadow-black/40 flex flex-col"
          >
            {/* Hero image */}
            <div className="relative h-56 md:h-72 w-full shrink-0">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
            </div>

            {/* Scrollable content */}
            <div className="overflow-y-auto flex-1 px-6 md:px-10 pb-10 -mt-16 relative">
              {/* Tech tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((t, i) => (
                  <motion.span
                    key={t}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.05 }}
                    className={`text-xs font-bold px-3 py-1.5 rounded-full ${tagColors[i % tagColors.length]}`}
                  >
                    {t}
                  </motion.span>
                ))}
              </div>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xs font-bold text-v uppercase tracking-widest mb-2"
              >
                {project.subtitle}
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="text-3xl md:text-4xl font-black tracking-tight mb-4"
              >
                {project.title}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-lg text-muted2 leading-relaxed mb-8"
              >
                {project.description}
              </motion.p>

              {/* Tabs */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="flex gap-1 bg-bg rounded-xl p-1 mb-6"
              >
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`relative flex-1 px-4 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${
                      activeTab === tab.key
                        ? "text-fg"
                        : "text-muted hover:text-fg"
                    }`}
                  >
                    {activeTab === tab.key && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-card rounded-lg shadow-sm"
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                      />
                    )}
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                ))}
              </motion.div>

              {/* Tab content */}
              <AnimatePresence mode="wait">
                {activeTab === "context" && (
                  <motion.div
                    key="context"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                    className="bg-bg rounded-2xl p-6"
                  >
                    <p className="text-muted2 leading-relaxed text-lg">
                      {project.details.context}
                    </p>
                  </motion.div>
                )}

                {activeTab === "features" && (
                  <motion.div
                    key="features"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3"
                  >
                    {project.details.features.map((f, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08, duration: 0.3 }}
                        className="flex items-start gap-3 bg-bg rounded-xl p-4"
                      >
                        <CheckCircle2 size={18} className="text-e mt-0.5 shrink-0" />
                        <span className="text-muted2 leading-relaxed">{f}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {activeTab === "role" && (
                  <motion.div
                    key="role"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                    className="bg-gradient-to-r from-v/10 to-r/10 rounded-2xl p-6 border border-v/20"
                  >
                    <p className="text-fg font-semibold leading-relaxed text-lg">
                      {project.details.role}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
