"use client";

import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ApiCategoryItem } from "../types/category.type";

interface CategoryCardProps {
  category: ApiCategoryItem;
  index?: number;
}

const CategoryCard = memo(({ category, index = 0 }: CategoryCardProps) => {
  const { _id, name, image } = category;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.04 }}
      className="h-full"
    >
      <Link href={`/categories/${_id}`} className="block h-full">
        <div className="group relative h-full rounded-2xl overflow-hidden bg-white/60 backdrop-blur-md border border-gray-200/60 shadow-sm hover:shadow-2xl transition-all duration-500">
          {/* Glow Border Effect */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 bg-linear-to-br from-green-400/20 via-transparent to-emerald-500/20 pointer-events-none" />

          {/* Image */}
          <div className="relative aspect-4/5 overflow-hidden">
            <Image
              src={image}
              alt={name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition duration-500" />

            {/* Category Name Inside Image */}
            <div className="absolute bottom-0 w-full p-5 text-white">
              <h3 className="text-lg font-semibold tracking-wide transition duration-300">
                {name}
              </h3>

              {/* Animated underline */}
              <span className="block h-0.5 w-0 bg-green-400 mt-2 group-hover:w-12 transition-all duration-500" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
});

CategoryCard.displayName = "CategoryCard";

export default CategoryCard;
