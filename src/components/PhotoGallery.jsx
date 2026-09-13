import { useEffect, useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import "./PhotoGallery.css";

const PhotoGallery = ({ photos = [], title }) => {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  useEffect(() => {
    if (!lightbox) return undefined;

    const onKey = (event) => {
      if (event.key === "Escape") setLightbox(false);
      if (event.key === "ArrowRight") {
        setActive((i) => (i + 1) % photos.length);
      }
      if (event.key === "ArrowLeft") {
        setActive((i) => (i - 1 + photos.length) % photos.length);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox, photos.length]);

  if (!photos.length) return null;

  const current = photos[active];

  return (
    <div className="gallery">
      <button
        type="button"
        className="gallery__hero"
        onClick={() => setLightbox(true)}
        aria-label={`${t("gallery.viewPhotos")}: ${current.alt}`}
      >
        <img src={current.src} alt={current.alt} />
        <span className="gallery__hint">{t("gallery.viewPhotos")}</span>
      </button>

      <div className="gallery__thumbs" role="list">
        {photos.map((photo, index) => (
          <button
            key={photo.src}
            type="button"
            role="listitem"
            className={`gallery__thumb ${index === active ? "is-active" : ""}`}
            onClick={() => setActive(index)}
            aria-label={photo.alt}
          >
            <img src={photo.src} alt="" loading="lazy" />
          </button>
        ))}
      </div>

      {lightbox && (
        <div
          className="gallery__lightbox"
          onClick={() => setLightbox(false)}
          role="presentation"
        >
          <div
            className="gallery__lightbox-inner"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={title || t("gallery.viewPhotos")}
          >
            <button
              type="button"
              className="gallery__close"
              onClick={() => setLightbox(false)}
              aria-label={t("gallery.close")}
            >
              ×
            </button>
            <img src={current.src} alt={current.alt} />
            <p className="gallery__caption">
              {current.alt}
              <span>
                {active + 1} / {photos.length}
              </span>
            </p>
            {photos.length > 1 && (
              <div className="gallery__nav">
                <button
                  type="button"
                  aria-label={t("gallery.prev")}
                  onClick={() =>
                    setActive((i) => (i - 1 + photos.length) % photos.length)
                  }
                >
                  ←
                </button>
                <button
                  type="button"
                  aria-label={t("gallery.next")}
                  onClick={() => setActive((i) => (i + 1) % photos.length)}
                >
                  →
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
