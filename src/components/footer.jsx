import Link from "next/link";

const FOOTER_LINKS = {
  Service: [
    "Golf Lessons",
    "Club Fitting",
    "Course Booking",
    "Pro Shop",
    "Event Hosting",
  ],
  Agency: ["About Us", "Our Team", "Careers", "Press", "Partners"],
  Resources: ["Blog", "FAQs", "Course Map", "Weather", "Contact Us"],
};

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white">
      {/* ── Top CTA banner ── */}
      <div className="px-4 md:px-16 pt-14 pb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-8 border-b border-white/10">
        {/* Left – headline */}
        <div className="max-w-md">
          <h1 className="text-3xl md:text-4xl font-black leading-tight tracking-tight">
            Ready to Tee Off?
            <br />
            <span className="text-white/70 font-black">
              Let's discuss with us.
            </span>
          </h1>
        </div>

        {/* Right – circular icon button */}
        <Link
          href="mailto:hello@golfngv.com"
          className="self-start md:self-auto w-14 h-14 rounded-full bg-[#C8E650] flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg shrink-0"
          aria-label="Email us"
        >
          <svg
            className="w-6 h-6 text-[#1A1A1A]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </Link>
      </div>

      {/* ── Middle: logo + nav columns ── */}
      <div className="px-4 md:px-16 py-12 grid grid-cols-2 md:grid-cols-4 gap-10">
        {/* Logo + tagline */}
        <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group w-fit">
            <svg
              viewBox="0 0 32 32"
              className="h-7 w-7 transition-transform duration-300 group-hover:scale-110"
              aria-hidden="true"
            >
              <path d="M16 2 A14 14 0 0 0 16 30 Z" fill="#4A7C2F" />
              <path d="M16 2 A14 14 0 0 1 16 30 Z" fill="#C8E650" />
              <circle
                cx="16"
                cy="16"
                r="14"
                fill="none"
                stroke="#4A7C2F"
                strokeWidth="0.5"
              />
            </svg>
            <span className="text-white font-bold text-lg tracking-tight">
              Golf
            </span>
          </Link>
          <p className="text-white/45 text-xs leading-relaxed max-w-45">
            A championship golfing experience for every level of player.
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-3 mt-2">
            {["twitter", "instagram", "facebook"].map((s) => (
              <Link
                key={s}
                href="#"
                className="w-8 h-8 rounded-full bg-white/8 border border-white/10 flex items-center justify-center hover:bg-[#C8E650] hover:border-[#C8E650] transition-all duration-200 group"
                aria-label={s}
              >
                {s === "twitter" && (
                  <svg
                    className="w-3.5 h-3.5 text-white/60 group-hover:text-[#1A1A1A]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                )}
                {s === "instagram" && (
                  <svg
                    className="w-3.5 h-3.5 text-white/60 group-hover:text-[#1A1A1A]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    viewBox="0 0 24 24"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle
                      cx="17.5"
                      cy="6.5"
                      r="0.8"
                      fill="currentColor"
                      stroke="none"
                    />
                  </svg>
                )}
                {s === "facebook" && (
                  <svg
                    className="w-3.5 h-3.5 text-white/60 group-hover:text-[#1A1A1A]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                  </svg>
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* Nav columns */}
        {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
          <div key={heading} className="flex flex-col gap-4">
            <h4 className="text-white text-sm font-bold tracking-wide">
              {heading}
            </h4>
            <ul className="flex flex-col gap-2.5">
              {links.map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-white/45 text-xs hover:text-[#C8E650] transition-colors duration-200"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* ── Bottom bar ── */}
      <div className="px-4 md:px-16 py-5 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 32 32" className="h-5 w-5" aria-hidden="true">
            <path d="M16 2 A14 14 0 0 0 16 30 Z" fill="#4A7C2F" />
            <path d="M16 2 A14 14 0 0 1 16 30 Z" fill="#C8E650" />
          </svg>
          <span className="text-white/30 text-xs">
            © {new Date().getFullYear()} Golf. All rights reserved.
          </span>
        </div>
        <div className="flex items-center gap-5">
          {["Privacy Policy", "Terms of Use", "Cookie Policy"].map((l) => (
            <Link
              key={l}
              href="#"
              className="text-white/30 text-xs hover:text-white/60 transition-colors"
            >
              {l}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
