# VOLTR — Product Blueprint
### AI-Powered Volunteer Management & Rural Student Empowerment Platform
**Version 1.0 | June 2026 | Confidential — For Stakeholder Review**

---

## TABLE OF CONTENTS

1. [Vision & Mission](#1-vision--mission)
2. [Complete Feature List](#2-complete-feature-list)
3. [User Roles & Permissions](#3-user-roles--permissions)
4. [Detailed Workflows](#4-detailed-workflows)
5. [UI/UX Screen List](#5-uiux-screen-list)
6. [Database Schema](#6-database-schema)
7. [API Architecture](#7-api-architecture)
8. [AI Integration Opportunities](#8-ai-integration-opportunities)
9. [Security & Compliance Requirements](#9-security--compliance-requirements)
10. [MVP Scope vs Future Roadmap](#10-mvp-scope-vs-future-roadmap)
11. [Recommended Technology Stack](#11-recommended-technology-stack)
12. [Wireframe Descriptions](#12-wireframe-descriptions)
13. [Success Metrics & KPIs](#13-success-metrics--kpis)
14. [Risk Analysis & Mitigation](#14-risk-analysis--mitigation)

---

## 1. Vision & Mission

### Vision
To build a future where geography is no longer a barrier to opportunity — where every rural student in India has access to world-class mentors, career guidance, and the tools to compete confidently in the global workforce.

### Mission
VOLTR exists to bridge the gap between experienced professionals and underserved rural college students by creating a structured, AI-enhanced volunteer ecosystem that drives measurable improvements in employability, confidence, digital literacy, and career readiness.

### Core Values
| Value | Description |
|-------|-------------|
| **Equity** | Every student deserves the same quality of mentorship regardless of location |
| **Impact** | Every volunteer hour translates into measurable student outcomes |
| **Community** | Building lasting relationships between professionals and students |
| **Technology** | Using AI to scale human compassion and expertise |
| **Transparency** | Open reporting to volunteers, donors, and institutional partners |

### The Problem We Solve
Rural college students in India face a compounding disadvantage: limited exposure to industry professionals, poor English communication skills, no access to mock interviews, no understanding of modern technology trends (AI, cloud, software), and limited career counseling. Volunteer professionals exist who want to help but lack a structured, trusted channel to do so.

VOLTR is that channel.

---

## 2. Complete Feature List

### Phase 1 — MVP (Volunteer Portal)

#### Volunteer-Facing Features
- [ ] Volunteer self-registration form with multi-step wizard
- [ ] Profile creation with professional background, skills, and preferences
- [ ] Availability and schedule configuration
- [ ] Interest area selection (mentoring categories)
- [ ] Language preferences
- [ ] Motivation statement submission
- [ ] Email verification and account confirmation
- [ ] Profile edit and update capability
- [ ] Volunteer dashboard (status, upcoming sessions, impact stats)
- [ ] Notification preferences (email, SMS)

#### Admin-Facing Features
- [ ] Admin dashboard with aggregate statistics
- [ ] Volunteer review queue (pending, approved, rejected, deactivated)
- [ ] Volunteer profile viewer with full details
- [ ] Approve / Reject / Flag volunteer applications
- [ ] Bulk status management
- [ ] Advanced search and filter (by skill, availability, location, status)
- [ ] Export volunteer data (CSV, PDF)
- [ ] Communication center (send emails to volunteers individually or in bulk)
- [ ] Audit log viewer (all admin actions timestamped)
- [ ] Role management (Super Admin, Admin, Reviewer)
- [ ] Announcements and broadcast messaging
- [ ] Basic reporting module (volunteer counts, category breakdowns, growth charts)

### Phase 2 — Donation & Financial Module
- [ ] Financial interest survey (not payment collection)
- [ ] Donor intent registration
- [ ] Payment gateway integration (Razorpay / Stripe)
- [ ] Donation tiers and campaign management
- [ ] Donation receipts and tax compliance (80G in India)
- [ ] Donor portal and giving history

### Phase 3 — Student & Mentoring Platform
- [ ] Student registration portal
- [ ] Student profile (academic background, goals, interests)
- [ ] AI-powered mentor-student matching engine
- [ ] Session scheduling and calendar integration
- [ ] Video session integration (Google Meet / Zoom API)
- [ ] Session feedback and ratings
- [ ] Learning pathway builder
- [ ] Progress tracking dashboard
- [ ] Peer community forum
- [ ] Resource library (curated articles, videos, templates)

### Phase 4 — AI & Intelligence Layer
- [ ] AI volunteer recommendation engine
- [ ] Student career path predictor
- [ ] Resume analyzer and improvement suggester
- [ ] Mock interview AI assistant
- [ ] Sentiment analysis on session feedback
- [ ] Impact measurement dashboard
- [ ] Predictive churn detection for volunteer re-engagement
- [ ] Automated personalized email campaigns

### Phase 5 — YOTO Physical Center Integration
- [ ] Offline event and workshop management
- [ ] Physical center enrollment and seat management
- [ ] Blended learning tracker (online + offline)
- [ ] Volunteer travel and logistics coordination module
- [ ] Certificate and credential issuance

---

## 3. User Roles & Permissions

### Role Hierarchy

```
Super Admin
    └── Admin
        └── Reviewer / Coordinator
                └── Volunteer
                        └── Student (Phase 3)
                                └── Guest / Public
```

### Detailed Permissions Matrix

| Feature / Action | Super Admin | Admin | Reviewer | Volunteer | Student | Guest |
|---|---|---|---|---|---|---|
| View all volunteer profiles | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Approve / Reject volunteers | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Deactivate volunteer accounts | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Manage admin roles | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| View audit logs | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Export data | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Send bulk communications | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Edit own profile | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| Register as volunteer | N/A | N/A | N/A | ✅ | ❌ | ✅ |
| View platform analytics | ✅ | ✅ | View-only | ❌ | ❌ | ❌ |
| Manage donation campaigns | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Configure system settings | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |

### Role Descriptions

**Super Admin**
Full system control. Manages other admins, configures platform settings, views all logs, generates compliance reports. Only 1–3 seats, assigned to founding team members.

**Admin**
Day-to-day operational control. Reviews and manages volunteers, communicates with stakeholders, runs reports. Assigned to program managers and NGO coordinators.

**Reviewer / Coordinator**
Limited admin role. Can review pending volunteer applications and approve routine profiles. Cannot deactivate accounts or access sensitive audit data. Assigned to team leads or partner organization staff.

**Volunteer**
External role. Can register, manage their own profile, view their status, and (in Phase 3) see matched students and scheduled sessions.

**Student (Phase 3)**
Can register, set goals, browse mentor profiles, request matching, and track their learning progress.

**Guest / Public**
Can view the public landing page, read about the platform, and access the volunteer registration form.

---

## 4. Detailed Workflows

### 4.1 Volunteer Registration Workflow

```
STEP 1: Public Landing Page
    └── Clicks "Become a Volunteer"
    
STEP 2: Registration Form — Page 1 (Personal)
    ├── Full name
    ├── Email address (becomes login)
    ├── Mobile number
    ├── City / State / Country
    └── Gender (optional)
    
STEP 3: Registration Form — Page 2 (Professional)
    ├── Current job title
    ├── Current organization
    ├── Industry / sector
    ├── Years of experience
    ├── LinkedIn profile URL (optional)
    └── Highest qualification
    
STEP 4: Registration Form — Page 3 (Skills & Interests)
    ├── Primary skills (multi-select from taxonomy)
    ├── Mentoring interest areas (multi-select):
    │   ├── Career Guidance
    │   ├── Software Development / Coding
    │   ├── AI & Technology Awareness
    │   ├── Communication & Soft Skills
    │   ├── Mock Interviews
    │   ├── Resume Building
    │   ├── Entrepreneurship
    │   └── Industry Insights
    └── Languages known (multi-select)
    
STEP 5: Registration Form — Page 4 (Availability)
    ├── Hours available per week
    ├── Preferred session format (online / offline / both)
    ├── Preferred days (checkboxes: Mon–Sun)
    ├── Preferred time slots (morning / afternoon / evening / weekend)
    ├── Interest in future offline participation (YOTO Center): Yes / No
    └── Interest in long-term mentoring commitment: Yes / No
    
STEP 6: Registration Form — Page 5 (Motivation & Consent)
    ├── Motivation for volunteering (text area, 100–500 words)
    ├── Interest in financial donation (Yes / No / Maybe later) — no payment
    ├── Accept Terms & Privacy Policy (checkbox)
    └── Submit
    
STEP 7: Email Verification
    └── System sends verification email → volunteer clicks link → account confirmed
    
STEP 8: Status Set to "Pending Review"
    └── Admin team notified of new application

STEP 9: Admin Review Process (see 4.2)

STEP 10: Approval / Rejection Email Sent to Volunteer
    ├── Approved → Volunteer portal access granted
    └── Rejected → Rejection email with reason (optional)
```

### 4.2 Admin Volunteer Review Workflow

```
Admin logs in → Admin Dashboard
    └── Sees "Pending Reviews" count badge
    
Opens Review Queue
    └── List of pending volunteers (sortable by date, skill, location)
    
Opens Individual Profile
    ├── Views all submitted information
    ├── Sees AI-generated completeness score (Phase 2)
    ├── Can add internal notes
    └── Takes action:
        ├── APPROVE → Status: Active, email sent, access granted
        ├── REQUEST MORE INFO → Email sent, status: Awaiting Info
        ├── FLAG → Marks for Super Admin attention, adds note
        └── REJECT → Requires rejection reason, email sent

Post-Approval
    └── Volunteer appears in Active Volunteer directory
    └── Audit log entry created
```

### 4.3 Admin Communication Workflow

```
Admin → Communication Center
    ├── Select audience:
    │   ├── All volunteers
    │   ├── Filtered subset (e.g., tech skills, specific city)
    │   └── Individual volunteer
    ├── Compose message (rich text editor)
    ├── Attach files (optional)
    ├── Preview email
    ├── Schedule or Send Now
    └── View delivery status report
```

### 4.4 Volunteer Profile Update Workflow

```
Volunteer logs in → My Profile
    ├── Edits any field
    ├── Saves changes
    └── Changes reflected immediately (no re-approval required for edits)
        └── Admin notified of significant changes (e.g., organization change)
```

---

## 5. UI/UX Screen List

### Public Screens (No Login Required)
| Screen | Description |
|--------|-------------|
| `P-01` Landing Page | Hero section, mission statement, volunteer stats, CTA buttons |
| `P-02` About VOLTR | Story, team, partner logos, YOTO center vision |
| `P-03` Volunteer Registration Wizard | 5-step multi-page form |
| `P-04` Email Verification Page | Confirmation landing after clicking email link |
| `P-05` Login Page | Email + password, "Forgot password" link |
| `P-06` Password Reset | Email entry → OTP → new password |

### Volunteer Portal Screens
| Screen | Description |
|--------|-------------|
| `V-01` Volunteer Dashboard | Status badge, profile completion %, upcoming sessions (Phase 3), impact stats |
| `V-02` My Profile | View and edit all registration fields |
| `V-03` Availability Settings | Manage schedule and time preferences |
| `V-04` Notifications | Email/SMS preferences |
| `V-05` My Sessions (Phase 3) | Scheduled, completed, cancelled sessions |
| `V-06` My Impact (Phase 3) | Students mentored, hours contributed, testimonials |

### Admin Portal Screens
| Screen | Description |
|--------|-------------|
| `A-01` Admin Dashboard | KPI cards: total volunteers, pending, active, this week's approvals, growth chart |
| `A-02` Volunteer List | Searchable, filterable, paginated table of all volunteers |
| `A-03` Volunteer Profile View | Full read-only profile with action buttons |
| `A-04` Review Queue | Dedicated pending approval list with bulk actions |
| `A-05` Communication Center | Compose, schedule, and track email campaigns |
| `A-06` Reports & Analytics | Charts and tables: registrations over time, skill heatmap, location map |
| `A-07` Audit Log | Timestamped log of all admin actions |
| `A-08` Role Management | Create/edit admin users and assign roles |
| `A-09` System Settings | Platform configuration, notification templates, feature flags |
| `A-10` Export Center | Download volunteer data in CSV/PDF |

---

## 6. Database Schema

### Core Tables

```sql
-- Users table (all authenticated users)
CREATE TABLE users (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email           VARCHAR(255) UNIQUE NOT NULL,
    password_hash   VARCHAR(255) NOT NULL,
    role            ENUM('super_admin','admin','reviewer','volunteer','student') NOT NULL,
    is_active       BOOLEAN DEFAULT TRUE,
    email_verified  BOOLEAN DEFAULT FALSE,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW(),
    last_login_at   TIMESTAMPTZ
);

-- Volunteer profiles (linked 1:1 to users)
CREATE TABLE volunteer_profiles (
    id                          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id                     UUID REFERENCES users(id) ON DELETE CASCADE,
    
    -- Personal
    full_name                   VARCHAR(255) NOT NULL,
    mobile                      VARCHAR(20),
    city                        VARCHAR(100),
    state                       VARCHAR(100),
    country                     VARCHAR(100) DEFAULT 'India',
    gender                      VARCHAR(20),
    
    -- Professional
    job_title                   VARCHAR(255),
    organization                VARCHAR(255),
    industry                    VARCHAR(100),
    years_of_experience         SMALLINT,
    linkedin_url                VARCHAR(500),
    highest_qualification       VARCHAR(100),
    
    -- Availability
    hours_per_week              SMALLINT,
    preferred_format            ENUM('online','offline','both') DEFAULT 'online',
    preferred_days              TEXT[],    -- e.g., ['Monday','Wednesday','Friday']
    preferred_time_slots        TEXT[],    -- e.g., ['morning','evening']
    open_to_offline_yoto        BOOLEAN DEFAULT FALSE,
    open_to_long_term_mentoring BOOLEAN DEFAULT FALSE,
    
    -- Motivation
    motivation_statement        TEXT,
    donation_interest           ENUM('yes','no','maybe') DEFAULT 'maybe',
    
    -- Status
    status                      ENUM('pending','active','rejected','deactivated','awaiting_info') DEFAULT 'pending',
    rejection_reason            TEXT,
    reviewed_by                 UUID REFERENCES users(id),
    reviewed_at                 TIMESTAMPTZ,
    
    created_at                  TIMESTAMPTZ DEFAULT NOW(),
    updated_at                  TIMESTAMPTZ DEFAULT NOW()
);

-- Skills taxonomy
CREATE TABLE skills (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(100) UNIQUE NOT NULL,
    category    VARCHAR(100),
    is_active   BOOLEAN DEFAULT TRUE
);

-- Volunteer ↔ Skills (many-to-many)
CREATE TABLE volunteer_skills (
    volunteer_id    UUID REFERENCES volunteer_profiles(id) ON DELETE CASCADE,
    skill_id        INTEGER REFERENCES skills(id) ON DELETE CASCADE,
    PRIMARY KEY (volunteer_id, skill_id)
);

-- Mentoring interest categories
CREATE TABLE mentoring_categories (
    id      SERIAL PRIMARY KEY,
    name    VARCHAR(150) UNIQUE NOT NULL,
    icon    VARCHAR(50)
);

-- Volunteer ↔ Mentoring interests (many-to-many)
CREATE TABLE volunteer_mentoring_interests (
    volunteer_id        UUID REFERENCES volunteer_profiles(id) ON DELETE CASCADE,
    category_id         INTEGER REFERENCES mentoring_categories(id) ON DELETE CASCADE,
    PRIMARY KEY (volunteer_id, category_id)
);

-- Languages
CREATE TABLE languages (
    id      SERIAL PRIMARY KEY,
    name    VARCHAR(100) UNIQUE NOT NULL
);

-- Volunteer ↔ Languages (many-to-many)
CREATE TABLE volunteer_languages (
    volunteer_id    UUID REFERENCES volunteer_profiles(id) ON DELETE CASCADE,
    language_id     INTEGER REFERENCES languages(id) ON DELETE CASCADE,
    PRIMARY KEY (volunteer_id, language_id)
);

-- Admin notes on volunteer profiles
CREATE TABLE volunteer_notes (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    volunteer_id    UUID REFERENCES volunteer_profiles(id) ON DELETE CASCADE,
    admin_id        UUID REFERENCES users(id),
    note            TEXT NOT NULL,
    is_internal     BOOLEAN DEFAULT TRUE,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Audit logs
CREATE TABLE audit_logs (
    id              BIGSERIAL PRIMARY KEY,
    actor_id        UUID REFERENCES users(id),
    actor_role      VARCHAR(50),
    action          VARCHAR(100) NOT NULL,   -- e.g., 'volunteer.approved', 'volunteer.deactivated'
    target_type     VARCHAR(50),             -- e.g., 'volunteer_profile', 'user'
    target_id       UUID,
    payload         JSONB,                   -- before/after state or metadata
    ip_address      INET,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Email / communication campaigns
CREATE TABLE communication_campaigns (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_by      UUID REFERENCES users(id),
    subject         VARCHAR(500) NOT NULL,
    body_html       TEXT NOT NULL,
    audience_filter JSONB,                   -- stored query filters
    status          ENUM('draft','scheduled','sent','failed') DEFAULT 'draft',
    scheduled_at    TIMESTAMPTZ,
    sent_at         TIMESTAMPTZ,
    recipient_count INTEGER,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Email verification tokens
CREATE TABLE email_verifications (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID REFERENCES users(id) ON DELETE CASCADE,
    token       VARCHAR(255) UNIQUE NOT NULL,
    expires_at  TIMESTAMPTZ NOT NULL,
    used_at     TIMESTAMPTZ
);
```

### Key Indexes
```sql
CREATE INDEX idx_volunteer_profiles_status ON volunteer_profiles(status);
CREATE INDEX idx_volunteer_profiles_created_at ON volunteer_profiles(created_at);
CREATE INDEX idx_audit_logs_actor_id ON audit_logs(actor_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);
CREATE INDEX idx_users_email ON users(email);
```

---

## 7. API Architecture

### Design Principles
- RESTful API with versioning (`/api/v1/`)
- JWT-based authentication (access token: 15 min, refresh token: 30 days)
- Role-based authorization middleware on all protected routes
- Request/response in JSON
- Pagination on all list endpoints (`?page=1&limit=20`)
- Standardized error format: `{ "error": "code", "message": "...", "field": "..." }`

### Authentication Endpoints
```
POST   /api/v1/auth/register          Register new volunteer
POST   /api/v1/auth/verify-email      Verify email token
POST   /api/v1/auth/login             Login → returns JWT pair
POST   /api/v1/auth/refresh           Refresh access token
POST   /api/v1/auth/logout            Invalidate refresh token
POST   /api/v1/auth/forgot-password   Initiate password reset
POST   /api/v1/auth/reset-password    Complete password reset
```

### Volunteer Endpoints
```
GET    /api/v1/volunteer/me               Get own profile
PUT    /api/v1/volunteer/me               Update own profile
PUT    /api/v1/volunteer/me/availability  Update availability settings
GET    /api/v1/volunteer/me/status        Get application status
```

### Admin — Volunteer Management
```
GET    /api/v1/admin/volunteers                     List volunteers (paginated, filtered)
GET    /api/v1/admin/volunteers/:id                 Get volunteer detail
PATCH  /api/v1/admin/volunteers/:id/status          Update status (approve/reject/deactivate)
POST   /api/v1/admin/volunteers/:id/notes           Add internal note
GET    /api/v1/admin/volunteers/:id/notes           Get notes for volunteer
GET    /api/v1/admin/volunteers/export              Export CSV/PDF
GET    /api/v1/admin/volunteers/pending             Get review queue (status=pending)
```

### Admin — Dashboard & Reporting
```
GET    /api/v1/admin/dashboard/stats                KPI summary
GET    /api/v1/admin/dashboard/registrations-chart  Registrations over time
GET    /api/v1/admin/dashboard/skills-breakdown     Skill distribution
GET    /api/v1/admin/dashboard/location-map         Geographic distribution
```

### Admin — Communications
```
POST   /api/v1/admin/communications                 Create campaign
GET    /api/v1/admin/communications                 List campaigns
GET    /api/v1/admin/communications/:id             Get campaign detail
PUT    /api/v1/admin/communications/:id             Update draft campaign
POST   /api/v1/admin/communications/:id/send        Send or schedule campaign
```

### Admin — Audit & System
```
GET    /api/v1/admin/audit-logs                     List audit logs (filterable)
GET    /api/v1/admin/users                          List admin users
POST   /api/v1/admin/users                          Create admin user
PATCH  /api/v1/admin/users/:id/role                 Change admin role
DELETE /api/v1/admin/users/:id                      Deactivate admin user
```

### Reference Data
```
GET    /api/v1/meta/skills                          All skills
GET    /api/v1/meta/mentoring-categories            All mentoring categories
GET    /api/v1/meta/languages                       All languages
```

---

## 8. AI Integration Opportunities

### Phase 1 (MVP — Lightweight AI)
| Feature | Description | Tool |
|---------|-------------|------|
| **Profile Completeness Scoring** | AI scores how complete and compelling a volunteer profile is (0–100). Used in admin review queue. | Claude API — structured output |
| **Motivation Analysis** | Flags generic or copy-paste motivation statements vs. genuine ones. Helps admins prioritize high-quality volunteers. | Claude API — text classification |
| **Smart Search** | Semantic search across volunteer profiles (e.g., "find someone who can teach Python to beginners") | Embedding-based vector search |

### Phase 2 (Post-MVP AI)
| Feature | Description | Tool |
|---------|-------------|------|
| **Mentor-Student Matching** | AI matches students with volunteers based on goals, subject area, language, schedule alignment | Claude API + custom scoring |
| **Session Prep Suggestions** | Before each session, AI suggests topics and resources to the volunteer based on the student's profile | Claude API |
| **Resume Analyzer** | Students upload resumes, AI gives improvement suggestions tailored to rural job markets | Claude API + PDF parsing |
| **Mock Interview Bot** | Conversational AI that conducts mock interviews, scores responses, and gives feedback | Claude claude-sonnet-4-6 |

### Phase 3 (Advanced AI)
| Feature | Description | Tool |
|---------|-------------|------|
| **Career Path Predictor** | Based on student skills and interests, AI suggests 3 career paths with steps | Claude API |
| **Volunteer Churn Prediction** | Identifies volunteers who haven't engaged recently and triggers re-engagement email | ML model trained on engagement data |
| **Impact Sentiment Analysis** | Analyzes session feedback for emotional tone and identifies struggling students | NLP pipeline |
| **AI-Powered Campaigns** | Admin types a natural language prompt, AI drafts the campaign email | Claude API — content generation |

### AI Design Principles
- All AI outputs are presented as suggestions, not decisions. Humans approve or override.
- No student or volunteer PII is sent to AI providers in raw form without anonymization.
- AI recommendations are logged and auditable.
- Bias monitoring: skill-matching AI is audited quarterly for demographic bias.

---

## 9. Security & Compliance Requirements

### Authentication & Access Control
- Passwords hashed with bcrypt (cost factor ≥ 12)
- JWT access tokens expire in 15 minutes; refresh tokens rotated on use
- Rate limiting: 5 failed logins → 15-minute lockout
- Admin login requires 2FA (TOTP via Google Authenticator / Authy)
- IP allowlisting option for admin portal

### Data Protection
- All data encrypted in transit (TLS 1.2+) and at rest (AES-256)
- PII fields (email, mobile, name) masked in logs
- Volunteer data not shared with third parties without consent
- GDPR-aligned data deletion: soft-delete + hard-delete after 30-day grace period
- Annual data retention review

### India-Specific Compliance
- IT Act 2000 compliance for data storage
- DPDP Act 2023 (Digital Personal Data Protection Act) compliance framework
- Consent collected explicitly at registration with granular toggles
- Grievance Officer designated with contact details published on platform

### Application Security
- All API inputs validated and sanitized (no SQL injection, XSS, or injection vectors)
- OWASP Top 10 addressed in security testing checklist
- CSRF protection on all state-changing endpoints
- Helmet.js / security headers on all HTTP responses
- Dependency vulnerability scanning (npm audit / Snyk) in CI pipeline
- Penetration test before Phase 1 launch; annually thereafter

### Infrastructure Security
- Separate environments: dev, staging, production
- Production database not accessible from internet (VPC-only)
- Secrets managed via environment variables / AWS Secrets Manager / Vault
- Automated backups daily with 30-day retention, weekly tested restore
- Uptime monitoring with PagerDuty alerts

---

## 10. MVP Scope vs Future Roadmap

### MVP (Phase 1) — Target: 3 Months

**In Scope**
- Public landing page
- Volunteer registration wizard (5 steps)
- Email verification flow
- Volunteer dashboard (profile, status)
- Admin portal (dashboard, volunteer list, review queue, approval workflow)
- Admin communication center (basic email)
- Admin role management (Super Admin + Admin)
- Audit logging
- Basic reporting (counts, charts)
- Export (CSV)
- Mobile-responsive UI

**Out of Scope for MVP**
- Student portal
- Mentor-student matching
- Session scheduling
- Payment / donation processing
- Advanced AI features
- YOTO offline integration
- Native mobile apps

### Phased Roadmap

| Phase | Features | Timeline | Budget Estimate |
|-------|----------|----------|-----------------|
| **MVP** | Volunteer portal + Admin portal | Months 1–3 | ₹3–5L |
| **Phase 2** | Donation module, payment gateway | Months 4–5 | ₹1–2L |
| **Phase 3** | Student portal, matching, sessions | Months 6–9 | ₹5–8L |
| **Phase 4** | AI engine, learning pathways, impact dashboard | Months 10–14 | ₹4–6L |
| **Phase 5** | YOTO physical center integration | Month 15+ | ₹8–15L |

---

## 11. Recommended Technology Stack

### Frontend
| Layer | Technology | Rationale |
|-------|------------|-----------|
| Framework | **Next.js 14** (React) | SSR for SEO, App Router, fast dev experience |
| Styling | **Tailwind CSS** | Rapid UI development, consistent design tokens |
| Component Library | **shadcn/ui** | Accessible, composable, fits Tailwind |
| Forms | **React Hook Form + Zod** | Performant forms, schema-driven validation |
| State Management | **Zustand** | Lightweight, no boilerplate |
| Data Fetching | **TanStack Query** | Caching, background refetch, loading states |
| Charts | **Recharts** | Composable, React-native charting |

### Backend
| Layer | Technology | Rationale |
|-------|------------|-----------|
| Runtime | **Node.js 20 LTS** | Large ecosystem, team familiarity |
| Framework | **Express.js or Hono** | Lightweight, flexible, easy middleware |
| ORM | **Drizzle ORM** | Type-safe, lightweight, works great with PostgreSQL |
| Validation | **Zod** | Shared schema between frontend and backend |
| Auth | **Custom JWT + bcrypt** | Full control, no vendor lock-in |
| Email | **Resend** or **SendGrid** | Reliable delivery, developer-friendly |
| Task Queue | **BullMQ (Redis)** | Background jobs: email dispatch, report generation |

### Database & Storage
| Layer | Technology | Rationale |
|-------|------------|-----------|
| Primary DB | **PostgreSQL 16** | ACID compliance, rich querying, JSON support |
| Caching | **Redis** | Session storage, rate limiting, job queue |
| File Storage | **AWS S3 / Cloudflare R2** | Profile attachments, exports |
| Vector DB (Phase 2) | **pgvector** | Semantic search within PostgreSQL |

### Infrastructure
| Layer | Technology | Rationale |
|-------|------------|-----------|
| Hosting | **AWS / Render.com** | Render for MVP (fast, cheap); AWS for scale |
| Containers | **Docker** | Consistent environments across dev/staging/prod |
| CI/CD | **GitHub Actions** | Native GitHub integration, free tier sufficient |
| Monitoring | **Sentry** (errors) + **Better Uptime** | Error tracking + uptime alerting |
| Logging | **Pino** + **Logtail** | Structured logging, cloud log drain |

### AI
| Feature | Technology |
|---------|------------|
| Text intelligence | **Anthropic Claude API** (claude-sonnet-4-6 for analysis, claude-haiku-4-5 for fast lightweight tasks) |
| Embeddings | **Anthropic Embeddings** or OpenAI Ada-002 |
| Semantic search | **pgvector** extension |

---

## 12. Wireframe Descriptions

### P-01: Landing Page
```
[HEADER]
  Logo (left) | Nav: About, Volunteer, Contact | CTA: "Become a Volunteer" (button, right)

[HERO SECTION]
  Headline: "Mentor a Rural Student. Change a Life."
  Subheadline: One paragraph explaining the mission
  Two CTAs: "Register as Volunteer" (primary) | "Learn More" (secondary)
  Hero image: mentor + student illustration

[STATS BAR]
  [🧑 248 Volunteers] [🏫 12 Colleges] [⏱ 1,400 Hours Volunteered] [📍 6 Districts]

[HOW IT WORKS]
  3 cards: Register → Get Matched → Start Mentoring

[MENTORING AREAS]
  Icon grid: 8 categories (Career Guidance, Coding, AI Awareness, Soft Skills, etc.)

[VOLUNTEER TESTIMONIALS]
  3 quote cards with photo, name, and organization

[YOTO VISION TEASER]
  Full-width banner: "The Future — YOTO Rural Development Center" with brief description

[FOOTER]
  Links | Social icons | Privacy Policy | Terms | Contact email
```

### P-03: Volunteer Registration Wizard
```
[PROGRESS BAR] Step 1 of 5 ████░░░░░░

[STEP 1 — Personal Info]
  Full Name* [____________]
  Email*     [____________]
  Mobile     [____________]
  City*      [____________]  State* [_____]  Country [India ▾]
  Gender     (○ Male  ○ Female  ○ Other  ○ Prefer not to say)
  
  [Continue →]

[STEP 2 — Professional Background]
  Job Title*        [______________]
  Organization*     [______________]
  Industry          [Dropdown ▾]
  Years Experience  [Slider: 0 ──●── 30+]
  LinkedIn URL      [______________]
  Qualification     [Dropdown ▾]
  
  [← Back]  [Continue →]

[STEP 3 — Skills & Interests]
  Your Skills (select all that apply):
  [Python] [Java] [Communication] [Leadership] [Data Science] [+12 more]
  
  Mentoring Areas (select all that apply):
  [Career Guidance] [Coding] [AI Awareness] [Mock Interviews] [+4 more]
  
  Languages Known:
  [Tamil] [Telugu] [Hindi] [English] [+more]
  
  [← Back]  [Continue →]

[STEP 4 — Availability]
  Hours per week:  ○ 1–2h  ○ 3–5h  ○ 5–10h  ○ 10h+
  Format:          ○ Online  ○ Offline  ○ Both
  Preferred days:  [Mon] [Tue] [Wed] [Thu] [Fri] [Sat] [Sun]
  Time slots:      [Morning] [Afternoon] [Evening]
  YOTO offline:    ○ Yes  ○ No
  Long-term:       ○ Yes  ○ No
  
  [← Back]  [Continue →]

[STEP 5 — Motivation & Consent]
  Why do you want to volunteer? (100–500 words)
  [_________________________________________________]
  
  Would you consider donating financially in future?
  ○ Yes  ○ No  ○ Maybe later
  
  ☐ I agree to the Terms of Use and Privacy Policy
  
  [← Back]  [Submit Application]
```

### A-01: Admin Dashboard
```
[SIDEBAR]
  Logo | Dashboard | Volunteers | Review Queue | Communications | Reports | Audit Log | Settings

[TOP BAR]
  "Admin Dashboard" | Admin name + avatar (right)

[KPI ROW]
  [Total Volunteers: 248] [Pending Review: 12] [Active: 201] [This Week: +18]

[CHARTS ROW — 2 columns]
  Left:  Line chart — Volunteer Registrations (last 6 months)
  Right: Donut chart — Status Distribution (Active / Pending / Deactivated)

[TABLES ROW — 2 columns]
  Left:  Recent Registrations table (Name, Date, Status, Action)
  Right: Top Skills Bar Chart

[MAP]
  Geographic distribution of volunteers by state (India choropleth)
```

### A-04: Review Queue
```
[PAGE HEADER]  "Pending Review (12)"  [Bulk Actions ▾]  [Search 🔍]

[FILTERS]
  Skills [▾] | Location [▾] | Experience [▾] | Date [▾]

[TABLE]
  ☐ | Name        | Title & Org           | Submitted  | Skills     | Action
  ☐ | Priya K.    | Sr. Dev @ Infosys     | Jun 21     | Python, ML | [Review]
  ☐ | Rahul M.    | HR Manager @ TCS      | Jun 20     | Soft Skills| [Review]
  ☐ | ...

[VOLUNTEER PROFILE DRAWER — slides in from right on "Review" click]
  Photo | Name | Title | Organization
  Tabs: [Personal] [Professional] [Interests] [Motivation] [Notes]
  
  Action buttons (bottom of drawer):
  [✅ Approve]  [⚠ Request Info]  [🚩 Flag]  [❌ Reject]
```

---

## 13. Success Metrics & KPIs

### Platform Health KPIs
| KPI | Target (End of Year 1) | Measurement |
|-----|------------------------|-------------|
| Volunteer registrations | 500 registered | Count in DB |
| Approval rate | ≥ 80% | Approved / Total submitted |
| Time to review | ≤ 48 hours median | Reviewed_at – Created_at |
| Profile completeness | ≥ 85% average score | AI completeness score |
| Admin response time | ≤ 24h for info requests | Audit log timestamps |
| Platform uptime | ≥ 99.5% | Uptime monitor |

### Volunteer Engagement KPIs (Phase 3 onward)
| KPI | Target | Measurement |
|-----|--------|-------------|
| Active mentors (sessions completed) | 60% of approved volunteers | Sessions table |
| Sessions per volunteer per month | ≥ 2 | Session count / month |
| Volunteer retention (6-month) | ≥ 70% | Still active at month 6 |
| Volunteer NPS | ≥ 50 | Post-session survey |
| Students mentored | 1,000 by end of Year 2 | Student-session records |

### Student Impact KPIs (Phase 3 onward)
| KPI | Target | Measurement |
|-----|--------|-------------|
| Student employability improvement | ≥ 40% self-reported | Pre/post survey |
| Mock interview confidence score | ≥ 30% improvement | AI scoring |
| Resume quality score improvement | ≥ 50% improvement | AI resume analyzer |
| Job / internship placement | 200 students/year | Outcome tracking |

### Financial KPIs (Phase 2 onward)
| KPI | Target | Measurement |
|-----|--------|-------------|
| Donation interest conversion | ≥ 15% of volunteers | Donation opt-in rate |
| Monthly recurring donations | ₹1L/month by Month 12 | Payment gateway data |
| Cost per student served | ≤ ₹500 | Total cost / students |
| Cost per volunteer onboarded | ≤ ₹200 | Total cost / volunteers |

---

## 14. Risk Analysis & Mitigation

### Risk Register

| # | Risk | Probability | Impact | Mitigation |
|---|------|-------------|--------|------------|
| R-01 | Low volunteer registration volume | Medium | High | Partner with corporates (CSR programs), LinkedIn outreach, college alumni networks |
| R-02 | Volunteer drop-off after registration | High | High | Onboarding email sequence, monthly engagement newsletters, recognition program |
| R-03 | Admin review bottleneck (insufficient capacity) | Medium | Medium | Reviewer role for delegated approvals, AI completeness pre-screening to prioritize |
| R-04 | Low volunteer-to-student matching success | Medium | High | Thorough intake forms, iterative AI model improvement, manual fallback |
| R-05 | Data breach / security incident | Low | Very High | Penetration testing, encryption at rest+transit, incident response plan |
| R-06 | Platform downtime during key campaigns | Low | High | Redundant hosting, health checks, 15-min RTO target |
| R-07 | Volunteer privacy concerns | Medium | Medium | Clear privacy policy, no PII sharing, DPDP Act compliance |
| R-08 | AI model bias in matching (Phase 3) | Medium | High | Quarterly bias audits, human override, diverse training data |
| R-09 | Regulatory changes (DPDP Act enforcement) | Medium | High | Engage legal counsel, modular consent architecture |
| R-10 | Funding / budget shortfall | Medium | Very High | Phased scope, minimum viable each phase, donor pipeline from platform itself |
| R-11 | College/NGO partnership delays | Medium | Medium | Pipeline 3+ institutional partners before launch, MOU templates ready |
| R-12 | Technical debt from fast MVP build | High | Medium | Code review gates, test coverage targets (≥70%), monthly refactor sprints |

### Risk Response Plan for Critical Risks

**R-02 — Volunteer Drop-off**
- Automated 3-email onboarding sequence (Day 1, Day 3, Day 7 post-approval)
- Monthly "Impact Newsletter" showing collective volunteer hours and student outcomes
- Annual Volunteer Appreciation Event (virtual first, then physical at YOTO)
- Badging system: "1-Year Mentor," "Top Contributor," etc.

**R-05 — Data Breach**
- Pre-launch: Third-party penetration test
- Incident Response Plan: Detect → Contain → Notify (within 72 hours per DPDP Act) → Remediate → Post-mortem
- Cyber insurance policy
- Quarterly security review with external auditor

**R-10 — Funding Shortfall**
- Phase 1 MVP buildable with volunteer developers or low-cost agency (₹3–5L)
- Apply to India NGO tech grants (GiveIndia Tech, Google.org, Tata Trusts)
- CSR partnership with IT companies (TCS, Infosys, Wipro CSR budgets)
- Activate donation module by Month 5 to begin self-sustaining revenue

---

## Appendix A: Volunteer Registration Fields — Complete Data Dictionary

| Field | Type | Required | Validation | Notes |
|-------|------|----------|------------|-------|
| full_name | String | Yes | 2–100 chars | |
| email | Email | Yes | Valid format, unique | Becomes login |
| mobile | String | No | 10-digit Indian or intl | |
| city | String | Yes | | |
| state | String | Yes | From state list | |
| country | String | Yes | Default: India | |
| gender | Enum | No | M/F/Other/Prefer not | |
| job_title | String | Yes | 2–100 chars | |
| organization | String | Yes | 2–200 chars | |
| industry | Enum | No | From taxonomy | |
| years_of_experience | Integer | Yes | 0–50 | |
| linkedin_url | URL | No | Valid LinkedIn URL | |
| highest_qualification | Enum | No | From list | |
| skills | Multi-select | Yes | Min 1 | |
| mentoring_categories | Multi-select | Yes | Min 1 | |
| languages | Multi-select | Yes | Min 1 | |
| hours_per_week | Enum | Yes | 1-2 / 3-5 / 5-10 / 10+ | |
| preferred_format | Enum | Yes | online/offline/both | |
| preferred_days | Multi-select | No | Days of week | |
| preferred_time_slots | Multi-select | No | morning/afternoon/evening | |
| open_to_offline_yoto | Boolean | Yes | | |
| open_to_long_term_mentoring | Boolean | Yes | | |
| motivation_statement | Text | Yes | 100–1000 chars | |
| donation_interest | Enum | Yes | yes/no/maybe | |
| terms_accepted | Boolean | Yes | Must be true | |

---

## Appendix B: Mentoring Categories (Initial Taxonomy)

1. Career Guidance & Goal Setting
2. Software Development & Coding
3. AI & Technology Awareness
4. Communication & Soft Skills
5. Mock Interviews & Interview Prep
6. Resume Building
7. Entrepreneurship & Business Basics
8. Industry Insights & Trends
9. English Language & Presentation Skills
10. Personal Finance & Life Skills

---

## Appendix C: Suggested Technology Partners

| Partner | Purpose | Why |
|---------|---------|-----|
| Resend | Transactional email | Developer-friendly, generous free tier |
| Razorpay | Payment processing (Phase 2) | Best-in-class India payment gateway |
| Google Workspace | Admin communication | Familiar to all stakeholders |
| Zoom / Google Meet | Video sessions (Phase 3) | No infrastructure cost |
| Cloudflare R2 | File storage | Cost-effective S3-compatible |
| Sentry | Error monitoring | Free tier adequate for MVP |
| GitHub | Source control + CI/CD | Industry standard, free for nonprofits |
| Anthropic Claude API | AI features | Most capable, safest AI for sensitive data |

---

*Document prepared: June 2026*
*Version: 1.0*
*Classification: Confidential — For Stakeholder and Development Team Review*
*Next Review: September 2026 (post-MVP launch)*

---
**VOLTR — Empowering Rural Futures, One Mentor at a Time**
