import { Eyebrow } from "@/components/SiteShell";

const quietTableUrl = "/assets/iterate-decision-workspace_5.jpg";

function Arrow() {
  return <span aria-hidden="true" className="arrow">↘</span>;
}

export default function Podcast() {
  return (
    <>
      <section className="podcast-hero">
        <div className="podcast-copy">
          <Eyebrow number="01" light>COMING SOON</Eyebrow>
          <span className="headphone" aria-hidden="true">◖◗</span>
          <h1>A new podcast from<br /><em>Nadine Kahlon.</em></h1>
          <p>Conversations for lawyers about legal careers, real life and everything that sits between the two.</p>
          <a
            href="https://www.linkedin.com/in/nadinekahlon/"
            target="_blank"
            rel="noopener noreferrer"
            className="button button-ink podcast-cta"
          >
            Follow Nadine on LinkedIn for launch updates <Arrow />
          </a>
        </div>
        <div className="podcast-image">
          <img src={quietTableUrl} alt="A quiet table with a notebook and pen" />
        </div>
      </section>

      <section className="section-paper podcast-expectation">
        <div className="section-slim">
          <Eyebrow number="02">WHAT TO EXPECT</Eyebrow>
          <h2>Not another podcast about how to be <em>productive.</em></h2>
          <p>Honest conversations about the legal profession including different careers within law, our identities as lawyers, our leadership shadow and office politics.</p>
          <p>The conversations will also look at what is changing including AI and the future of legal work.</p>
          <p>The first conversations are coming soon.</p>

          <div className="podcast-guest-callout">
            <Eyebrow number="03">BE A GUEST</Eyebrow>
            <h2>We learn the most from experiences people are willing <em>to share.</em></h2>
            <p>
              If you are a lawyer with a story to tell about a professional turning point, a decision that changed your life or a lesson you wish you had understood earlier – please contact me directly about being a guest on the podcast.
            </p>
            <div className="podcast-guest-links">
              <a href="mailto:nadine@iterateforlawyers.com" className="connect-link">
                nadine@iterateforlawyers.com
              </a>
              <div className="podcast-social-links">
                <a
                  href="https://www.linkedin.com/in/nadinekahlon/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="connect-link"
                >
                  LinkedIn
                </a>
                <a
                  href="https://www.instagram.com/iterateforlawyers/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="connect-link"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
