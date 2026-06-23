"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { step1Schema, type Step1Data } from "@/lib/validations/volunteer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const step1WithPasswordSchema = step1Schema.extend({
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type Step1WithPassword = z.infer<typeof step1WithPasswordSchema>;

const INDIAN_STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat",
  "Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh",
  "Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab",
  "Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh",
  "Uttarakhand","West Bengal","Delhi","Jammu & Kashmir","Ladakh","Puducherry",
];

interface Props {
  defaultValues: Partial<Step1Data & { password?: string }>;
  onNext: (data: Step1Data & { password: string }) => void;
}

export default function Step1Personal({ defaultValues, onNext }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { register, handleSubmit, formState: { errors } } = useForm<Step1WithPassword>({
    resolver: zodResolver(step1WithPasswordSchema) as any,
    defaultValues,
  });

  function onSubmit({ confirmPassword: _, ...data }: Step1WithPassword) {
    onNext(data);
  }

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <form onSubmit={handleSubmit(onSubmit as any)} className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
        <p className="text-sm text-gray-500 mt-1">Let us know who you are</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Label htmlFor="fullName">Full Name <span className="text-red-500">*</span></Label>
          <Input id="fullName" {...register("fullName")} placeholder="Priya Krishnamurthy" className="mt-1" />
          {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName.message}</p>}
        </div>

        <div>
          <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
          <Input id="email" type="email" {...register("email")} placeholder="priya@example.com" className="mt-1" />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
        </div>

        <div>
          <Label htmlFor="password">Password <span className="text-red-500">*</span></Label>
          <Input id="password" type="password" {...register("password")} placeholder="Min. 8 characters" className="mt-1" />
          {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
        </div>

        <div>
          <Label htmlFor="confirmPassword">Confirm Password <span className="text-red-500">*</span></Label>
          <Input id="confirmPassword" type="password" {...register("confirmPassword")} placeholder="Re-enter password" className="mt-1" />
          {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword.message}</p>}
        </div>

        <div>
          <Label htmlFor="mobile">Mobile Number</Label>
          <Input id="mobile" {...register("mobile")} placeholder="+91 98765 43210" className="mt-1" />
          {errors.mobile && <p className="mt-1 text-xs text-red-500">{errors.mobile.message}</p>}
        </div>

        <div>
          <Label htmlFor="city">City <span className="text-red-500">*</span></Label>
          <Input id="city" {...register("city")} placeholder="Chennai" className="mt-1" />
          {errors.city && <p className="mt-1 text-xs text-red-500">{errors.city.message}</p>}
        </div>

        <div>
          <Label htmlFor="state">State <span className="text-red-500">*</span></Label>
          <select
            id="state"
            {...register("state")}
            className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Select state</option>
            {INDIAN_STATES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {errors.state && <p className="mt-1 text-xs text-red-500">{errors.state.message}</p>}
        </div>

        <div>
          <Label htmlFor="gender">Gender</Label>
          <select
            id="gender"
            {...register("gender")}
            className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Prefer not to say</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer_not_to_say">Prefer not to say</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <Button type="submit" className="bg-green-600 hover:bg-green-700 px-8">
          Continue →
        </Button>
      </div>
    </form>
  );
}
