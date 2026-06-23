"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step3Schema, type Step3Data } from "@/lib/validations/volunteer";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import MultiSelect from "./multi-select";

const SKILLS = [
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "javascript", label: "JavaScript" },
  { value: "react", label: "React" },
  { value: "data_science", label: "Data Science" },
  { value: "machine_learning", label: "Machine Learning" },
  { value: "cloud_aws", label: "AWS / Cloud" },
  { value: "communication", label: "Communication" },
  { value: "leadership", label: "Leadership" },
  { value: "project_management", label: "Project Management" },
  { value: "hr_recruitment", label: "HR & Recruitment" },
  { value: "finance", label: "Finance" },
  { value: "marketing", label: "Marketing" },
  { value: "design_ux", label: "Design / UX" },
  { value: "sql", label: "SQL / Databases" },
  { value: "devops", label: "DevOps / CI-CD" },
];

const MENTORING_CATEGORIES = [
  { value: "career_guidance", label: "Career Guidance", icon: "🎯" },
  { value: "software_dev", label: "Software Development", icon: "💻" },
  { value: "ai_awareness", label: "AI & Tech Awareness", icon: "🤖" },
  { value: "soft_skills", label: "Soft Skills", icon: "🗣️" },
  { value: "mock_interviews", label: "Mock Interviews", icon: "🎤" },
  { value: "resume_building", label: "Resume Building", icon: "📄" },
  { value: "entrepreneurship", label: "Entrepreneurship", icon: "🚀" },
  { value: "industry_insights", label: "Industry Insights", icon: "🏭" },
  { value: "english_language", label: "English Language", icon: "🔤" },
  { value: "personal_finance", label: "Personal Finance", icon: "💰" },
];

const LANGUAGES = [
  { value: "english", label: "English" },
  { value: "hindi", label: "Hindi" },
  { value: "tamil", label: "Tamil" },
  { value: "telugu", label: "Telugu" },
  { value: "kannada", label: "Kannada" },
  { value: "malayalam", label: "Malayalam" },
  { value: "marathi", label: "Marathi" },
  { value: "bengali", label: "Bengali" },
  { value: "gujarati", label: "Gujarati" },
  { value: "punjabi", label: "Punjabi" },
];

interface Props {
  defaultValues: Partial<Step3Data>;
  onNext: (data: Step3Data) => void;
  onBack: () => void;
}

export default function Step3Skills({ defaultValues, onNext, onBack }: Props) {
  const { control, handleSubmit, formState: { errors } } = useForm<Step3Data>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      skills: [],
      mentoringCategories: [],
      languages: [],
      ...defaultValues,
    },
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Skills & Interests</h2>
        <p className="text-sm text-gray-500 mt-1">Select everything that applies to you</p>
      </div>

      <div>
        <Label className="text-sm font-medium">Your Skills <span className="text-red-500">*</span></Label>
        <p className="text-xs text-gray-500 mb-2">Select all that apply</p>
        <Controller
          name="skills"
          control={control}
          render={({ field }) => (
            <MultiSelect options={SKILLS} selected={field.value} onChange={field.onChange} />
          )}
        />
        {errors.skills && <p className="mt-2 text-xs text-red-500">{errors.skills.message}</p>}
      </div>

      <div>
        <Label className="text-sm font-medium">Mentoring Areas <span className="text-red-500">*</span></Label>
        <p className="text-xs text-gray-500 mb-2">What would you like to teach?</p>
        <Controller
          name="mentoringCategories"
          control={control}
          render={({ field }) => (
            <MultiSelect options={MENTORING_CATEGORIES} selected={field.value} onChange={field.onChange} />
          )}
        />
        {errors.mentoringCategories && <p className="mt-2 text-xs text-red-500">{errors.mentoringCategories.message}</p>}
      </div>

      <div>
        <Label className="text-sm font-medium">Languages Known <span className="text-red-500">*</span></Label>
        <p className="text-xs text-gray-500 mb-2">Languages you can mentor in</p>
        <Controller
          name="languages"
          control={control}
          render={({ field }) => (
            <MultiSelect options={LANGUAGES} selected={field.value} onChange={field.onChange} />
          )}
        />
        {errors.languages && <p className="mt-2 text-xs text-red-500">{errors.languages.message}</p>}
      </div>

      <div className="flex justify-between pt-2">
        <Button type="button" variant="outline" onClick={onBack}>← Back</Button>
        <Button type="submit" className="bg-green-600 hover:bg-green-700 px-8">Continue →</Button>
      </div>
    </form>
  );
}
