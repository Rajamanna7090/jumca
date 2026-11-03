import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useMemo, useState, type ReactNode } from "react";
import { ArrowUpRight, BookOpen, Check, Flame, Sparkles } from "lucide-react";
import { SEMESTERS, courseProgress, overallStats, type Course, type Semester } from "@/data/syllabus";
import { actions, useAppState } from "@/lib/store";
import { CountUp, KineticText, Ring, toneVar } from "@/components/kinetic";
import { cn } from "@/lib/utils";
import { AccountButton } from "@/components/account-button";
import { BookViewer } from "@/components/book-viewer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "JUMCA — MCA Progress Tracker" },
      { name: "description", content: "Track every unit of the 2-year MCA syllabus, pick electives and study with video and notes side by side." },
      { property: "og:title", content: "JUMCA — MCA Progress Tracker" },
      { property: "og:description", content: "Track every unit of the 2-year MCA syllabus with a premium study workspace." },
    ],
  }),
  component: Dashboard,
});

type Filter = "all" | "gate" | "interview" | "pending";

function Dashboard() {
  const state = useAppState();
  const [semId, setSemId] = useState<Semester["id"]>("s1");
  const [filter, setFilter] = useState<Filter>("all");
  const stats = overallStats(state);
  const sem = SEMESTERS.find((s) => s.id === semId)!;

  const visible = useMemo(() => {
    return sem.courses.filter((c) => {
      if (c.elective && state.electives[c.elective] !== c.id) return false;
      if (filter === "gate" || filter === "interview") return c.tags.includes(filter);
      if (filter === "pending") return courseProgress(c, state.done).pct < 1;
      return true;
    });
  }, [sem, filter, state]);

  return (
    <div className="grain relative min-h-screen overflow-hidden">
      <div className="bg-aura pointer-events-none absolute inset-x-0 top-0 h-[600px]" />
      <div className="relative mx-auto max-w-6xl px-5 pb-24 pt-10 md:px-8">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-display text-sm tracking-tight">
            <span className="grid size-7 place-items-center rounded-full bg-primary text-primary-foreground">
              <Sparkles className="size-3.5" />
            </span>
            JUMCA
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden font-mono text-xs text-muted-foreground sm:inline">JU · MCA 2-Year</span>
            <Link to="/pyq" className="rounded-full border border-border px-3 py-1.5 text-xs transition hover:border-primary hover:text-primary">PYQs</Link>
            <AccountButton />
          </div>
        </header>

        <section className="mt-16 md:mt-24">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">Your syllabus, in motion</p>
          <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.02] tracking-tight md:text-7xl">
            <KineticText text="Master every unit." />
            <br />
            <KineticText text="Ship your degree." className="text-muted-foreground" delay={0.3} />
          </h1>

          <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">
            <Stat label="Complete" value={<CountUp value={stats.pct * 100} suffix="%" />} />
            <Stat label="Lectures done" value={<><CountUp value={stats.completed} /><span className="text-muted-foreground">/{stats.total}</span></>} />
            <Stat label="Credits earned" value={<><CountUp value={stats.credits} /><span className="text-muted-foreground">/{stats.totalCredits}</span></>} />
            <Stat label="Units ticked" value={<CountUp value={Object.values(state.done).filter(Boolean).length} />} />
          </div>
        </section>

        <LayoutGroup>
          <nav className="glass sticky top-4 z-20 mt-14 flex gap-1 overflow-x-auto rounded-full p-1.5">
            {SEMESTERS.map((s) => (
              <button
                key={s.id}
                onClick={() => setSemId(s.id)}
                className="relative shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors"
              >
                {semId === s.id && (
                  <motion.span layoutId="sem-pill" className="absolute inset-0 rounded-full bg-accent" transition={{ type: "spring", stiffness: 400, damping: 34 }} />
                )}
                <span className={cn("relative flex items-center gap-2", semId === s.id ? "text-foreground" : "text-muted-foreground")}>
                  <span className="size-1.5 rounded-full" style={{ background: toneVar(s.tone) }} />
                  {s.short}
                </span>
              </button>
            ))}
          </nav>
        </LayoutGroup>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-2xl tracking-tight">{sem.label}</h2>
          <div className="flex flex-wrap gap-2">
            {(["all", "gate", "interview", "pending"] as Filter[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "rounded-full border px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-all",
                  filter === f ? "border-primary bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {f === "gate" ? "GATE" : f}
              </button>
            ))}
          </div>
        </div>

        {sem.id === "s3" && <ElectivePicker />}

        <motion.div layout className="mt-6 grid gap-4 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {visible.map((c, i) => (
              <CourseCard key={c.id} course={c} tone={sem.tone} index={i} />
            ))}
          </AnimatePresence>
          {visible.length === 0 && <p className="text-sm text-muted-foreground">Nothing here for this filter.</p>}
        </motion.div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="glass rounded-2xl p-5">
      <div className="font-display text-3xl tracking-tight md:text-4xl">{value}</div>
      <div className="mt-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}

