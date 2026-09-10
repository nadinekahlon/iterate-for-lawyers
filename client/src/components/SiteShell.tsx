import type { ReactNode } from "react";
import { Link, useLocation } from "wouter";

const calendlyUrl = "https://calendly.com/nadine-kahlon/new-meeting?month=2026-08";
const introductionCalendlyUrl = "https://calendly.com/nadine-kahlon/career-strategy-introduction";
const logoUrl = "/assets/iterate-original-symbol_logo.webp";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Dear Nadine", href: "/dear-nadine" },
  { label: "Podcast", href: "/podcast" },
];

function Brand() {
  return (
    <Link href="/" className="brand" aria-label="Iterate for Lawyers home">
      <img src={logoUrl} alt="Iterate Logo" className="brand-mark" />
      <span className="brand-copy">
        <strong>Iterate</strong>
        <span>for lawyers</span>
        <em>by Nadine Kahlon</em>
      </span>
    </Link>
  );
}

function Arrow() {
  return <span aria-hidden="true" className="arrow">↘</span>;
}

export function BookingLink({
  className = "",
  label = "Book a conversation",
  href = calendlyUrl,
}: {
  className?: string;
  label?: string;
  href?: string;
}) {
  return (
    <a className={`button button-ink ${className}`} href={href} target="_blank" rel="noreferrer">
      {label} <Arrow />
    </a>
  );
}

export function TextLink({ href, children, className = "", showArrow = true }: { href: string; children: ReactNode; className?: string; showArrow?: boolean }) {
  return (
    <Link href={href} className={`text-link ${className}`}>
      {children} {showArrow ? <Arrow /> : null}
    </Link>
  );
}

export function Eyebrow({ number, children, light = false }: { number?: string; children: ReactNode; light?: boolean }) {
  return <p className={`eyebrow ${light ? "eyebrow-light" : ""}`}>{number ? <span>{number}</span> : null}{children}</p>;
}

export function SiteShell({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="site-header-inner">
          <Brand />
          <nav className="main-nav" aria-label="Primary navigation">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className={`nav-link ${location === item.href ? "active" : ""}`}>
                {item.label}
              </Link>
            ))}
          </nav>
          <BookingLink
            className="header-booking"
            href={introductionCalendlyUrl}
            label="Book your Career Strategy Introduction"
          />
        </div>
      </header>
      <main>{children}</main>
      <footer className="site-footer">
        <div className="footer-top">
          <Brand />
          <p>Career strategy for lawyers who want a more considered conversation about what comes next.</p>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Iterate for Lawyers</span>
          <span>Sydney, Australia</span>
        </div>
      </footer>
    </div>
  );
}

