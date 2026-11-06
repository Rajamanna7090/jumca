import { describe, expect, it, beforeEach } from "vitest";
import { courseProgress, findCourse, subId } from "@/data/syllabus";
import { actions, getState, resetState } from "@/lib/store";

const course = findCourse("121a")!;
const unit = course.units.find((u) => u.subtopics.length >= 2)!;
const n = unit.subtopics.length;

describe("subtopic tracking", () => {
  beforeEach(() => resetState());

  it("ticking every subtopic completes the unit", () => {
    for (let i = 0; i < n; i++) actions.toggleSub(unit.id, i, n);
    expect(getState().done[unit.id]).toBe(true);
  });

  it("unticking one subtopic un-completes the unit", () => {
    actions.toggleUnit(unit.id, n);
    actions.toggleSub(unit.id, 0, n);
    expect(getState().done[unit.id]).toBe(false);
    expect(getState().done[subId(unit.id, 1)]).toBe(true);
  });

  it("ticking a unit ticks all its subtopics", () => {
    actions.toggleUnit(unit.id, n);
    for (let i = 0; i < n; i++) expect(getState().done[subId(unit.id, i)]).toBe(true);
  });

  it("half the subtopics counts as half the unit's lectures", () => {
    const done: Record<string, boolean> = {};
    for (let i = 0; i < n; i++) if (i < n / 2) done[subId(unit.id, i)] = true;
    const expected = unit.lectures * (Math.ceil(n / 2) / n);
    expect(courseProgress(course, done).completed).toBeCloseTo(expected, 1);
  });
});
