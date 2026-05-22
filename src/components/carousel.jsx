"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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

  const speedPxPerSecond = 42;

  const slides = useMemo(() => {
    return [...BASE_IMAGES, ...BASE_IMAGES, ...BASE_IMAGES];
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
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
            start: "top 80%",
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);
  useEffect(() => {
    if (prefersReducedMotion) return;

    const track = trackRef.current;
    if (!track) return;

    let progress = 0;

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
      tweenRef.current?.kill();

      const wrapWidth = getWrapWidth();
      if (!wrapWidth) return;

      // 🔥 capture current position BEFORE reset
      const currentX = gsap.getProperty(track, "x") || 0;
      progress = Math.abs(currentX % wrapWidth) / wrapWidth;

      const startX = -wrapWidth * progress;

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

    createCarousel();

    const onResize = () => createCarousel();

    window.addEventListener("resize", onResize);

    return () => {
      tweenRef.current?.kill();
      window.removeEventListener("resize", onResize);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <section
        ref={sectionRef}
        className="overflow-hidden px-5 py-14 sm:px-8 sm:py-18"
      >
        <div className="mx-auto max-w-7xl">
          <div ref={headingRef} className="mb-8 text-center">
            <h1 className="text-4xl font-black tracking-tight text-[#172112] md:text-6xl">
              Gallery
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-[#777] md:text-base">
              A curated collection of our most stunning shots, showcasing the
              beauty and spirit of our golf course.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {BASE_IMAGES.map((img, index) => (
              <div
                key={`${img.src}-${index}`}
                className={`relative overflow-hidden rounded-3xl border border-[#E5DED3] ${img.heightClass}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  quality={90}
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
    <section ref={sectionRef} className="overflow-hidden ">
      <div className="mx-auto max-w-7xl">
        <div ref={headingRef} className="mb-8 text-center">
          <h1 className="text-4xl font-black tracking-tight text-[#172112] md:text-6xl">
            Gallery
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-[#777] md:text-base">
            A curated collection of our most stunning shots, showcasing the
            beauty and spirit of our golf course.
          </p>
        </div>

        <div className="overflow-hidden">
          <div
            ref={trackRef}
            className="flex will-change-transform select-none"
          >
            {slides.map((img, index) => {
              const baseIndex = index % BASE_IMAGES.length;

              return (
                <figure
                  key={`${img.src}-${index}`}
                  className={`relative mx-2 w-60 shrink-0 overflow-hidden rounded-3xl border border-[#E5DED3] sm:mx-3 sm:w-75 ${BASE_IMAGES[baseIndex].heightClass}`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    quality={90}
                    priority={index < 3}
                    draggable={false}
                    sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 360px"
                    className="object-cover"
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
