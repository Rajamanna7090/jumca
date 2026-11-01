import { describe, it, expect } from "vitest";
import { mergeStates } from "@/lib/store";

describe("mergeStates", () => {
  it("keeps units completed on either device", () => {
    const m = mergeStates({ done: { a: true }, electives: {}, spaces: {} }, { done: { b: true } });
    expect(m.done).toEqual({ a: true, b: true });
  });
  it("never unmarks a locally completed unit", () => {
    const m = mergeStates({ done: { a: true }, electives: {}, spaces: {} }, { done: { a: false } });
    expect(m.done['a']).toBe(true);
  });
});
