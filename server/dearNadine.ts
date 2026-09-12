import { z } from "zod";

export const nativeQuestionInputSchema = z.object({
  question: z.string().trim().min(20, "Please share a little more so the question is useful.").max(3000),
  publicationConsent: z.literal(true, {
    message: "Please confirm that your question may be edited and published anonymously.",
  }),
  /** Visually hidden anti-spam field. Real readers leave it empty. */
  website: z.string().max(200).optional().default(""),
});

export type DearNadineSubmission = {
  id: string;
  question: string;
  publicationConsent: boolean;
  createdAt: string;
};

const DEFAULT_RECIPIENT_EMAIL = "nadine@iterateforlawyers.com";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function sendDearNadineQuestionEmail(
  question: string,
  publicationConsent: boolean
): Promise<{ success: boolean; provider: string }> {
  const recipientEmail = process.env.DEAR_NADINE_QUESTION_RECIPIENT || DEFAULT_RECIPIENT_EMAIL;
  const fromEmail = process.env.EMAIL_FROM || process.env.RESEND_FROM_EMAIL || "Dear Nadine <dearnadine@iterateforlawyers.com>";
  const submittedAt = new Date().toISOString();
  const formattedDate = new Date().toUTCString();

  const subject = "New Anonymous Question — Dear Nadine";

  const plainTextBody = `New Anonymous Question — Dear Nadine
======================================

Question:
--------------------------------------
${question}
--------------------------------------

Publication Consent Given: ${publicationConsent ? "Yes" : "No"}
Submitted At: ${formattedDate} (${submittedAt})

Note: This question was submitted anonymously via the Dear Nadine question form on iterateforlawyers.com. No identifying user details were collected.
`;

  const htmlBody = `
<div style="font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #071b2e; background-color: #ffffff;">
  <h2 style="font-family: 'DM Serif Display', Georgia, serif; color: #071b2e; font-size: 24px; border-bottom: 2px solid #0875b7; padding-bottom: 12px; margin-top: 0;">
    New Anonymous Question — Dear Nadine
  </h2>
  
  <div style="background-color: #fbfaf7; border: 1px solid #c8d7df; padding: 20px; margin: 20px 0; border-radius: 4px;">
    <p style="font-size: 16px; line-height: 1.6; color: #071b2e; margin: 0; white-space: pre-wrap;">${escapeHtml(question)}</p>
  </div>

  <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #576c7b; margin-top: 16px;">
    <tr>
      <td style="padding: 6px 0; font-weight: bold; width: 180px;">Publication Consent:</td>
      <td style="padding: 6px 0; color: #065f46; font-weight: bold;">Yes (Granted)</td>
    </tr>
    <tr>
      <td style="padding: 6px 0; font-weight: bold;">Submission Date/Time:</td>
      <td style="padding: 6px 0;">${formattedDate}</td>
    </tr>
  </table>

  <hr style="border: none; border-top: 1px solid #c8d7df; margin: 24px 0;" />
  <p style="font-size: 12px; color: #64748b; line-height: 1.5; margin: 0;">
    This is an automated notification from the <strong>Dear Nadine</strong> anonymous question form on <a href="https://iterateforlawyers.com" style="color: #0875b7;">iterateforlawyers.com</a>. No name, email, or identifying information was requested or attached.
  </p>
</div>
`;

  // 1. Resend API
  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [recipientEmail],
        subject,
        text: plainTextBody,
        html: htmlBody,
      }),
    });

    const data = (await response.json().catch(() => ({}))) as any;
    if (!response.ok) {
      const errorMsg = data?.message || data?.name || `Resend API HTTP ${response.status}`;
      throw new Error(`Resend email delivery failed: ${errorMsg}`);
    }
    return { success: true, provider: "Resend" };
  }

  // 2. SendGrid API
  const sendgridApiKey = process.env.SENDGRID_API_KEY;
  if (sendgridApiKey) {
    const cleanFrom = fromEmail.includes("<") ? fromEmail.replace(/.*<(.+)>/, "$1") : fromEmail;
    const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sendgridApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: recipientEmail }] }],
        from: { email: cleanFrom },
        subject,
        content: [
          { type: "text/plain", value: plainTextBody },
          { type: "text/html", value: htmlBody },
        ],
      }),
    });

    if (!response.ok) {
      const errorMsg = await response.text();
      throw new Error(`SendGrid email delivery failed (${response.status}): ${errorMsg}`);
    }
    return { success: true, provider: "SendGrid" };
  }

  // 3. Postmark API
  const postmarkToken = process.env.POSTMARK_SERVER_TOKEN;
  if (postmarkToken) {
    const response = await fetch("https://api.postmarkapp.com/email", {
      method: "POST",
      headers: {
        "X-Postmark-Server-Token": postmarkToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        From: fromEmail,
        To: recipientEmail,
        Subject: subject,
        TextBody: plainTextBody,
        HtmlBody: htmlBody,
      }),
    });

    if (!response.ok) {
      const errorMsg = await response.text();
      throw new Error(`Postmark email delivery failed (${response.status}): ${errorMsg}`);
    }
    return { success: true, provider: "Postmark" };
  }

  // 4. Local Development Fallback
  console.log(`[Dear Nadine Email] Local dev mode — Simulated email to ${recipientEmail}:`);
  console.log(`Subject: ${subject}`);
  console.log(`Body:\n${plainTextBody}`);

  return { success: true, provider: "Local Development Console" };
}
