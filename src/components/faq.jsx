"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "How do I book a tee time?",
    a: "You can book a tee time directly through our website, by calling the pro shop, or by visiting us in person. Online bookings are available up to 14 days in advance.",
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

function FAQItem({ q, a, index }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[#E8E4DC] last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 py-5 text-left group"
      >
        {/* Square icon */}
        <span
          className={`shrink-0 w-7 h-7 rounded-md flex items-center justify-center transition-colors duration-200 ${
            open ? "bg-[#2D4A1E]" : "bg-[#C8E650]"
          }`}
        >
          <svg
            className={`w-3.5 h-3.5 transition-transform duration-300 ${open ? "rotate-45" : ""}`}
            fill="none"
            stroke={open ? "#C8E650" : "#1A1A1A"}
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>

        <span
          className={`flex-1 text-sm md:text-base font-semibold leading-snug transition-colors duration-200 ${open ? "text-[#2D4A1E]" : "text-[#1A1A1A]"}`}
        >
          {q}
        </span>
      </button>

      {/* Answer */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-40 opacity-100 pb-5" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-[#666] text-sm leading-relaxed pl-11">{a}</p>
      </div>
    </div>
  );
}

export default function FAQSection() {
  return (
    <section className="bg-[#F5F2EC] px-4 md:px-16 py-14 md:py-20">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-[#1A1A1A] text-3xl md:text-4xl font-black leading-tight tracking-tight mb-3">
          Frequently Asked Questions
        </h1>
        <p className="text-[#888] text-sm md:text-base max-w-sm mx-auto leading-relaxed">
          If there are questions you want to ask, we will answer all your
          questions.
        </p>
      </div>

      {/* 2-col grid on desktop, single col on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16">
        {FAQS.map((faq, i) => (
          <FAQItem key={i} index={i} q={faq.q} a={faq.a} />
        ))}
      </div>
    </section>
  );
}
