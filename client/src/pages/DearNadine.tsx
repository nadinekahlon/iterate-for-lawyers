import { useEffect } from "react";
import KitSignup from "@/components/KitSignup";
import { BookingLink, Eyebrow } from "@/components/SiteShell";

const portraitUrl = "/assets/iterate-nadine-hero-portrait-1.webp";

function useNewsletterSeo() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Newsletter | Iterate for Lawyers";

    const canonicalUrl = "https://iterateforlawyers.com/newsletter";
    const title = "Newsletter | Iterate for Lawyers";
    const description =
      "An unfiltered read on legal careers and the profession, from Nadine Kahlon, founder of Iterate for Lawyers.";
    const imageUrl = "https://iterateforlawyers.com/assets/iterate-nadine-hero-portrait-1.webp";

    const setMeta = (attr: "name" | "property", key: string, content: string) => {
      let element = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      const existed = !!element;
      const prevContent = element?.getAttribute("content");
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attr, key);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
      return () => {
        if (!existed) {
          element?.remove();
        } else if (prevContent !== null && prevContent !== undefined) {
          element?.setAttribute("content", prevContent);
        }
      };
    };

    const setLink = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      const existed = !!element;
      const prevHref = element?.getAttribute("href");
      if (!element) {
        element = document.createElement("link");
        element.setAttribute(rel, rel);
        document.head.appendChild(element);
      }
      element.setAttribute("href", href);
      return () => {
        if (!existed) {
          element?.remove();
        } else if (prevHref !== null && prevHref !== undefined) {
          element?.setAttribute("href", prevHref);
        }
      };
    };

    const cleanups = [
      setLink("canonical", canonicalUrl),
      setMeta("name", "description", description),
      setMeta("property", "og:title", title),
      setMeta("property", "og:description", description),
      setMeta("property", "og:url", canonicalUrl),
      setMeta("property", "og:type", "website"),
      setMeta("property", "og:image", imageUrl),
      setMeta("name", "twitter:card", "summary_large_image"),
      setMeta("name", "twitter:title", title),
      setMeta("name", "twitter:description", description),
      setMeta("name", "twitter:image", imageUrl),
    ];

    return () => {
      document.title = prevTitle;
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);
}

export default function DearNadine() {
  useNewsletterSeo();
  const searchParams = new URLSearchParams(window.location.search);
  const subscriptionState = searchParams.get("subscription");

  return (
    <>
      {/* SECTION 01 — NEWSLETTER */}
      <section className="newsletter-hero section-sky" id="subscribe">
        <div className="newsletter-hero-inner">
          <Eyebrow number="01">NEWSLETTER</Eyebrow>
          <h1>
            What lawyers think<br />
            <em>but rarely say.</em>
          </h1>
          <p className="newsletter-hero-body">
            An unfiltered read on legal careers and the profession, delivered straight to your inbox.
          </p>

          <div className="newsletter-form-container">
            {subscriptionState === "pending" ? (
              <div className="native-form-success native-subscription-success" role="status">
                <span>One more step</span>
                <h3>Check your inbox.</h3>
                <p>
                  Check your inbox for Kit’s confirmation email, then click its confirmation link to
                  complete your subscription.
                </p>
              </div>
            ) : subscriptionState === "error" ? (
              <div className="native-form-success native-subscription-success native-subscription-error" role="alert">
                <span>Try again</span>
                <h3>Your subscription did not save.</h3>
                <p>Please check your email address and try again. If the problem continues, come back shortly.</p>
              </div>
            ) : subscriptionState === "confirmed" ? (
              <div className="native-form-success native-subscription-success" role="status">
                <span>Subscription confirmed</span>
                <h3>You’re on the list.</h3>
                <p>The newsletter will arrive in your inbox every month.</p>
              </div>
            ) : (
              <KitSignup buttonText="SUBSCRIBE" />
            )}
          </div>

          <div className="newsletter-byline">
            <img
              src={portraitUrl}
              alt="Nadine Kahlon"
              className="newsletter-byline-avatar"
            />
            <div className="newsletter-byline-info">
              <strong className="newsletter-byline-name">Nadine Kahlon</strong>
              <span className="newsletter-byline-subtitle">
                15+ years across private practice and in-house
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 02 — WHEN THE QUESTION IS PERSONAL */}
      <section className="newsletter-personal">
        <div className="newsletter-personal-inner">
          <div className="newsletter-personal-heading-col">
            <Eyebrow number="02" light>WHEN THE QUESTION IS PERSONAL</Eyebrow>
            <h2>
              The newsletter is public.<br />
              <em>Your next move is not.</em>
            </h2>
          </div>
          <div className="newsletter-personal-content-col">
            <p>
              Some questions need more than a generic answer. A private Career Strategy Conversation gives you time to examine the options, assumptions and opportunity costs properly.
            </p>
            <BookingLink
              className="newsletter-personal-booking"
              href="https://calendly.com/nadine-iterateforlawyers/30min"
              label="BOOK YOUR CAREER STRATEGY INTRODUCTION"
            />
          </div>
        </div>
      </section>
    </>
  );
}
