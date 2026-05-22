"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const CARDS = [
  {
    id: 1,
    src: "/img9.avif",
    alt: "Golf balls and tees",
    label: "Elegant Clubhouse",
    sub: "A refined space for members to relax, connect, dine, and enjoy the club beyond the course.",
  },
  {
    id: 2,
    src: "/img5.avif",
    alt: "Golfer with glove",
    label: "Private Events",
    sub: "Host memorable golf days, intimate gatherings, tournaments, and celebrations in a scenic club setting.",
  },
  {
    id: 3,
    src: "/img6.avif",
    alt: "Golf coaching session",
    label: "Player Services",
    sub: "From tee time support to equipment guidance, every detail is shaped to make your visit effortless.",
  },
  {
    id: 4,
    src: "/img1.avif",
    alt: "Lush golf course landscape",
    label: "Lush Landscape & Water Features",
    sub: "Scenic fairways, calm water features, and beautifully maintained greens made for memorable rounds.",
  },
];

function Card({ card, priority = false }) {
  return (
    <article
      data-experience-card
      className="group overflow-hidden rounded-3xl border border-[#E3DED4] bg-white shadow-[0_18px_55px_rgba(45,74,30,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(45,74,30,0.14)]"
    >
      <div className="relative h-64 overflow-hidden bg-[#E8E4DC] sm:h-72">
        <Image
          data-experience-image
          src={card.src}
          alt={card.alt}
          fill
          priority={priority}
          quality={90}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <div className="p-5 md:p-6">
        <p className="text-xl font-black leading-tight text-[#1A1A1A]">
          {card.label}
        </p>

        <p className="mt-2 text-sm leading-relaxed text-[#777]">{card.sub}</p>
      </div>
    </article>
  );
}

export default function ClubExperienceSection() {
  const sectionRef = useRef(null);
  const introRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(introRef.current, {
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

      gsap.from("[data-experience-card]", {
        y: 52,
        opacity: 0,
        scale: 0.97,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: "[data-experience-grid]",
          start: "top 78%",
          once: true,
        },
      });

      gsap.from("[data-experience-image]", {
        scale: 1.12,
        duration: 1.25,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: "[data-experience-grid]",
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
      className="bg-[#F5F2EC] px-4 py-14 md:px-16 md:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <div
          ref={introRef}
          className="mx-auto mb-10 max-w-2xl text-center md:mb-12"
        >
          <h1 className="mb-4 text-4xl font-black leading-tight tracking-tight text-[#1A1A1A] md:text-6xl">
            Everything for a Memorable Round
          </h1>

          <p className="mx-auto max-w-lg text-sm leading-relaxed text-[#777] md:text-base">
            From scenic fairways to thoughtful hospitality, every part of the
            club is designed to make your time on and off the course feel
            seamless.
          </p>
        </div>

        <div
          data-experience-grid
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-6"
        >
          {CARDS.map((card, index) => (
            <Card key={card.id} card={card} priority={index === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
