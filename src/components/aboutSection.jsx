import Image from "next/image";
import Link from "next/link";

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

function PillButton({ href = "#", children }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-4 rounded-full bg-[#1A1A1A] py-1.5 pl-6 pr-1.5 text-sm font-bold tracking-wide text-white shadow-xl shadow-black/10 transition-all duration-300 hover:bg-[#2D4A1E]"
    >
      <span>{children}</span>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#C8E650] text-[#1A1A1A] transition-transform duration-300 group-hover:rotate-45">
        <ArrowIcon />
      </span>
    </Link>
  );
}

export default function AboutSection() {
  return (
    <section className="overflow-hidden bg-[#F5F2EC] px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Top intro */}
        <div className="grid gap-8 border-b border-[#2D4A1E]/10 pb-12 md:grid-cols-[0.8fr_1.2fr] md:items-end md:pb-16">
          <div>
            <span className="inline-flex rounded-full border border-[#2D4A1E]/15 bg-white/70 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#2D4A1E]/70 shadow-sm backdrop-blur">
              About Us
            </span>

            <h1 className="mt-5 max-w-xl text-4xl font-black leading-[1.02] tracking-tight text-[#172112] md:text-6xl">
              Built for players who love the game.
            </h1>
          </div>

          <div className="max-w-2xl md:justify-self-end">
            <p className=" leading-relaxed text-[#172112]/65 ">
              Latest golf gear, branded apparel, expert fitting services, and a
              course designed for memorable rounds. Play as often as you like,
              weekdays, weekends, anytime.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:flex">
              <div className="rounded-3xl border border-[#2D4A1E]/10 bg-white/75 px-5 py-5 shadow-sm backdrop-blur">
                <p className=" text-3xl font-black leading-none text-[#172112]">
                  50+
                </p>
                <p className="mt-2  font-semibold uppercase tracking-wide text-[#172112]/45">
                  Countries
                </p>
              </div>

              <div className="rounded-3xl bg-[#C8E650] px-5 py-5 shadow-sm">
                <p className="text-3xl font-black leading-none text-[#172112]">
                  2M
                </p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-[#172112]/55">
                  Rounds Played
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Feature row */}
        <div className="grid gap-10 py-12 md:grid-cols-[0.9fr_1.1fr] md:items-center md:py-16">
          <div className="order-2 md:order-1">
            <span className="mb-4 inline-flex rounded-full bg-[#2D4A1E]/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#2D4A1E]">
              Course Standard
            </span>

            <h1 className="text-3xl font-black leading-tight tracking-tight text-[#172112] md:text-5xl">
              Quality Course,
              <br />
              Confident Ball
            </h1>

            <div className="mt-6 space-y-4 text-sm leading-relaxed text-[#172112]/65 md:text-base">
              <p>
                Whether you&apos;re a seasoned pro or picking up a club for the
                first time, our course is equipped to challenge and inspire.
                Each hole is maintained to championship standards.
              </p>
              <p>
                From tee design and putting speed to immaculate conditions
                year-round, every detail is shaped to make each round feel
                precise, calm, and rewarding.
              </p>
            </div>

            <div className="mt-8">
              <PillButton>Discover More</PillButton>
            </div>
          </div>

          <div className="order-1 grid h-130 grid-cols-6 grid-rows-6 gap-3 md:order-2">
            <div className="group relative col-span-6 row-span-4 overflow-hidden rounded-4xl sm:col-span-4 sm:row-span-6">
              <Image
                src="/img1.avif"
                alt="Golfer on a quality course"
                fill
                sizes="(max-width: 768px) 100vw, (min-width: 768px) 60vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/10 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <p className=" font-black leading-tight text-white">
                  Championship-ready fairways
                </p>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/70">
                  A refined course experience shaped for focus, flow, and
                  unforgettable play.
                </p>
              </div>
            </div>

            <div className="group relative col-span-3 row-span-2 overflow-hidden rounded-3xl sm:col-span-2 sm:row-span-3">
              <Image
                src="/img3.avif"
                alt="Golfers on the course"
                fill
                sizes="(max-width: 768px) 100vw, (min-width: 768px) 35vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
              <p className="absolute bottom-4 left-4 right-4 text-sm font-bold leading-tight text-white">
                Premium gear and fittings
              </p>
            </div>

            <div className="relative col-span-3 row-span-2 overflow-hidden rounded-3xl bg-[#1E3517] p-5 text-white sm:col-span-2 sm:row-span-3">
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full border border-[#C8E650]/30" />
              <div className="absolute -bottom-12 right-8 h-28 w-28 rounded-full bg-[#C8E650]/10" />

              <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white/70">
                Member Rated
              </span>

              <div className="mt-8">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="h-4 w-4 text-[#C8E650]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="mt-3 text-3xl font-black">4.9</p>
                <p className="mt-1 text-xs font-medium text-white/60">
                  2,000+ player reviews
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="grid overflow-hidden rounded-4xl bg-[#172112] md:grid-cols-[1fr_0.9fr]">
          <div className="flex flex-col justify-between gap-10 p-7 md:p-10">
            <div>
              <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                Join Us
              </span>

              <h3 className="mt-5 max-w-xl text-3xl font-black leading-tight tracking-tight text-white md:text-5xl">
                Be part of a club that plays with purpose.
              </h3>
            </div>

            <Link
              href="/booking"
              className="group inline-flex w-fit items-center gap-4 rounded-full bg-[#C8E650] py-1.5 pl-6 pr-1.5 text-sm font-bold tracking-wide text-[#1A1A1A] transition-all duration-300 hover:bg-white"
            >
              <span>BOOK A TEE TIME</span>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1A1A1A] text-white transition-transform duration-300 group-hover:rotate-45">
                <ArrowIcon />
              </span>
            </Link>
          </div>

          <div className="relative min-h-72 overflow-hidden md:min-h-96">
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
