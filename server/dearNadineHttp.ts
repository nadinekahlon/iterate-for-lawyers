import { z } from "zod";
import type { Application, Request, Response } from "express";
import { nativeQuestionInputSchema, saveQuestionSubmission } from "./dearNadine";
import { nativeKitSubscriptionSchema, subscribeToDearNadine } from "./kit";

export function parseNativeQuestionPost(body: Record<string, unknown>) {
  return nativeQuestionInputSchema.parse({
    question: typeof body.question === "string" ? body.question : "",
    publicationConsent: body.publicationConsent === "on" || body.publicationConsent === "true" || body.publicationConsent === true,
    website: typeof body.website === "string" ? body.website : "",
  });
}

export function parseNativeKitSubscriptionPost(body: Record<string, unknown>) {
  return nativeKitSubscriptionSchema.parse({
    emailAddress: typeof body.email_address === "string" ? body.email_address : typeof body.emailAddress === "string" ? body.emailAddress : "",
    website: typeof body.website === "string" ? body.website : "",
  });
}

export function extractRouteErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof z.ZodError) {
    return error.issues[0]?.message || error.errors[0]?.message || fallback;
  }
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === "string") {
    return error;
  }
  if (error && typeof error === "object" && "message" in error && typeof (error as any).message === "string") {
    return (error as any).message;
  }
  return fallback;
}

export function registerDearNadineHttpRoutes(app: Application) {
  // Anonymous question submission
  app.post("/api/dear-nadine/submit", async (req: Request, res: Response) => {
    const isJson = req.headers["accept"]?.includes("application/json") || req.is("json");

    try {
      const input = parseNativeQuestionPost(req.body as Record<string, unknown>);

      // Honeypot check: suspected bots receive a neutral response without database retention
      if (!input.website) {
        saveQuestionSubmission(input.question, input.publicationConsent);
      }

      if (isJson) {
        return res.json({ success: true, message: "Question received." });
      }
      return res.redirect(303, "/dear-nadine?submitted=1#ask");
    } catch (error) {
      if (isJson) {
        const message = extractRouteErrorMessage(error, "Validation failed.");
        return res.status(400).json({ success: false, error: message });
      }
      return res.redirect(303, "/dear-nadine?submitted=error#ask");
    }
  });

  // Newsletter subscription
  app.post("/api/dear-nadine/subscribe", async (req: Request, res: Response) => {
    const isJson = req.headers["accept"]?.includes("application/json") || req.is("json");

    try {
      const input = parseNativeKitSubscriptionPost(req.body as Record<string, unknown>);

      // Honeypot check: suspected bots receive neutral response without Kit call
      if (!input.website) {
        const host = req.get("host") || "localhost:3000";
        const protocol = req.protocol || "http";
        const referrer = `${protocol}://${host}/dear-nadine`;
        
        await subscribeToDearNadine(input.emailAddress, referrer);
      }

      if (isJson) {
        return res.json({ success: true, status: "pending", message: "Check your inbox for Kit confirmation." });
      }
      return res.redirect(303, "/dear-nadine?subscription=pending#subscribe");
    } catch (error) {
      console.error("[Dear Nadine] Kit subscription failed:", error);
      if (isJson) {
        const message = extractRouteErrorMessage(error, "Kit subscription failed.");
        return res.status(400).json({ success: false, error: message });
      }
      return res.redirect(303, "/dear-nadine?subscription=error#subscribe");
    }
  });
}
