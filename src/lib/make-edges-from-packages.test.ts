import { describe, it, expect } from "vitest";
import { Package } from "./package";
import { makeEdgesFromPackages } from "./make-edges-from-packages";

describe("makeEdgesFromPackages", () => {
  it("return to edges", () => {
    const p1: Package = { name: "p1", dependencies: [] };
    const p2: Package = { name: "p2", dependencies: ["p1"] };
    const p3: Package = { name: "p3", dependencies: ["p1"] };

    expect(makeEdgesFromPackages([p1, p2, p3])).toStrictEqual([
      { from: "p2", to: "p1" },
      { from: "p3", to: "p1" },
    ]);
  });
});
