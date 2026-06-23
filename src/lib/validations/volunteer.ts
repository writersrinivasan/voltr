import { z } from "zod";

export const step1Schema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  mobile: z.string().regex(/^[0-9+\s\-()]{7,20}$/, "Invalid mobile number").optional().or(z.literal("")),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  country: z.string().default("India"),
  gender: z.enum(["male", "female", "other", "prefer_not_to_say", ""]).optional(),
});

export const step2Schema = z.object({
  jobTitle: z.string().min(2, "Job title is required").max(100),
  organization: z.string().min(2, "Organization is required").max(200),
  industry: z.string().optional(),
  yearsOfExperience: z.coerce.number().min(0).max(50),
  linkedinUrl: z.string().url("Invalid LinkedIn URL").optional().or(z.literal("")),
  highestQualification: z.string().optional(),
});

export const step3Schema = z.object({
  skills: z.array(z.string()).min(1, "Select at least one skill"),
  mentoringCategories: z.array(z.string()).min(1, "Select at least one mentoring area"),
  languages: z.array(z.string()).min(1, "Select at least one language"),
});

export const step4Schema = z.object({
  hoursPerWeek: z.enum(["1-2", "3-5", "5-10", "10+"]),
  preferredFormat: z.enum(["online", "offline", "both"]),
  preferredDays: z.array(z.string()).optional(),
  preferredTimeSlots: z.array(z.string()).optional(),
  openToOfflineYoto: z.boolean().default(false),
  openToLongTermMentoring: z.boolean().default(false),
});

export const step5Schema = z.object({
  motivationStatement: z
    .string()
    .min(100, "Please write at least 100 characters")
    .max(1000, "Maximum 1000 characters"),
  donationInterest: z.enum(["yes", "no", "maybe"]),
  termsAccepted: z.literal(true, "You must accept the terms and conditions"),
});

export const fullRegistrationSchema = step1Schema
  .merge(step2Schema)
  .merge(step3Schema)
  .merge(step4Schema)
  .merge(step5Schema)
  .extend({ password: z.string().min(8, "Password must be at least 8 characters") });

export type Step1Data = z.infer<typeof step1Schema>;
export type Step2Data = z.infer<typeof step2Schema>;
export type Step3Data = z.infer<typeof step3Schema>;
export type Step4Data = z.infer<typeof step4Schema>;
export type Step5Data = z.infer<typeof step5Schema>;
export type FullRegistrationData = z.infer<typeof fullRegistrationSchema>;
