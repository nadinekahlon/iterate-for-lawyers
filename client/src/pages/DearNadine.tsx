import KitSignup from "@/components/KitSignup";
import NativeQuestionForm from "@/components/NativeQuestionForm";
import { BookingLink, Eyebrow } from "@/components/SiteShell";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { shouldOpenQuestionDialog } from "../../../shared/dearNadineDialogState";
import { useEffect, useState } from "react";

function DownArrow() {
  return <span aria-hidden="true" className="arrow">↘</span>;
}

export default function DearNadine() {
  const searchParams = new URLSearchParams(window.location.search);
  const subscriptionState = searchParams.get("subscription");
  const [submissionState, setSubmissionState] = useState(() =>
    searchParams.get("submitted"),
  );
  const [questionDialogOpen, setQuestionDialogOpen] = useState(() =>
    shouldOpenQuestionDialog(window.location.search),
  );

  const handleQuestionDialogChange = (open: boolean) => {
    setQuestionDialogOpen(open);

    if (!open && submissionState) {
      const url = new URL(window.location.href);
      url.searchParams.delete("submitted");
      url.hash = "";
      window.history.replaceState({}, "", `${url.pathname}${url.search}`);
      setSubmissionState(null);
    }
  };

  const handleAnotherQuestion = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete("submitted");
    url.searchParams.delete("ask");
    url.hash = "";
    window.history.replaceState({}, "", `${url.pathname}${url.search}`);
    setSubmissionState(null);
    setQuestionDialogOpen(true);
  };

  useEffect(() => {
    if (subscriptionState) {
      document.getElementById("subscribe")?.scrollIntoView({ block: "start" });
    }
  }, [subscriptionState]);

  return (
    <>
      <section className="dear-hero">
        <div className="dear-hero-copy">
          <Eyebrow number="01">Dear Nadine</Eyebrow>
          <h1>The questions you ask yourself when work gets <em>quiet.</em></h1>
          <p>
            A monthly Q&A for lawyers who want a more honest conversation about work, ambition and what comes next. Each edition explores the questions lawyers are asking - and offers a window into the career decisions, tensions and experiences others are navigating
          </p>
          <div className="dear-hero-actions">
            <div className="dear-ask-action-wrapper">
              <button
                className="button button-ink dear-ask-trigger"
                type="button"
                onClick={() => setQuestionDialogOpen(true)}
              >
                Ask a question anonymously <DownArrow />
              </button>
              <span className="dear-ask-subtext">*No name or email address required.</span>
            </div>
            <a className="button dear-receive-button" href="#subscribe">
              Receive The Edit <DownArrow />
            </a>
          </div>
        </div>
      </section>

      <section className="dear-statement section-ink">
        <div className="dear-statement-inner">
          <div>
            <Eyebrow number="02" light>HOW IT WORKS</Eyebrow>
            <h2>Ask yours.<br />Read theirs.<br /><em>Or both.</em></h2>
          </div>
          <div className="dear-steps">
            <div className="dear-step-card">
              <h3 className="step-title"><span className="step-num">1.</span> SUBSCRIBE</h3>
              <p>Receive Dear Nadine: The Edit in your inbox each month.</p>
            </div>
            <div className="dear-step-card">
              <h3 className="step-title"><span className="step-num">2.</span> IF YOU HAVE A QUESTION</h3>
              <p>Send it anonymously at any time.<br />No name or email address required.</p>
            </div>
            <div className="dear-step-card">
              <h3 className="step-title"><span className="step-num">3.</span> EACH MONTH</h3>
              <p>Read questions other lawyers are asking, with Nadine’s candid perspective shaped by over 15 years in the legal profession.</p>
            </div>
          </div>
        </div>
      </section>

      <Dialog open={questionDialogOpen} onOpenChange={handleQuestionDialogChange}>
        <DialogContent className="dear-question-dialog">
          <DialogTitle className="sr-only">Ask Dear Nadine anonymously</DialogTitle>
          <DialogDescription className="sr-only">
            Submit a career question without including your name, email address, employer, client
            or other identifying details.
          </DialogDescription>
          <div className="dear-dialog-copy">
            <Eyebrow>Ask anonymously</Eyebrow>
            <h2>Tell me the question you cannot quite bring yourself to <em>ask out loud.</em></h2>
            <p>
              No name. No email address. No employer or client details. If your question is selected, it may be edited or combined with other questions so it cannot be identified
            </p>
            <ul className="dear-guardrails">
              <li>Please ensure that you do not include any personal or confidential details relating to a client, colleague, matter or employer.</li>
              <li>Do not use any real names of individuals or organisations.</li>
              <li>Nadine reads every question, but not every question is published. As the form is anonymous, she is not able to reply individually.</li>
              <li>If you want to discuss your question specifically, reach out to Nadine through her booking page or via email or direct message.</li>
            </ul>
          </div>
          <div className="dear-dialog-form">
            <div className="dear-form-caption">
              <span>Dear Nadine</span>
              <span>Anonymous question form</span>
            </div>
            {submissionState === "1" ? (
              <div className="native-form-success" role="status">
                <span>Question received</span>
                <h3>Thank you for trusting me with it.</h3>
                <p>
                  I read every submission. I cannot respond individually, but selected questions may
                  be answered in a future Dear Nadine edition.
                </p>
                <button className="native-form-reset" type="button" onClick={handleAnotherQuestion}>
                  Ask another question
                </button>
              </div>
            ) : (
              <>
                {submissionState === "error" ? (
                  <p className="native-form-error" role="alert">Please complete the question and consent box, then try again.</p>
                ) : null}
                <NativeQuestionForm />
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <section className="dear-subscribe section-sky" id="subscribe">
        <div className="dear-subscribe-copy">
          <Eyebrow number="03">Receive Dear Nadine</Eyebrow>
          <h2>A candid read on <em>life in law.</em></h2>
          <p>
            Receive Dear Nadine: The Edit in your inbox each month.
          </p>
        </div>
        <div className="dear-subscribe-panel">
          {subscriptionState === "pending" ? (
            <div className="native-form-success native-subscription-success" role="status">
              <span>One more step</span>
              <h3>Check your inbox.</h3>
              <p>
                Check your inbox for Kit’s confirmation email, then click its confirmation link to
                complete your Dear Nadine subscription.
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
              <p>Dear Nadine will arrive in your inbox every month.</p>
            </div>
          ) : (
            <KitSignup />
          )}
        </div>
      </section>

      <section className="dear-private section-paper">
        <div className="dear-private-inner">
          <div>
            <Eyebrow number="04">WHEN THE QUESTION IS PERSONAL</Eyebrow>
            <h2>The Edit is public.<br /><em>Your next move is not.</em></h2>
          </div>
          <div className="dear-private-copy">
            <p>
              Some questions need more than a generic answer. A private Career Strategy Conversation gives you time to examine the options, assumptions and opportunity costs properly.
            </p>
            <BookingLink
              className="dear-private-booking"
              href="https://calendly.com/nadine-iterateforlawyers/30min"
              label="Book your Career Strategy Introduction"
            />
          </div>
        </div>
      </section>
    </>
  );
}
