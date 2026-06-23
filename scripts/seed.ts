import { config } from "dotenv";
config({ path: ".env.local" });

import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "../src/lib/db/schema";
import { hashPassword } from "../src/lib/auth/password";

const client = postgres(process.env.DATABASE_URL!, { prepare: false });
const db = drizzle(client, { schema });

async function seed() {
  console.log("🌱  Seeding VOLTR database...\n");

  // ── Skills ────────────────────────────────────────────────────────────────
  const skills = [
    "Python", "JavaScript", "TypeScript", "Java", "C / C++",
    "React / Next.js", "Node.js", "SQL / Databases", "AWS / Cloud",
    "DevOps / CI-CD", "Machine Learning", "Data Science", "Data Analytics",
    "Cybersecurity", "Mobile Development", "UI / UX Design",
    "Product Management", "Project Management", "Business Analysis",
    "HR & Recruitment", "Communication & Presentation", "Leadership",
    "Entrepreneurship", "Finance & Accounting", "Marketing & Sales",
  ];

  console.log("  → Inserting skills...");
  for (const name of skills) {
    await db.insert(schema.skills).values({ name }).onConflictDoNothing();
  }
  console.log(`     ✓ ${skills.length} skills`);

  // ── Mentoring Categories ──────────────────────────────────────────────────
  const categories = [
    { name: "Career Guidance",       icon: "🎯", description: "Career planning, goal setting, and navigating the job market" },
    { name: "Software Development",  icon: "💻", description: "Coding, software engineering practices, and architecture" },
    { name: "AI & Tech Awareness",   icon: "🤖", description: "Introduction to AI, ML, and emerging technologies" },
    { name: "Soft Skills",           icon: "🗣️", description: "Communication, teamwork, and professional etiquette" },
    { name: "Mock Interviews",       icon: "🎤", description: "Practice interviews with real feedback from professionals" },
    { name: "Resume Building",       icon: "📄", description: "Crafting a compelling resume and LinkedIn profile" },
    { name: "Entrepreneurship",      icon: "🚀", description: "Starting up, ideation, fundraising, and building products" },
    { name: "Industry Insights",     icon: "🏭", description: "How industries work, trends, and what employers look for" },
  ];

  console.log("  → Inserting mentoring categories...");
  for (const cat of categories) {
    await db.insert(schema.mentoringCategories).values(cat).onConflictDoNothing();
  }
  console.log(`     ✓ ${categories.length} mentoring categories`);

  // ── Languages ─────────────────────────────────────────────────────────────
  const languages = [
    "English", "Hindi", "Tamil", "Telugu", "Kannada",
    "Malayalam", "Marathi", "Bengali", "Gujarati", "Punjabi",
    "Odia", "Assamese", "Urdu",
  ];

  console.log("  → Inserting languages...");
  for (const name of languages) {
    await db.insert(schema.languages).values({ name }).onConflictDoNothing();
  }
  console.log(`     ✓ ${languages.length} languages`);

  // ── Super Admin ───────────────────────────────────────────────────────────
  console.log("  → Creating super admin account...");
  const adminEmail = "admin@voltr.org";
  const existing = await db.query.users.findFirst({
    where: (u, { eq }) => eq(u.email, adminEmail),
  });

  if (!existing) {
    const passwordHash = await hashPassword("Voltr@Admin2026");
    await db.insert(schema.users).values({
      email: adminEmail,
      passwordHash,
      role: "super_admin",
      emailVerified: true,
      isActive: true,
    });
    console.log("     ✓ Super admin created");
    console.log("       Email:    admin@voltr.org");
    console.log("       Password: Voltr@Admin2026");
  } else {
    console.log("     ℹ  Super admin already exists — skipped");
  }

  console.log("\n✅  Seed complete!");
  await client.end();
}

seed().catch((err) => {
  console.error("❌  Seed failed:", err);
  process.exit(1);
});
