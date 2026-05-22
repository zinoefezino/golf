import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="overflow-hidden bg-[#F5F2EC] px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 border-b border-[#2D4A1E]/10 pb-14 md:grid-cols-[0.95fr_1.05fr] md:items-end md:pb-20">
          <div>
            <span className="inline-flex rounded-full border border-[#2D4A1E]/15 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-[#2D4A1E]/70">
              About Us
            </span>

            <h1 className="mt-5 max-w-xl text-4xl md:text-6xl font-black leading-tight tracking-tight text-[#172112] ">
              Built for Better Golf
            </h1>
          </div>

          <div className="max-w-2xl md:justify-self-end">
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

        <div className="grid gap-10 py-14 md:grid-cols-[1fr_1.05fr] md:items-center md:py-20">
          <div className="relative h-90 overflow-hidden rounded-4xl border border-[#2D4A1E]/10 bg-[#E8E4DC] shadow-[0_24px_70px_rgba(45,74,30,0.12)] md:h-140">
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
            <span className="mb-4 inline-flex rounded-full bg-[#2D4A1E]/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#2D4A1E]">
              Course Standard
            </span>

            <h1 className="max-w-xl  font-black leading-tight tracking-tight text-[#172112] text-4xl md:text-6xl">
              Championship Conditions, Every Round
            </h1>

            <div className="mt-6 space-y-4 text-sm leading-relaxed text-[#172112]/65 md:text-base">
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

            <div className="mt-8">
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

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-[1.75rem] border border-[#2D4A1E]/10 bg-white p-6 shadow-[0_18px_55px_rgba(45,74,30,0.06)]">
            <p className="text-4xl font-black leading-none text-[#172112]">
              18
            </p>
            <p className="mt-2 text-xs font-bold uppercase tracking-wide text-[#172112]/45">
              Championship Holes
            </p>
          </div>

          <div className="rounded-[1.75rem] bg-[#C8E650] p-6 shadow-[0_18px_55px_rgba(200,230,80,0.18)]">
            <p className="text-4xl font-black leading-none text-[#172112]">
              365
            </p>
            <p className="mt-2 text-xs font-bold uppercase tracking-wide text-[#172112]/70">
              Days Open
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-[#2D4A1E]/10 bg-white p-6 shadow-[0_18px_55px_rgba(45,74,30,0.06)]">
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

        {/* <div className="mt-14 grid gap-5 md:grid-cols-2">
          <article className="group overflow-hidden rounded-4xl border border-[#2D4A1E]/10 bg-white shadow-[0_20px_60px_rgba(45,74,30,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(45,74,30,0.14)]">
            <div className="relative h-72 overflow-hidden bg-[#E8E4DC]">
              <Image
                src="/img3.avif"
                alt="Golfers on the course"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            <div className="p-6">
              <h3 className="text-xl font-black text-[#172112]">
                Relaxed Club Atmosphere
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#172112]/60">
                A welcoming setting for practice, play, dining, and time with
                other members.
              </p>
            </div>
          </article>

          <article className="group overflow-hidden rounded-4xl border border-[#2D4A1E]/10 bg-white shadow-[0_20px_60px_rgba(45,74,30,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(45,74,30,0.14)]">
            <div className="relative h-72 overflow-hidden bg-[#E8E4DC]">
              <Image
                src="/img8.avif"
                alt="Golfers enjoying the course"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            <div className="p-6">
              <h3 className="text-xl font-black text-[#172112]">
                Made for Memorable Rounds
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#172112]/60">
                Scenic views, thoughtful service, and a course experience built
                around comfort and quality.
              </p>
            </div>
          </article>
        </div> */}

        <div className="mt-14 grid overflow-hidden rounded-4xl bg-[#172112] shadow-[0_28px_90px_rgba(23,33,18,0.24)] md:grid-cols-[1fr_0.9fr]">
          <div className="flex flex-col justify-between gap-10 p-7 md:p-10">
            <div>
              <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                Join Us
              </span>

              <h3 className="mt-5 max-w-xl text-4xl font-black leading-tight tracking-tight text-white md:text-6xl">
                Be part of a club that plays with purpose.
              </h3>
            </div>

            <Link
              href="/booking"
              className="group inline-flex w-fit items-center gap-4 rounded-full bg-[#C8E650] py-1.5 pl-6 pr-1.5 text-sm font-bold tracking-wide text-[#1A1A1A] transition-all duration-300 hover:bg-white"
            >
              <span>BOOK A TEE TIME</span>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1A1A1A] text-white transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight className="h-4 w-4" strokeWidth={2.6} />
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
