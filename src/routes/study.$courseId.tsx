import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Bookmark, Link2, ListChecks, NotebookPen, Plus, Search, Trash2, Youtube } from "lucide-react";
import { findCourse, courseProgress } from "@/data/syllabus";
import { actions, fmtTime, useAppState, youtubeId } from "@/lib/store";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { useIsMobile } from "@/hooks/use-mobile";
import { Ring, toneVar } from "@/components/kinetic";
import { UnitRow } from "./index";
import { cn } from "@/lib/utils";
import { LectureExplorer } from "@/components/lecture-explorer";

export const Route = createFileRoute("/study/$courseId")({
  loader: ({ params }) => {
    const course = findCourse(params.courseId);
    if (!course) throw notFound();
    return { id: course.id, title: course.title };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "Study"} — Orbit Workspace` },
      { name: "description", content: `Study ${loaderData?.title ?? "your course"} with lectures, notes and timestamps side by side.` },
      { property: "og:title", content: `${loaderData?.title ?? "Study"} — Orbit Workspace` },
      { property: "og:description", content: "Video, notes and syllabus checklist in one workspace." },
    ],
  }),
  component: StudyPage,
});

type YTPlayer = { getCurrentTime(): number; seekTo(s: number, a: boolean): void; destroy(): void };
declare global {
  interface Window {
    YT?: { Player: new (el: HTMLElement, opts: object) => YTPlayer };
    onYouTubeIframeAPIReady?: () => void;
  }
}

function loadYT(): Promise<void> {
  if (window.YT?.Player) return Promise.resolve();
  return new Promise((res) => {
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      res();
    };
    if (!document.getElementById("yt-api")) {
      const s = document.createElement("script");
      s.id = "yt-api";
      s.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(s);
    }
  });
}

function StudyPage() {
  const { id } = Route.useLoaderData();
  const course = findCourse(id)!;
  const state = useAppState();
  const isMobile = useIsMobile();
  const space = state.spaces[id] ?? {};
  const playerRef = useRef<YTPlayer | null>(null);
  const color = toneVar(course.semester.tone);
  const p = courseProgress(course, state.done);

  const video = <VideoPane courseId={id} title={course.title} units={course.units.map((u: any) => u.title ?? u.name ?? "")} videoUrl={space.videoUrl} playerRef={playerRef} />;
  const side = <SidePane courseId={id} color={color} playerRef={playerRef} />;

  return (
    <div className="flex h-dvh flex-col">
      <header className="flex items-center gap-3 border-b px-4 py-3">
        <Link to="/" className="grid size-9 place-items-center rounded-full border text-muted-foreground transition-colors hover:text-foreground" aria-label="Back">
          <ArrowLeft className="size-4" />
        </Link>
        <div className="min-w-0 flex-1">
          <div className="font-mono text-[11px] text-muted-foreground">{course.code}</div>
          <h1 className="truncate font-display text-base tracking-tight">{course.title}</h1>
        </div>
        <div className="relative grid place-items-center">
          <Ring pct={p.pct} size={40} stroke={3} color={color} />
          <span className="absolute font-mono text-[10px]">{Math.round(p.pct * 100)}</span>
        </div>
      </header>
      {isMobile ? (
        <div className="flex min-h-0 flex-1 flex-col">
          <div className="sticky top-0 z-10 shrink-0">{video}</div>
          <div className="min-h-0 flex-1">{side}</div>
        </div>
      ) : (
        <ResizablePanelGroup orientation="horizontal" className="min-h-0 flex-1">
          <ResizablePanel defaultSize="58%" minSize="30%">{video}</ResizablePanel>
          <ResizableHandle withHandle className="bg-border hover:bg-primary" />
          <ResizablePanel defaultSize="42%" minSize="25%">{side}</ResizablePanel>
        </ResizablePanelGroup>
      )}
    </div>
  );
}

function VideoPane({ courseId, title, units, videoUrl, playerRef }: { courseId: string; title: string; units: string[]; videoUrl?: string | undefined; playerRef: React.MutableRefObject<YTPlayer | null> }) {
  const [input, setInput] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const host = useRef<HTMLDivElement>(null);
  const vid = videoUrl ? youtubeId(videoUrl) : null;

  useEffect(() => {
    if (!vid || !host.current) return;
    let cancelled = false;
    const el = document.createElement("div");
    host.current.innerHTML = "";
    host.current.appendChild(el);
    loadYT().then(() => {
      if (cancelled || !window.YT) return;
      playerRef.current = new window.YT.Player(el, {
        videoId: vid,
        width: "100%",
        height: "100%",
        playerVars: { rel: 0, modestbranding: 1 },
      });
    });
    return () => {
      cancelled = true;
      playerRef.current?.destroy?.();
      playerRef.current = null;
    };
  }, [vid, playerRef]);

  const submit = () => {
    if (youtubeId(input.trim())) {
      actions.updateSpace(courseId, { videoUrl: input.trim() });
      setInput("");
    }
  };

  return (
    <div className="flex h-full flex-col bg-background p-3">
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl border bg-card md:aspect-auto md:flex-1">
        {vid ? (
          <div ref={host} className="absolute inset-0 [&_iframe]:size-full" />
        ) : (
          <div className="bg-aura absolute inset-0 grid place-items-center p-6 text-center">
            <div>
              <Youtube className="mx-auto size-10 text-primary" />
              <p className="mt-3 font-display text-lg">Add a lecture</p>
              <p className="mt-1 text-sm text-muted-foreground">Paste a YouTube link below to study side by side.</p>
            </div>
          </div>
        )}
        <AnimatePresence>
          {searchOpen && (
            <LectureExplorer
              topics={[title, ...units.filter(Boolean)]}
              onPick={(id) => { actions.updateSpace(courseId, { videoUrl: `https://www.youtube.com/watch?v=${id}` }); setSearchOpen(false); }}
              onClose={() => setSearchOpen(false)}
            />
          )}
        </AnimatePresence>
      </div>
      <div className="mt-3 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="Paste YouTube URL…"
          className="min-w-0 flex-1 rounded-full border bg-card px-4 py-2 text-sm outline-none focus:border-primary"
        />
        <button onClick={submit} className="rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground">Load</button>
        <button
          onClick={() => setSearchOpen((o) => !o)}
          className={cn("grid size-9 shrink-0 place-items-center rounded-full border text-muted-foreground hover:text-foreground", searchOpen && "border-primary text-primary")}
          aria-label="Find lectures"
        >
          <Search className="size-4" />
        </button>
      </div>
    </div>
  );
}

