import { z } from "zod";

const KIT_API_BASE = "https://api.kit.com/v4";
export const DEAR_NADINE_KIT_FORM_ID = 9851247;

export function getKitFormId(): string | number {
  return process.env.KIT_FORM_ID || DEAR_NADINE_KIT_FORM_ID;
}

export const nativeKitSubscriptionSchema = z.object({
  emailAddress: z.string().trim().email("Please enter a valid email address.").max(320),
  /** Visually hidden anti-spam field. Real readers leave it empty. */
  website: z.string().max(200).optional().default(""),
});

export type KitSubscriberResponse = {
  subscriber?: { id?: number };
  errors?: string[];
};

export function getKitApiKey(): string {
  const apiKey = process.env.KIT_API_KEY;
  if (!apiKey) {
    throw new Error("Kit API is not configured. KIT_API_KEY environment variable is missing.");
  }
  return apiKey;
}

export async function kitRequest(path: string, body: Record<string, unknown>): Promise<KitSubscriberResponse> {
  const apiKey = getKitApiKey();
  const response = await fetch(`${KIT_API_BASE}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Kit-Api-Key": apiKey,
    },
    body: JSON.stringify(body),
  });

  const payload = (await response.json().catch(() => ({}))) as KitSubscriberResponse;

  if (!response.ok) {
    const errorMsg = payload.errors?.join(" ") || `Kit API request failed with status ${response.status}`;
    throw new Error(errorMsg);
  }

  return payload;
}

/**
 * Adds an email address to the configured Kit V4 form without exposing API credentials to the browser.
 * Kit acts as the system of record for subscriber state and confirmation emails.
 */
export async function subscribeToDearNadine(emailAddress: string, referrer: string): Promise<KitSubscriberResponse> {
  // Step 1: Create or update subscriber as inactive for double opt-in verification
  await kitRequest("/subscribers", { email_address: emailAddress, state: "inactive" });

  // Step 2: Add subscriber to the Dear Nadine form
  const formId = getKitFormId();
  return await kitRequest(`/forms/${formId}/subscribers`, {
    email_address: emailAddress,
    referrer,
  });
}
