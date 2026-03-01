interface SummaryRowProps {
  label: string;
  value: string;
  valueClassName?: string;
  labelClassName?: string;
}

export default function SummaryRow({
  label,
  value,
  valueClassName = "text-gray-900",
  labelClassName = "text-gray-500",
}: SummaryRowProps) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className={`text-sm ${labelClassName}`}>{label}</span>
      <span className={`text-sm font-medium ${valueClassName}`}>{value}</span>
    </div>
  );
}
