import { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle, Color } from 'ogl';
import './Silk.css';

/**
 * React Bits "Silk", JS + CSS variant (OGL shader, no react-three-fiber).
 * Slow teal flow used as a very subtle hero texture on desktop only.
 * Everything is wrapped so a missing WebGL context leaves the CSS gradient
 * in place — the hero copy, buttons and form never depend on this.
 */

const vertex = /* glsl */ `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform float uTime;
uniform float uSpeed;
uniform float uScale;
uniform float uNoise;
uniform vec3 uColor;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float value = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 5; i++) {
    value += amp * noise(p);
    p *= 2.02;
    amp *= 0.5;
  }
  return value;
}

void main() {
  vec2 uv = vUv * uScale;
  float t = uTime * uSpeed;

  float n = fbm(vec2(uv.x * 1.7 + t * 0.30, uv.y * 2.4 - t * 0.18));
  n += 0.4 * fbm(vec2(uv.x * 3.3 - t * 0.15, uv.y * 4.1 + t * 0.35));

  float bands = smoothstep(0.32, 0.95, n);
  vec3 col = uColor + uColor * 0.55 * bands + vec3(0.02, 0.07, 0.07) * pow(bands, 2.5);

  gl_FragColor = vec4(mix(uColor, col, uNoise), 1.0);
}
`;

export default function Silk({
  speed = 0.22,
  scale = 1.15,
  color = '#0E5A5A',
  noise = 0.85,
  className = ''
}) {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;

    let renderer = null;
    let program = null;
    let frame = 0;
    let disposed = false;
    let visible = !document.hidden;
    let resize = null;
    let onVisibility = null;

    try {
      renderer = new Renderer({
        alpha: false,
        antialias: false,
        dpr: Math.min(window.devicePixelRatio || 1, 1.5)
      });

      const gl = renderer.gl;
      gl.canvas.className = 'silk__canvas';
      host.appendChild(gl.canvas);

      program = new Program(gl, {
        vertex,
        fragment,
        uniforms: {
          uTime: { value: 0 },
          uSpeed: { value: speed },
          uScale: { value: scale },
          uNoise: { value: noise },
          uColor: { value: new Color(color) }
        }
      });

      const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

      resize = () => {
        const width = Math.max(host.clientWidth, 1);
        const height = Math.max(host.clientHeight, 1);
        renderer.setSize(width, height);
      };
      resize();
      window.addEventListener('resize', resize, { passive: true });

      onVisibility = () => {
        visible = !document.hidden;
      };
      document.addEventListener('visibilitychange', onVisibility);

      const started = performance.now();
      const loop = (now) => {
        if (disposed) return;
        frame = requestAnimationFrame(loop);
        if (!visible) return;
        program.uniforms.uTime.value = (now - started) / 1000;
        renderer.render({ scene: mesh });
      };
      frame = requestAnimationFrame(loop);
    } catch (error) {
      // No WebGL (or a driver refused the context): keep the CSS fallback.
      renderer = null;
    }

    return () => {
      disposed = true;
      if (frame) cancelAnimationFrame(frame);
      if (resize) window.removeEventListener('resize', resize);
      if (onVisibility) document.removeEventListener('visibilitychange', onVisibility);
      if (renderer) {
        const gl = renderer.gl;
        if (gl.canvas && gl.canvas.parentNode) gl.canvas.parentNode.removeChild(gl.canvas);
        const lose = gl.getExtension('WEBGL_lose_context');
        if (lose) lose.loseContext();
      }
    };
  }, [speed, scale, color, noise]);

  return <div ref={hostRef} className={`silk ${className}`.trim()} aria-hidden="true" />;
}
