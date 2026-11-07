import { useEffect, useRef } from "react";

/** Cinematic cosmic sun that periodically rises from the top-right corner with god rays. */
export function SolarFlare() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let w = 0, h = 0, raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const DURATION = 14000;
    const rays = Array.from({ length: 9 }, () => ({
      angle: Math.PI * 0.5 + Math.random() * Math.PI * 0.5, // pointing down-left
      width: 0.03 + Math.random() * 0.07,
      len: 0.7 + Math.random() * 0.6,
      phase: Math.random() * Math.PI * 2,
      speed: 0.3 + Math.random() * 0.5,
    }));
    let start = performance.now() + 4000; // first appearance soon
    const schedule = (now: number) => { start = now + DURATION + 35000 + Math.random() * 20000; };

    const ease = (t: number) => t * t * (3 - 2 * t);

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      ctx.clearRect(0, 0, w, h);
      const t = (now - start) / DURATION;
      if (t < 0) return;
      if (t > 1) { schedule(now); return; }

      // envelope: rise 0-0.3, hold to 0.5, fade to 1
      const k = t < 0.3 ? ease(t / 0.3) : t < 0.5 ? 1 : ease(1 - (t - 0.5) / 0.5);
      const cx = w + 40 - k * 120, cy = -40 + k * 80;
      const diag = Math.hypot(w, h);
      const sec = now / 1000;

      ctx.globalCompositeOperation = "lighter";

      // god rays
      for (const r of rays) {
        const a = r.angle + Math.sin(sec * r.speed * 0.3 + r.phase) * 0.04;
        const len = diag * r.len;
        const flick = 0.6 + 0.4 * Math.sin(sec * r.speed + r.phase);
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, len);
        g.addColorStop(0, `oklch(0.95 0.06 240 / ${0.22 * k * flick})`);
        g.addColorStop(0.4, `oklch(0.7 0.16 260 / ${0.08 * k * flick})`);
        g.addColorStop(1, "oklch(0.5 0.2 266 / 0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, len, a - r.width, a + r.width);
        ctx.closePath();
        ctx.fill();
      }

      // corona
      const cr = 380 * (0.7 + 0.3 * k);
      const corona = ctx.createRadialGradient(cx, cy, 0, cx, cy, cr);
      corona.addColorStop(0, `oklch(1 0.02 240 / ${0.9 * k})`);
      corona.addColorStop(0.08, `oklch(0.92 0.08 235 / ${0.6 * k})`);
      corona.addColorStop(0.35, `oklch(0.6 0.2 262 / ${0.18 * k})`);
      corona.addColorStop(1, "oklch(0.4 0.2 266 / 0)");
      ctx.fillStyle = corona;
      ctx.fillRect(cx - cr, cy - cr, cr * 2, cr * 2);

      // anamorphic streak at apex
      const apex = Math.max(0, 1 - Math.abs(t - 0.4) / 0.15);
      if (apex > 0) {
        const sw = w * 0.9;
        const sg = ctx.createLinearGradient(cx - sw, cy, cx + sw * 0.2, cy);
        sg.addColorStop(0, "oklch(0.8 0.15 240 / 0)");
        sg.addColorStop(0.8, `oklch(0.9 0.1 235 / ${0.35 * apex})`);
        sg.addColorStop(1, "oklch(0.8 0.15 240 / 0)");
        ctx.fillStyle = sg;
        ctx.fillRect(cx - sw, cy - 1.5, sw * 1.2, 3);
      }
      ctx.globalCompositeOperation = "source-over";
    };
    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-0 h-full w-full" />;
}
