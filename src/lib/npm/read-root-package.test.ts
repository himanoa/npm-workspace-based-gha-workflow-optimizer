import { readRootPackage } from "./read-root-package";
import { describe, it, expect } from "vitest";
import { makeDummyMonorepo } from "../testing/make-dummy-monorepo";
import mock from "mock-fs";

mock(makeDummyMonorepo());

describe("readRootPackage", () => {
  describe("if found filename", () => {
    it("return to RootPackage", async () => {
      const result = await readRootPackage();
      expect(result.val).toStrictEqual({
        name: "root",
        workspaces: [
          {
            name: "@dummy/a",
            relativePath: "workspaces/a",
          },
          {
            name: "@dummy/b",
            relativePath: "workspaces/b",
          },
        ],
      });
    });
  });
  describe("if not found fileName", () => {
    it("return to notFoundRootPackageJson", async () => {
      const result = await readRootPackage("./invalid");
      expect(result.val).toMatchObject({
        kind: "notFoundRootPackageJson",
      });
    });
  });
});
