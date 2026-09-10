import { Eyebrow, TextLink } from "@/components/SiteShell";

const portraitUrl = "/assets/about-portrait.png";

const credentials = [
  { label: "Top-tier private practice", detail: "Allens" },
  { label: "In-house secondment", detail: "Woolworths Limited" },
  { label: "Nearly a decade in-house", detail: "Senior Legal Counsel, Macquarie Group" },
  { label: "Commercial banking secondment", detail: "Macquarie" },
  { label: "Industry contribution", detail: "Committee Member, Women in Loan Markets" },
  { label: "Founder and business owner", detail: "Axe Co" },
];

export default function About() {
  return (
    <>
      <section className="about-hero split-grid">
        <div className="portrait-panel">
          <img src={portraitUrl} alt="Nadine Kahlon portrait" />
        </div>
        <div className="about-hero-copy">
          <Eyebrow number="01">About Nadine</Eyebrow>
          <h1>The experience<br /><em>behind Iterate.</em></h1>
          <div className="about-intro-copy">
            <p>I’m Nadine Kahlon. I have worked for over 15 years building an enviable resume in law. Top tier law firm. Senior in-house counsel. Internal and external commercial secondments.</p>
            <p>I have been promoted in the most competitive of environments. I have sat on industry association committees. I have deep networks at senior levels across banks, corporates and law firms. And there isn’t much I don’t have a perspective on.</p>
            <p>I launched Iterate for Lawyers because there were times in my career that I would have definitely benefited from having someone experienced, objective and direct to bring clarity to my thinking.</p>
            <p>Lawyers are smart, rational problem solvers - yet often we don’t think clearly about or deliberately enough about our own career decisions. Having the right person to strategically advise can make a huge difference - to get to where you need to be with more confidence and less stress.</p>
          </div>
        </div>
      </section>

      <section className="about-credentials section-sky">
        <div className="credentials-intro">
          <Eyebrow number="02">The experience behind the perspective</Eyebrow>
          <h2>A career can look <em>successful</em> on paper and still leave you asking whether it is taking you in the right direction.</h2>
        </div>
        <div className="credentials-list" aria-label="Nadine Kahlon experience">
          {credentials.map((credential) => (
            <div className="credential-row" key={credential.label}>
              <span className="credential-check" aria-hidden="true">✓</span>
              <div>
                <span>{credential.label}</span>
                <strong>{credential.detail}</strong>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-paper about-story">
        <div className="story-grid">
          <div><Eyebrow number="03">The work behind the work</Eyebrow></div>
          <div className="story-copy">
            <h2>Lawyers are trained to solve everyone else’s problems. <em>Not always their own.</em></h2>
            <p>I understand the pace, expectations and pressure that comes with being a lawyer. I have lived it. It doesn’t matter if you work in private practice, in-house or a government role – the issues are often the same.</p>
            <p>The pressure to keep moving forward, the effort of navigating office politics, the importance of workplace culture and the difficulty of assessing whether what looks like progress from the outside is actually what you want.</p>
            <p>The questions do not always announce themselves as career questions. They can sound like: <em>Should I put my hand up for this promotion? Is it time to move in-house? Why am I doing well but not enjoying the work? Is this a culture I can succeed in? Do I need to leave law—or just change how I am working?</em></p>
            <p>There is rarely a simple answer.</p>
            <p>Together we will identify what is actually happening, challenge the assumptions, work through your options and bring clarity to the decision-making process.</p>
            <p>Having a Career Strategy Conversation can stop the overthinking, offer a valuable perspective and help you reach a decision with better clarity.</p>
            <blockquote>“A career can be successful and still need to change. Those two things are not in conflict.”</blockquote>
          </div>
        </div>
      </section>

      <section className="about-why section-ink">
        <div className="about-why-inner">
          <Eyebrow number="04" light>Why Iterate</Eyebrow>
          <div className="about-why-copy">
            <h2>There is no one right answer.<br /><em>But there should be a better question.</em></h2>
            <p>Iterate is for lawyers thinking through consequential career decisions—from promotion, moving in-house, navigating office politics, finding a workplace culture that fits or deciding whether to stay in the law at all.</p>
            <p>There are no universal answers. The work is to get clear on what matters to you, recognise the forces shaping your decisions and make a move you can stand behind.</p>
            <p>Sometimes the right decision is to stay and change how you are working. Sometimes it is to ask for more. Sometimes it is to stop waiting for a workplace to give you clarity it cannot give. And sometimes it is to make a more significant change.</p>
            <p>My role is to bring practical legal-career experience, clear thinking and a straight conversation to the decision in front of you. I will help you get to the issue faster, cut through the noise and work out what a more deliberate next move would require.</p>
          </div>
        </div>
      </section>

      <section className="section-sky belief-section">
        <div className="belief-stats">
          <div><strong>15+</strong><span>years across private practice and in-house legal roles</span></div>
          <div><strong>01</strong><span>simple belief: your career deserves your own judgment</span></div>
          <div><strong>Now</strong><span>holding a more honest conversation about the professional life of lawyers</span></div>
        </div>
        <div className="belief-cta">
          <h2>If a career decision has been taking up more space than you want it to, <em>we can work out what it looks like on your terms.</em></h2>
          <TextLink href="/services">Talk through your career</TextLink>
        </div>
      </section>
    </>
  );
}
