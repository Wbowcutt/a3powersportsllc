"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { site } from "@/lib/site";

type FormStatus = "idle" | "loading" | "success" | "error";

const MAX_PHOTO_SIZE = 4 * 1024 * 1024;

export default function Contact() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [photoName, setPhotoName] = useState("");

  function handlePhotoChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      setPhotoName("");
      return;
    }

    if (file.size > MAX_PHOTO_SIZE) {
      setErrorMessage("Photo must be 4 MB or smaller.");
      event.target.value = "";
      setPhotoName("");
      return;
    }

    setErrorMessage("");
    setPhotoName(file.name);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      setPhotoName("");
      form.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong."
      );
    }
  }

  return (
    <section id="contact" className="scroll-mt-24 bg-white px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-0 border border-ink-950 lg:grid-cols-2">
        <div className="bg-ink-950 px-6 py-12 text-white sm:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-racing-400">
            Contact
          </p>
          <h2 className="mt-3 font-display text-4xl uppercase leading-none sm:text-5xl">
            Talk to {site.contactName}
          </h2>
          <div className="mt-4 h-1 w-16 bg-racing-500" />
          <p className="mt-5 text-lg leading-relaxed text-ink-300">
            Tell him what the machine needs. A photo helps.
          </p>

          <dl className="mt-10 space-y-6">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-400">
                Name
              </dt>
              <dd className="mt-1 text-xl font-semibold">{site.contactName}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-400">
                Call or text
              </dt>
              <dd className="mt-1">
                <a href={site.phoneHref} className="font-display text-3xl tracking-wide hover:text-racing-400">
                  {site.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-400">
                Email
              </dt>
              <dd className="mt-1">
                <a href={`mailto:${site.email}`} className="break-all text-lg hover:text-racing-400">
                  {site.email}
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <div className="bg-white px-6 py-12 sm:px-10">
          {status === "success" ? (
            <div className="flex h-full flex-col justify-center">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-racing-600">
                Sent
              </p>
              <h3 className="mt-3 font-display text-4xl uppercase text-ink-950">
                Message received
              </h3>
              <p className="mt-4 text-ink-500">
                {site.contactName} will follow up at the email you entered.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-8 self-start text-sm font-semibold uppercase tracking-[0.14em] text-ink-950 underline decoration-racing-500 decoration-2 underline-offset-4"
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="hidden" aria-hidden="true">
                <label htmlFor="company">Company</label>
                <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
              </div>
              <div>
                <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  disabled={status === "loading"}
                  className="mt-2 w-full border border-ink-300 bg-white px-4 py-3 text-ink-950 outline-none focus:border-ink-950 disabled:opacity-50"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  disabled={status === "loading"}
                  className="mt-2 w-full border border-ink-300 bg-white px-4 py-3 text-ink-950 outline-none focus:border-ink-950 disabled:opacity-50"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">
                  Phone <span className="font-normal normal-case tracking-normal text-ink-400">(optional)</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  disabled={status === "loading"}
                  className="mt-2 w-full border border-ink-300 bg-white px-4 py-3 text-ink-950 outline-none focus:border-ink-950 disabled:opacity-50"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  disabled={status === "loading"}
                  placeholder="What does the machine need?"
                  className="mt-2 w-full resize-none border border-ink-300 bg-white px-4 py-3 text-ink-950 outline-none placeholder:text-ink-400 focus:border-ink-950 disabled:opacity-50"
                />
              </div>
              <div>
                <label htmlFor="photo" className="block text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">
                  Photo <span className="font-normal normal-case tracking-normal text-ink-400">(optional)</span>
                </label>
                <input
                  id="photo"
                  name="photo"
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  disabled={status === "loading"}
                  onChange={handlePhotoChange}
                  className="mt-2 block w-full text-sm text-ink-500 file:mr-4 file:border-0 file:bg-ink-950 file:px-3 file:py-2 file:text-xs file:font-semibold file:uppercase file:tracking-[0.14em] file:text-white"
                />
                <p className="mt-2 text-xs text-ink-400">JPG, PNG, WebP, or GIF. 4 MB max.</p>
                {photoName && <p className="mt-1 text-xs text-racing-600">Selected: {photoName}</p>}
              </div>
              {status === "error" && (
                <p className="text-sm text-racing-600" role="alert">
                  {errorMessage}
                </p>
              )}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-ink-950 px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-racing-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {status === "loading" ? "Sending..." : "Send message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
