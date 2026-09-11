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
          <Eyebrow number="05">Dear Nadine</Eyebrow>
          <h1>The questions you ask yourself when work gets <em>quiet.</em></h1>
          <p>
            A monthly column for lawyers who want a more honest conversation about work,
            ambition and what comes next whether you are in private practice, in-house or
            somewhere in the messy middle. For the things you might not say in a performance
            review, but should probably think about before making your next move.
          </p>
          <div className="dear-hero-actions">
            <button
              className="button button-ink dear-ask-trigger"
              type="button"
              onClick={() => setQuestionDialogOpen(true)}
            >
              Ask anonymously <DownArrow />
            </button>
            <a className="button dear-receive-button" href="#subscribe">
              Receive the column <DownArrow />
            </a>
          </div>
        </div>
      </section>

      <section className="dear-statement section-ink">
        <div className="dear-statement-inner">
          <Eyebrow number="06" light>What Is It</Eyebrow>
          <h2>Not a neat answer.<br />A better <em>question.</em></h2>
          <div className="dear-statement-copy">
            <p>
              Dear Nadine is for career questions that are personal, consequential and difficult
              to ask inside your own workplace.
            </p>
            <p>
              The column offers a considered perspective. It is not legal advice, therapy,
              recruitment advice or a substitute for the judgment you need to make for yourself.
            </p>
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
              No name. No email address. No employer or client details. If I select your question,
              I may edit or combine it so it cannot be identified.
            </p>
            <ul className="dear-guardrails">
              <li>Keep client, matter, employer and personal details out of it.</li>
              <li>Do not name people or make allegations about them.</li>
              <li>I read every question, but I cannot reply individually through this form.</li>
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
          <Eyebrow number="07">Receive Dear Nadine</Eyebrow>
          <h2>Two questions. Two answers. <em>Every month.</em></h2>
          <p>
            Subscribe if you would like each edition in your inbox. Your email is separate from
            the anonymous question form, and you can unsubscribe at any time.
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
            <Eyebrow number="08">When the answer is personal</Eyebrow>
            <h2>The column is public.<br /><em>Your next move is not.</em></h2>
          </div>
          <div className="dear-private-copy">
            <p>
              If you are sitting with a decision that is more personal than a column can answer,
              a private Career Strategy Conversation gives you room to look at the options,
              assumptions and trade-offs properly.
            </p>
            <BookingLink
              className="dear-private-booking"
              href="https://calendly.com/nadine-kahlon/career-strategy-introduction"
              label="Book your Career Strategy Introduction"
            />
          </div>
        </div>
      </section>
    </>
  );
}