const TABS = [
  { id: "units", label: "Units", icon: ListChecks },
  { id: "notes", label: "Notes", icon: NotebookPen },
  { id: "marks", label: "Timestamps", icon: Bookmark },
  { id: "files", label: "Materials", icon: Link2 },
] as const;

function SidePane({ courseId, color, playerRef }: { courseId: string; color: string; playerRef: React.MutableRefObject<YTPlayer | null> }) {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("units");
  const course = findCourse(courseId)!;
  return (
    <div className="flex h-full flex-col">
      <div className="flex gap-1 border-b p-2">
        {TABS.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} className="relative flex flex-1 items-center justify-center gap-1.5 rounded-full px-2 py-2 text-xs font-medium">
            {tab === t.id && <motion.span layoutId="side-tab" className="absolute inset-0 rounded-full bg-accent" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
            <t.icon className={cn("relative size-3.5", tab === t.id ? "text-primary" : "text-muted-foreground")} />
            <span className={cn("relative hidden sm:inline", tab === t.id ? "text-foreground" : "text-muted-foreground")}>{t.label}</span>
          </button>
        ))}
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}>
            {tab === "units" && (
              <ul className="space-y-1">
                {course.units.map((u) => <UnitRow key={u.id} {...u} color={color} />)}
              </ul>
            )}
            {tab === "notes" && <Notes courseId={courseId} />}
            {tab === "marks" && <Marks courseId={courseId} playerRef={playerRef} />}
            {tab === "files" && <Materials courseId={courseId} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function Notes({ courseId }: { courseId: string }) {
  const state = useAppState();
  return (
    <textarea
      value={state.spaces[courseId]?.notes ?? ""}
      onChange={(e) => actions.updateSpace(courseId, { notes: e.target.value })}
      placeholder="Write your notes… saved automatically."
      className="min-h-[60vh] w-full resize-none rounded-2xl border bg-card p-4 text-sm leading-relaxed outline-none focus:border-primary"
    />
  );
}

function Marks({ courseId, playerRef }: { courseId: string; playerRef: React.MutableRefObject<YTPlayer | null> }) {
  const state = useAppState();
  const [text, setText] = useState("");
  const marks = state.spaces[courseId]?.bookmarks ?? [];
  const add = () => {
    const t = playerRef.current?.getCurrentTime?.() ?? 0;
    actions.updateSpace(courseId, { bookmarks: [...marks, { id: crypto.randomUUID(), t, text: text || "Bookmark" }].sort((a, b) => a.t - b.t) });
    setText("");
  };
  return (
    <div>
      <div className="flex gap-2">
        <input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && add()} placeholder="Note at current time…" className="min-w-0 flex-1 rounded-full border bg-card px-4 py-2 text-sm outline-none focus:border-primary" />
        <button onClick={add} className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground" aria-label="Add timestamp"><Plus className="size-4" /></button>
      </div>
      <ul className="mt-4 space-y-1">
        {marks.map((m) => (
          <li key={m.id} className="group flex items-center gap-3 rounded-xl px-2 py-2 hover:bg-accent">
            <button onClick={() => playerRef.current?.seekTo(m.t, true)} className="rounded-full bg-accent px-2 py-0.5 font-mono text-[11px] text-primary">{fmtTime(m.t)}</button>
            <span className="flex-1 text-sm">{m.text}</span>
            <button onClick={() => actions.updateSpace(courseId, { bookmarks: marks.filter((x) => x.id !== m.id) })} className="opacity-0 group-hover:opacity-100" aria-label="Delete"><Trash2 className="size-3.5 text-muted-foreground" /></button>
          </li>
        ))}
        {marks.length === 0 && <p className="text-sm text-muted-foreground">Load a video, then save moments you want to revisit.</p>}
      </ul>
    </div>
  );
}

