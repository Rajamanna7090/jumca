import { useEffect, useRef } from "react";

type Star = { x: number; y: number; r: number; base: number; peak: number; per: number; ph: number; vx: number; vy: number; glow: boolean };

/** Emergent-style cosmic background: cobalt arch nebula + slow zero-g drifting, breathing stars. */
export function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0, last = performance.now();
    let stars: Star[] = [];

    const make = (): Star => {
      const d = Math.random();
      const ang = Math.random() * Math.PI * 2;
      const sp = 3 + Math.random() * 9; // px/s — gentle zero-g drift
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        r: d < 0.7 ? 0.5 + Math.random() * 0.5 : d < 0.93 ? 0.9 + Math.random() * 0.6 : 1.4 + Math.random() * 0.8,
        base: 0.12 + Math.random() * 0.25,
        peak: 0.6 + Math.random() * 0.4,
        per: 2.5 + Math.random() * 3.5,
        ph: Math.random() * Math.PI * 2,
        vx: Math.cos(ang) * sp,
        vy: Math.sin(ang) * sp,
        glow: d > 0.93,
      };
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(Math.min(320, (w * h) / 5500));
      stars = Array.from({ length: n }, make);
    };

    const frame = (t: number) => {
      const dt = Math.min(0.05, (t - last) / 1000);
      last = t;
      ctx.clearRect(0, 0, w, h);
      const s = t / 1000;
      for (const st of stars) {
        if (!reduce) {
          st.x += st.vx * dt; st.y += st.vy * dt;
          if (st.x < -4) st.x = w + 4; else if (st.x > w + 4) st.x = -4;
          if (st.y < -4) st.y = h + 4; else if (st.y > h + 4) st.y = -4;
        }
        // smooth breathing: mostly faint, eases up to a bright peak
        const k = Math.pow(0.5 + 0.5 * Math.sin((s / st.per) * Math.PI * 2 + st.ph), 3);
        const alpha = st.base + (st.peak - st.base) * k;
        if (st.glow || k > 0.6) {
          const R = st.r * (st.glow ? 6 : 4);
          const g = ctx.createRadialGradient(st.x, st.y, 0, st.x, st.y, R);
          g.addColorStop(0, `rgba(200,215,255,${alpha * 0.5})`);
          g.addColorStop(1, "rgba(200,215,255,0)");
          ctx.fillStyle = g;
          ctx.beginPath(); ctx.arc(st.x, st.y, R, 0, Math.PI * 2); ctx.fill();
        }
        ctx.fillStyle = `rgba(240,244,255,${alpha})`;
        ctx.beginPath(); ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2); ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    };

    const onVis = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) { last = performance.now(); raf = requestAnimationFrame(frame); }
    };

    resize();
    raf = requestAnimationFrame(frame);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <div aria-hidden className="starfield pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="starfield-nebula absolute inset-0" />
      <canvas ref={ref} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
