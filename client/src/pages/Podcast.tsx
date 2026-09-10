import { Eyebrow } from "@/components/SiteShell";

const quietTableUrl = "/assets/decision-workspace.png";

export default function Podcast() {
  return (
    <>
      <section className="podcast-hero">
        <div className="podcast-copy">
          <Eyebrow number="01" light>Coming soon</Eyebrow>
          <span className="headphone" aria-hidden="true">◖◗</span>
          <h1>The Iterate<br /><em>Podcast.</em></h1>
          <p>Conversations for lawyers who are interested in the people behind the job titles and their journeys.</p>
          <div className="agenda">
            <span>On the agenda</span>
            <strong>Career strategy. AI and the future of legal work. Unconventional career pathways for lawyers. Mindset. Lawyers and neurodiversity. And much more!</strong>
          </div>
        </div>
        <div className="podcast-image">
          <img src={quietTableUrl} alt="A quiet table with a notebook and pen" />
        </div>
      </section>

      <section className="section-paper podcast-expectation">
        <div className="section-slim">
          <Eyebrow number="02">What to expect</Eyebrow>
          <h2>Not another podcast about how to be more <em>productive.</em></h2>
          <p>These will be candid conversations about what lawyers actually think about work—and often do not say out loud.</p>
          <p>Episodes will be added here when the series launches.</p>
          <div className="podcast-guest-callout">
            <Eyebrow number="03">Be a guest</Eyebrow>
            <h2>Not every legal career follows the expected <em>path.</em></h2>
            <p>
              If you have made an interesting move, changed direction, built something alongside
              law or learnt something worth sharing, get in touch about being a guest.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

