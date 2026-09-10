import { useState, type FormEvent } from "react";

export default function KitSignup() {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/dear-nadine/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ email_address: email, website }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Your subscription could not be saved. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  if (status === "success") {
    return (
      <div className="native-form-success native-subscription-success" role="status">
        <span>One more step</span>
        <h3>Check your inbox.</h3>
        <p>
          Check your inbox for Kit’s confirmation email, then click its confirmation link to complete your Dear Nadine subscription.
        </p>
      </div>
    );
  }

  return (
    <div>
      {status === "error" && (
        <p className="native-form-error" role="alert" style={{ marginBottom: "12px" }}>
          {errorMessage}
        </p>
      )}
      <form
        action="/api/dear-nadine/subscribe"
        className="native-kit-form"
        method="post"
        onSubmit={handleSubmit}
      >
        <label className="sr-only" htmlFor="dear-nadine-email">
          Email address
        </label>
        <input
          id="dear-nadine-email"
          name="email_address"
          type="email"
          autoComplete="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          required
        />
        <label className="native-form-honeypot" aria-hidden="true">
          Leave this field empty
          <input
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Subscribe"} <span aria-hidden="true">↘</span>
        </button>
      </form>
    </div>
  );
}
