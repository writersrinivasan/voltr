export type UserRole = "super_admin" | "admin" | "reviewer" | "volunteer" | "student";
export type VolunteerStatus = "pending" | "active" | "rejected" | "deactivated" | "awaiting_info";
export type PreferredFormat = "online" | "offline" | "both";
export type DonationInterest = "yes" | "no" | "maybe";

export interface SessionUser {
  sub: string;
  email: string;
  role: UserRole;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
