"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf, faTruck, faShieldHalved } from "@fortawesome/free-solid-svg-icons";

const features = [
  { icon: faLeaf,         gradient: "from-emerald-400 to-green-500",  text: "100% Fresh & Organic",  sub: "Certified organic farms only"       },
  { icon: faTruck,        gradient: "from-teal-400 to-cyan-500",       text: "Same-Day Delivery",      sub: "Lightning-fast to your door"        },
  { icon: faShieldHalved, gradient: "from-green-400 to-emerald-500",   text: "Secure & Protected",     sub: "Enterprise-grade encryption"        },
];

export default function SignupHero() {
  return (
    <div className="relative w-full h-full overflow-hidden flex flex-col ">

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,800;1,700&display=swap');

        @keyframes fc-float        { 0%,100%{transform:translateY(0) rotate(0deg)}  40%{transform:translateY(-16px) rotate(1deg)}  70%{transform:translateY(-6px) rotate(-1deg)} }
        @keyframes fc-float-r      { 0%,100%{transform:translateY(0) rotate(0deg)}  40%{transform:translateY(12px) rotate(-1deg)}  70%{transform:translateY(5px) rotate(1deg)} }
        @keyframes fc-pulse        { 0%,100%{opacity:.12;transform:scale(1)}         50%{opacity:.28;transform:scale(1.12)} }
        @keyframes fc-slide-up     { from{opacity:0;transform:translateY(22px)}      to{opacity:1;transform:translateY(0)} }
        @keyframes fc-ping-custom  { 0%{transform:scale(1);opacity:.8} 70%{transform:scale(2);opacity:0} 100%{transform:scale(2);opacity:0} }

        .fc-logo   { animation: fc-slide-up .65s cubic-bezier(.16,1,.3,1) .05s both }
        .fc-badge  { animation: fc-slide-up .65s cubic-bezier(.16,1,.3,1) .12s both }
        .fc-head   { animation: fc-slide-up .7s  cubic-bezier(.16,1,.3,1) .20s both }
        .fc-feat   { animation: fc-slide-up .65s cubic-bezier(.16,1,.3,1) both }
        .fc-feat:nth-child(1){ animation-delay:.30s }
        .fc-feat:nth-child(2){ animation-delay:.40s }
        .fc-feat:nth-child(3){ animation-delay:.50s }
        .fc-bottom { animation: fc-slide-up .65s cubic-bezier(.16,1,.3,1) .58s both }

        .fc-feat-icon { transition: transform .3s cubic-bezier(.34,1.56,.64,1) }
        .fc-feat:hover .fc-feat-icon { transform: scale(1.15) rotate(-6deg) }
        .fc-ping { animation: fc-ping-custom 1.4s cubic-bezier(0,0,.2,1) infinite }
      `}</style>

      {/* ── BG layers ── */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#052e1c] via-[#064e3b] to-[#065f46]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_115%_-5%,rgba(16,185,129,.22),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_65%_at_-8%_108%,rgba(5,150,105,.25),transparent)]" />
      {/* Grain */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize:"160px" }} />
      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{ backgroundImage:"linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize:"52px 52px" }} />
      {/* Orbs */}
      <div className="absolute -top-16 -right-12 w-72 h-72 rounded-full pointer-events-none"
        style={{ background:"radial-gradient(circle,rgba(52,211,153,.18) 0%,transparent 70%)", animation:"fc-pulse 7s ease-in-out infinite" }} />
      <div className="absolute -bottom-14 -left-16 w-64 h-64 rounded-full pointer-events-none"
        style={{ background:"radial-gradient(circle,rgba(20,184,166,.13) 0%,transparent 70%)", animation:"fc-pulse 9s ease-in-out infinite 2s" }} />
      {/* Rings */}
      <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full border border-white/[0.05] pointer-events-none" style={{ animation:"fc-float 18s ease-in-out infinite" }} />
      <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full border border-white/[0.04] pointer-events-none" style={{ animation:"fc-float 18s ease-in-out infinite 1.5s" }} />
      <div className="absolute -bottom-16 -left-16 w-80 h-80 rounded-full border border-white/[0.04] pointer-events-none" style={{ animation:"fc-float-r 15s ease-in-out infinite" }} />
      {/* Particles */}
      <div className="absolute top-[20%] left-[14%] w-1.5 h-1.5 rounded-full bg-emerald-300/40 pointer-events-none" style={{ animation:"fc-float 7s ease-in-out infinite" }} />
      <div className="absolute top-[55%] right-[16%] w-2 h-2 rounded-full bg-white/15 pointer-events-none" style={{ animation:"fc-float-r 9s ease-in-out infinite 1s" }} />
      <div className="absolute bottom-[22%] left-[44%] w-1 h-1 rounded-full bg-teal-300/30 pointer-events-none" style={{ animation:"fc-float 11s ease-in-out infinite 3s" }} />
      {/* Right edge */}
      <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-white/[0.08] to-transparent pointer-events-none" />

      {/* ══════════ CONTENT ══════════
          Key fix: px-8 py-8 with gap-5 between sections — no justify-between
          that was creating the huge gap. Instead, logo at top, then everything
          flows naturally down with controlled spacing. ── */}
      <div className="relative z-10 shadow-2xl flex flex-col h-full px-8 py-8 gap-8">

      

        {/* Badge */}
        <div className="fc-badge flex items-center gap-2 w-fit px-3.5 py-1.5 rounded-full bg-white/[0.07] backdrop-blur-md border border-white/[0.1] shadow-md">
          <span className="relative flex h-1.5 w-1.5">
            <span className="fc-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
          </span>
          <span className="text-white/75 text-[9.5px] font-semibold tracking-[0.12em] uppercase">
            Trusted by 50,000+ customers
          </span>
        </div>

        {/* Headline */}
        <div className="fc-head">
          <h1 className="text-white font-black leading-[1.06] tracking-tight"
            style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(2rem,2.8vw,3rem)" }}>
            Fresh groceries,
            <br />
            <em className="not-italic" style={{
              fontStyle:"italic",
              background:"linear-gradient(100deg,#6ee7b7 0%,#a7f3d0 45%,#34d399 100%)",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent"
            }}>
              delivered
            </em>{" "}to
            <br />your door.
          </h1>
          {/* Accent line */}
          <div className="mt-2 w-14 h-0.5 rounded-full bg-gradient-to-r from-emerald-400 to-transparent opacity-50" />
          <p className="text-white/40 text-[12px] leading-relaxed mt-3 font-light max-w-[280px]">
            Farm‑fresh, organic produce picked at peak ripeness and delivered the same day. Fair prices, always.
          </p>
        </div>

        {/* Feature cards — flex-1 so they fill remaining space naturally */}
        <div className="flex flex-col gap-2 flex-1">
          {features.map(({ icon, gradient, text, sub }, i) => (
            <div key={i}
              className="fc-feat group flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-white/[0.05] backdrop-blur-sm border border-white/[0.07] hover:bg-white/[0.09] hover:border-white/[0.13] transition-all duration-300 cursor-default">
              <div className={`fc-feat-icon shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg shadow-black/20`}>
                <FontAwesomeIcon icon={icon} className="text-white text-[10px]" />
              </div>
              <div>
                <p className="text-white/90 text-[12px] font-semibold leading-snug">{text}</p>
                <p className="text-white/35 text-[10px] leading-snug">{sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom: testimonial + stats — pinned at bottom with mt-auto */}
        <div className="fc-bottom flex flex-col gap-2.5 mt-auto">
          {/* Mini testimonial */}
          <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.07] backdrop-blur-sm">
            <div className="flex -space-x-1.5 shrink-0">
              {[["SJ","#059669","#047857"],["MK","#0d9488","#0f766e"],["AR","#10b981","#059669"]].map(([init,f,t],i)=>(
                <div key={i} className="w-6 h-6 rounded-full border-2 border-[#054a2e] flex items-center justify-center text-[7px] font-bold text-white"
                  style={{ background:`linear-gradient(135deg,${f},${t})`, zIndex:3-i }}>
                  {init}
                </div>
              ))}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex gap-0.5 mb-0.5">{[...Array(5)].map((_,i)=><span key={i} className="text-yellow-400 text-[8px]">★</span>)}</div>
              <p className="text-white/40 text-[9.5px] leading-snug truncate">Outstanding quality. Best delivery service!</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 rounded-xl overflow-hidden bg-white/[0.04] border border-white/[0.07]">
            {[["50K+","Customers"],["4.9★","Rating"],["< 24h","Delivery"]].map(([val,label],i)=>(
              <div key={i} className="text-center py-3" style={{ borderLeft:i>0?"1px solid rgba(255,255,255,0.07)":"none" }}>
                <p className="text-white font-black text-[14px] leading-none" style={{ fontFamily:"'Playfair Display',serif" }}>{val}</p>
                <p className="text-white/35 text-[8.5px] font-semibold mt-1 uppercase tracking-widest">{label}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}