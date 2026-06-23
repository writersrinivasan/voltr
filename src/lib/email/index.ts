import { Resend } from "resend";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY!);
}

function getFrom() {
  return process.env.EMAIL_FROM ?? "VOLTR <noreply@voltr.org>";
}

export async function sendVerificationEmail(
  to: string,
  name: string,
  token: string
) {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-email?token=${token}`;
  await getResend().emails.send({
    from: getFrom(),
    to,
    subject: "Verify your VOLTR account",
    html: `
      <h2>Welcome to VOLTR, ${name}!</h2>
      <p>Thank you for registering as a volunteer. Please verify your email address to complete your application.</p>
      <p><a href="${url}" style="background:#16a34a;color:white;padding:12px 24px;border-radius:6px;text-decoration:none;">Verify Email</a></p>
      <p>This link expires in 24 hours.</p>
      <p>If you did not register, please ignore this email.</p>
    `,
  });
}

export async function sendApprovalEmail(to: string, name: string) {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`;
  await getResend().emails.send({
    from: getFrom(),
    to,
    subject: "Your VOLTR volunteer application has been approved!",
    html: `
      <h2>Congratulations, ${name}!</h2>
      <p>Your volunteer application has been reviewed and approved. You can now log in and access your volunteer dashboard.</p>
      <p><a href="${url}" style="background:#16a34a;color:white;padding:12px 24px;border-radius:6px;text-decoration:none;">Go to Dashboard</a></p>
      <p>Thank you for your commitment to empowering rural students.</p>
    `,
  });
}

export async function sendRejectionEmail(
  to: string,
  name: string,
  reason?: string
) {
  await getResend().emails.send({
    from: getFrom(),
    to,
    subject: "Update on your VOLTR volunteer application",
    html: `
      <h2>Dear ${name},</h2>
      <p>Thank you for your interest in volunteering with VOLTR. After careful review, we are unable to approve your application at this time.</p>
      ${reason ? `<p><strong>Reason:</strong> ${reason}</p>` : ""}
      <p>You are welcome to re-apply in the future. If you have questions, please contact us at support@voltr.org.</p>
    `,
  });
}

export async function sendPasswordResetEmail(
  to: string,
  name: string,
  token: string
) {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/reset-password?token=${token}`;
  await getResend().emails.send({
    from: getFrom(),
    to,
    subject: "Reset your VOLTR password",
    html: `
      <h2>Password Reset — VOLTR</h2>
      <p>Hi ${name}, we received a request to reset your password.</p>
      <p><a href="${url}" style="background:#16a34a;color:white;padding:12px 24px;border-radius:6px;text-decoration:none;">Reset Password</a></p>
      <p>This link expires in 1 hour. If you did not request this, please ignore this email.</p>
    `,
  });
}
