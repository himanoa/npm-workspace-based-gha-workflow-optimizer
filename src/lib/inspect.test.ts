import { describe, it, expect, vi } from "vitest";
import { makeInspect } from "./inspect";
import { Ok } from "ts-results";
import { BiMap } from "@rimbu/core";

describe("inspect", () => {
  describe("if workspace only mode", () => {
    it("called makeDependenciesGraph function", async () => {
      const makeDependenciesGraph = vi.fn(async () =>
        Ok({ graph: [], idToValue: BiMap.empty<number, string>() }),
      );
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
      const makeDependenciesGraph = vi.fn(async () =>
        Ok({ graph: [], idToValue: BiMap.empty<number, string>() }),
      );
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
