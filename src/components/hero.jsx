import Link from "next/link";
import Image from "next/image";

const HERO_TAGS = [
  "Luxury Golf Resort",
  "Private Membership",
  "Scenic Views",
  "Fine Dining",
  "Elite Experience",
];

export default function Hero() {
  return (
    <section className="relative min-h-svh overflow-hidden lg:h-screen lg:min-h-160">
      <Image
        src="/hero4.webp"
        alt="Golfer on lush fairway"
        fill
        priority
        quality={75}
        sizes="100vw"
        className="object-cover object-center"
      />

      <div
        className="absolute inset-0 bg-linear-to-b from-[#2D4A1E]/60 via-[#1A1A1A]/30 to-[#1A1A1A]/75"
        aria-hidden="true"
      />

      <div className="relative z-10 flex min-h-svh flex-col justify-end px-5 pb-7 sm:px-8 lg:h-full lg:min-h-0 lg:px-10 lg:pb-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
          <div className="max-w-5xl">
            <h1 className="mb-4 text-4xl font-black leading-[1.02] tracking-tight text-white drop-shadow-xl sm:text-5xl md:text-6xl">
              A New Standard
              <br />
              Of Golf Experience
            </h1>

            <p className="mb-6 max-w-sm text-sm leading-relaxed text-white/75 sm:text-base md:max-w-md md:text-lg">
              Escape to pristine fairways, refined clubhouse experiences, and a
              golf destination designed for players who appreciate the game.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="#"
                className="group flex items-center gap-3 rounded-full bg-[#1A1A1A]/80 py-1 pl-5 pr-1 text-sm font-bold tracking-wide text-white shadow-lg shadow-black/20 transition-all duration-300 hover:bg-[#111111]"
              >
                <span>BOOK A TEE TIME</span>

                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#C8E650] text-[#1A1A1A] transition-transform duration-300 group-hover:rotate-45">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.8"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7 17L17 7M7 7h10v10" />
                  </svg>
                </span>
              </Link>

              <Link
                href="#"
                className="rounded-full border border-white/30 bg-white/15 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/25 sm:px-8"
              >
                Discover
              </Link>
            </div>
          </div>

          <div className="flex max-w-md flex-wrap gap-2 lg:justify-end lg:pb-1">
            {HERO_TAGS.map((tag, i) => (
              <span
                key={`${tag}-${i}`}
                className={`${
                  i > 1 ? "hidden sm:flex" : "flex"
                } cursor-pointer items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium text-white/85 backdrop-blur-sm transition-all duration-200 hover:border-[#C8E650]/40 hover:bg-[#C8E650]/20 sm:px-5`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#C8E650]" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
