"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TABS = [
  { id: "story", label: "Our Story" },
  { id: "about", label: "About Us" },
  { id: "game", label: "Game" },
];

const CONTENT = {
  story: {
    eyebrow: "Since 1986",
    heading: "A Premier Golfing Destination",
    body: "Established in 1986, Pine Ridge Golf Club spans over 150 acres of rolling hills, mature trees, and water features. Designed for challenge, rhythm, and calm, the course welcomes both seasoned players and casual rounds.",
    cta: { label: "JOIN OUR TEAM", href: "#" },
    img1: { src: "/img5.avif", alt: "Golfer mid-swing" },
    img2: { src: "/img11.avif", alt: "Golf flag" },
    img3: { src: "/img9.avif", alt: "Golf landscape" },
  },
  about: {
    eyebrow: "Club Culture",
    heading: "Built Around the Game",
    body: "Pine Ridge is more than a course. It is a refined golf community shaped by decades of play, thoughtful hospitality, and a shared respect for the details that make each round memorable.",
    cta: { label: "MEET THE TEAM", href: "#" },
    img1: { src: "/img1.avif", alt: "Golf course fairway" },
    img2: { src: "/img9.avif", alt: "Golf club detail" },
    img3: { src: "/img8.avif", alt: "Golfers on the course" },
  },
  game: {
    eyebrow: "Course Details",
    heading: "Precision in Every Shot",
    body: "Eighteen holes, par 72, and 7,200 yards of championship terrain. Every fairway, bunker, and green is shaped for flow, strategy, and confident play.",
    cta: { label: "BOOK A TEE TIME", href: "#" },
    img1: { src: "/img1.avif", alt: "Golf tee box" },
    img2: { src: "/img11.avif", alt: "Golf green" },
    img3: { src: "/hero2.webp", alt: "Golf course aerial view" },
  },
};

function ArrowIcon({ className = "h-4 w-4" }) {
  return (
    <svg
      className={className}
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

  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const mediaRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(textRef.current, {
        y: 34,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      gsap.from("[data-story-image]", {
        y: 46,
        scale: 0.96,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: mediaRef.current,
          start: "top 78%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, ease: "power3.out" },
      );

      gsap.fromTo(
        "[data-story-image]",
        { y: 18, scale: 0.985, opacity: 0 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.55,
          ease: "power3.out",
          stagger: 0.07,
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [active]);

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden bg-[#F6F3EE] px-5 py-16 md:px-10 md:py-24"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-18">
        <div
          ref={mediaRef}
          className="order-2 grid gap-3 sm:grid-cols-2 lg:order-1 lg:h-[560px] lg:grid-cols-6 lg:grid-rows-6"
        >
          <div
            data-story-image
            className="relative h-72 overflow-hidden rounded-[2rem] bg-[#E8E4DC] shadow-[0_24px_70px_rgba(45,74,30,0.12)] sm:col-span-2 lg:col-span-6 lg:row-span-3 lg:h-full"
          >
            <Image
              src={data.img1.src}
              alt={data.img1.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>

          <div
            data-story-image
            className="relative h-56 overflow-hidden rounded-[1.5rem] bg-[#E8E4DC] shadow-[0_18px_50px_rgba(45,74,30,0.09)] lg:col-span-3 lg:row-span-3 lg:h-full"
          >
            <Image
              src={data.img2.src}
              alt={data.img2.alt}
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="object-cover"
            />
          </div>

          <div
            data-story-image
            className="relative h-56 overflow-hidden rounded-[1.5rem] bg-[#E8E4DC] shadow-[0_18px_50px_rgba(45,74,30,0.09)] lg:col-span-3 lg:row-span-3 lg:h-full"
          >
            <Image
              src={data.img3.src}
              alt={data.img3.alt}
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div ref={textRef} className="will-change-transform">
            <div className="mb-8 inline-flex rounded-full border border-[#2D4A1E]/10 bg-white p-1 shadow-sm">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActive(tab.id)}
                  className={`rounded-full px-4 py-2 text-xs font-bold transition-all duration-300 md:px-5 ${
                    active === tab.id
                      ? "bg-[#1E3517] text-white shadow-sm"
                      : "text-[#172112]/55 hover:text-[#172112]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <p className="text-xs uppercase tracking-[0.25em] text-black/40">
              {data.eyebrow}
            </p>

            <h1 className="mt-4 max-w-xl text-4xl font-black leading-tight tracking-tight text-[#121A12] md:text-6xl">
              {data.heading}
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-relaxed text-[#172112]/62 md:text-base">
              {data.body}
            </p>

            <Link
              href={data.cta.href}
              className="group mt-9 inline-flex w-fit items-center gap-4 rounded-full bg-[#C8E650] py-1.5 pl-6 pr-1.5 text-sm font-bold tracking-wide text-[#1A1A1A] shadow-[0_14px_35px_rgba(200,230,80,0.25)] transition-all duration-300 hover:bg-white"
            >
              <span>{data.cta.label}</span>

              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1A1A1A] text-white transition-transform duration-300 group-hover:rotate-45">
                <ArrowIcon />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
