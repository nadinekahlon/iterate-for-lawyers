import { useState, type FormEvent } from "react";

function toErrorMessageString(error: unknown, fallback: string): string {
  if (typeof error === "string" && error.trim().length > 0) {
    return error;
  }
  if (error && typeof error === "object") {
    if ("message" in error && typeof (error as { message?: unknown }).message === "string") {
      return (error as { message: string }).message;
    }
  }
  return fallback;
}

export default function NativeQuestionForm() {
  const [question, setQuestion] = useState("");
  const [publicationConsent, setPublicationConsent] = useState(false);
  const [website, setWebsite] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!publicationConsent || question.length < 20) return;

    setLoading(true);
    setErrorMsg("");

    try {
      const response = await fetch("/api/dear-nadine/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ question, publicationConsent, website }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data?.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(toErrorMessageString(data?.error, "Please complete the question and consent box, then try again."));
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="native-form-success" role="status">
        <span>Question received</span>
        <h3>Thank you for trusting me with it.</h3>
        <p>
          I read every submission. I cannot respond individually, but selected questions may be answered in a future Dear Nadine edition.
        </p>
        <button className="native-form-reset" onClick={() => { setSubmitted(false); setQuestion(""); setPublicationConsent(false); }}>
          Ask another question
        </button>
      </div>
    );
  }

  return (
    <form className="native-question-form" action="/api/dear-nadine/submit" method="post" onSubmit={handleSubmit}>
      {errorMsg ? <p className="native-form-error" role="alert">{errorMsg}</p> : null}
      
      <label className="native-field-label" htmlFor="dear-nadine-question">
        What is the career question you are sitting with? <span aria-hidden="true">*</span>
      </label>
      <p className="native-field-hint" id="question-guidance">
        Please do not include names, employers, clients, matters or other identifying information.
      </p>
      <textarea
        id="dear-nadine-question"
        name="question"
        aria-describedby="question-guidance"
        value={question}
        onChange={(event) => setQuestion(event.target.value)}
        disabled={loading}
        required
        minLength={20}
        maxLength={3000}
        placeholder="Write your question here."
        rows={8}
      />
      <div className="native-character-count" aria-live="polite">{question.length}/3000</div>

      <label className="native-consent">
        <input
          type="checkbox"
          name="publicationConsent"
          checked={publicationConsent}
          onChange={(event) => setPublicationConsent(event.target.checked)}
          disabled={loading}
          required
        />
        <span>
          I understand that my question may be edited, combined with a similar question and published anonymously.
        </span>
      </label>

      <label className="native-form-honeypot" htmlFor="dear-nadine-website">
        Website
        <input
          id="dear-nadine-website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </label>

      <button className="native-form-submit" type="submit" disabled={!publicationConsent || question.length < 20 || loading}>
        {loading ? "Sending..." : "Send anonymously"} <span aria-hidden="true">↘</span>
      </button>
    </form>
  );
}
