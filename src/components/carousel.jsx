"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mql) return;

    const onChange = () => setReduced(!!mql.matches);
    onChange();

    mql.addEventListener?.("change", onChange);
    return () => mql.removeEventListener?.("change", onChange);
  }, []);

  return reduced;
}

const BASE_IMAGES = [
  {
    src: "/hero.webp",
    alt: "Lush golf course fairway",
    heightClass: "h-[280px] sm:h-[360px]",
  },
  {
    src: "/hero2.webp",
    alt: "Golfers walking on the course",
    heightClass: "h-[230px] sm:h-[310px]",
  },
  {
    src: "/hero3.webp",
    alt: "Championship golf fairway",
    heightClass: "h-[300px] sm:h-[390px]",
  },
  {
    src: "/hero5.webp",
    alt: "Golf club course view",
    heightClass: "h-[250px] sm:h-[330px]",
  },
  {
    src: "/img8.avif",
    alt: "Golf tees and balls",
    heightClass: "h-[270px] sm:h-[350px]",
  },
  {
    src: "/img14.avif",
    alt: "Golf course water feature",
    heightClass: "h-[240px] sm:h-[320px]",
  },
];

export default function MainWebsiteCarousel() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const trackRef = useRef(null);
  const rafRef = useRef(null);
  const lastTsRef = useRef(0);

  const speedPxPerSecond = 42;

  const slides = useMemo(() => {
    return [...BASE_IMAGES, ...BASE_IMAGES, ...BASE_IMAGES];
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const track = trackRef.current;
    if (!track) return;

    const setupWrap = () => {
      const baseCount = BASE_IMAGES.length;
      let total = 0;

      for (let i = 0; i < baseCount; i++) {
        const el = track.children[i];
        if (!el) break;

        const style = window.getComputedStyle(el);
        total += el.getBoundingClientRect().width;
        total += parseFloat(style.marginRight || "0");
        total += parseFloat(style.marginLeft || "0");
      }

      track.__carousel = {
        x: 0,
        wrapAt: -Math.abs(total || track.scrollWidth / 3),
      };
    };

    const animate = (ts) => {
      if (!lastTsRef.current) lastTsRef.current = ts;

      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;

      const state = track.__carousel || {
        x: 0,
        wrapAt: -track.scrollWidth / 3,
      };
      state.x = (state.x - speedPxPerSecond * dt) % state.wrapAt;
      track.__carousel = state;

      track.style.transform = `translate3d(${state.x}px, 0, 0)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    setupWrap();

    const onResize = () => {
      lastTsRef.current = 0;
      setupWrap();
    };

    window.addEventListener("resize", onResize);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <section className="overflow-hidden px-5 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-7">
            <h1 className="mt-3 text-4xl md:text-6xl font-black tracking-tight text-[#172112] ">
              A Better Day on the Course
            </h1>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
            {BASE_IMAGES.map((img, index) => (
              <div
                key={`${img.src}-${index}`}
                className={`relative overflow-hidden rounded-2xl border border-[#2D4A1E]/10 bg-[#E8E4DC] ${img.heightClass}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="overflow-hidden px-5 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-7">
          <h1 className="mt-3 text-4xl md:text-6xl font-black tracking-tight text-[#172112] ">
            A Better Day on the Course
          </h1>
        </div>

        <div className="overflow-hidden">
          <div
            ref={trackRef}
            className="flex will-change-transform"
            style={{ transform: "translate3d(0, 0, 0)" }}
          >
            {slides.map((img, index) => {
              const baseIndex = index % BASE_IMAGES.length;

              return (
                <figure
                  key={`${img.src}-${index}`}
                  className={`relative mx-2 shrink-0 overflow-hidden rounded-2xl border border-[#2D4A1E]/10 bg-[#E8E4DC] sm:mx-3 ${BASE_IMAGES[baseIndex].heightClass} w-52.5 sm:w-65`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 640px) 65vw, (max-width: 1024px) 35vw, 260px"
                    className="object-cover"
                    priority={index < 2}
                  />
                </figure>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