function Materials({ courseId }: { courseId: string }) {
  const state = useAppState();
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const list = state.spaces[courseId]?.materials ?? [];
  const add = () => {
    if (!/^https?:\/\//.test(url)) return;
    actions.updateSpace(courseId, { materials: [...list, { id: crypto.randomUUID(), title: title || url, url }] });
    setTitle("");
    setUrl("");
  };
  return (
    <div>
      <div className="space-y-2">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title (e.g. Unit 3 slides)" className="w-full rounded-full border bg-card px-4 py-2 text-sm outline-none focus:border-primary" />
        <div className="flex gap-2">
          <input value={url} onChange={(e) => setUrl(e.target.value)} onKeyDown={(e) => e.key === "Enter" && add()} placeholder="https://drive.google.com/…" className="min-w-0 flex-1 rounded-full border bg-card px-4 py-2 text-sm outline-none focus:border-primary" />
          <button onClick={add} className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground" aria-label="Add material"><Plus className="size-4" /></button>
        </div>
      </div>
      <ul className="mt-4 space-y-1">
        {list.map((m) => (
          <li key={m.id} className="group flex items-center gap-3 rounded-xl px-2 py-2 hover:bg-accent">
            <Link2 className="size-4 text-primary" />
            <a href={m.url} target="_blank" rel="noreferrer" className="flex-1 truncate text-sm hover:underline">{m.title}</a>
            <button onClick={() => actions.updateSpace(courseId, { materials: list.filter((x) => x.id !== m.id) })} className="opacity-0 group-hover:opacity-100" aria-label="Delete"><Trash2 className="size-3.5 text-muted-foreground" /></button>
          </li>
        ))}
        {list.length === 0 && <p className="text-sm text-muted-foreground">Save Drive folders, PDFs and cheat-sheets for this course.</p>}
      </ul>
    </div>
  );
}
