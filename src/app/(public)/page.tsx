import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  { value: "248", label: "Volunteers Registered" },
  { value: "12", label: "Partner Colleges" },
  { value: "1,400+", label: "Hours Volunteered" },
  { value: "6", label: "Districts Covered" },
];

const mentoringAreas = [
  { icon: "🎯", title: "Career Guidance", desc: "Help students define goals and chart a career path" },
  { icon: "💻", title: "Software Development", desc: "Teach coding, web, and software fundamentals" },
  { icon: "🤖", title: "AI & Tech Awareness", desc: "Introduce AI, cloud, and emerging tech concepts" },
  { icon: "🗣️", title: "Soft Skills", desc: "Communication, leadership, and professional etiquette" },
  { icon: "🎤", title: "Mock Interviews", desc: "Practice interviews with real-world feedback" },
  { icon: "📄", title: "Resume Building", desc: "Craft standout resumes for competitive job markets" },
  { icon: "🚀", title: "Entrepreneurship", desc: "Inspire students with business and startup thinking" },
  { icon: "🏭", title: "Industry Insights", desc: "Share real-world industry knowledge and trends" },
];

const steps = [
  { step: "01", title: "Register", desc: "Complete our 5-minute volunteer form with your skills and availability." },
  { step: "02", title: "Get Approved", desc: "Our team reviews your profile and activates your account within 48 hours." },
  { step: "03", title: "Start Mentoring", desc: "Get matched with students and start making an impact from day one." },
];

const testimonials = [
  {
    quote: "The most rewarding 2 hours I spend each week. Seeing a rural student grasp a concept for the first time is priceless.",
    name: "Aravind Kumar",
    role: "Senior Engineer, Infosys",
  },
  {
    quote: "VOLTR gave me a structured way to give back. The platform is thoughtful and the students are incredibly motivated.",
    name: "Preethi Rajan",
    role: "HR Business Partner, TCS",
  },
  {
    quote: "I've done corporate volunteering before, but nothing this focused. The impact here is direct and measurable.",
    name: "Suresh Balaji",
    role: "Founder, EdTech Startup",
  },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-green-50 to-white py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block rounded-full bg-green-100 px-4 py-1.5 text-sm font-medium text-green-700 mb-6">
              Social Impact Initiative
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Mentor a Rural Student.{" "}
              <span className="text-green-600">Change a Life.</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-2xl">
              VOLTR connects experienced professionals with rural college students
              across India who need career guidance, skill development, and
              industry exposure. Your expertise — even 2 hours a week — transforms
              futures.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-base px-8"
              >
                <Link href="/volunteer/register">Register as Volunteer</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base px-8">
                <Link href="#how-it-works">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-green-600 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center text-white">
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="mt-1 text-sm text-green-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-3 text-gray-500">Three simple steps to start making an impact</p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.step} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-2xl font-bold text-green-600">
                  {s.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{s.title}</h3>
                <p className="mt-2 text-sm text-gray-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mentoring areas */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900">Areas of Mentoring</h2>
            <p className="mt-3 text-gray-500">Choose what you&apos;re passionate about teaching</p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {mentoringAreas.map((area) => (
              <Card key={area.title} className="border-gray-100 hover:border-green-200 hover:shadow-sm transition-all">
                <CardContent className="p-5">
                  <div className="text-3xl mb-3">{area.icon}</div>
                  <h3 className="font-semibold text-gray-900 text-sm">{area.title}</h3>
                  <p className="mt-1 text-xs text-gray-500 leading-relaxed">{area.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="impact" className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900">Volunteer Stories</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <Card key={t.name} className="border-gray-100">
                <CardContent className="p-6">
                  <p className="text-gray-600 text-sm leading-relaxed italic">&ldquo;{t.quote}&rdquo;</p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-semibold text-sm">
                      {t.name[0]}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">{t.name}</div>
                      <div className="text-xs text-gray-500">{t.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* YOTO teaser */}
      <section className="bg-gray-900 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block rounded-full bg-green-900 px-4 py-1.5 text-sm font-medium text-green-400 mb-4">
            Coming Soon
          </span>
          <h2 className="text-3xl font-bold text-white">
            YOTO — Rural Development Center
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Our next milestone: a physical software development and training center
            in rural India, where volunteers and students meet in person to build
            real-world skills and careers.
          </p>
          <div className="mt-8">
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
              <Link href="/volunteer/register">Join the Movement</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
