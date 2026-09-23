import { BookingLink, Eyebrow } from "@/components/SiteShell";

const notesUrl = "/assets/iterate-margin-notes_2.webp";
const introductionCalendlyUrl = "https://calendly.com/nadine-iterateforlawyers/30min";

export default function Services() {
  return (
    <>
      <section className="page-hero page-hero-sky services-hero">
        <div className="page-hero-inner wide-copy">
          <Eyebrow number="01">Confidential career strategy</Eyebrow>
          <h1>A confidential place to get the real question <em>on the table.</em></h1>
          <p className="hero-intro">For lawyers who want to think more clearly about work, ambition and what comes next.</p>
        </div>
      </section>

      <section className="service-detail split-grid">
        <div className="image-panel image-panel-notes">
          <img src={notesUrl} alt="A hand making notes beside a marked page" />
        </div>
        <div className="detail-copy">
          <Eyebrow number="02">The 90-minute conversation</Eyebrow>
          <h2>Confidential Career<br /><em>Strategy Conversations.</em></h2>
          <p className="lead">A 90-minute confidential conversation about your career and the best path forward.</p>
          <p>Bring the question, frustration or idea that has been going around in your head. We will analyse it together: the assumptions, the options and the opportunity costs.</p>
          <dl className="service-specs">
            <div><dt>Format</dt><dd>90 minutes</dd></div>
            <div><dt>Where</dt><dd>Zoom or in person (Martin Place)</dd></div>
          </dl>
          <div className="service-introduction-inline">
            <p>A confidential 20-minute call to see whether a Career Strategy Conversation is the right next step for you.</p>
            <BookingLink href={introductionCalendlyUrl} label="Book your Career Strategy Introduction" />
          </div>
        </div>
      </section>

      <section className="section-paper scenario-section">
        <div className="section-slim">
          <Eyebrow number="03">This may be for you</Eyebrow>
          <h2>When the next move needs <em>more thought.</em></h2>
          <ul className="scenario-list">
            <li>You are weighing up a new role, promotion or move in-house.</li>
            <li>You have achieved success but you feel stuck and unsure about your options.</li>
            <li>You are ready to make a change but want to think beyond the obvious options.</li>
            <li>You are considering leaving the law to do something different.</li>
            <li>You need a confidential sounding board outside your workplace.</li>
            <li>You want to be proactive and plan the direction your career will take.</li>
          </ul>
        </div>
      </section>

      <section className="section-ink what-not">
        <div className="section-slim">
          <Eyebrow number="04" light>What this is not</Eyebrow>
          <h2>No script. No sales pitch. <em>No pressure to leave the law.</em></h2>
          <p>Iterate for Lawyers is designed for lawyers to reflect and openly explore their career options. The session is structured and focused on what you want to achieve. You will leave with a clear strategy that feels right for you.</p>
        </div>
      </section>
    </>
  );
}
