import { useEffect, useRef, useState } from 'react';
import './BlurText.css';

/**
 * React Bits "Blur Text", JS + CSS variant, trimmed to what this page needs.
 * The words blur and rise once on load, then stay still. No animation library:
 * the stagger is a CSS animation driven by a per-word custom property, and
 * prefers-reduced-motion turns it off completely.
 */
export default function BlurText({ text, delay = 45, className = '' }) {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    if (!('IntersectionObserver' in window)) {
      setInView(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const words = String(text).split(' ');

  return (
    <span ref={ref} className={`blur-text ${inView ? 'is-in' : ''} ${className}`.trim()}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="blur-text__word"
          style={{ '--word-index': i, '--word-delay': `${delay}ms` }}
        >
          {word}
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  );
}
