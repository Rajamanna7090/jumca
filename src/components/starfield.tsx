import { useEffect, useRef } from "react";

type Star = { x: number; y: number; r: number; a: number; tw: number; ph: number; vy: number; vx: number; glow: boolean };

/** Deep-space nebula glow + drifting, twinkling starfield (canvas). */
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
      const depth = Math.random();
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.3 + depth * depth * 1.5,
        a: 0.25 + depth * 0.75,
        tw: 0.4 + Math.random() * 1.6,
        ph: Math.random() * Math.PI * 2,
        vy: -(2 + depth * 10),
        vx: (Math.random() - 0.5) * 3,
        glow: depth > 0.85,
      };
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(Math.min(380, (w * h) / 4500));
      stars = Array.from({ length: n }, make);
    };

    const frame = (t: number) => {
      const dt = Math.min(0.05, (t - last) / 1000);
      last = t;
      ctx.clearRect(0, 0, w, h);
      const s = t / 1000;
      for (const st of stars) {
        if (!reduce) {
          st.y += st.vy * dt; st.x += st.vx * dt;
          if (st.y < -4) { st.y = h + 4; st.x = Math.random() * w; }
          if (st.x < -4) st.x = w + 4; else if (st.x > w + 4) st.x = -4;
        }
        const tw = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(s * st.tw + st.ph));
        const alpha = st.a * tw;
        if (st.glow) {
          const g = ctx.createRadialGradient(st.x, st.y, 0, st.x, st.y, st.r * 5);
          g.addColorStop(0, `rgba(220,230,255,${alpha * 0.55})`);
          g.addColorStop(1, "rgba(220,230,255,0)");
          ctx.fillStyle = g;
          ctx.beginPath(); ctx.arc(st.x, st.y, st.r * 5, 0, Math.PI * 2); ctx.fill();
        }
        ctx.fillStyle = `rgba(235,240,255,${alpha})`;
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
