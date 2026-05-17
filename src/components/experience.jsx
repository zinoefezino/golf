import Image from "next/image";

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

function Card({ card, className = "", textClassName = "", priority = false }) {
  return (
    <article
      className={`group relative overflow-hidden rounded-[1.75rem] bg-[#1A1A1A] shadow-sm ${className}`}
    >
      <Image
        src={card.src}
        alt={card.alt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/35 to-transparent" />
      <div className="absolute inset-0 bg-linear-to-r from-black/30 via-transparent to-transparent" />

      <div
        className={`absolute bottom-0 left-0 right-0 p-5 md:p-6 ${textClassName}`}
      >
        <p className="mb-2 text-xl font-black leading-tight text-white md:text-2xl">
          {card.label}
        </p>
        <p className="max-w-sm text-sm leading-relaxed text-white/65">
          {card.sub}
        </p>
      </div>
    </article>
  );
}

export default function ClubExperienceSection() {
  return (
    <section className="bg-[#F5F2EC] px-4 py-14 md:px-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h1 className="mb-4 text-3xl font-black leading-tight text-[#1A1A1A] md:text-5xl">
            Everything You Need for a Memorable Round
          </h1>

          <p className="mx-auto max-w-lg text-sm leading-relaxed text-[#777] md:text-base">
            From scenic fairways to thoughtful hospitality, every part of the
            club is designed to make your time on and off the course feel
            seamless.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-[2fr_3fr] md:grid-rows-[250px_250px_260px]">
          <Card
            card={CARDS[0]}
            priority
            className="h-80 md:col-start-1 md:row-span-2 md:h-full"
          />

          <Card
            card={CARDS[1]}
            className="h-64 md:col-start-2 md:row-start-1 md:h-full"
            textClassName="md:max-w-md"
          />

          <Card
            card={CARDS[2]}
            className="h-64 md:col-start-2 md:row-start-2 md:h-full"
            textClassName="md:max-w-md"
          />

          <Card
            card={CARDS[3]}
            className="h-72 md:col-span-2 md:row-start-3 md:h-full"
            textClassName="md:max-w-xl"
          />
        </div>
      </div>
    </section>
  );
}
