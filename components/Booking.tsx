import BookingEmbed from "./BookingEmbed";
import { calLink, site } from "@/lib/site";

export default function Booking() {
  return (
    <section id="book" className="scroll-mt-24 border-t border-ink-200 bg-ink-100 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-racing-600">
          Appointments
        </p>
        <h2 className="mt-3 font-display text-4xl uppercase leading-none tracking-tight text-ink-950 sm:text-5xl">
          Book a time
        </h2>
        <div className="mt-4 h-1 w-16 bg-racing-500" />
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-500">
          Pick a time on the calendar, or call or text {site.contactName} at{" "}
          <a href={site.phoneHref} className="font-semibold text-ink-950 underline decoration-racing-500 decoration-2 underline-offset-4">
            {site.phone}
          </a>
          .
        </p>

        <div className="mt-10 border border-ink-200 bg-white">
          {calLink ? (
            <div className="h-[760px]">
              <BookingEmbed calLink={calLink} />
            </div>
          ) : (
            <div className="px-6 py-16 text-center sm:px-10">
              <p className="font-display text-3xl uppercase text-ink-950">
                Calendar coming online
              </p>
              <p className="mx-auto mt-4 max-w-lg text-ink-500">
                Appointment booking will show here. Until then, call or text{" "}
                {site.contactName}.
              </p>
              <a
                href={site.phoneHref}
                className="mt-8 inline-flex bg-ink-950 px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-racing-600"
              >
                Call or text {site.phone}
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
