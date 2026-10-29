export interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  consent: boolean;
  locale: string;
  /** Honeypot: must stay empty. */
  website?: string;
}

export type ContactField = "name" | "email" | "phone" | "subject" | "message" | "consent";
export type ContactError = "required" | "email" | "phone" | "tooShort" | "consent";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^[+()\d\s./-]{6,24}$/;

export const contactLimits = { name: 120, email: 160, phone: 30, subject: 160, message: 4000 };

/** Shared by the browser form and the API route so both apply identical rules. */
export function validateContact(data: Partial<ContactPayload>) {
  const errors: Partial<Record<ContactField, ContactError>> = {};
  const name = (data.name ?? "").trim();
  const email = (data.email ?? "").trim();
  const phone = (data.phone ?? "").trim();
  const subject = (data.subject ?? "").trim();
  const message = (data.message ?? "").trim();

  if (name.length < 2) errors.name = "required";
  if (!email) errors.email = "required";
  else if (!EMAIL.test(email) || email.length > contactLimits.email) errors.email = "email";
  if (phone && (!PHONE.test(phone) || phone.replace(/\D/g, "").length < 6)) errors.phone = "phone";
  if (!subject) errors.subject = "required";
  if (!message) errors.message = "required";
  else if (message.length < 10) errors.message = "tooShort";
  if (!data.consent) errors.consent = "consent";

  return errors;
}
