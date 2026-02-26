"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Brand } from "../types/brand.type";

interface BrandCardProps {
  brand: Brand;
}

export default function BrandCard({ brand }: BrandCardProps) {
  return (
    <Link href={`/brands/${brand._id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-green-500 transition-all duration-300"
      >
        <div className="relative aspect-square bg-gray-50 p-8 flex items-center justify-center">
          <Image
            src={brand.image}
            alt={brand.name}
            fill
            className="object-contain p-6 transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </div>
        <div className="p-4 border-t border-gray-100 bg-white group-hover:bg-green-50 transition-colors">
          <h3 className="text-center text-base font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
            {brand.name}
          </h3>
        </div>
      </motion.div>
    </Link>
  );
}
