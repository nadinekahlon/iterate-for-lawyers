import { describe, expect, it } from "vitest";
import { parseNativeKitSubscriptionPost, parseNativeQuestionPost } from "./dearNadineHttp";

describe("Dear Nadine HTTP Post Parsing", () => {
  const validQuestion = "I am testing the native anonymous-question form with a safe and sufficiently detailed test question.";

  it("accepts valid question input posted by the HTML form", () => {
    expect(parseNativeQuestionPost({ question: validQuestion, publicationConsent: "on", website: "" })).toMatchObject({
      question: validQuestion,
      publicationConsent: true,
      website: "",
    });
  });

  it("rejects a question post with no publication consent", () => {
    expect(() => parseNativeQuestionPost({ question: validQuestion, website: "" })).toThrow();
  });

  it("accepts valid email subscription post", () => {
    expect(parseNativeKitSubscriptionPost({ email_address: "test@example.com", website: "" })).toMatchObject({
      emailAddress: "test@example.com",
      website: "",
    });
  });

  it("rejects invalid email subscription post", () => {
    expect(() => parseNativeKitSubscriptionPost({ email_address: "invalid-email", website: "" })).toThrow();
  });
});
