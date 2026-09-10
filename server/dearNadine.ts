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

// In-memory store for standalone mode (can easily be persisted if needed)
const submissions: DearNadineSubmission[] = [];

export function saveQuestionSubmission(question: string, publicationConsent: boolean): DearNadineSubmission {
  const submission: DearNadineSubmission = {
    id: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    question,
    publicationConsent,
    createdAt: new Date().toISOString(),
  };
  submissions.push(submission);
  return submission;
}

export function getSubmissions(): DearNadineSubmission[] {
  return [...submissions];
}
