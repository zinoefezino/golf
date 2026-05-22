"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const FAQS = [
  {
    q: "How do I book a tee time?",
    a: "You can book a tee time directly through our website, by filling the form, or by visiting us in person. Online bookings are available up to 14 days in advance.",
  },
  {
    q: "Do I need to be a member to play?",
    a: "No membership is required. We welcome public players daily. However, members enjoy priority booking, discounted green fees, and exclusive access to member events.",
  },
  {
    q: "What's the dress code?",
    a: "We ask that all players wear collared shirts and golf-appropriate trousers or shorts. Denim, gym wear, and sleeveless shirts are not permitted on the course or in the clubhouse.",
  },
  {
    q: "What's your rain-check policy?",
    a: "If a round is called due to weather before 9 holes are completed, a full rain check is issued. After 9 holes, a partial rain check is provided based on holes remaining.",
  },
  {
    q: "Do you host private events or tournaments?",
    a: "Absolutely. We offer full-service event packages for corporate outings, charity tournaments, and private gatherings. Contact our events team to get a custom quote.",
  },
  {
    q: "Can I rent golf equipment?",
    a: "Yes. We offer rental clubs, push carts, and golf carts at the pro shop. Premium club sets from leading brands are available for rental at an additional fee.",
  },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  const answerRef = useRef(null);
  const iconRef = useRef(null);

  useEffect(() => {
    if (!answerRef.current) return;

    gsap.to(answerRef.current, {
      height: open ? "auto" : 0,
      opacity: open ? 1 : 0,
      duration: 0.32,
      ease: "power2.out",
    });

    gsap.to(iconRef.current, {
      rotate: open ? 45 : 0,
      duration: 0.28,
      ease: "power2.out",
    });
  }, [open]);

  return (
    <div data-faq-item className="border-b border-[#E8E4DC] last:border-b-0">
      <button
        onClick={() => setOpen((current) => !current)}
        className="group flex w-full items-center gap-4 py-5 text-left"
      >
        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md transition-colors duration-200 ${
            open ? "bg-[#2D4A1E]" : "bg-[#C8E650]"
          }`}
        >
          <svg
            ref={iconRef}
            className="h-3.5 w-3.5"
            fill="none"
            stroke={open ? "#C8E650" : "#1A1A1A"}
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>

        <span
          className={`flex-1 text-sm font-semibold leading-snug transition-colors duration-200 md:text-base ${
            open ? "text-[#2D4A1E]" : "text-[#1A1A1A]"
          }`}
        >
          {q}
        </span>
      </button>

      <div ref={answerRef} className="h-0 overflow-hidden opacity-0">
        <p className="pb-5 pl-11 text-sm leading-relaxed text-[#666]">{a}</p>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          once: true,
        },
      });

      gsap.from("[data-faq-item]", {
        y: 24,
        opacity: 0,
        duration: 0.65,
        ease: "power3.out",
        stagger: 0.06,
        scrollTrigger: {
          trigger: "[data-faq-grid]",
          start: "top 82%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="px-4 py-14 md:px-16 md:py-20">
      <div className="mx-auto max-w-5xl">
        <div ref={headerRef} className="mb-12 text-center">
          <h1 className="mb-3 text-4xl font-black leading-tight tracking-tight text-[#1A1A1A] md:text-6xl">
            Frequently Asked Questions
          </h1>

          <p className="mx-auto max-w-sm text-sm leading-relaxed text-[#888] md:text-base">
            Find quick answers about bookings, memberships, course policies, and
            club services.
          </p>
        </div>

        <div
          data-faq-grid
          className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16"
        >
          {FAQS.map((faq) => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>
      </div>
    </section>
  );
}
