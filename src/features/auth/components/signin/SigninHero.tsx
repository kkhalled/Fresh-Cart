"use client";

import React from "react";

const produceGrid = [
  { label: "Tomatoes",   color: "#ef4444", bg: "#fff5f5", border: "#fecaca", shape: "circle"   },
  { label: "Broccoli",   color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0", shape: "tree"     },
  { label: "Lemons",     color: "#eab308", bg: "#fefce8", border: "#fef08a", shape: "oval"     },
  { label: "Carrots",    color: "#f97316", bg: "#fff7ed", border: "#fed7aa", shape: "triangle" },

];

function ProduceShape({ shape, color }: { shape: string; color: string }) {
  switch (shape) {
    case "circle":   return <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="18" r="11" fill={color} opacity=".13"/><circle cx="16" cy="18" r="7.5" fill={color} opacity=".85"/><path d="M16 7 Q18 4 21 5" stroke={color} strokeWidth="1.6" strokeLinecap="round" fill="none"/></svg>;
    case "tree":     return <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><ellipse cx="16" cy="15" rx="9" ry="9" fill={color} opacity=".12"/><ellipse cx="16" cy="15" rx="6.5" ry="6.5" fill={color} opacity=".8"/><ellipse cx="11" cy="13" rx="4.5" ry="4.5" fill={color} opacity=".65"/><ellipse cx="21" cy="13" rx="4.5" ry="4.5" fill={color} opacity=".65"/><rect x="14" y="24" width="4" height="5" rx="1.5" fill={color} opacity=".45"/></svg>;
    case "oval":     return <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><ellipse cx="16" cy="17" rx="11" ry="11" fill={color} opacity=".12"/><ellipse cx="16" cy="17" rx="8" ry="10" fill={color} opacity=".85"/><path d="M16 7 Q19 4 21 6" stroke={color} strokeWidth="1.6" strokeLinecap="round" fill="none"/></svg>;
    case "triangle": return <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><polygon points="16,8 26,28 6,28" fill={color} opacity=".12"/><polygon points="16,10 24,27 8,27" fill={color} opacity=".85"/><line x1="16" y1="10" x2="16" y2="5" stroke={color} strokeWidth="2" strokeLinecap="round"/></svg>;
    default:         return <svg width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="10" fill={color} opacity=".8"/></svg>;
  }
}

export default function SigninHero() {
  return (
    <div className="relative w-full h-full overflow-hidden flex flex-col justify-center"
     >

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,800;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');

        @keyframes sh-up   { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes sh-bob  { 0%,100%{transform:translateY(0) rotate(var(--r,0deg))} 50%{transform:translateY(-6px) rotate(var(--r,0deg))} }
        @keyframes sh-spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes sh-blink{ 0%,100%{opacity:.4} 50%{opacity:1} }

        .sh-logo { animation:sh-up .6s cubic-bezier(.16,1,.3,1) .05s both }
        .sh-tag  { animation:sh-up .6s cubic-bezier(.16,1,.3,1) .12s both }
        .sh-head { animation:sh-up .7s cubic-bezier(.16,1,.3,1) .18s both }
        .sh-sub  { animation:sh-up .6s cubic-bezier(.16,1,.3,1) .26s both }
        .sh-grid { animation:sh-up .6s cubic-bezier(.16,1,.3,1) .32s both }
        .sh-foot { animation:sh-up .6s cubic-bezier(.16,1,.3,1) .40s both }

        .sh-card { transition:transform .25s cubic-bezier(.34,1.56,.64,1),box-shadow .25s ease }
        .sh-card:hover { transform:translateY(-5px) scale(1.05); box-shadow:0 10px 28px rgba(0,0,0,0.09) }

        .sh-bob-1{animation:sh-bob 5.5s ease-in-out infinite 0s;   --r:-2deg}
        .sh-bob-2{animation:sh-bob 6.5s ease-in-out infinite .7s;  --r: 2deg}
        .sh-bob-3{animation:sh-bob 7.0s ease-in-out infinite .4s;  --r:-1deg}
        .sh-bob-4{animation:sh-bob 5.2s ease-in-out infinite 1.0s; --r: 2deg}
        .sh-bob-5{animation:sh-bob 6.0s ease-in-out infinite .2s;  --r:-2deg}
        .sh-bob-6{animation:sh-bob 7.5s ease-in-out infinite .5s;  --r: 1deg}
        .sh-bob-7{animation:sh-bob 5.8s ease-in-out infinite 1.2s; --r:-1deg}
        .sh-bob-8{animation:sh-bob 6.3s ease-in-out infinite .3s;  --r: 2deg}

        .sh-dot { animation:sh-blink 2.5s ease-in-out infinite }
      `}</style>

    
    
      {/* ══ CONTENT ══ */}
      <div className="relative z-10 flex flex-col px-9 py-8 gap-5">

        {/* Logo — text only, matches form header style */}
        <div className="sh-logo flex items-center gap-2">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path d="M10 2C10 2 4 6 4 12a6 6 0 0012 0C16 6 10 2 10 2Z" fill="#16a34a" opacity=".9"/>
            <path d="M10 8v7M10 8C10 8 7.5 10.5 7 12" stroke="#fff" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          <span className="font-black text-gray-900 text-[17px]"
            style={{ fontFamily:"'Playfair Display',serif", fontStyle:"italic" }}>
            FreshCart
          </span>
        </div>

        {/* Live tag */}
        <div className="sh-tag flex items-center gap-2 w-fit">
          <span className="sh-dot w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
          <span className="text-[9.5px] font-semibold text-green-700 tracking-[0.13em] uppercase"
            style={{ fontFamily:"'DM Sans',sans-serif" }}>
            In season · Delivered daily
          </span>
        </div>

        {/* Headline */}
        <div className="sh-head">
          <h1 className="text-gray-900 font-black leading-[1.05] tracking-tight"
            style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.9rem,2.5vw,2.7rem)" }}>
            Your basket
            <br />
            is{" "}
            <em style={{
              fontStyle:"italic",
              background:"linear-gradient(100deg,#16a34a,#4ade80)",
              WebkitBackgroundClip:"text",
              WebkitTextFillColor:"transparent",
            }}>
              waiting
            </em>
            <br />
            for you.
          </h1>
          <svg className="mt-1.5" width="68" height="7" viewBox="0 0 68 7" fill="none">
            <path d="M2 5 Q17 2 34 4.5 Q51 7 66 3" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" fill="none" opacity=".75"/>
          </svg>
        </div>

        {/* Sub */}
        <p className="sh-sub text-gray-500 text-[12px] leading-relaxed font-light max-w-66.25 -mt-1"
          style={{ fontFamily:"'DM Sans',sans-serif" }}>
          Sign back in and pick up right where you left off — your favorites, orders, and fresh deals are ready.
        </p>

        {/* Produce grid */}
        <div className="sh-grid grid grid-cols-4 gap-2">
          {produceGrid.map(({ label, color, bg, border, shape }, i) => (
            <div key={label}
              className={`sh-card sh-bob-${i + 1} flex flex-col items-center justify-center gap-1.5 rounded-2xl border py-3.5 cursor-default select-none`}
              style={{ background:bg, borderColor:border }}>
              <ProduceShape shape={shape} color={color} />
              <span className="text-[9px] font-semibold text-gray-500 tracking-wide"
                style={{ fontFamily:"'DM Sans',sans-serif" }}>
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="sh-foot flex items-center justify-between pt-3"
          style={{ borderTop:"1px dashed rgba(0,0,0,0.09)" }}>

          {/* Badges */}
          <div className="flex items-center gap-4">
            {[
              { label:"Free Delivery", d:"M1 3h15v13H1zM16 8l4 2-4 2M5 3V1M11 3V1" },
              { label:"SSL Secured",   d:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" },
              { label:"4.9 Rating",    d:"M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" },
            ].map(({ label, d }) => (
              <div key={label} className="flex items-center gap-1.5">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={d}/>
                </svg>
                <span className="text-[10px] font-medium text-gray-500" style={{ fontFamily:"'DM Sans',sans-serif" }}>
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Avatars + count */}
          <div className="flex items-center gap-2">
            <div className="flex -space-x-1.5">
              {[["#059669","SJ"],["#0d9488","MK"],["#16a34a","AR"]].map(([bg,init],i) => (
                <div key={i} className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center text-[6px] font-bold text-white"
                  style={{ background:bg, zIndex:3-i }}>
                  {init}
                </div>
              ))}
            </div>
            <p className="text-[10px] text-gray-400" style={{ fontFamily:"'DM Sans',sans-serif" }}>
              <span className="text-gray-700 font-semibold">50K+</span> customers
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}