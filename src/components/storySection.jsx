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
    img3: {
      src: "/img1.avif",
      alt: "Landscape",
      label: "150 acres of calm",
    },
  },
  about: {
    eyebrow: "Club Culture",
    heading: "Who We Are",
    body: "Pine Ridge is more than a course — it's a community built over 38 years with global players and elite instructors shaping every experience.",
    cta: { label: "MEET THE TEAM", href: "#" },
    img1: { src: "/img1.avif", alt: "Team", label: "Built on community" },
    img2: { src: "/hero3.avif", alt: "Clubhouse", label: "Elegant clubhouse" },
    img3: { src: "/hero2.avif", alt: "Players", label: "A place to belong" },
  },
  game: {
    eyebrow: "Course Details",
    heading: "Precision Built for Every Shot",
    body: "18 holes. Par 72. 7,200 yards of championship terrain designed for consistency, challenge, and flow.",
    cta: { label: "BOOK A TEE TIME", href: "#" },
    img1: { src: "/hero3.avif", alt: "Tee", label: "Precision terrain" },
    img2: { src: "/img1.avif", alt: "Green", label: "Tournament greens" },
    img3: { src: "/hero2.avif", alt: "Aerial", label: "Every round refined" },
  },
};

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
        {/* TEXT — comes first on mobile */}
        <div className="order-1 lg:order-2">
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
            {data.body}
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
        </div>

        {/* IMAGES — stacked on mobile, left on desktop */}
        <div className="order-2 lg:order-1 flex flex-col gap-4 lg:grid lg:h-[560px] lg:grid-cols-6 lg:grid-rows-6 lg:gap-3">
          <div className="relative h-64 lg:h-auto col-span-6 row-span-3 overflow-hidden rounded-3xl">
            <Image
              src={data.img1.src}
              alt={data.img1.alt}
              fill
              sizes="(max-width: 1024px) 100vw, (min-width: 1024px) 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <span className="absolute bottom-3 left-3 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white backdrop-blur-md">
              {data.img1.label}
            </span>
          </div>

          <div className="relative h-48 lg:h-auto col-span-3 row-span-3 overflow-hidden rounded-2xl">
            <Image
              src={data.img2.src}
              alt={data.img2.alt}
              fill
              sizes="(max-width: 1024px) 100vw, (min-width: 1024px) 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
            <span className="absolute bottom-3 left-3 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white backdrop-blur-md">
              {data.img2.label}
            </span>
          </div>

          <div className="relative h-48 lg:h-auto col-span-3 row-span-3 overflow-hidden rounded-2xl">
            <Image
              src={data.img3.src}
              alt={data.img3.alt}
              fill
              sizes="(max-width: 1024px) 100vw, (min-width: 1024px) 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
            <span className="absolute bottom-3 left-3 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white backdrop-blur-md">
              {data.img3.label}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
