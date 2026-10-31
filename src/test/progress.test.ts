import { describe, expect, it } from "vitest";
import { activeCourses, overallStats, findCourse } from "@/data/syllabus";

describe("progress rules", () => {
  it("counts only the chosen elective per basket", () => {
    const ids = activeCourses({ I: "214b" }).map((c) => c.id);
    expect(ids).toContain("214b");
    expect(ids).not.toContain("214a");
    expect(ids).not.toContain("215a");
  });
  it("awards course credits only when every unit is done", () => {
    const c = findCourse("111a")!;
    const half = Object.fromEntries(c.units.slice(1).map((u) => [u.id, true]));
    expect(overallStats({ done: half, electives: {} }).credits).toBe(0);
    const all = Object.fromEntries(c.units.map((u) => [u.id, true]));
    expect(overallStats({ done: all, electives: {} }).credits).toBe(4);
  });
});
