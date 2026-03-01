"use client";

import { memo } from "react";

interface QuantitySelectorProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  min?: number;
  max?: number;
  disabled?: boolean;
}

const QuantitySelector = memo(function QuantitySelector({
  quantity,
  onIncrement,
  onDecrement,
  min = 1,
  max = 99,
  disabled = false,
}: QuantitySelectorProps) {
  return (
    <div
      className={`inline-flex items-center rounded-full border border-gray-200 bg-gray-50 transition-opacity duration-150 ${
        disabled ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      <button
        onClick={onDecrement}
        disabled={disabled || quantity <= min}
        aria-label="Decrease quantity"
        className="w-8 h-8 flex items-center justify-center rounded-full text-gray-600 hover:bg-primary-50 hover:text-primary-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-150 text-base font-medium"
      >
        −
      </button>

      <span
        aria-label={`Quantity: ${quantity}`}
        className="w-8 text-center text-sm font-semibold text-gray-900 select-none"
      >
        {quantity}
      </span>

      <button
        onClick={onIncrement}
        disabled={disabled || quantity >= max}
        aria-label="Increase quantity"
        className="w-8 h-8 flex items-center justify-center rounded-full text-gray-600 hover:bg-primary-50 hover:text-primary-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-150 text-base font-medium"
      >
        +
      </button>
    </div>
  );
});

export default QuantitySelector;
