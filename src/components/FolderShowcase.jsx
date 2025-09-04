"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const FOLDERS = [
  { id: "ai",   label: "AI Coach",  color: "#7C3AED",
    project: { title:"AI Interview Coach", subtitle:"React · OpenAI · Tailwind",
      image:"https://i.pravatar.cc/640?img=1",
      description:"An AI-driven mock interview app with real-time feedback.",
      links:[{href:"#",text:"Code"}], tags:["React","OpenAI","Tailwind"] } },
  { id: "gm",   label: "Glucose",   color: "#2563EB",
    project: { title:"Noninvasive Glucose Monitor", subtitle:"Python · BioSignals · ML",
      image:"https://i.pravatar.cc/640?img=2",
      description:"Signal processing + regression for glucose estimation.",
      links:[{href:"#",text:"Code"}], tags:["Python","NumPy","Pandas"] } },
  { id: "pf",   label: "Portfolio", color: "#0EA5E9",
    project: { title:"Personal Portfolio", subtitle:"React · GSAP · Framer",
      image:"https://i.pravatar.cc/640?img=4",
      description:"Interactive portfolio with playful UI/UX.",
      links:[{href:"#",text:"Code"}], tags:["React","Framer","GSAP"] } },
  { id: "ct",   label: "Crypto",    color: "#22C55E",
    project: { title:"Crypto Tracker", subtitle:"Next.js · CoinGecko",
      image:"https://i.pravatar.cc/640?img=5",
      description:"Live prices, charts, watchlists.",
      links:[{href:"#",text:"Code"}], tags:["Next.js","API","Chart.js"] } },
];

const sheetVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  show:   { opacity: 1, y: -8, scale: 1, transition:{ type:"spring", stiffness:260, damping:22 }},
  exit:   { opacity: 0, y: 24, scale: 0.98, transition:{ duration:0.18 } },
};

export default function FolderShowcase({ folders = FOLDERS }) {
  const [active, setActive] = React.useState(null);

  return (
    <div className="bg-black text-white">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {folders.map((f) => (
          <FolderCard
            key={f.id}
            folder={f}
            isActive={active === f.id}
            onOpen={() => setActive(f.id)}
            onClose={() => setActive(null)}
          />
        ))}
      </div>
    </div>
  );
}

function FolderCard({ folder, isActive, onOpen, onClose }) {
  const project = folder?.project;

  return (
    <div className="relative">
      <button
        onClick={onOpen}
        className="group relative aspect-[5/4] w-full rounded-2xl bg-[#0b0b0b] border border-white/10 overflow-hidden shadow-lg"
        aria-label={`Open ${folder.label}`}
      >
        <div className="absolute inset-0 flex items-end">
          <div className="w-full h-[72%] rounded-t-[18px] mx-auto relative">
            <SVGFolder color={folder.color} />
          </div>
        </div>
        <div className="absolute left-0 top-0 p-3">
          <span
            className="text-xs font-semibold tracking-wide px-2 py-1 rounded-md"
            style={{ background: `${folder.color}22`, color: folder.color }}
          >
            {folder.label}
          </span>
        </div>
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 h-1 w-12 rounded-full bg-white/10" />
      </button>

      {/* Paper slides out of THIS folder (no page overlay) */}
      <AnimatePresence>
        {isActive && project && (
          <motion.div
            variants={sheetVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="absolute left-1/2 -translate-x-1/2 -top-4 z-20 w-[92%] max-w-md"
          >
            <PaperCard project={project} onClose={onClose} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PaperCard({ project, onClose }) {
  return (
    <div className="relative">
      <div className="absolute inset-0 translate-y-2 rotate-[0.4deg] bg-white/80 rounded-xl shadow-xl" />
      <div className="absolute inset-0 translate-y-1 -rotate-[0.4deg] bg-white/90 rounded-xl shadow-xl" />

      <div className="relative bg-white text-black rounded-2xl shadow-2xl ring-1 ring-black/5 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-black/10">
          <div className="flex flex-col">
            <h4 className="text-lg font-semibold">{project.title}</h4>
            <p className="text-xs text-neutral-600">{project.subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="group inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-md bg-black text-white hover:bg-neutral-800"
          >
            Close
            <svg width="14" height="14" viewBox="0 0 24 24" className="opacity-80 group-hover:opacity-100">
              <path fill="currentColor" d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7a1 1 0 1 0-1.41 1.41L10.59 12l-4.9 4.89a1 1 0 1 0 1.41 1.41L12 13.41l4.89 4.9a1 1 0 0 0 1.41-1.41L13.41 12l4.9-4.89a1 1 0 0 0-.01-1.4Z"/>
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <img src={project.image} alt={project.title} className="w-full h-56 md:h-full object-cover" />
          <div className="p-5 md:p-6">
            <p className="text-sm leading-relaxed text-neutral-800">{project.description}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {(project.tags ?? []).map((t) => (
                <span key={t} className="text-[11px] uppercase tracking-wide px-2 py-1 rounded-md bg-neutral-100 border border-neutral-200 text-neutral-700">
                  {t}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 mt-5">
              {(project.links ?? []).map((l) => (
                <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-md bg-black text-white hover:bg-neutral-800">
                  {l.text}
                  <svg width="14" height="14" viewBox="0 0 24 24"><path fill="currentColor" d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3ZM5 5h5v2H7v10h10v-3h2v5H5V5Z"/></svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SVGFolder({ color = "#7C3AED" }) {
  return (
    <svg viewBox="0 0 260 160" className="w-full h-full">
      <rect x="8" y="26" width="244" height="110" rx="16" fill="#111114" />
      <rect x="8" y="26" width="244" height="110" rx="16" fill="url(#g1)" opacity="0.5" />
      <path d="M26 26h78l18 16h112a12 12 0 0 1 12 12v12H14V38a12 12 0 0 1 12-12Z" fill={color} />
      <rect x="14" y="46" width="232" height="90" rx="14" fill="#151517" />
      <rect x="14" y="46" width="232" height="90" rx="14" fill="url(#g2)" opacity="0.5" />
      <rect x="14" y="46" width="232" height="90" rx="14" fill="none" stroke="white" strokeOpacity=".06" />
      <defs>
        <linearGradient id="g1" x1="0" x2="0" y1="26" y2="136">
          <stop offset="0" stopColor="#ffffff" stopOpacity=".06" />
          <stop offset="1" stopColor="#000000" stopOpacity=".2" />
        </linearGradient>
        <linearGradient id="g2" x1="0" x2="0" y1="46" y2="136">
          <stop offset="0" stopColor="#ffffff" stopOpacity=".06" />
          <stop offset="1" stopColor="#000000" stopOpacity=".2" />
        </linearGradient>
      </defs>
    </svg>
  );
}
