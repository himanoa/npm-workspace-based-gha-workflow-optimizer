import { IPackageJson } from "package-json-type";
import { describe, expect, it } from "vitest";
import { mergeDeps } from "./merge-deps";

describe("mergeDeps", () => {
  it("return to ['a', 'b', 'c', 'd', 'e']", () => {
    const pkg: IPackageJson = {
      optionalDependencies: { a: "*" },
      devDependencies: { b: "*" },
      dependencies: { c: "*" },
      peerDependencies: { d: "*" },
      bundledDependencies: ["e"],
    };

    expect(mergeDeps(pkg)).toStrictEqual(["a", "b", "c", "d", "e"]);
  });

  describe("if devDependencies field missing", () => {
    it("return to ['a', 'c', 'd', 'e']", () => {
      const pkg: IPackageJson = {
        optionalDependencies: { a: "*" },
        dependencies: { c: "*" },
        peerDependencies: { d: "*" },
        bundledDependencies: ["e"],
      };

      expect(mergeDeps(pkg)).toStrictEqual(["a", "c", "d", "e"]);
    });
  });
});