function ElectivePicker() {
  const state = useAppState();
  const sem = SEMESTERS.find((s) => s.id === "s3")!;
  return (
    <div className="mt-6 grid gap-3 md:grid-cols-3">
      {(["I", "II", "III"] as const).map((b) => (
        <div key={b} className="glass rounded-2xl p-4">
          <div className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">Elective {b} · pick one</div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {sem.courses.filter((c) => c.elective === b).map((c) => {
              const on = state.electives[b] === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => actions.setElective(b, c.id)}
                  className={cn(
                    "rounded-full border px-2.5 py-1 text-xs transition-all",
                    on ? "border-sem-3 bg-sem-3 text-primary-foreground" : "text-muted-foreground hover:border-sem-3 hover:text-foreground",
                  )}
                >
                  {c.title}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function CourseCard({ course, tone, index }: { course: Course; tone: string; index: number }) {
  const state = useAppState();
  const [open, setOpen] = useState(false);
  const [book, setBook] = useState<string | null>(null);
  const p = courseProgress(course, state.done);
  const color = toneVar(tone);
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
      className="glass group relative overflow-hidden rounded-3xl p-5 transition-shadow hover:shadow-glow"
    >
      <div className="flex items-start gap-4">
        <div className="relative grid place-items-center">
          <Ring pct={p.pct} color={color} />
          <span className="absolute font-mono text-[11px]">{Math.round(p.pct * 100)}</span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-mono text-[11px] text-muted-foreground">{course.code} · {course.credits} cr</div>
          <h3 className="mt-1 font-display text-lg leading-tight tracking-tight">{course.title}</h3>
          <div className="mt-2 flex gap-1.5">
            {course.tags.map((t) => (
              <span key={t} className="flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 font-mono text-[10px] uppercase text-muted-foreground">
                {t === "gate" && <Flame className="size-3" style={{ color }} />}
                {t === "gate" ? "GATE" : "Interview"}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 flex gap-2">
        <button onClick={() => setOpen((o) => !o)} className="flex-1 rounded-full border px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
          {open ? "Hide units" : `${course.units.length} units · ${p.total}L`}
        </button>
        <Link
          to="/study/$courseId"
          params={{ courseId: course.id }}
          className="flex items-center gap-1 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03]"
        >
          Study <ArrowUpRight className="size-4" />
        </Link>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <ul className="mt-4 space-y-1">
              {course.units.map((unit) => (
                <UnitRow key={unit.id} id={unit.id} title={unit.title} lectures={unit.lectures} color={color} />
              ))}
            </ul>
            {course.books.length > 0 && (
              <div className="mt-4 border-t pt-4">
                <div className="mb-2 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  <BookOpen className="size-3" /> Books
                </div>
                {course.books.map((b) => (
                  <button key={b} onClick={() => setBook(b)} className="block py-0.5 text-left text-xs text-muted-foreground underline-offset-2 hover:text-foreground hover:underline">
                    {b}
                  </button>
                ))}
                <BookViewer book={book} onClose={() => setBook(null)} />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

export function UnitRow({ id, title, lectures, color }: { id: string; title: string; lectures: number; color: string }) {
  const state = useAppState();
  const done = !!state.done[id];
  return (
    <li>
      <button onClick={() => actions.toggleUnit(id)} className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition-colors hover:bg-accent">
        <motion.span
          animate={{ scale: done ? [1, 1.25, 1] : 1, backgroundColor: done ? color : "rgba(0,0,0,0)" }}
          transition={{ duration: 0.35 }}
          className="grid size-5 shrink-0 place-items-center rounded-md border"
          style={{ borderColor: done ? color : undefined }}
        >
          {done && <Check className="size-3.5 text-primary-foreground" strokeWidth={3} />}
        </motion.span>
        <span className={cn("flex-1 text-sm transition-colors", done && "text-muted-foreground line-through")}>{title}</span>
        <span className="font-mono text-[11px] text-muted-foreground">{lectures}L</span>
      </button>
    </li>
  );
}
