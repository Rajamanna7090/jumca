import { useEffect, useRef } from "react";

/**
 * Cinematic golden sunrise peeking from beyond the top-right corner.
 * The large source stays hidden; only its rim glow, soft volumetric
 * sunbeams through haze, and an optical lens flare are visible.
 */
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

    const DURATION = 16000;
    // Many soft overlapping shafts, fanning down-left like light through misty trees
    const beams = Array.from({ length: 22 }, () => ({
      angle: Math.PI * 0.55 + Math.random() * Math.PI * 0.4,
      width: 0.008 + Math.random() * 0.035,
      len: 0.6 + Math.random() * 0.7,
      strength: 0.3 + Math.random() * 0.7,
      phase: Math.random() * Math.PI * 2,
      speed: 0.15 + Math.random() * 0.35,
    }));
    const ghosts = [
      { t: 0.35, r: 40, a: 0.10, ring: false },
      { t: 0.55, r: 18, a: 0.16, ring: false },
      { t: 0.75, r: 90, a: 0.05, ring: true },
      { t: 1.05, r: 28, a: 0.12, ring: false },
      { t: 1.3, r: 140, a: 0.04, ring: true },
      { t: 1.55, r: 55, a: 0.07, ring: false },
    ];

    let start = performance.now() + 4000;
    const schedule = (now: number) => { start = now + DURATION + 35000 + Math.random() * 20000; };
    const ease = (t: number) => t * t * (3 - 2 * t);
    const gold = (l: number, c: number, hue: number, a: number) => `oklch(${l} ${c} ${hue} / ${Math.max(0, a)})`;

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      ctx.clearRect(0, 0, w, h);
      const t = (now - start) / DURATION;
      if (t < 0) return;
      if (t > 1) { schedule(now); return; }

      const k = t < 0.3 ? ease(t / 0.3) : t < 0.6 ? 1 : ease(1 - (t - 0.6) / 0.4);
      // Huge source sits beyond the corner; only its rim peeks in
      const cx = w + 60 - k * 70, cy = -60 + k * 50;
      const diag = Math.hypot(w, h);
      const sec = now / 1000;

      ctx.globalCompositeOperation = "lighter";

      // Atmospheric warm haze bathing the quadrant
      const hazeR = diag * 0.85;
      const haze = ctx.createRadialGradient(cx, cy, 0, cx, cy, hazeR);
      haze.addColorStop(0, gold(0.85, 0.15, 75, 0.22 * k));
      haze.addColorStop(0.3, gold(0.7, 0.15, 65, 0.08 * k));
      haze.addColorStop(1, gold(0.5, 0.1, 60, 0));
      ctx.fillStyle = haze;
      ctx.fillRect(0, 0, w, h);

      // Volumetric sunbeams: soft feathered shafts
      ctx.save();
      ctx.filter = "blur(14px)";
      for (const b of beams) {
        const a = b.angle + Math.sin(sec * b.speed * 0.25 + b.phase) * 0.02;
        const len = diag * b.len;
        const flick = 0.65 + 0.35 * Math.sin(sec * b.speed + b.phase);
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, len);
        const s = b.strength * k * flick;
        g.addColorStop(0, gold(0.97, 0.06, 85, 0.28 * s));
        g.addColorStop(0.25, gold(0.87, 0.15, 78, 0.14 * s));
        g.addColorStop(0.6, gold(0.72, 0.15, 65, 0.05 * s));
        g.addColorStop(1, gold(0.6, 0.12, 60, 0));
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, len, a - b.width, a + b.width);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();

      // Large hidden source: bright rim bloom peeking past the corner
      const cr = 520 * (0.8 + 0.2 * k);
      const corona = ctx.createRadialGradient(cx, cy, 0, cx, cy, cr);
      corona.addColorStop(0, gold(1, 0.03, 90, 0.95 * k));
      corona.addColorStop(0.12, gold(0.96, 0.08, 85, 0.75 * k));
      corona.addColorStop(0.3, gold(0.86, 0.16, 75, 0.25 * k));
      corona.addColorStop(1, gold(0.6, 0.14, 62, 0));
      ctx.fillStyle = corona;
      ctx.fillRect(cx - cr, cy - cr, cr * 2, cr * 2);

      // Lens flare along the optical axis (source -> screen centre -> beyond)
      const mx = w / 2, my = h / 2;
      const dx = mx - cx, dy = my - cy;
      for (const gh of ghosts) {
        const gx = cx + dx * gh.t, gy = cy + dy * gh.t;
        const ga = gh.a * k;
        const gg = ctx.createRadialGradient(gx, gy, gh.ring ? gh.r * 0.8 : 0, gx, gy, gh.r);
        if (gh.ring) {
          gg.addColorStop(0, gold(0.8, 0.12, 75, 0));
          gg.addColorStop(0.5, gold(0.85, 0.14, 70, ga));
          gg.addColorStop(1, gold(0.7, 0.12, 50, 0));
        } else {
          gg.addColorStop(0, gold(0.92, 0.1, 82, ga));
          gg.addColorStop(0.7, gold(0.8, 0.14, 70, ga * 0.6));
          gg.addColorStop(1, gold(0.7, 0.12, 60, 0));
        }
        ctx.fillStyle = gg;
        ctx.beginPath();
        ctx.arc(gx, gy, gh.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Anamorphic streak through the rim
      const sw = w * 1.1;
      const sa = 0.3 * k * (0.85 + 0.15 * Math.sin(sec * 1.3));
      const sg = ctx.createLinearGradient(cx - sw, 0, cx, 0);
      sg.addColorStop(0, gold(0.85, 0.14, 75, 0));
      sg.addColorStop(0.75, gold(0.92, 0.1, 82, sa * 0.5));
      sg.addColorStop(1, gold(0.98, 0.05, 88, sa));
      ctx.fillStyle = sg;
      const sy = Math.max(cy + 30, 18);
      ctx.fillRect(cx - sw, sy - 1.5, sw, 3);
      ctx.save();
      ctx.filter = "blur(8px)";
      ctx.globalAlpha = 0.6;
      ctx.fillRect(cx - sw, sy - 6, sw, 12);
      ctx.restore();

      ctx.globalCompositeOperation = "source-over";
    };
    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-0 h-full w-full" />;
}
