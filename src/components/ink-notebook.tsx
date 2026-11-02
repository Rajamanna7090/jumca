import { useCallback, useEffect, useRef, useState } from "react";
import { getStroke } from "perfect-freehand";
import {
  Download, Eraser, FileDown, Highlighter, ImagePlus, MousePointer2, PenLine, Plus, Redo2, Trash2, Undo2, ChevronLeft, ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const PAGE_W = 840;
export const PAGE_H = 1188;

type Pt = [number, number, number];
export interface Stroke { tool: "pen" | "hl"; color: string; size: number; pts: Pt[] }
export interface Img { id: string; src: string; x: number; y: number; w: number; h: number }
export type Paper = "dots" | "ruled" | "grid" | "blank";
export interface Page { paper: Paper; strokes: Stroke[]; images: Img[] }

type Tool = "pen" | "hl" | "eraser" | "select";
const COLORS = ["#F4F4F5", "#22D3EE", "#34D399", "#FBBF24", "#A78BFA", "#F87171"];
const PAPERS: { id: Paper; label: string }[] = [
  { id: "dots", label: "Dots" }, { id: "ruled", label: "Ruled" }, { id: "grid", label: "Grid" }, { id: "blank", label: "Blank" },
];
const blank = (paper: Paper = "dots"): Page => ({ paper, strokes: [], images: [] });
const key = (id: string) => `ink-notebook:${id}`;

export function strokePath(s: Stroke) {
  const outline = getStroke(s.pts, { size: s.size, thinning: s.tool === "hl" ? 0 : 0.55, smoothing: 0.6, streamline: 0.5, simulatePressure: s.pts.every((p) => p[2] === 0.5) });
  const p = new Path2D();
  outline.forEach(([x, y], i) => (i ? p.lineTo(x, y) : p.moveTo(x, y)));
  p.closePath();
  return p;
}

const imgCache = new Map<string, HTMLImageElement>();
function loadImg(src: string, onLoad: () => void) {
  let im = imgCache.get(src);
  if (!im) {
    im = new Image();
    im.onload = onLoad;
    im.src = src;
    imgCache.set(src, im);
  }
  return im.complete ? im : null;
}

export function drawPage(ctx: CanvasRenderingContext2D, page: Page, redraw: () => void = () => {}) {
  ctx.fillStyle = "#0E1016";
  ctx.fillRect(0, 0, PAGE_W, PAGE_H);
  ctx.strokeStyle = "rgba(255,255,255,0.08)";
  ctx.fillStyle = "rgba(255,255,255,0.14)";
  ctx.lineWidth = 1;
  if (page.paper === "dots") for (let x = 30; x < PAGE_W; x += 30) for (let y = 30; y < PAGE_H; y += 30) ctx.fillRect(x - 1, y - 1, 2, 2);
  if (page.paper === "ruled" || page.paper === "grid") {
    ctx.beginPath();
    for (let y = 60; y < PAGE_H; y += 36) { ctx.moveTo(0, y); ctx.lineTo(PAGE_W, y); }
    if (page.paper === "grid") for (let x = 0; x < PAGE_W; x += 36) { ctx.moveTo(x, 0); ctx.lineTo(x, PAGE_H); }
    ctx.stroke();
  }
  for (const i of page.images) {
    const im = loadImg(i.src, redraw);
    if (im) ctx.drawImage(im, i.x, i.y, i.w, i.h);
  }
  for (const s of page.strokes) {
    ctx.globalAlpha = s.tool === "hl" ? 0.35 : 1;
    ctx.fillStyle = s.color;
    ctx.fill(strokePath(s));
  }
  ctx.globalAlpha = 1;
}

function shrink(file: Blob): Promise<{ src: string; w: number; h: number }> {
  return new Promise((res, rej) => {
    const url = URL.createObjectURL(file);
    const im = new Image();
    im.onload = () => {
      const k = Math.min(1, 1200 / Math.max(im.width, im.height));
      const c = document.createElement("canvas");
      c.width = Math.round(im.width * k); c.height = Math.round(im.height * k);
      c.getContext("2d")!.drawImage(im, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url);
      res({ src: c.toDataURL("image/jpeg", 0.85), w: c.width, h: c.height });
    };
    im.onerror = rej;
    im.src = url;
  });
}

export function InkNotebook({ courseId, title }: { courseId: string; title: string }) {
  const [pages, setPages] = useState<Page[]>([blank()]);
  const [idx, setIdx] = useState(0);
  const [tool, setTool] = useState<Tool>("pen");
  const [color, setColor] = useState(COLORS[1]);
  const [size, setSize] = useState(4);
  const [sel, setSel] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const hist = useRef<{ undo: Page[][]; redo: Page[][] }>({ undo: [], redo: [] });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const live = useRef<Stroke | null>(null);
  const drag = useRef<{ id: string; mode: "move" | "resize"; ox: number; oy: number; start: Img } | null>(null);
  const page = pages[idx] ?? pages[0];

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key(courseId));
      if (raw) setPages(JSON.parse(raw));
    } catch { /* ignore */ }
    setLoaded(true);
  }, [courseId]);

  useEffect(() => {
    if (!loaded) return;
    const t = setTimeout(() => {
      try { localStorage.setItem(key(courseId), JSON.stringify(pages)); } catch { /* storage full */ }
    }, 400);
    return () => clearTimeout(t);
  }, [pages, loaded, courseId]);

  const redraw = useCallback(() => {
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const p = live.current ? { ...page, strokes: [...page.strokes, live.current] } : page;
    drawPage(ctx, p, redraw);
    const s = page.images.find((i) => i.id === sel);
    if (s && tool === "select") {
      ctx.strokeStyle = "#22D3EE"; ctx.lineWidth = 2; ctx.setLineDash([6, 4]);
      ctx.strokeRect(s.x, s.y, s.w, s.h); ctx.setLineDash([]);
      ctx.fillStyle = "#22D3EE"; ctx.fillRect(s.x + s.w - 10, s.y + s.h - 10, 20, 20);
    }
  }, [page, sel, tool]);

  useEffect(() => {
    const c = canvasRef.current; if (!c) return;
    const dpr = window.devicePixelRatio || 1;
    c.width = PAGE_W * dpr; c.height = PAGE_H * dpr;
    redraw();
  }, [redraw]);

  const commit = (next: Page[]) => {
    hist.current.undo.push(pages); hist.current.undo = hist.current.undo.slice(-60);
    hist.current.redo = [];
    setPages(next);
  };
  const setPage = (p: Page) => commit(pages.map((x, i) => (i === idx ? p : x)));
  const undo = () => { const u = hist.current.undo.pop(); if (u) { hist.current.redo.push(pages); setPages(u); setIdx((i) => Math.min(i, u.length - 1)); } };
  const redo = () => { const r = hist.current.redo.pop(); if (r) { hist.current.undo.push(pages); setPages(r); } };

  const pos = (e: React.PointerEvent): Pt => {
    const r = canvasRef.current!.getBoundingClientRect();
    return [((e.clientX - r.left) / r.width) * PAGE_W, ((e.clientY - r.top) / r.height) * PAGE_H, e.pointerType === "pen" ? e.pressure || 0.5 : 0.5];
  };

  const eraseAt = (x: number, y: number, base: Page) => {
    const ctx = canvasRef.current!.getContext("2d")!;
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
    const keep = base.strokes.filter((s) => {
      const path = strokePath(s);
      for (let dx = -8; dx <= 8; dx += 8) for (let dy = -8; dy <= 8; dy += 8) if (ctx.isPointInPath(path, x + dx, y + dy)) return false;
      return true;
    });
    ctx.restore();
    return keep.length === base.strokes.length ? null : { ...base, strokes: keep };
  };

  const onDown = (e: React.PointerEvent) => {
    if (e.pointerType === "touch" && e.isPrimary === false) return;
    (e.target as Element).setPointerCapture(e.pointerId);
    const p = pos(e);
    if (tool === "select") {
      const hit = [...page.images].reverse().find((i) => p[0] >= i.x && p[0] <= i.x + i.w + 10 && p[1] >= i.y && p[1] <= i.y + i.h + 10);
      setSel(hit?.id ?? null);
      if (hit) {
        const corner = p[0] > hit.x + hit.w - 24 && p[1] > hit.y + hit.h - 24;
        hist.current.undo.push(pages); hist.current.redo = [];
        drag.current = { id: hit.id, mode: corner ? "resize" : "move", ox: p[0], oy: p[1], start: hit };
      }
      return;
    }
    if (tool === "eraser") {
      hist.current.undo.push(pages); hist.current.redo = [];
      const n = eraseAt(p[0], p[1], page); if (n) setPages((ps) => ps.map((x, i) => (i === idx ? n : x)));
      live.current = { tool: "pen", color: "", size: 0, pts: [] };
      return;
    }
    live.current = { tool: tool === "hl" ? "hl" : "pen", color, size: tool === "hl" ? size * 4 : size, pts: [p] };
    redraw();
  };

  const onMove = (e: React.PointerEvent) => {
    const p = pos(e);
    const d = drag.current;
    if (d) {
      const dx = p[0] - d.ox, dy = p[1] - d.oy;
      setPages((ps) => ps.map((pg, i) => i !== idx ? pg : {
        ...pg,
        images: pg.images.map((im) => im.id !== d.id ? im : d.mode === "move"
          ? { ...im, x: d.start.x + dx, y: d.start.y + dy }
          : { ...im, w: Math.max(40, d.start.w + dx), h: Math.max(40, (d.start.w + dx) * (d.start.h / d.start.w)) }),
      }));
      return;
    }
    if (!live.current) return;
    if (tool === "eraser") {
      setPages((ps) => ps.map((pg, i) => (i === idx ? eraseAt(p[0], p[1], pg) ?? pg : pg)));
      return;
    }
    const evs = (e.nativeEvent.getCoalescedEvents?.() ?? []) as PointerEvent[];
    if (evs.length > 1) {
      const r = canvasRef.current!.getBoundingClientRect();
      for (const ev of evs) live.current.pts.push([((ev.clientX - r.left) / r.width) * PAGE_W, ((ev.clientY - r.top) / r.height) * PAGE_H, ev.pointerType === "pen" ? ev.pressure || 0.5 : 0.5]);
    } else live.current.pts.push(p);
    redraw();
  };

  const onUp = () => {
    drag.current = null;
    const s = live.current; live.current = null;
    if (s && tool !== "eraser" && s.pts.length) setPage({ ...page, strokes: [...page.strokes, s] });
  };

  const addImages = useCallback(async (files: Blob[]) => {
    const imgs: Img[] = [];
    for (const f of files) {
      if (!f.type.startsWith("image/")) continue;
      const { src, w, h } = await shrink(f);
      const k = Math.min(1, (PAGE_W - 120) / w);
      imgs.push({ id: crypto.randomUUID(), src, x: 60 + imgs.length * 20, y: 80 + imgs.length * 20, w: w * k, h: h * k });
    }
    if (!imgs.length) return;
    setPages((ps) => {
      hist.current.undo.push(ps); hist.current.redo = [];
      return ps.map((x, i) => (i === idx ? { ...x, images: [...x.images, ...imgs] } : x));
    });
    setTool("select"); setSel(imgs[imgs.length - 1].id);
  }, [idx]);

  useEffect(() => {
    const onPaste = (e: ClipboardEvent) => {
      const files = Array.from(e.clipboardData?.files ?? []);
      if (files.length) { e.preventDefault(); void addImages(files); }
    };
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.closest("input,textarea")) return;
      const m = e.ctrlKey || e.metaKey;
      if (m && e.key.toLowerCase() === "z") { e.preventDefault(); e.shiftKey ? redo() : undo(); }
      if (m && e.key.toLowerCase() === "y") { e.preventDefault(); redo(); }
      if ((e.key === "Delete" || e.key === "Backspace") && sel) deleteSel();
    };
    window.addEventListener("paste", onPaste);
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("paste", onPaste); window.removeEventListener("keydown", onKey); };
  });

  const deleteSel = () => { if (!sel) return; setPage({ ...page, images: page.images.filter((i) => i.id !== sel) }); setSel(null); };

  const render = (p: Page) => {
    const c = document.createElement("canvas");
    c.width = PAGE_W * 2; c.height = PAGE_H * 2;
    const ctx = c.getContext("2d")!; ctx.scale(2, 2); drawPage(ctx, p);
    return c;
  };
  const slug = title.replace(/[^a-z0-9]+/gi, "-").toLowerCase();
  const exportPng = () => {
    const a = document.createElement("a");
    a.href = render(page).toDataURL("image/png"); a.download = `${slug}-page-${idx + 1}.png`; a.click();
  };
  const exportPdf = async () => {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({ unit: "px", format: [PAGE_W, PAGE_H], hotfixes: ["px_scaling"] });
    pages.forEach((p, i) => { if (i) doc.addPage([PAGE_W, PAGE_H]); doc.addImage(render(p).toDataURL("image/jpeg", 0.92), "JPEG", 0, 0, PAGE_W, PAGE_H); });
    doc.save(`${slug}-notes.pdf`);
  };

  const Btn = ({ on, label, onClick, children }: { on?: boolean; label: string; onClick: () => void; children: React.ReactNode }) => (
    <button aria-label={label} title={label} onClick={onClick}
      className={cn("grid size-9 shrink-0 place-items-center rounded-xl transition-colors", on ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent hover:text-foreground")}>
      {children}
    </button>
  );

  return (
    <div className="flex flex-col gap-3">
      <div className="sticky top-0 z-10 flex flex-wrap items-center gap-1 rounded-2xl border bg-card/90 p-1.5 backdrop-blur">
        <Btn label="Pen" on={tool === "pen"} onClick={() => setTool("pen")}><PenLine className="size-4" /></Btn>
        <Btn label="Highlighter" on={tool === "hl"} onClick={() => setTool("hl")}><Highlighter className="size-4" /></Btn>
        <Btn label="Eraser" on={tool === "eraser"} onClick={() => setTool("eraser")}><Eraser className="size-4" /></Btn>
        <Btn label="Move images" on={tool === "select"} onClick={() => setTool("select")}><MousePointer2 className="size-4" /></Btn>
        <Btn label="Add image" onClick={() => fileRef.current?.click()}><ImagePlus className="size-4" /></Btn>
        <span className="mx-1 h-6 w-px bg-border" />
        {COLORS.map((c) => (
          <button key={c} aria-label={`Colour ${c}`} onClick={() => { setColor(c); if (tool === "eraser" || tool === "select") setTool("pen"); }}
            className={cn("size-6 shrink-0 rounded-full border-2 transition-transform", color === c ? "scale-110 border-foreground" : "border-transparent")} style={{ background: c }} />
        ))}
        <input aria-label="Pen size" type="range" min={2} max={14} value={size} onChange={(e) => setSize(+e.target.value)} className="mx-1 w-20 accent-primary" />
        <span className="mx-1 h-6 w-px bg-border" />
        <Btn label="Undo" onClick={undo}><Undo2 className="size-4" /></Btn>
        <Btn label="Redo" onClick={redo}><Redo2 className="size-4" /></Btn>
        {sel && tool === "select" && <Btn label="Delete image" onClick={deleteSel}><Trash2 className="size-4" /></Btn>}
        <div className="ml-auto flex items-center gap-1">
          <Btn label="Download page as image" onClick={exportPng}><Download className="size-4" /></Btn>
          <Btn label="Download notebook as PDF" onClick={() => void exportPdf()}><FileDown className="size-4" /></Btn>
        </div>
        <input ref={fileRef} type="file" accept="image/*" multiple hidden onChange={(e) => { void addImages(Array.from(e.target.files ?? [])); e.target.value = ""; }} />
      </div>

      <div className="flex flex-wrap items-center gap-2 text-xs">
        <div className="flex gap-1 rounded-full border p-0.5">
          {PAPERS.map((p) => (
            <button key={p.id} onClick={() => setPage({ ...page, paper: p.id })}
              className={cn("rounded-full px-3 py-1", page.paper === p.id ? "bg-accent text-foreground" : "text-muted-foreground")}>{p.label}</button>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-1 text-muted-foreground">
          <button aria-label="Previous page" disabled={idx === 0} onClick={() => setIdx(idx - 1)} className="rounded-full p-1 disabled:opacity-30"><ChevronLeft className="size-4" /></button>
          <span className="tabular-nums">Page {idx + 1} / {pages.length}</span>
          <button aria-label="Next page" disabled={idx >= pages.length - 1} onClick={() => setIdx(idx + 1)} className="rounded-full p-1 disabled:opacity-30"><ChevronRight className="size-4" /></button>
          <button onClick={() => { commit([...pages.slice(0, idx + 1), blank(page.paper), ...pages.slice(idx + 1)]); setIdx(idx + 1); }} className="ml-1 flex items-center gap-1 rounded-full border px-2 py-1 hover:text-foreground"><Plus className="size-3" />Page</button>
          {pages.length > 1 && <button aria-label="Delete page" onClick={() => { commit(pages.filter((_, i) => i !== idx)); setIdx(Math.max(0, idx - 1)); }} className="rounded-full p-1 hover:text-destructive"><Trash2 className="size-3.5" /></button>}
        </div>
      </div>

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); void addImages(Array.from(e.dataTransfer.files)); }}
        className="overflow-hidden rounded-2xl border shadow-2xl"
      >
        <canvas
          ref={canvasRef}
          onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}
          className={cn("block h-auto w-full touch-none", tool === "select" ? "cursor-move" : "cursor-crosshair")}
          style={{ aspectRatio: `${PAGE_W} / ${PAGE_H}` }}
        />
      </div>
      <p className="text-center text-[11px] text-muted-foreground">Paste (Ctrl+V) or drop images onto the page · Saved on this device automatically</p>
    </div>
  );
}
