import { Component, Suspense, lazy, useEffect, useState } from 'react';
import './HeroBackground.css';

/* Silk is a separate chunk: it is only downloaded on wide screens with motion
   allowed, so phones never pay for the shader. */
const Silk = lazy(() => import('./Silk.jsx'));

class SafeBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    // A shader or chunk failure simply leaves the CSS fallback visible.
    return this.state.failed ? null : this.props.children;
  }
}

export default function HeroBackground() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const wide = window.matchMedia('(min-width: 1024px)');
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)');

    const update = () => setEnabled(wide.matches && !calm.matches);
    update();

    wide.addEventListener('change', update);
    calm.addEventListener('change', update);
    return () => {
      wide.removeEventListener('change', update);
      calm.removeEventListener('change', update);
    };
  }, []);

  // Fallback pattern is always mounted; the shader layers on top when allowed.
  return (
    <div className="hero__fx" aria-hidden="true">
      {enabled && (
        <SafeBoundary>
          <Suspense fallback={null}>
            <Silk speed={0.2} scale={1.1} noise={0.8} color="#1B365A" />
          </Suspense>
        </SafeBoundary>
      )}
    </div>
  );
}
