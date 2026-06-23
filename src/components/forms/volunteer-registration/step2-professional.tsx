"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step2Schema, type Step2Data } from "@/lib/validations/volunteer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const INDUSTRIES = [
  "Information Technology","Banking & Finance","Healthcare","Education","Manufacturing",
  "Retail & E-commerce","Media & Entertainment","Government & Public Sector",
  "Consulting","Telecommunications","Real Estate","Agriculture","NGO / Non-Profit","Other",
];

const QUALIFICATIONS = [
  "High School","Diploma","Bachelor's Degree","Master's Degree","MBA","PhD","Other",
];

interface Props {
  defaultValues: Partial<Step2Data>;
  onNext: (data: Step2Data) => void;
  onBack: () => void;
}

export default function Step2Professional({ defaultValues, onNext, onBack }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { register, handleSubmit, formState: { errors } } = useForm<Step2Data>({
    resolver: zodResolver(step2Schema) as any,
    defaultValues,
  });

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <form onSubmit={handleSubmit(onNext as any)} className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Professional Background</h2>
        <p className="text-sm text-gray-500 mt-1">Tell us about your professional experience</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="jobTitle">Job Title <span className="text-red-500">*</span></Label>
          <Input id="jobTitle" {...register("jobTitle")} placeholder="Senior Software Engineer" className="mt-1" />
          {errors.jobTitle && <p className="mt-1 text-xs text-red-500">{errors.jobTitle.message}</p>}
        </div>

        <div>
          <Label htmlFor="organization">Organization <span className="text-red-500">*</span></Label>
          <Input id="organization" {...register("organization")} placeholder="Infosys" className="mt-1" />
          {errors.organization && <p className="mt-1 text-xs text-red-500">{errors.organization.message}</p>}
        </div>

        <div>
          <Label htmlFor="industry">Industry</Label>
          <select
            id="industry"
            {...register("industry")}
            className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Select industry</option>
            {INDUSTRIES.map((i) => <option key={i} value={i}>{i}</option>)}
          </select>
        </div>

        <div>
          <Label htmlFor="yearsOfExperience">Years of Experience <span className="text-red-500">*</span></Label>
          <Input
            id="yearsOfExperience"
            type="number"
            min="0"
            max="50"
            {...register("yearsOfExperience")}
            placeholder="8"
            className="mt-1"
          />
          {errors.yearsOfExperience && <p className="mt-1 text-xs text-red-500">{errors.yearsOfExperience.message}</p>}
        </div>

        <div>
          <Label htmlFor="highestQualification">Highest Qualification</Label>
          <select
            id="highestQualification"
            {...register("highestQualification")}
            className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Select qualification</option>
            {QUALIFICATIONS.map((q) => <option key={q} value={q}>{q}</option>)}
          </select>
        </div>

        <div>
          <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
          <Input
            id="linkedinUrl"
            {...register("linkedinUrl")}
            placeholder="https://linkedin.com/in/yourname"
            className="mt-1"
          />
          {errors.linkedinUrl && <p className="mt-1 text-xs text-red-500">{errors.linkedinUrl.message}</p>}
        </div>
      </div>

      <div className="flex justify-between pt-2">
        <Button type="button" variant="outline" onClick={onBack}>← Back</Button>
        <Button type="submit" className="bg-green-600 hover:bg-green-700 px-8">Continue →</Button>
      </div>
    </form>
  );
}
