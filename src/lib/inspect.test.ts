import { describe, it, expect, vi } from "vitest";
import { makeInspect } from "./inspect";
import { Ok } from "ts-results";

describe("inspect", () => {
  describe("if workspace only mode", () => {
    it("called makeDependenciesGraph function", async () => {
      const makeDependenciesGraph = vi.fn();
      const inspect = makeInspect({
        makeDependenciesGraph: makeDependenciesGraph,
        readRootPackage: async () =>
          Ok({
            name: "root",
            workspaces: [],
          }),
      });
      await inspect({ packageName: "foo" });
      expect(makeDependenciesGraph).toBeCalled();
    });

    it("called readRootPackage function", async () => {
      const makeDependenciesGraph = vi.fn();
      const readRootPackage = vi.fn(async () =>
        Ok({
          name: "root",
          workspaces: [],
        }),
      );

      const inspect = makeInspect({
        makeDependenciesGraph: makeDependenciesGraph,
        readRootPackage,
      });
      await inspect({ packageName: "foo" });
      expect(readRootPackage).toBeCalled();
    });
  });
});
