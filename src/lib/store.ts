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
  videoUrl?: string;
  notes?: string;
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

export function setState(fn: (s: AppState) => AppState) {
  load();
  state = fn(state);
  localStorage.setItem(KEY, JSON.stringify(state));
  listeners.forEach((l) => l());
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
  toggleUnit: (id: string) =>
    setState((s) => ({ ...s, done: { ...s.done, [id]: !s.done[id] } })),
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
