import { reviews } from "@/lib/reviews";

function Stars() {
  return (
    <div className="flex gap-1" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }, (_, index) => (
        <svg
          key={index}
          viewBox="0 0 20 20"
          className="h-4 w-4 text-racing-500"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.1l-4.94 2.6.94-5.5-4-3.9 5.53-.8L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <section id="reviews" className="scroll-mt-24 border-t border-ink-200 bg-ink-100 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-racing-600">
          Facebook reviews
        </p>
        <h2 className="mt-3 font-display text-4xl uppercase leading-none tracking-tight text-ink-950 sm:text-5xl">
          What customers said
        </h2>
        <div className="mt-4 h-1 w-16 bg-racing-500" />
        <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <li key={`${review.name}-${review.date}`} className="flex flex-col border border-ink-200 bg-white p-6">
              <div className="flex items-baseline justify-between gap-4">
                <p className="font-display text-2xl uppercase tracking-wide text-ink-950">{review.name}</p>
                <p className="text-xs uppercase tracking-[0.14em] text-ink-400">{review.date}</p>
              </div>
              <div className="mt-3">
                <Stars />
              </div>
              {review.notable && review.notable.length > 0 && (
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">
                  {review.notable.join(" · ")}
                </p>
              )}
              <blockquote className="mt-4 text-base leading-relaxed text-ink-700">
                {review.quote}
              </blockquote>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
