import { Link } from "wouter";
import { Eyebrow } from "@/components/SiteShell";

export default function TermsAndConditions() {
  return (
    <>
      <section className="page-hero page-hero-sky">
        <div className="page-hero-inner">
          <Eyebrow>Iterate for Lawyers</Eyebrow>
          <h1>
            Terms &amp;<br />
            <em>Conditions.</em>
          </h1>
        </div>
      </section>

      <section className="section-paper legal-section">
        <div className="section-slim legal-container">
          <div className="legal-content-area">
            <div className="legal-section-block">
              <p>
                This website is owned and operated by Nojora Holdings Pty Limited t/as Iterate for Lawyers (ABN 35 701 814 271) (Iterate, we, us, our).
              </p>
              <p>
                These terms and conditions (terms) govern your use of this website.
              </p>
              <p>
                By accessing this website and any resources or services available through it, you agree to comply with these terms. You may only access and use our website if you accept these terms. If you do not agree to these terms, you must not continue to access this website.
              </p>
              <p>
                Iterate reserves the right to vary, amend or withdraw these terms at any time without notice to you.
              </p>
            </div>

            <div className="legal-section-block">
              <h2>Disclaimer</h2>
              <p>
                Iterate will use best endeavours to ensure any information on the website is correct as at the time it is published. Iterate does not accept any liability for any error, omission or outdated information on the website. By using the website, you confirm that you are not relying on any information, content or opinions published on within it.
              </p>
              <p>
                To the fullest extent permissible by law, Iterate (and its directors, employees, agents and contractors) make no representation (whether express or implied) about the accuracy of any information, content or detail published on the website.
              </p>
              <p>
                Iterate does not undertake that the website will be up-to-date, or that access will be uninterrupted or error-free. It also does not warrant that any server, service or software (whether belonging to a third party or otherwise) which store, transmits or transfers content to you is free of viruses or is not otherwise harmful.
              </p>
              <p>
                To the extent possible by law, Iterate is not liable to you for any reason whatsoever including but not limited to any direct, indirect, consequential damage, data loss or loss of profits resulting from any use or access, or any inability to use or access the website.
              </p>
            </div>

            <div className="legal-section-block">
              <h2>General Information Only</h2>
              <p>
                The information on this website (and any services or resources provided through it) is provided for general information and educational purposes only and does not constitute financial, legal, or other professional advice. Information published on this website has been prepared without taking into consideration your personal objectives, individual circumstances, financial situation or specific needs. You agree that you will not rely on any information, service or resource provided on or through the website and that you will seek independent professional advice tailored to your circumstances before making any employment, business, legal or financial decisions.
              </p>
              <p>
                While reasonable care is taken, Iterate does not warrant the accuracy or completeness of the any information provided or published on the website.
              </p>
              <p>
                The website may provide downloadable guides, reports, videos and other resources. These are provided for general educational purposes only and should not be relied upon as legal advice or any other form of professional advice.
              </p>
            </div>

            <div className="legal-section-block">
              <h2>Third party links</h2>
              <p>
                The website may contain links to third party websites, calendars, payment systems, software platforms or social media sites. Iterate is not responsible for the content, availability or privacy practices of any third party websites or platforms.
              </p>
            </div>

            <div className="legal-section-block">
              <h2>Email communication</h2>
              <p>
                By subscribing and/or providing your personal details through the website, you consent to receive emails from us (and any third party platform used to enable that subscription) as well as publications (including Dear Nadine) and any other offers from time to time. You can unsubscribe at any time using the link in any email. Further details on how we treat your personal information is contained in our <Link href="/privacy-policy" className="legal-link">Privacy Policy</Link>.
              </p>
            </div>

            <div className="legal-section-block">
              <h2>Services</h2>
              <p>
                Any service booked on or through the website are subject to their own separate terms which are provided to you at the time of booking.
              </p>
            </div>

            <div className="legal-section-block">
              <h2>Indemnity</h2>
              <p>
                You agree to indemnify and keep indemnified Iterate (and its directors, employees, agents and contractors) in respect of any claim, liability, loss, damage, cost or expense which Iterate may suffer or incur from your use of the website or by a breach of these terms.
              </p>
            </div>

            <div className="legal-section-block">
              <h2>Intellectual Property</h2>
              <p>
                The website is subject to Australian copyright laws. You agree that there is no transfer of intellectual property and that you have no rights to the website or any of its content, other than to access or view the website for your personal use.
              </p>
            </div>

            <div className="legal-section-block">
              <h2>Amendment and cancellation</h2>
              <p>
                Iterate in its absolute discretion reserves the right to revise, amend or withdraw access to the website at any time without notice to you.
              </p>
            </div>

            <div className="legal-section-block">
              <h2>Privacy</h2>
              <p>
                Use of this website is also governed by our <Link href="/privacy-policy" className="legal-link">Privacy Policy</Link>.
              </p>
            </div>

            <div className="legal-section-block">
              <h2>Governing law</h2>
              <p>
                The terms are governed by the laws of New South Wales. You irrevocably agree to submit to the exclusive jurisdiction of the courts of New South Wales.
              </p>
              <p>
                These terms were last updated on 25 September 2026.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
