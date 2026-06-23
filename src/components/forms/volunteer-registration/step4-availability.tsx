"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step4Schema, type Step4Data } from "@/lib/validations/volunteer";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const HOURS_OPTIONS = [
  { value: "1-2", label: "1–2 hrs/week" },
  { value: "3-5", label: "3–5 hrs/week" },
  { value: "5-10", label: "5–10 hrs/week" },
  { value: "10+", label: "10+ hrs/week" },
];

const FORMAT_OPTIONS = [
  { value: "online", label: "Online Only" },
  { value: "offline", label: "Offline Only" },
  { value: "both", label: "Both" },
];

const DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
const TIME_SLOTS = ["Morning (6–12 PM)","Afternoon (12–5 PM)","Evening (5–9 PM)"];

interface Props {
  defaultValues: Partial<Step4Data>;
  onNext: (data: Step4Data) => void;
  onBack: () => void;
}

function ToggleGroup({
  options,
  value,
  onChange,
}: {
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={cn(
            "rounded-full border px-4 py-1.5 text-sm font-medium transition-all",
            value === opt.value
              ? "border-green-600 bg-green-50 text-green-700"
              : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function CheckboxGroup({
  options,
  values,
  onChange,
}: {
  options: string[];
  values: string[];
  onChange: (v: string[]) => void;
}) {
  function toggle(opt: string) {
    if (values.includes(opt)) {
      onChange(values.filter((v) => v !== opt));
    } else {
      onChange([...values, opt]);
    }
  }
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => toggle(opt)}
          className={cn(
            "rounded-full border px-3 py-1.5 text-sm font-medium transition-all",
            values.includes(opt)
              ? "border-green-600 bg-green-50 text-green-700"
              : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
          )}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

export default function Step4Availability({ defaultValues, onNext, onBack }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { control, handleSubmit, register, formState: { errors } } = useForm<Step4Data>({
    resolver: zodResolver(step4Schema) as any,
    defaultValues: {
      preferredFormat: "online",
      preferredDays: [],
      preferredTimeSlots: [],
      openToOfflineYoto: false,
      openToLongTermMentoring: false,
      ...defaultValues,
    },
  });

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <form onSubmit={handleSubmit(onNext as any)} className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Availability</h2>
        <p className="text-sm text-gray-500 mt-1">Tell us when and how you can volunteer</p>
      </div>

      <div>
        <Label className="text-sm font-medium">Hours per week <span className="text-red-500">*</span></Label>
        <div className="mt-2">
          <Controller
            name="hoursPerWeek"
            control={control}
            render={({ field }) => (
              <ToggleGroup options={HOURS_OPTIONS} value={field.value} onChange={field.onChange} />
            )}
          />
        </div>
        {errors.hoursPerWeek && <p className="mt-1 text-xs text-red-500">{errors.hoursPerWeek.message}</p>}
      </div>

      <div>
        <Label className="text-sm font-medium">Preferred format <span className="text-red-500">*</span></Label>
        <div className="mt-2">
          <Controller
            name="preferredFormat"
            control={control}
            render={({ field }) => (
              <ToggleGroup options={FORMAT_OPTIONS} value={field.value} onChange={field.onChange} />
            )}
          />
        </div>
      </div>

      <div>
        <Label className="text-sm font-medium">Preferred days</Label>
        <div className="mt-2">
          <Controller
            name="preferredDays"
            control={control}
            render={({ field }) => (
              <CheckboxGroup options={DAYS} values={field.value ?? []} onChange={field.onChange} />
            )}
          />
        </div>
      </div>

      <div>
        <Label className="text-sm font-medium">Preferred time slots</Label>
        <div className="mt-2">
          <Controller
            name="preferredTimeSlots"
            control={control}
            render={({ field }) => (
              <CheckboxGroup options={TIME_SLOTS} values={field.value ?? []} onChange={field.onChange} />
            )}
          />
        </div>
      </div>

      <div className="space-y-3 rounded-lg bg-gray-50 p-4">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            {...register("openToOfflineYoto")}
            className="mt-0.5 h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-600"
          />
          <div>
            <span className="text-sm font-medium text-gray-900">Interested in YOTO offline centre</span>
            <p className="text-xs text-gray-500">Would you participate in our future physical rural training centre?</p>
          </div>
        </label>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            {...register("openToLongTermMentoring")}
            className="mt-0.5 h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-600"
          />
          <div>
            <span className="text-sm font-medium text-gray-900">Open to long-term mentoring (6+ months)</span>
            <p className="text-xs text-gray-500">Commit to mentoring the same student over an extended period.</p>
          </div>
        </label>
      </div>

      <div className="flex justify-between pt-2">
        <Button type="button" variant="outline" onClick={onBack}>← Back</Button>
        <Button type="submit" className="bg-green-600 hover:bg-green-700 px-8">Continue →</Button>
      </div>
    </form>
  );
}
