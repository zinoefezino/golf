"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CARDS = [
  {
    id: 1,
    src: "/img9.avif",
    alt: "Golf balls and tees",
    label: "Elegant Clubhouse",
    sub: "A refined space for members to relax, dine, and connect beyond the course.",
  },
  {
    id: 2,
    src: "/img5.avif",
    alt: "Golfer with glove",
    label: "Private Events",
    sub: "Host tournaments, celebrations, and golf experiences in a premium setting.",
  },
  {
    id: 3,
    src: "/img6.avif",
    alt: "Golf coaching session",
    label: "Player Services",
    sub: "Every visit is supported with thoughtful service designed around your game.",
  },
  {
    id: 4,
    src: "/img1.avif",
    alt: "Golf course landscape",
    label: "Scenic Fairways",
    sub: "Beautiful greens, calm water features, and championship-level course conditions.",
  },
];

function Card({ card, priority = false }) {
  return (
    <article
      data-experience-card
      className="group overflow-hidden rounded-3xl border border-[#E5DED3] bg-white"
    >
      <div className="relative h-64 overflow-hidden sm:h-72">
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
        <h3 className="text-2xl font-black tracking-tight text-[#1A1A1A]">
          {card.label}
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-[#777]">{card.sub}</p>
      </div>
    </article>
  );
}

export default function ClubExperienceSection() {
  const sectionRef = useRef(null);
  const introRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context((self) => {
      const cards = self.selector("[data-experience-card]");
      const images = self.selector("[data-experience-image]");

      gsap.fromTo(
        introRef.current,
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        cards,
        {
          y: 60,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        images,
        {
          scale: 1.12,
        },
        {
          scale: 1,
          duration: 1.4,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#F5F2EC] px-5 py-16 md:px-10 md:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div ref={introRef} className="mx-auto mb-12 max-w-2xl text-center">
          <h1 className="text-4xl font-black tracking-tight text-[#1A1A1A] md:text-6xl">
            Everything for a Memorable Round
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-[#777] md:text-base">
            From premium facilities to beautifully maintained fairways, every
            detail is designed to make your time at the club feel effortless.
          </p>
        </div>

        <div
          ref={gridRef}
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
