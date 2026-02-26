"use client";

import { motion } from "framer-motion";

export interface PromoBannerCardProps {
  gradientFrom: string;
  gradientTo: string;
  subtitle: string;
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  initial: { opacity: number; x: number };
  animate: { opacity: number; x: number };
}

export default function PromoBannerCard({
  gradientFrom,
  gradientTo,
  subtitle,
  title,
  description,
  buttonText,
  buttonHref,
  initial,
  animate,
}: PromoBannerCardProps) {
  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative overflow-hidden rounded-2xl group h-64 md:h-72"
    >
      <div 
        className={`absolute inset-0 bg-linear-to-br ${gradientFrom} ${gradientTo} transition-transform duration-500 group-hover:scale-105`}
      />

      <div className="relative h-full flex flex-col justify-center px-6 md:px-8 lg:px-10">
        <p className="text-sm text-white/80 mb-2">{subtitle}</p>
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
          {title}
        </h3>
        <p className="text-sm text-white/90  mb-6 max-w-xs">{description}</p>
        <div>
          <a
            href={buttonHref}
            className="inline-block px-6 py-2.5 bg-white text-green-600 font-semibold rounded-lg hover:bg-green-50 transition-colors duration-300"
          >
            {buttonText}
          </a>
        </div>
      </div>
    </motion.div>
  );
}
