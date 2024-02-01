import { describe, it, expect, vi } from "vitest";
import { makeInspect } from "./inspect";

describe("inspect", () => {
  describe("if workspace only mode", () => {
    it("called inspectDependencies function", () => {
      const inspectDependencies = vi.fn();
      const inspect = makeInspect({
        inspectDependencies,
      });
      inspect({ packageName: "foo" });
      expect(inspectDependencies).toBeCalled();
    });
  });
});
