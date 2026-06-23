"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step5Schema, type Step5Data } from "@/lib/validations/volunteer";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";

interface Props {
  defaultValues: Partial<Step5Data>;
  onSubmit: (data: Step5Data) => void;
  onBack: () => void;
  isSubmitting: boolean;
  submitError: string | null;
}

export default function Step5Motivation({ defaultValues, onSubmit, onBack, isSubmitting, submitError }: Props) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Step5Data>({
    resolver: zodResolver(step5Schema),
    defaultValues: {
      donationInterest: "maybe",
      ...defaultValues,
    },
  });

  const motivationText = watch("motivationStatement") ?? "";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Motivation & Consent</h2>
        <p className="text-sm text-gray-500 mt-1">Tell us why you want to make a difference</p>
      </div>

      <div>
        <Label htmlFor="motivationStatement">
          Why do you want to volunteer with VOLTR? <span className="text-red-500">*</span>
        </Label>
        <p className="text-xs text-gray-500 mb-1">Minimum 100 characters</p>
        <Textarea
          id="motivationStatement"
          {...register("motivationStatement")}
          rows={6}
          placeholder="Share your story — what drives you to mentor rural students? What do you hope to contribute and gain from this experience?"
          className="mt-1 resize-none"
        />
        <div className="mt-1 flex justify-between">
          {errors.motivationStatement
            ? <p className="text-xs text-red-500">{errors.motivationStatement.message}</p>
            : <span />}
          <p className="text-xs text-gray-400">{motivationText.length}/1000</p>
        </div>
      </div>

      <div>
        <Label className="text-sm font-medium">Would you consider a financial donation in the future?</Label>
        <p className="text-xs text-gray-500 mb-2">We&apos;re not collecting payments. This is for planning purposes only.</p>
        <div className="flex gap-3">
          {[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
            { value: "maybe", label: "Maybe later" },
          ].map((opt) => (
            <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                {...register("donationInterest")}
                value={opt.value}
                className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-600"
              />
              <span className="text-sm text-gray-700">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 p-4">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            {...register("termsAccepted")}
            className="mt-0.5 h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-600"
          />
          <span className="text-sm text-gray-700">
            I agree to the{" "}
            <a href="/terms" className="text-green-600 underline" target="_blank">Terms of Use</a>{" "}
            and{" "}
            <a href="/privacy" className="text-green-600 underline" target="_blank">Privacy Policy</a>.
            I understand that my data will be used to match me with students and manage my volunteer profile.
          </span>
        </label>
        {errors.termsAccepted && <p className="mt-2 text-xs text-red-500">{errors.termsAccepted.message}</p>}
      </div>

      {submitError && (
        <Alert variant="destructive">
          <AlertDescription>{submitError}</AlertDescription>
        </Alert>
      )}

      <div className="flex justify-between pt-2">
        <Button type="button" variant="outline" onClick={onBack} disabled={isSubmitting}>
          ← Back
        </Button>
        <Button
          type="submit"
          className="bg-green-600 hover:bg-green-700 px-8"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting…" : "Submit Application"}
        </Button>
      </div>
    </form>
  );
}
