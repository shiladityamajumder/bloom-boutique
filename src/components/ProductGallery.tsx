"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, X, ZoomIn } from "lucide-react";
import { imagePath } from "@/lib/images";
import type { GalleryPhoto } from "@/lib/product-photography";
import { Photo } from "./ui/Floral";

export function ProductGallery({
  photos,
  slug,
}: {
  photos: GalleryPhoto[];
  slug: string;
}) {
  const [photo, setPhoto] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [loaded, setLoaded] = useState<string | null>(null);
  const [failed, setFailed] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const zoomTrigger = useRef<HTMLButtonElement>(null);
  const selected = photos[photo];
  const photoId = `bouquet-photo-${slug}`;
  const loading = loaded !== selected.image && failed !== selected.image;
  function step(direction: number) {
    setPhoto((index) => (index + direction + photos.length) % photos.length);
  }

  useEffect(() => {
    if (!zoom) return;
    const trigger = zoomTrigger.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current?.showModal();
    return () => {
      document.body.style.overflow = previousOverflow;
      trigger?.focus({ preventScroll: true });
    };
  }, [zoom]);

  return (
    <>
      <div
        className="product-gallery"
        onKeyDown={(event) => {
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault();
            step(event.key === "ArrowRight" ? 1 : -1);
          }
        }}
      >
        <div
          className="product-thumbs"
          role="group"
          aria-label="Bouquet photographs"
        >
          {photos.map((image, index) => (
            <button
              type="button"
              key={image.image}
              className={photo === index ? "active" : ""}
              onClick={() => setPhoto(index)}
              aria-label={`View ${image.label} photo`}
              aria-pressed={photo === index}
              aria-controls={photoId}
            >
              <Photo name={image.image} alt="" sizes="90px" />
            </button>
          ))}
        </div>
        <div
          className="product-main-photo"
          id={photoId}
          data-photo-view={photo === 0 ? "bouquet" : "detail"}
          aria-busy={loading}
        >
          <div className="photo">
            <Image
              key={`${selected.image}-${attempt}`}
              src={imagePath(selected.image)}
              alt={selected.description}
              fill
              quality={85}
              sizes="(max-width: 800px) 90vw, 45vw"
              loading="eager"
              fetchPriority="high"
              onLoad={() => setLoaded(selected.image)}
              onError={() => setFailed(selected.image)}
            />
          </div>
          {loading && (
            <span className="gallery-loading" role="status">
              Loading photograph…
            </span>
          )}
          {failed === selected.image && (
            <div className="gallery-error" role="alert">
              <p>This photograph couldn’t load.</p>
              <button
                type="button"
                className="small-button"
                onClick={() => {
                  setFailed(null);
                  setAttempt((value) => value + 1);
                }}
              >
                Try again
              </button>
            </div>
          )}
          <button
            type="button"
            className="gallery-arrow gallery-arrow--previous"
            aria-label="Previous bouquet photo"
            onClick={() => step(-1)}
          >
            <ArrowLeft size={19} />
          </button>
          <button
            type="button"
            className="gallery-arrow gallery-arrow--next"
            aria-label="Next bouquet photo"
            onClick={() => step(1)}
          >
            <ArrowRight size={19} />
          </button>
          <button
            ref={zoomTrigger}
            type="button"
            className="zoom-button"
            onClick={() => setZoom(true)}
            aria-label="Enlarge bouquet photo"
          >
            <ZoomIn size={20} />
          </button>
        </div>
        <div className="gallery-caption" aria-live="polite">
          <span>
            {photo === 0
              ? "A little beauty, beautifully gathered."
              : selected.description}
          </span>
          <span>
            {String(photo + 1).padStart(2, "0")} /{" "}
            {String(photos.length).padStart(2, "0")}
          </span>
        </div>
      </div>
      {zoom && (
        <dialog
          ref={dialog}
          className="lightbox bouquet-lightbox"
          aria-label="Enlarged bouquet photo"
          onCancel={() => setZoom(false)}
          onClick={(event) => {
            if (event.target === event.currentTarget) setZoom(false);
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
              event.preventDefault();
              step(event.key === "ArrowRight" ? 1 : -1);
            }
          }}
        >
          <button
            type="button"
            className="lightbox-close"
            autoFocus
            aria-label="Close enlarged photo"
            onClick={() => setZoom(false)}
          >
            <X />
          </button>
          <Photo
            key={selected.image}
            name={selected.image}
            alt={`${selected.description}, enlarged view`}
            priority
            sizes="90vw"
          />
          <button
            type="button"
            className="lightbox-previous"
            aria-label="Previous enlarged photo"
            onClick={() => step(-1)}
          >
            <ArrowLeft />
          </button>
          <button
            type="button"
            className="lightbox-next"
            aria-label="Next enlarged photo"
            onClick={() => step(1)}
          >
            <ArrowRight />
          </button>
          <p className="lightbox-caption" aria-live="polite">
            {selected.label} · {photo + 1} / {photos.length}
          </p>
        </dialog>
      )}
    </>
  );
}
