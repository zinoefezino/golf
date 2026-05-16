"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const TABS = [
  { id: "story", label: "Our Story" },
  { id: "about", label: "About Us" },
  { id: "game", label: "Game" },
];

const CONTENT = {
  story: {
    eyebrow: "Since 1986",
    heading: "A Premier Golfing Destination",
    body: "Established in 1986, Pine Ridge Golf Club spans over 150 acres of rolling hills, mature trees, and breathtaking water features. Designed by renowned architect Robert Trent Jones Jr., the course challenges pros while welcoming casual players.",
    accentWords: ["1986", "150"],
    cta: { label: "JOIN OUR TEAM", href: "#" },
    img1: {
      src: "/hero3.avif",
      alt: "Golfer mid-swing",
      label: "Championship fairways",
    },
    img2: {
      src: "/hero2.avif",
      alt: "Golf flag",
      label: "Natural water features",
    },
    img3: { src: "/img1.avif", alt: "Landscape", label: "150 acres of calm" },
  },
  about: {
    eyebrow: "Club Culture",
    heading: "Who We Are",
    body: "Pine Ridge is more than a course — it's a community built over 38 years with global players and elite instructors shaping every experience.",
    accentWords: ["38 years", "50+", "12"],
    cta: { label: "MEET THE TEAM", href: "#" },
    img1: { src: "/img1.avif", alt: "Team", label: "Built on community" },
    img2: { src: "/hero3.avif", alt: "Clubhouse", label: "Elegant clubhouse" },
    img3: { src: "/hero2.avif", alt: "Players", label: "A place to belong" },
  },
  game: {
    eyebrow: "Course Details",
    heading: "Precision Built for Every Shot",
    body: "18 holes. Par 72. 7,200 yards of championship terrain designed for consistency, challenge, and flow.",
    accentWords: ["18 holes", "Par 72", "7,200 yards"],
    cta: { label: "BOOK A TEE TIME", href: "#" },
    img1: { src: "/hero3.avif", alt: "Tee", label: "Precision terrain" },
    img2: { src: "/img1.avif", alt: "Green", label: "Tournament greens" },
    img3: { src: "/hero2.avif", alt: "Aerial", label: "Every round refined" },
  },
};

function HighlightText({ text, words = [] }) {
  if (!words.length) return <span>{text}</span>;

  const regex = new RegExp(`(${words.join("|")})`, "g");

  return (
    <>
      {text.split(regex).map((part, i) =>
        words.includes(part) ? (
          <span key={i} className="text-[#2D4A1E] font-semibold">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

function ArrowIcon() {
  return (
    <svg
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      viewBox="0 0 24 24"
    >
      <path d="M7 17L17 7M7 7h10v10" />
    </svg>
  );
}

export default function StorySection() {
  const [active, setActive] = useState("story");
  const data = CONTENT[active];

  return (
    <section className="bg-[#F6F3EE] px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* LEFT — Bento */}
        <div className="grid h-[560px] grid-cols-6 grid-rows-6 gap-3">
          <div className="relative col-span-6 row-span-3 overflow-hidden rounded-3xl">
            <Image
              src={data.img1.src}
              alt={data.img1.alt}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <span className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-md shadow-sm">
              {data.img1.label}
            </span>
          </div>

          <div className="relative col-span-3 row-span-3 overflow-hidden rounded-2xl">
            <Image
              src={data.img2.src}
              alt={data.img2.alt}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
            <span className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-md shadow-sm">
              {data.img2.label}
            </span>
          </div>

          <div className="relative col-span-3 row-span-3 overflow-hidden rounded-2xl">
            <Image
              src={data.img3.src}
              alt={data.img3.alt}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
            <span className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-md shadow-sm">
              {data.img3.label}
            </span>
          </div>
        </div>

        {/* RIGHT — Content */}
        <div>
          {/* Tabs */}
          <div className="mb-8 inline-flex rounded-full bg-white/70 p-1 backdrop-blur border border-black/5">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className={`px-5 py-2 text-sm font-medium rounded-full transition ${
                  active === tab.id
                    ? "bg-[#1E3517] text-white"
                    : "text-black/60 hover:text-black"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <p className="text-xs uppercase tracking-[0.25em] text-black/40">
            {data.eyebrow}
          </p>

          <h1 className="mt-3 text-5xl md:text-6xl font-semibold tracking-tight text-[#121A12]">
            {data.heading}
          </h1>

          <p className="mt-6 text-black/60 leading-relaxed max-w-xl">
            <HighlightText text={data.body} words={data.accentWords} />
          </p>

          <Link
            href={data.cta.href}
            className="mt-10 inline-flex items-center gap-4 rounded-full bg-[#121212] text-white pl-6 pr-2 py-2 text-sm font-medium hover:bg-[#1E3517] transition"
          >
            {data.cta.label}
            <span className="h-10 w-10 grid place-items-center rounded-full bg-[#C8E650] text-black">
              <ArrowIcon />
            </span>
          </Link>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-6 border-t border-black/10 pt-6">
            {data.accentWords.map((item) => (
              <div key={item}>
                <p className="text-2xl font-semibold text-[#1E3517]">{item}</p>
                <p className="text-xs uppercase tracking-wide text-black/40">
                  Highlight
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
