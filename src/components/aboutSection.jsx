"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function AboutSection() {
  const sectionRef = useRef(null);
  const introRef = useRef(null);
  const featureRef = useRef(null);
  const statsRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from("[data-about-intro]", {
        y: 34,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: introRef.current,
          start: "top 78%",
          once: true,
        },
      });

      gsap.from("[data-feature-image]", {
        clipPath: "inset(12% 12% 12% 12% round 2rem)",
        scale: 0.96,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: featureRef.current,
          start: "top 72%",
          once: true,
        },
      });

      gsap.from("[data-feature-copy]", {
        y: 34,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: featureRef.current,
          start: "top 70%",
          once: true,
        },
      });

      gsap.from("[data-stat-card]", {
        y: 34,
        opacity: 0,
        scale: 0.96,
        duration: 0.75,
        ease: "power3.out",
        stagger: 0.09,
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 82%",
          once: true,
        },
      });

      gsap.from("[data-cta-copy]", {
        x: -34,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 78%",
          once: true,
        },
      });

      gsap.from("[data-cta-image]", {
        x: 42,
        scale: 1.08,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 78%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden bg-[#F5F2EC] px-4 py-16 md:px-8 md:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div
          ref={introRef}
          className="grid gap-10 border-b border-[#2D4A1E]/10 pb-14 md:grid-cols-[0.95fr_1.05fr] md:items-end md:pb-20"
        >
          <div data-about-intro>
            <span className="inline-flex rounded-full border border-[#2D4A1E]/15 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-[#2D4A1E]/70">
              About Us
            </span>

            <h1 className="mt-5 max-w-xl text-4xl font-black leading-tight tracking-tight text-[#172112] md:text-6xl">
              Built for Better Golf
            </h1>
          </div>

          <div data-about-intro className="max-w-2xl md:justify-self-end">
            <p className="text-sm leading-relaxed text-[#172112]/70 md:text-base">
              We are a premium golf and leisure destination created for players
              who value calm surroundings, well-kept fairways, and a clubhouse
              experience that feels considered from arrival to the final round.
            </p>

            <p className="mt-4 text-sm leading-relaxed text-[#172112]/60 md:text-base">
              From early tee times to relaxed dining after play, every part of
              the club is shaped to make your visit simple, polished, and
              memorable.
            </p>
          </div>
        </div>

        <div
          ref={featureRef}
          className="grid gap-10 py-14 md:grid-cols-[1fr_1.05fr] md:items-center md:py-20"
        >
          <div
            data-feature-image
            className="relative h-90 overflow-hidden rounded-4xl border border-[#2D4A1E]/10 bg-[#E8E4DC] shadow-[0_24px_70px_rgba(45,74,30,0.12)] md:h-140"
          >
            <Image
              src="/img1.avif"
              alt="Golf course fairway"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>

          <div>
            <span
              data-feature-copy
              className="mb-4 inline-flex rounded-full bg-[#2D4A1E]/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#2D4A1E]"
            >
              Course Standard
            </span>

            <h1
              data-feature-copy
              className="max-w-xl text-4xl font-black leading-tight tracking-tight text-[#172112] md:text-6xl"
            >
              Championship Conditions, Every Round
            </h1>

            <div
              data-feature-copy
              className="mt-6 space-y-4 text-sm leading-relaxed text-[#172112]/65 md:text-base"
            >
              <p>
                Our course is maintained for confident play, with fairways,
                greens, and practice spaces designed to support every level of
                golfer.
              </p>

              <p>
                Whether you are chasing a personal best or enjoying a relaxed
                round, the experience is calm, focused, and rewarding.
              </p>
            </div>

            <div data-feature-copy className="mt-8">
              <Link
                href="/booking"
                className="group inline-flex w-fit items-center gap-4 rounded-full bg-[#C8E650] py-1.5 pl-6 pr-1.5 text-sm font-bold tracking-wide text-[#1A1A1A] transition-all duration-300 hover:bg-white"
              >
                <span>BOOK NOW</span>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1A1A1A] text-white transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2.6} />
                </span>
              </Link>
            </div>
          </div>
        </div>

        <div ref={statsRef} className="grid gap-4 md:grid-cols-3">
          <div
            data-stat-card
            className="rounded-[1.75rem] border border-[#2D4A1E]/10 bg-white p-6 shadow-[0_18px_55px_rgba(45,74,30,0.06)]"
          >
            <p className="text-4xl font-black leading-none text-[#172112]">
              18
            </p>
            <p className="mt-2 text-xs font-bold uppercase tracking-wide text-[#172112]/45">
              Championship Holes
            </p>
          </div>

          <div
            data-stat-card
            className="rounded-[1.75rem] bg-[#C8E650] p-6 shadow-[0_18px_55px_rgba(200,230,80,0.18)]"
          >
            <p className="text-4xl font-black leading-none text-[#172112]">
              365
            </p>
            <p className="mt-2 text-xs font-bold uppercase tracking-wide text-[#172112]/70">
              Days Open
            </p>
          </div>

          <div
            data-stat-card
            className="rounded-[1.75rem] border border-[#2D4A1E]/10 bg-white p-6 shadow-[0_18px_55px_rgba(45,74,30,0.06)]"
          >
            <div className="flex items-center gap-1 text-[#C8E650]">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-4 w-4 fill-current" />
              ))}
            </div>

            <p className="mt-3 text-4xl font-black leading-none text-[#172112]">
              4.9
            </p>
            <p className="mt-2 text-xs font-bold uppercase tracking-wide text-[#172112]/45">
              Player Rating
            </p>
          </div>
        </div>

        <div
          ref={ctaRef}
          className="mt-14 grid overflow-hidden rounded-4xl bg-[#172112] shadow-[0_28px_90px_rgba(23,33,18,0.24)] md:grid-cols-[1fr_0.9fr]"
        >
          <div className="flex flex-col justify-between gap-10 p-7 md:p-10">
            <div>
              <span
                data-cta-copy
                className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/60"
              >
                Join Us
              </span>

              <h3
                data-cta-copy
                className="mt-5 max-w-xl text-4xl font-black leading-tight tracking-tight text-white md:text-6xl"
              >
                Be part of a club that plays with purpose.
              </h3>

              <Link
                data-cta-copy
                href="/signup"
                className="group inline-flex w-fit items-center gap-4 rounded-full bg-[#C8E650] py-1.5 pl-6 pr-1.5 text-sm font-bold tracking-wide text-[#1A1A1A] transition-all duration-300 hover:bg-white mt-10"
              >
                <span>REGISTER</span>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1A1A1A] text-white transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2.6} />
                </span>
              </Link>
            </div>
          </div>

          <div
            data-cta-image
            className="relative min-h-72 overflow-hidden md:min-h-96"
          >
            <Image
              src="/img8.avif"
              alt="Golfers enjoying the course"
              fill
              sizes="(max-width: 768px) 100vw, (min-width: 768px) 35vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-r from-[#172112] via-[#172112]/20 to-transparent md:from-[#172112]/30" />
          </div>
        </div>
      </div>
    </section>
  );
}
