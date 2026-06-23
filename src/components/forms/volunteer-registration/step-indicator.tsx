"use client";

const STEPS = [
  "Personal",
  "Professional",
  "Skills",
  "Availability",
  "Motivation",
];

interface StepIndicatorProps {
  currentStep: number;
}

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        {STEPS.map((label, i) => {
          const step = i + 1;
          const done = step < currentStep;
          const active = step === currentStep;
          return (
            <div key={label} className="flex flex-col items-center flex-1">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors
                  ${done ? "bg-green-600 text-white" : active ? "bg-green-600 text-white ring-4 ring-green-100" : "bg-gray-100 text-gray-400"}`}
              >
                {done ? "✓" : step}
              </div>
              <span
                className={`mt-1 text-xs hidden sm:block ${active ? "text-green-600 font-medium" : "text-gray-400"}`}
              >
                {label}
              </span>
              {i < STEPS.length - 1 && (
                <div className="absolute" />
              )}
            </div>
          );
        })}
      </div>
      <div className="relative mt-1 h-1.5 bg-gray-100 rounded-full">
        <div
          className="absolute left-0 top-0 h-1.5 bg-green-600 rounded-full transition-all duration-300"
          style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
        />
      </div>
      <p className="mt-3 text-xs text-gray-500 text-right">
        Step {currentStep} of {STEPS.length}
      </p>
    </div>
  );
}
