# VOLTR — Volunteer Platform for Rural Student Empowerment

> Connecting professional volunteers with rural college students across India to drive measurable improvements in employability and career readiness.

---

## What is VOLTR?

VOLTR is an AI-powered platform that bridges the gap between experienced professionals and rural college students who lack access to career guidance, industry mentors, and skill development opportunities.

Professionals register as volunteers in under 5 minutes. A dedicated admin team reviews, approves, and manages the volunteer pipeline. Students get matched with mentors based on skills, goals, language, and availability — turning a 2-hour weekly commitment into a career-changing experience.

**YOTO** (the physical frontier) — a future rural software development and training centre that the VOLTR platform feeds into with trained, vetted volunteers and matched students.

---

## Live Demo

| Portal | URL |
|---|---|
| Landing Page | `https://your-app.vercel.app` |
| Volunteer Registration | `https://your-app.vercel.app/volunteer/register` |
| Admin Portal | `https://your-app.vercel.app/admin` |

**Admin credentials (demo):**
- Email: `admin@voltr.org`
- Password: `Voltr@Admin2026`

---

## Features

### Volunteer Portal
- 5-step registration wizard (personal → professional → skills → availability → motivation)
- Email verification on signup
- Real-time application status tracking
- Volunteer dashboard with profile summary and session KPIs

### Admin Portal
- Dashboard with live KPIs (total, pending, active, rejected volunteers)
- Review queue — approve / request more info / reject with reason
- Full volunteer search and filter (50+ parameters)
- Internal notes on each volunteer profile
- Email communication centre with audience targeting (all / active / pending)
- Complete audit log of every admin action
- CSV data export

### Auth & Security
- JWT authentication — 15-min access tokens + 30-day rotating refresh tokens
- httpOnly cookies (XSS-safe)
- bcrypt password hashing (12 rounds)
- User-enumeration-safe forgot-password flow
- DPDP Act 2023 (India) compliant data handling

### Emails (via Resend)
- Verification email on registration
- Approval email when admin approves
- Rejection email with optional reason
- Password reset email

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Database | PostgreSQL (Neon serverless) |
| ORM | Drizzle ORM |
| Auth | JWT (jose) + bcrypt |
| Email | Resend API (via fetch) |
| Forms | React Hook Form + Zod v4 |
| Deployment | Vercel |

---

## Project Structure

```
src/
├── app/
│   ├── (public)/          # Landing page, login, register, verify-email
│   ├── (admin)/           # Admin portal — dashboard, volunteers, review, comms, audit
│   ├── (volunteer)/       # Volunteer portal — dashboard
│   └── api/               # REST API routes
│       ├── auth/          # register, login, logout, verify-email, forgot-password
│       ├── admin/         # volunteers CRUD, status, notes, comms, stats, audit-logs
│       └── volunteer/     # volunteer profile (me)
├── components/
│   ├── admin/             # VolunteerActions, NewCampaignForm, SignOutButton
│   ├── forms/
│   │   └── volunteer-registration/  # 5-step wizard components
│   ├── layout/            # Navbar, Footer
│   └── ui/                # shadcn/ui components
├── lib/
│   ├── auth/              # jwt.ts, password.ts, session.ts
│   ├── db/                # schema.ts, index.ts (Drizzle + Neon)
│   ├── email/             # sendVerificationEmail, sendApprovalEmail, etc.
│   ├── validations/       # Zod schemas — volunteer.ts, auth.ts
│   ├── audit.ts           # createAuditLog()
│   └── api-response.ts    # ok(), err() helpers
└── types/
    └── index.ts           # SessionUser, PaginationParams, etc.
```

---

## Getting Started (Local Development)

