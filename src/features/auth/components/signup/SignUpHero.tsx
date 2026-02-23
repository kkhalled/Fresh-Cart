"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf, faTruck, faShieldHalved } from "@fortawesome/free-solid-svg-icons";

const features = [
  { icon: faLeaf,         gradient: "from-emerald-500 to-green-600",  shadow: "shadow-emerald-500/20", text: "100% Fresh & Organic",  sub: "Certified organic farms only"  },
  { icon: faTruck,        gradient: "from-teal-500 to-cyan-600",       shadow: "shadow-teal-500/20",    text: "Same-Day Delivery",      sub: "Lightning-fast to your door"   },
  { icon: faShieldHalved, gradient: "from-green-500 to-emerald-600",   shadow: "shadow-green-500/20",   text: "Secure & Protected",     sub: "Enterprise-grade encryption"   },
];

export default function SignupHero() {
  return (
    <div className="relative w-full h-full overflow-hidden flex flex-col"
      >

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,800;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');

        @keyframes fc-float    { 0%,100%{transform:translateY(0) rotate(0deg)} 40%{transform:translateY(-14px) rotate(.8deg)} 70%{transform:translateY(-5px) rotate(-.8deg)} }
        @keyframes fc-float-r  { 0%,100%{transform:translateY(0) rotate(0deg)} 40%{transform:translateY(10px) rotate(-.8deg)} 70%{transform:translateY(4px) rotate(.8deg)} }
        @keyframes fc-pulse    { 0%,100%{opacity:.1;transform:scale(1)} 50%{opacity:.22;transform:scale(1.1)} }
        @keyframes fc-slide-up { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fc-spin     { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes fc-blink    { 0%,100%{opacity:.4} 50%{opacity:1} }

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
        .fc-dot { animation: fc-blink 2.5s ease-in-out infinite }
      `}</style>

      {/* Dot grid — identical to signin hero */}
    

  
      {/* Right edge */}
      <div className="absolute top-0 right-0 w-px h-full pointer-events-none"
        style={{ background:"linear-gradient(to bottom,transparent,rgba(0,0,0,0.05),transparent)" }} />

      {/* ══ CONTENT ══ */}
      <div className="relative z-10 flex flex-col h-full px-8 py-8 gap-6">

        {/* Logo */}
        <div className="fc-logo flex items-center gap-2">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path d="M10 2C10 2 4 6 4 12a6 6 0 0012 0C16 6 10 2 10 2Z" fill="#16a34a" opacity=".9"/>
            <path d="M10 8v7M10 8C10 8 7.5 10.5 7 12" stroke="#fff" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          <span className="font-black text-gray-900 text-[17px]"
            style={{ fontFamily:"'Playfair Display',serif", fontStyle:"italic" }}>
            FreshCart
          </span>
        </div>

        {/* Badge */}
        <div className="fc-badge flex items-center gap-2 w-fit">
          <span className="fc-dot w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
          <span className="text-[9.5px] font-semibold text-green-700 tracking-[0.13em] uppercase"
            style={{ fontFamily:"'DM Sans',sans-serif" }}>
            Trusted by 50,000+ customers
          </span>
        </div>

        {/* Headline */}
        <div className="fc-head">
          <h1 className="text-gray-900 font-black leading-[1.05] tracking-tight"
            style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.9rem,2.6vw,2.8rem)" }}>
            Fresh groceries,
            <br />
            <em style={{
              fontStyle:"italic",
              background:"linear-gradient(100deg,#16a34a,#4ade80)",
              WebkitBackgroundClip:"text",
              WebkitTextFillColor:"transparent",
            }}>
              delivered
            </em>{" "}to
            <br />your door.
          </h1>
          <svg className="mt-2" width="72" height="7" viewBox="0 0 72 7" fill="none">
            <path d="M2 5 Q18 2 36 4.5 Q54 7 70 3" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" fill="none" opacity=".75"/>
          </svg>
          <p className="text-gray-500 text-[12px] leading-relaxed mt-3 font-light max-w-[280px]"
            style={{ fontFamily:"'DM Sans',sans-serif" }}>
            Farm‑fresh, organic produce picked at peak ripeness and delivered the same day. Fair prices, always.
          </p>
        </div>

        {/* Feature cards — white on light bg */}
        <div className="flex flex-col gap-2 flex-1">
          {features.map(({ icon, gradient, shadow, text, sub }, i) => (
            <div key={i}
              className="fc-feat group flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-white/70 border border-gray-200/80 hover:bg-white hover:border-green-200 hover:shadow-md transition-all duration-300 cursor-default">
              <div className={`fc-feat-icon shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg ${shadow}`}>
                <FontAwesomeIcon icon={icon} className="text-white text-[10px]" />
              </div>
              <div>
                <p className="text-gray-800 text-[12px] font-semibold leading-snug">{text}</p>
                <p className="text-gray-400 text-[10px] leading-snug">{sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="fc-bottom flex flex-col gap-2.5 mt-auto">

          {/* Testimonial */}
          <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-white/60 border border-gray-200/70">
            <div className="flex -space-x-1.5 shrink-0">
              {[["SJ","#059669","#047857"],["MK","#0d9488","#0f766e"],["AR","#10b981","#059669"]].map(([init,f,t],i)=>(
                <div key={i} className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-[7px] font-bold text-white"
                  style={{ background:`linear-gradient(135deg,${f},${t})`, zIndex:3-i }}>
                  {init}
                </div>
              ))}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex gap-0.5 mb-0.5">{[...Array(5)].map((_,i)=><span key={i} className="text-yellow-400 text-[8px]">★</span>)}</div>
              <p className="text-gray-500 text-[9.5px] leading-snug truncate">Outstanding quality. Best delivery service!</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 rounded-xl overflow-hidden bg-white/60 border border-gray-200/70">
            {[["50K+","Customers"],["4.9★","Rating"],["< 24h","Delivery"]].map(([val,label],i)=>(
              <div key={i} className="text-center py-3"
                style={{ borderLeft:i>0?"1px solid rgba(0,0,0,0.06)":"none" }}>
                <p className="text-gray-900 font-black text-[14px] leading-none"
                  style={{ fontFamily:"'Playfair Display',serif" }}>{val}</p>
                <p className="text-gray-400 text-[8.5px] font-semibold mt-1 uppercase tracking-widest">{label}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}