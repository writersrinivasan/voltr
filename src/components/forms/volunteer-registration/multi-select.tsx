"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Option {
  value: string;
  label: string;
  icon?: string;
}

interface MultiSelectProps {
  options: Option[];
  selected: string[];
  onChange: (values: string[]) => void;
  className?: string;
}

export default function MultiSelect({
  options,
  selected,
  onChange,
  className,
}: MultiSelectProps) {
  function toggle(value: string) {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  }

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {options.map((opt) => {
        const isSelected = selected.includes(opt.value);
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => toggle(opt.value)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-all",
              isSelected
                ? "border-green-600 bg-green-50 text-green-700"
                : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
            )}
          >
            {opt.icon && <span>{opt.icon}</span>}
            {opt.label}
            {isSelected && <span className="text-green-600 ml-0.5">✓</span>}
          </button>
        );
      })}
    </div>
  );
}
