import { Eyebrow, TextLink } from "@/components/SiteShell";

export default function NotFound() {
  return (
    <section className="page-hero page-hero-sky">
      <div className="page-hero-inner">
        <Eyebrow number="404">Page not found</Eyebrow>
        <h1>This page does not <em>exist.</em></h1>
        <p className="hero-intro">The link you followed may have moved or no longer exists.</p>
        <div style={{ marginTop: "32px" }}>
          <TextLink href="/">Return to Home</TextLink>
        </div>
      </div>
    </section>
  );
}
