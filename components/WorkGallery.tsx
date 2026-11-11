"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const photos = [
  {
    src: "/work/img_3312.jpg",
    width: 1200,
    height: 1600,
    alt: "Machined aluminum cylinder bolted to an engine case on the workbench",
  },
  {
    src: "/work/img_4487.jpg",
    width: 1200,
    height: 1600,
    alt: "Green Kawasaki dirt bike partly apart in the shop, with the tank and plastics off",
  },
  {
    src: "/work/img_4489.jpg",
    width: 1200,
    height: 1600,
    alt: "Knobby off-road tire and silver wheel on the blue tire changer",
  },
  {
    src: "/work/img_4605.jpg",
    width: 1200,
    height: 1600,
    alt: "Welded steel mount held in a gloved hand in front of a welding machine",
  },
  {
    src: "/work/img_4621.jpg",
    width: 1200,
    height: 1600,
    alt: "Green Kawasaki utility vehicle strapped to a trailer",
  },
  {
    src: "/work/img_4630.jpg",
    width: 1600,
    height: 1200,
    alt: "Open clutch cover with the primary clutch installed on an off-road machine",
  },
  {
    src: "/work/img_4632.jpg",
    width: 1200,
    height: 1600,
    alt: "Underside of an off-road machine with the engine, hoses, and exhaust exposed",
  },
  {
    src: "/work/img_9139.jpg",
    width: 1200,
    height: 1600,
    alt: "Red ATV with a snorkel and front cargo box parked on gravel",
  },
] as const;

export default function WorkGallery() {
  const [active, setActive] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const photo = active === null ? null : photos[active];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (active === null) {
      if (dialog.open) dialog.close();
      return;
    }

    const opening = !dialog.open;
    if (opening) dialog.showModal();
    if (opening) {
      dialog.querySelector<HTMLButtonElement>("[data-lightbox-close]")?.focus();
    }
  }, [active]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const onClose = () => {
      setActive(null);
      triggerRef.current?.focus();
    };

    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, []);

  function show(index: number) {
    setActive((index + photos.length) % photos.length);
  }

  return (
    <>
      <ul className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
        {photos.map((item, index) => (
          <li key={item.src} className="mb-4 break-inside-avoid">
            <button
              type="button"
              className="block w-full border border-ink-200 bg-white text-left transition hover:border-ink-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-racing-500"
              aria-haspopup="dialog"
              aria-expanded={active === index}
              aria-label={`Enlarge photo: ${item.alt}`}
              onClick={(event) => {
                triggerRef.current = event.currentTarget;
                setActive(index);
              }}
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                loading="lazy"
                sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                className="h-auto w-full"
                style={{ width: "100%", height: "auto" }}
              />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label={photo ? photo.alt : "Enlarged photo"}
        className="m-auto w-[min(100vw-2rem,56rem)] max-w-none border-0 bg-transparent p-0 text-white backdrop:bg-ink-950/85"
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
        onKeyDown={(event) => {
          if (active === null) return;
          if (event.key === "ArrowRight") {
            event.preventDefault();
            show(active + 1);
          } else if (event.key === "ArrowLeft") {
            event.preventDefault();
            show(active - 1);
          }
        }}
      >
        {photo && active !== null && (
          <div className="bg-ink-950">
            <div className="relative bg-white">
              <Image
                key={photo.src}
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                sizes="100vw"
                className="mx-auto h-auto max-h-[78vh] w-auto max-w-full"
                style={{ width: "auto", height: "auto", maxHeight: "78vh", maxWidth: "100%" }}
              />
              <button
                type="button"
                data-lightbox-close
                className="absolute right-3 top-3 bg-ink-950 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-racing-600"
                onClick={() => dialogRef.current?.close()}
              >
                Close
              </button>
            </div>
            <p className="px-4 pt-4 text-center text-sm leading-relaxed text-white" aria-hidden="true">
              {photo.alt}
            </p>
            <div className="flex items-center justify-between gap-3 px-4 py-4">
              <button
                type="button"
                className="border border-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-ink-950"
                onClick={() => show(active - 1)}
              >
                Previous
              </button>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-300">
                {active + 1} / {photos.length}
              </p>
              <button
                type="button"
                className="border border-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-ink-950"
                onClick={() => show(active + 1)}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
