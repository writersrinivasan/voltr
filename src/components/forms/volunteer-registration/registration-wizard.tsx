"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
  step5Schema,
  type Step1Data,
  type Step2Data,
  type Step3Data,
  type Step4Data,
  type Step5Data,
} from "@/lib/validations/volunteer";

import StepIndicator from "./step-indicator";
import Step1Personal from "./step1-personal";
import Step2Professional from "./step2-professional";
import Step3Skills from "./step3-skills";
import Step4Availability from "./step4-availability";
import Step5Motivation from "./step5-motivation";

type AllData = Step1Data & { password: string } & Step2Data & Step3Data & Step4Data & Step5Data;

const SCHEMAS = [step1Schema, step2Schema, step3Schema, step4Schema, step5Schema];

export default function RegistrationWizard() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<AllData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  function handleStepData(data: Partial<AllData>) {
    setFormData((prev) => ({ ...prev, ...data }));
    if (currentStep < 5) {
      setCurrentStep((s) => s + 1);
    }
  }

  async function handleFinalSubmit(data: Step5Data) {
    const payload = { ...formData, ...data };
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) {
        setSubmitError(json.error?.message ?? "Something went wrong. Please try again.");
        return;
      }
      router.push("/auth/verify-email?sent=true");
    } catch {
      setSubmitError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <StepIndicator currentStep={currentStep} />

      {currentStep === 1 && (
        <Step1Personal
          defaultValues={formData as Step1Data}
          onNext={handleStepData}
        />
      )}
      {currentStep === 2 && (
        <Step2Professional
          defaultValues={formData as Step2Data}
          onNext={handleStepData}
          onBack={() => setCurrentStep(1)}
        />
      )}
      {currentStep === 3 && (
        <Step3Skills
          defaultValues={formData as Step3Data}
          onNext={handleStepData}
          onBack={() => setCurrentStep(2)}
        />
      )}
      {currentStep === 4 && (
        <Step4Availability
          defaultValues={formData as Step4Data}
          onNext={handleStepData}
          onBack={() => setCurrentStep(3)}
        />
      )}
      {currentStep === 5 && (
        <Step5Motivation
          defaultValues={formData as Step5Data}
          onSubmit={handleFinalSubmit}
          onBack={() => setCurrentStep(4)}
          isSubmitting={isSubmitting}
          submitError={submitError}
        />
      )}
    </div>
  );
}
