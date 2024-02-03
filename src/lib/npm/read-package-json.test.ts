import { describe, it, expect } from "vitest";
import mockfs from "mock-fs";
import { makeDummyMonorepo } from "../testing/make-dummy-monorepo";
import { readRootPackage } from "./read-root-package";
import { readPackageJson } from "./read-package-json";

mockfs(makeDummyMonorepo());

describe("#readPackageJson", () => {
  describe("if success read file", () => {
    it("return to package", async () => {
      const root = (await readRootPackage("./package.json")).unwrap();
      const pkg = await readPackageJson(root, "./workspaces/a/package.json");

      expect(pkg.val).toStrictEqual({
        name: "@dummy/a",
        dependencies: [],
      });
    });
  });

  describe("if failed read file", () => {
    it("return to notFoundPackageError", async () => {
      const root = (await readRootPackage("./package.json")).unwrap();
      const pkg = await readPackageJson(
        root,
        "./workspaces/invalid/package.json",
      );

      expect(pkg.val).toStrictEqual({ kind: "notFoundPackageError" });
    });
  });
});
