import Image from "next/image";

const CARDS = [
  {
    id: 1,
    src: "/hero.avif",
    alt: "Golf balls and tees",
    label: "Elegant Clubhouse",
    sub: "No downloads, no setup  join instantly, editors now use for them make data-driven decisions.",
    size: "tall", // left tall card
  },
  {
    id: 2,
    src: "/hero.avif",
    alt: "Golfer with glove",
    label: "Exclusive Events",
    sub: "No downloads, no setup  join instantly, editors now use for them.",
    size: "wide", // top right wide
  },
  {
    id: 3,
    src: "/hero.avif",
    alt: "Golf coaching session",
    label: "Pro Instructors",
    sub: "No downloads, no setup  join instantly, editors now use for them.",
    size: "wide", // bottom right wide (but visually taller than top — it bleeds down)
  },
  {
    id: 4,
    src: "/hero.avif",
    alt: "Lush golf course landscape",
    label: "Lush Landscape & Water Features",
    sub: "No downloads, no setup — join instantly, editors now use for them.",
    size: "bottom", // full bottom strip
  },
];

export default function AcademySection() {
  return (
    <section className="bg-[#F5F2EC] px-4 md:px-16 py-14 md:py-20">
      {/* ── Header ── */}
      <div className="text-center mb-12">
        <p className="text-[#4A7C2F] text-sm font-semibold  mb-3">
          Golf Academy
        </p>
        <h1 className="text-[#1A1A1A] text-3xl md:text-5xl font-black leading-tight tracking-tight mb-4">
          Professional Coaching &amp; Golf Academy
        </h1>
        <p className="text-[#777] text-sm md:text-base max-w-lg mx-auto leading-relaxed">
          Locally sourced ingredients, gourmet meals, and sunset views. Latest
          golf gear, branded apparel, and expert fitting services.
        </p>
      </div>

      {/* ── Bento grid ── */}
      {/*
        Desktop layout (3 cols × 3 rows):
        ┌──────────┬────────────────┐
        │          │  Exclusive     │  row 1
        │  Elegant │  Events        │
        │ Clubhouse├────────────────┤
        │          │  Pro           │  row 2
        │  (tall)  │  Instructors   │
        ├──────────┴────────────────┤
        │  Lush Landscape (full)    │  row 3
        └───────────────────────────┘

        Mobile: stacked single column
      */}
      <div
        className="
        grid gap-3
        grid-cols-1
        md:grid-cols-[2fr_3fr]
        md:grid-rows-[220px_220px_240px]
      "
      >
        {/* Card 1 – Elegant Clubhouse: spans 2 rows on desktop */}
        <div
          className="
          relative rounded-2xl overflow-hidden group
          h-56
          md:col-start-1 md:row-start-1 md:row-span-2 md:h-full
        "
        >
          <Image
            src="/hero.avif"
            alt="Golf balls and tees on green"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 60vw, 40vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
            <p className="text-white font-bold text-sm md:text-base leading-snug mb-1">
              Elegant Clubhouse
            </p>
            <p className="text-white/65 text-xs leading-relaxed">
              No downloads, no setup join instantly, editors now use for them
              make data-driven decisions.
            </p>
          </div>
        </div>

        {/* Card 2 – Exclusive Events: top right */}
        <div
          className="
          relative rounded-2xl overflow-hidden group
          h-48
          md:col-start-2 md:row-start-1 md:h-full
        "
        >
          <Image
            src="/img5.avif"
            alt="Golfer with glove"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 60vw, 60vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="text-white font-bold text-sm leading-snug mb-1">
              Exclusive Events
            </p>
            <p className="text-white/65 text-xs leading-relaxed">
              No downloads, no setup join instantly, editors now use for them.
            </p>
          </div>
        </div>

        {/* Card 3 – Pro Instructors: bottom right */}
        <div
          className="
          relative rounded-2xl overflow-hidden group
          h-48
          md:col-start-2 md:row-start-2 md:h-full
        "
        >
          <Image
            src="/img6.avif"
            alt="Golf coaching session"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 60vw, 60vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="text-white font-bold text-sm leading-snug mb-1 ">
              Pro Instructors
            </p>
            <p className="text-white/65 text-xs leading-relaxed">
              No downloads, no setup join instantly, editors now use for them.
            </p>
          </div>
        </div>

        {/* Card 4 – Lush Landscape: full width bottom row */}
        <div
          className="
          relative rounded-2xl overflow-hidden group
          h-52
          md:col-start-1 md:col-span-2 md:row-start-3 md:h-full
        "
        >
          <Image
            src="/img1.avif"
            alt="Lush golf course landscape and water features"
            fill
            sizes="(max-width: 768px) 100vw, (min-width: 768px) 100vw"
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
            <p className="text-white font-bold text-sm md:text-base leading-snug mb-1">
              Lush Landscape &amp; Water Features
            </p>
            <p className="text-white/65 text-xs leading-relaxed max-w-md">
              No downloads, no setup join instantly, editors now use for them
              make data-driven decisions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
