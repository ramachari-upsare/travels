import { useEffect, useCallback, useRef, useState } from 'react';

/**
 * Gallery modal — full-screen overlay with arrows, keyboard nav, swipe and Esc.
 * Photos are WebP with JPG fallback via <picture>.
 */
export default function Gallery({ photos, startIndex = 0, onClose }) {
  const [idx, setIdx] = useState(startIndex);
  const touchRef = useRef(null);

  const prev = useCallback(() => setIdx((i) => (i - 1 + photos.length) % photos.length), [photos.length]);
  const next = useCallback(() => setIdx((i) => (i + 1) % photos.length), [photos.length]);

  /* keyboard */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, prev, next]);

  /* swipe */
  const onTouchStart = (e) => {
    touchRef.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchRef.current === null) return;
    const diff = touchRef.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
    }
    touchRef.current = null;
  };

  const photo = photos[idx];
  const multi = photos.length > 1;

  return (
    <div
      className="gallery-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Photo gallery"
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="gallery-overlay__inner" onClick={(e) => e.stopPropagation()}>
        <picture>
          <source srcSet={photo.webp} type="image/webp" />
          <img
            src={photo.jpg}
            alt={photo.alt}
            className="gallery-overlay__img"
            draggable="false"
          />
        </picture>

        {multi && (
          <p className="gallery-overlay__counter">
            {idx + 1} / {photos.length}
          </p>
        )}

        {multi && (
          <button
            type="button"
            className="gallery-overlay__arrow gallery-overlay__arrow--prev"
            onClick={prev}
            aria-label="Previous photo"
          >
            ‹
          </button>
        )}
        {multi && (
          <button
            type="button"
            className="gallery-overlay__arrow gallery-overlay__arrow--next"
            onClick={next}
            aria-label="Next photo"
          >
            ›
          </button>
        )}
      </div>

      <button
        type="button"
        className="gallery-overlay__close"
        onClick={onClose}
        aria-label="Close gallery"
      >
        ✕
      </button>
    </div>
  );
}
