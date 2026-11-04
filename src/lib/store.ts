import { useSyncExternalStore } from "react";
import type { ProgressState } from "@/data/syllabus";

export interface Bookmark {
  id: string;
  t: number;
  text: string;
}
export interface Material {
  id: string;
  title: string;
  url: string;
}
export interface CourseSpace {
  videoUrl?: string | undefined;
  notes?: string | undefined;
  bookmarks?: Bookmark[];
  materials?: Material[];
}

export interface AppState extends ProgressState {
  spaces: Record<string, CourseSpace>;
}

const KEY = "mca-orbit-v1";
const EMPTY: AppState = { done: {}, electives: {}, spaces: {} };

let state: AppState = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) state = { ...EMPTY, ...JSON.parse(raw) };
  } catch {
    /* ignore */
  }
}

export function setState(fn: (s: AppState) => AppState, opts: { sync?: boolean } = {}) {
  load();
  state = fn(state);
  localStorage.setItem(KEY, JSON.stringify(state));
  listeners.forEach((l) => l());
  if (opts.sync !== false) scheduleSync?.();
}

let scheduleSync: (() => void) | null = null;
export function registerSync(fn: (() => void) | null) {
  scheduleSync = fn;
}
export function getState() {
  load();
  return state;
}

/** Merge guest + cloud progress so nothing completed is lost. */
export function mergeStates(local: AppState, cloud: Partial<AppState>): AppState {
  const done: Record<string, boolean> = { ...(cloud.done ?? {}) };
  for (const [k, v] of Object.entries(local.done)) if (v) done[k] = true;
  const spaces: Record<string, CourseSpace> = { ...local.spaces };
  for (const [k, c] of Object.entries(cloud.spaces ?? {})) {
    const l = spaces[k] ?? {};
    const byId = <T extends { id: string }>(a: T[] = [], b: T[] = []) =>
      [...new Map([...a, ...b].map((x) => [x.id, x])).values()];
    spaces[k] = {
      ...l,
      ...c,
      notes: c.notes || l.notes,
      videoUrl: c.videoUrl || l.videoUrl,
      bookmarks: byId(l.bookmarks, c.bookmarks),
      materials: byId(l.materials, c.materials),
    };
  }
  return { done, electives: { ...local.electives, ...(cloud.electives ?? {}) }, spaces };
}

export function resetState() {
  setState(() => EMPTY, { sync: false });
}

function subscribe(l: () => void) {
  load();
  listeners.add(l);
  queueMicrotask(l);
  return () => listeners.delete(l);
}

export function useAppState() {
  return useSyncExternalStore(subscribe, () => state, () => EMPTY);
}

export const actions = {
  /** Ticking a unit ticks/unticks all its subtopics too. */
  toggleUnit: (id: string, subCount = 0) =>
    setState((s) => {
      const v = !s.done[id];
      const done = { ...s.done, [id]: v };
      for (let i = 0; i < subCount; i++) done[`${id}-s${i}`] = v;
      return { ...s, done };
    }),
  /** Ticking a subtopic; unit becomes done when all subtopics are done. */
  toggleSub: (unitId: string, i: number, subCount: number) =>
    setState((s) => {
      const done = { ...s.done };
      // If unit was fully ticked (legacy), expand into subtopics first.
      if (done[unitId]) for (let j = 0; j < subCount; j++) done[`${unitId}-s${j}`] = true;
      const k = `${unitId}-s${i}`;
      done[k] = !done[k];
      let all = true;
      for (let j = 0; j < subCount; j++) if (!done[`${unitId}-s${j}`]) all = false;
      done[unitId] = all;
      return { ...s, done };
    }),
  setElective: (basket: "I" | "II" | "III", id: string) =>
    setState((s) => ({ ...s, electives: { ...s.electives, [basket]: id } })),
  updateSpace: (courseId: string, patch: Partial<CourseSpace>) =>
    setState((s) => ({
      ...s,
      spaces: { ...s.spaces, [courseId]: { ...s.spaces[courseId], ...patch } },
    })),
};

export function youtubeId(url: string): string | null {
  const m = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
  return m?.[1] ? m[1] : /^[\w-]{11}$/.test(url) ? url : null;
}

export function fmtTime(sec: number) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}
