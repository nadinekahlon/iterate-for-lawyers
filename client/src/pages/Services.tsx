import { BookingLink, Eyebrow } from "@/components/SiteShell";

const notesUrl = "/assets/iterate-margin-notes_2.webp";
const introductionCalendlyUrl = "https://calendly.com/nadine-kahlon/career-strategy-introduction";

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
            <p>A complimentary 20-minute confidential call to discuss what is prompting the question and whether a longer conversation is the right next step.</p>
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
            <li>You are doing well on paper but are no longer sure the path fits.</li>
            <li>You are ready to make a change but want to think beyond the obvious options.</li>
            <li>You are considering leaving the law to do something different.</li>
            <li>You need a confidential sounding board outside your workplace.</li>
          </ul>
        </div>
      </section>

      <section className="section-ink what-not">
        <div className="section-slim">
          <Eyebrow number="04" light>What this is not</Eyebrow>
          <h2>No script. No sales pitch. No pressure to leave law.</h2>
          <p>These conversations are about career strategy and reflection. They are not legal advice, counselling sessions, recruitment services or an exercise in telling you what to do.</p>
        </div>
      </section>
    </>
  );
}

