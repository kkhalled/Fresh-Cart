"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface StatsCardProps {
  icon: IconDefinition;
  label: string;
  value: string | number;
  color?: "green" | "blue" | "orange" | "purple";
}

export default function StatsCard({ icon, label, value, color = "green" }: StatsCardProps) {
  const colorClasses = {
    green: {
      bg: "bg-green-50",
      icon: "bg-green-500",
      text: "text-green-600",
    },
    blue: {
      bg: "bg-blue-50",
      icon: "bg-blue-500",
      text: "text-blue-600",
    },
    orange: {
      bg: "bg-orange-50",
      icon: "bg-orange-500",
      text: "text-orange-600",
    },
    purple: {
      bg: "bg-purple-50",
      icon: "bg-purple-500",
      text: "text-purple-600",
    },
  };

  return (
    <div className={`${colorClasses[color].bg} rounded-xl p-5 border border-transparent hover:border-gray-200 transition-all duration-300 hover:shadow-sm`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1.5">
            {label}
          </p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`${colorClasses[color].icon} w-11 h-11 rounded-lg flex items-center justify-center shadow-sm`}>
          <FontAwesomeIcon icon={icon} className="w-5 h-5 text-white" />
        </div>
      </div>
    </div>
  );
}
