"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const trackRef = useRef(null);
  const tweenRef = useRef(null);
  const wrapWidthRef = useRef(0);

  const speedPxPerSecond = 42;

  const slides = useMemo(() => {
    return [...BASE_IMAGES, ...BASE_IMAGES, ...BASE_IMAGES];
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 28,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const track = trackRef.current;
    if (!track) return;

    const getWrapWidth = () => {
      const baseCount = BASE_IMAGES.length;
      let width = 0;

      for (let i = 0; i < baseCount; i++) {
        const el = track.children[i];
        if (!el) break;

        const style = window.getComputedStyle(el);
        width += el.getBoundingClientRect().width;
        width += parseFloat(style.marginLeft || "0");
        width += parseFloat(style.marginRight || "0");
      }

      return width;
    };

    const createCarousel = () => {
      const oldWrapWidth = wrapWidthRef.current || 1;
      const oldX = gsap.getProperty(track, "x") || 0;
      const oldProgress =
        oldWrapWidth > 0
          ? Math.abs(Number(oldX) % oldWrapWidth) / oldWrapWidth
          : 0;

      tweenRef.current?.kill();

      const wrapWidth = getWrapWidth();
      if (!wrapWidth) return;

      wrapWidthRef.current = wrapWidth;

      const startX = -wrapWidth * oldProgress;

      gsap.set(track, { x: startX });

      tweenRef.current = gsap.to(track, {
        x: startX - wrapWidth,
        duration: wrapWidth / speedPxPerSecond,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => {
            const value = parseFloat(x);
            return ((value % -wrapWidth) + -wrapWidth) % -wrapWidth;
          }),
        },
      });
    };

    const handleResize = () => createCarousel();

    createCarousel();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      tweenRef.current?.kill();
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <section
        ref={sectionRef}
        className="overflow-hidden px-5 py-12 sm:px-8 sm:py-16"
      >
        <div className="mx-auto max-w-7xl">
          <div ref={headingRef} className="mb-7">
            <h1 className="mt-3 text-center text-4xl font-black tracking-tight text-[#172112] md:text-6xl">
              A Better Day on the Course
            </h1>

            <p className="mx-auto mt-5 max-w-lg text-center text-sm leading-relaxed text-[#777] md:text-base">
              From the moment you step onto the grounds, our course offers a
              blend of natural beauty and thoughtful design that elevates every
              round.
            </p>
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
                  quality={90}
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
    <section
      ref={sectionRef}
      className="overflow-hidden px-5 py-12 sm:px-8 sm:py-16"
    >
      <div className="mx-auto max-w-7xl">
        <div ref={headingRef} className="mb-7">
          <h1 className="mt-3 text-center text-4xl font-black tracking-tight text-[#172112] md:text-6xl">
            A Better Day on the Course
          </h1>

          <p className="mx-auto mt-5 max-w-lg text-center text-sm leading-relaxed text-[#777] md:text-base">
            From the moment you step onto the grounds, our course offers a blend
            of natural beauty and thoughtful design that elevates every round.
          </p>
        </div>

        <div className="overflow-hidden touch-pan-y select-none">
          <div
            ref={trackRef}
            className="flex pointer-events-none will-change-transform"
          >
            {slides.map((img, index) => {
              const baseIndex = index % BASE_IMAGES.length;

              return (
                <figure
                  key={`${img.src}-${index}`}
                  className={`relative mx-2 w-60 shrink-0 overflow-hidden rounded-2xl border border-[#2D4A1E]/10 bg-[#E8E4DC] sm:mx-3 sm:w-75 ${BASE_IMAGES[baseIndex].heightClass}`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 360px"
                    className="object-cover"
                    priority={index < 3}
                    quality={90}
                    draggable={false}
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
