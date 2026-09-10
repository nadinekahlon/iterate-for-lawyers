import { BookingLink, Eyebrow, TextLink } from "@/components/SiteShell";

const portraitUrl = "/assets/hero-portrait.png";
const notesUrl = "/assets/margin-notes.png";
const introductionCalendlyUrl = "https://calendly.com/nadine-kahlon/career-strategy-introduction";

export default function Home() {
  return (
    <>
      <section className="home-hero">
        <div className="hero-copy">
          <Eyebrow number="01">Career strategy for lawyers</Eyebrow>
          <h1>
            Law is a serious<br />career.<br />
            <em>Be deliberate<br />about yours.</em>
          </h1>
          <p>
            Whether you’re considering moving in-house, vying for promotion, navigating office politics, or deciding whether to stay in law or leave and do something entirely different - consequential decisions require a clear strategy.
          </p>
          <div className="hero-actions">
            <TextLink href="/services" className="text-link-dark">Explore services</TextLink>
          </div>
        </div>
        <div className="hero-portrait">
          <img src={portraitUrl} alt="Nadine Kahlon" />
          <figure className="founder-card founder-quote">
            <blockquote>“A career can be successful and still need to change. Those two things are not in conflict.”</blockquote>
            <figcaption>
              <strong>Nadine Kahlon</strong>
              <span>Founder · ex-Allens · former senior legal counsel, Macquarie Group</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="platform-section">
        <div className="platform-copy">
          <Eyebrow number="02">The platform</Eyebrow>
          <h2>For lawyers who have followed the path—and are starting to <em>question it.</em></h2>
        </div>
        <div className="platform-text">
          <p>
            There is a lot of unfiltered advice when you first get into law. Once you are further along in your career, it becomes more difficult to find truly valuable advice. Lawyers you work with may have a real conflict of interest and people outside of law often don’t really understand your situation or how the legal profession works.
          </p>
          <p>
            Iterate was created to provide a confidential space for honest conversations, where you leave with a proactive strategy for the next steps in your career.
          </p>
        </div>
      </section>

      <section className="home-cards">
        <TextLink href="/services" className="feature-card service-card home-service-card" showArrow={false}>
          <span className="card-number">03 — Private service</span>
          <h2>One private conversation.<br /><em>More clarity.</em></h2>
          <p>A confidential 90-minute Career Strategy Conversation.</p>
          <span className="card-action">Explore services <span>↘</span></span>
        </TextLink>
        <div className="notes-card">
          <img src={notesUrl} alt="A page of handwritten notes" />
        </div>
      </section>

      <section className="start-section">
        <Eyebrow number="05">Start here</Eyebrow>
        <h2>You do not need to decide everything.<br /><em>You need room to think properly.</em></h2>
        <BookingLink href={introductionCalendlyUrl} label="Book your Career Strategy Introduction" />
      </section>
    </>
  );
}

