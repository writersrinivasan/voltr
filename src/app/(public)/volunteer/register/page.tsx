import RegistrationWizard from "@/components/forms/volunteer-registration/registration-wizard";

export const metadata = {
  title: "Volunteer Registration — VOLTR",
  description: "Register as a volunteer mentor and help rural college students build their careers.",
};

export default function VolunteerRegisterPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-2xl px-4">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-green-600 text-white font-bold text-xl">
            M
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Volunteer Registration</h1>
          <p className="mt-2 text-sm text-gray-500">
            Join 248+ volunteers already making a difference. Takes about 5 minutes.
          </p>
        </div>

        <div className="rounded-2xl bg-white shadow-sm border border-gray-100 p-8">
          <RegistrationWizard />
        </div>

        <p className="mt-4 text-center text-xs text-gray-400">
          Already registered?{" "}
          <a href="/auth/login" className="text-green-600 hover:underline">Log in here</a>
        </p>
      </div>
    </div>
  );
}
