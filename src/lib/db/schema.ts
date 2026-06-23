import {
  pgTable,
  uuid,
  varchar,
  boolean,
  timestamp,
  smallint,
  text,
  serial,
  bigserial,
  inet,
  jsonb,
  pgEnum,
  primaryKey,
} from "drizzle-orm/pg-core";

// ── Enums ────────────────────────────────────────────────────────────────────
export const userRoleEnum = pgEnum("user_role", [
  "super_admin",
  "admin",
  "reviewer",
  "volunteer",
  "student",
]);

export const volunteerStatusEnum = pgEnum("volunteer_status", [
  "pending",
  "active",
  "rejected",
  "deactivated",
  "awaiting_info",
]);

export const preferredFormatEnum = pgEnum("preferred_format", [
  "online",
  "offline",
  "both",
]);

export const donationInterestEnum = pgEnum("donation_interest", [
  "yes",
  "no",
  "maybe",
]);

export const campaignStatusEnum = pgEnum("campaign_status", [
  "draft",
  "scheduled",
  "sent",
  "failed",
]);

// ── Users ────────────────────────────────────────────────────────────────────
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  role: userRoleEnum("role").notNull().default("volunteer"),
  isActive: boolean("is_active").default(true),
  emailVerified: boolean("email_verified").default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  lastLoginAt: timestamp("last_login_at", { withTimezone: true }),
});

// ── Volunteer Profiles ───────────────────────────────────────────────────────
export const volunteerProfiles = pgTable("volunteer_profiles", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),

  // Personal
  fullName: varchar("full_name", { length: 255 }).notNull(),
  mobile: varchar("mobile", { length: 20 }),
  city: varchar("city", { length: 100 }),
  state: varchar("state", { length: 100 }),
  country: varchar("country", { length: 100 }).default("India"),
  gender: varchar("gender", { length: 20 }),

  // Professional
  jobTitle: varchar("job_title", { length: 255 }),
  organization: varchar("organization", { length: 255 }),
  industry: varchar("industry", { length: 100 }),
  yearsOfExperience: smallint("years_of_experience"),
  linkedinUrl: varchar("linkedin_url", { length: 500 }),
  highestQualification: varchar("highest_qualification", { length: 100 }),

  // Availability
  hoursPerWeek: smallint("hours_per_week"),
  preferredFormat: preferredFormatEnum("preferred_format").default("online"),
  preferredDays: text("preferred_days").array(),
  preferredTimeSlots: text("preferred_time_slots").array(),
  openToOfflineYoto: boolean("open_to_offline_yoto").default(false),
  openToLongTermMentoring: boolean("open_to_long_term_mentoring").default(
    false
  ),

  // Motivation
  motivationStatement: text("motivation_statement"),
  donationInterest: donationInterestEnum("donation_interest").default("maybe"),

  // Status
  status: volunteerStatusEnum("status").default("pending"),
  rejectionReason: text("rejection_reason"),
  reviewedBy: uuid("reviewed_by").references(() => users.id),
  reviewedAt: timestamp("reviewed_at", { withTimezone: true }),

  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// ── Reference Data ───────────────────────────────────────────────────────────
export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).unique().notNull(),
  category: varchar("category", { length: 100 }),
  isActive: boolean("is_active").default(true),
});

export const mentoringCategories = pgTable("mentoring_categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 150 }).unique().notNull(),
  icon: varchar("icon", { length: 50 }),
});

export const languages = pgTable("languages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).unique().notNull(),
});

// ── Join Tables ──────────────────────────────────────────────────────────────
export const volunteerSkills = pgTable(
  "volunteer_skills",
  {
    volunteerId: uuid("volunteer_id")
      .references(() => volunteerProfiles.id, { onDelete: "cascade" })
      .notNull(),
    skillId: serial("skill_id")
      .references(() => skills.id, { onDelete: "cascade" })
      .notNull(),
  },
  (t) => [primaryKey({ columns: [t.volunteerId, t.skillId] })]
);

export const volunteerMentoringInterests = pgTable(
  "volunteer_mentoring_interests",
  {
    volunteerId: uuid("volunteer_id")
      .references(() => volunteerProfiles.id, { onDelete: "cascade" })
      .notNull(),
    categoryId: serial("category_id")
      .references(() => mentoringCategories.id, { onDelete: "cascade" })
      .notNull(),
  },
  (t) => [primaryKey({ columns: [t.volunteerId, t.categoryId] })]
);

export const volunteerLanguages = pgTable(
  "volunteer_languages",
  {
    volunteerId: uuid("volunteer_id")
      .references(() => volunteerProfiles.id, { onDelete: "cascade" })
      .notNull(),
    languageId: serial("language_id")
      .references(() => languages.id, { onDelete: "cascade" })
      .notNull(),
  },
  (t) => [primaryKey({ columns: [t.volunteerId, t.languageId] })]
);

// ── Admin Notes ──────────────────────────────────────────────────────────────
export const volunteerNotes = pgTable("volunteer_notes", {
  id: uuid("id").primaryKey().defaultRandom(),
  volunteerId: uuid("volunteer_id")
    .references(() => volunteerProfiles.id, { onDelete: "cascade" })
    .notNull(),
  adminId: uuid("admin_id").references(() => users.id),
  note: text("note").notNull(),
  isInternal: boolean("is_internal").default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// ── Audit Logs ───────────────────────────────────────────────────────────────
export const auditLogs = pgTable("audit_logs", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  actorId: uuid("actor_id").references(() => users.id),
  actorRole: varchar("actor_role", { length: 50 }),
  action: varchar("action", { length: 100 }).notNull(),
  targetType: varchar("target_type", { length: 50 }),
  targetId: uuid("target_id"),
  payload: jsonb("payload"),
  ipAddress: inet("ip_address"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// ── Communication Campaigns ───────────────────────────────────────────────────
export const communicationCampaigns = pgTable("communication_campaigns", {
  id: uuid("id").primaryKey().defaultRandom(),
  createdBy: uuid("created_by").references(() => users.id),
  subject: varchar("subject", { length: 500 }).notNull(),
  bodyHtml: text("body_html").notNull(),
  audienceFilter: jsonb("audience_filter"),
  status: campaignStatusEnum("status").default("draft"),
  scheduledAt: timestamp("scheduled_at", { withTimezone: true }),
  sentAt: timestamp("sent_at", { withTimezone: true }),
  recipientCount: serial("recipient_count"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// ── Email Verifications ───────────────────────────────────────────────────────
export const emailVerifications = pgTable("email_verifications", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  token: varchar("token", { length: 255 }).unique().notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  usedAt: timestamp("used_at", { withTimezone: true }),
});

// ── Password Reset Tokens ─────────────────────────────────────────────────────
export const passwordResetTokens = pgTable("password_reset_tokens", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  token: varchar("token", { length: 255 }).unique().notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  usedAt: timestamp("used_at", { withTimezone: true }),
});

// ── Refresh Tokens ────────────────────────────────────────────────────────────
export const refreshTokens = pgTable("refresh_tokens", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  tokenHash: varchar("token_hash", { length: 255 }).unique().notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  revokedAt: timestamp("revoked_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// ── Type Exports ─────────────────────────────────────────────────────────────
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type VolunteerProfile = typeof volunteerProfiles.$inferSelect;
export type NewVolunteerProfile = typeof volunteerProfiles.$inferInsert;
export type AuditLog = typeof auditLogs.$inferSelect;
export type CommunicationCampaign = typeof communicationCampaigns.$inferSelect;
