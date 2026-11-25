import { useRef } from 'react';
import './SpotlightCard.css';

/**
 * React Bits "Spotlight Card", JS + CSS variant.
 * A soft radial highlight follows the pointer. It is only painted on devices
 * with a real pointer (see the media query in the CSS), so touch phones get a
 * plain, still card and nothing depends on hover.
 */
export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(14, 90, 90, 0.14)'
}) {
  const ref = useRef(null);

  const handlePointerMove = (event) => {
    if (event.pointerType !== 'mouse') return;
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty('--spot-x', `${event.clientX - rect.left}px`);
    node.style.setProperty('--spot-y', `${event.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      className={`spotlight-card ${className}`.trim()}
      style={{ '--spot-color': spotlightColor }}
      onPointerMove={handlePointerMove}
    >
      {children}
    </div>
  );
}
