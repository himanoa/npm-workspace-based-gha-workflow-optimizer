import { describe, it, expect, vi } from "vitest";
import { makeInspect } from "./inspect";
import { Ok } from "ts-results";

describe("inspect", () => {
  describe("if workspace only mode", () => {
    it("called inspectDependencies function", async () => {
      const inspectDependencies = vi.fn();
      const inspect = makeInspect({
        inspectDependencies,
        readRootPackage: async () => Ok({
          name: 'root',
          workspaces: []
        })
      });
      await inspect({ packageName: "foo" });
      expect(inspectDependencies).toBeCalled();
    });

    it("called readRootPackage function", async () => {
      const inspectDependencies = vi.fn();
      const readRootPackage = vi.fn(async () => Ok({
        name: 'root',
        workspaces: []
      }));

      const inspect = makeInspect({
        inspectDependencies,
        readRootPackage
      })
      await inspect({ packageName: "foo" });
      expect(readRootPackage).toBeCalled();
    });
  });
});