### Prerequisites
- Node.js 20+
- A [Neon](https://neon.tech) account (free) for PostgreSQL
- A [Resend](https://resend.com) account (free) for email

### 1. Clone the repo

```bash
git clone https://github.com/writersrinivasan/voltr.git
cd voltr
npm install
```

### 2. Set up environment variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

```env
# Neon PostgreSQL connection string
DATABASE_URL=postgresql://user:password@ep-xxx.neon.tech/neondb?sslmode=require

# Generate with: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
JWT_ACCESS_SECRET=your_64_char_secret
JWT_REFRESH_SECRET=your_64_char_secret

# Resend API key — https://resend.com
RESEND_API_KEY=re_xxxxxxxxxxxx
EMAIL_FROM=VOLTR <onboarding@resend.dev>

NEXT_PUBLIC_BASE_URL=http://localhost:3000
NODE_ENV=development
```

### 3. Push the database schema

```bash
npm run db:push
```

### 4. Seed reference data + create admin account

```bash
npx tsx scripts/seed.ts
```

This creates:
- 25 skills (Python, React, ML, etc.)
- 8 mentoring categories
- 13 Indian languages
- Super admin: `admin@voltr.org` / `Voltr@Admin2026`

### 5. Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Database Scripts

| Command | Description |
|---|---|
| `npm run db:push` | Push schema to database (no migration files) |
| `npm run db:generate` | Generate Drizzle migration files |
| `npm run db:migrate` | Run pending migrations |
| `npm run db:studio` | Open Drizzle Studio (visual DB browser) |

---

## Deploying to Vercel

### 1. Push to GitHub
```bash
git push origin main
```

### 2. Import in Vercel
Go to [vercel.com](https://vercel.com) → **Add New Project** → import `writersrinivasan/voltr`.

### 3. Set Environment Variables in Vercel
Add these under **Project Settings → Environment Variables**:

| Variable | Value |
|---|---|
| `DATABASE_URL` | Your Neon connection string |
| `JWT_ACCESS_SECRET` | 64-char random hex string |
| `JWT_REFRESH_SECRET` | 64-char random hex string |
| `RESEND_API_KEY` | Your Resend API key |
| `EMAIL_FROM` | `VOLTR <onboarding@resend.dev>` |
| `NEXT_PUBLIC_BASE_URL` | `https://your-app.vercel.app` |

### 4. Deploy
Click **Deploy**. Vercel auto-detects Next.js — no build config needed.

> **Note:** After deployment, update `NEXT_PUBLIC_BASE_URL` to your actual Vercel URL so email verification links work correctly, then redeploy.

---

## Phased Roadmap

| Phase | Scope | Status |
|---|---|---|
| 1 — MVP | Volunteer portal + Admin portal | ✅ Live |
| 2 — Donations | Razorpay integration, 80G tax receipts, donor portal | ⏳ Planned |
| 3 — Student Platform | Student registration, AI mentor matching, session scheduling | ⏳ Planned |
| 4 — AI Engine | Resume analyzer, mock interview bot, career path AI, impact dashboard | ⏳ Planned |
| 5 — YOTO Centre | Physical rural centre management, offline events, blended learning | ⏳ Planned |

---

## Mentoring Areas

| Area | Description |
|---|---|
| 🎯 Career Guidance | Career planning, goal setting, navigating the job market |
| 💻 Software Development | Coding, software engineering practices, architecture |
| 🤖 AI & Tech Awareness | Introduction to AI, ML, and emerging technologies |
| 🗣️ Soft Skills | Communication, teamwork, professional etiquette |
| 🎤 Mock Interviews | Practice interviews with real feedback |
| 📄 Resume Building | Crafting a compelling resume and LinkedIn profile |
| 🚀 Entrepreneurship | Startups, ideation, fundraising, product building |
| 🏭 Industry Insights | How industries work, trends, what employers look for |

---

## Contributing

This is a social impact project. Contributions, ideas, and feedback are welcome.

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes
4. Push and open a pull request

---

## Vision

> *"To build a future where geography is no longer a barrier to opportunity."*

Every expert hour is a future unlocked. If you're a professional with 2 hours a week — [become a VOLTR volunteer](https://your-app.vercel.app/volunteer/register).

---

## License

MIT © VOLTR 2026
