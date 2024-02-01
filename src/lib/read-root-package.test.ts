import { readRootPackage } from "./read-root-package";
import { describe, it, expect } from "vitest";
import { makeDummyMonorepo } from "./testing/make-dummy-monorepo";

describe("readRootPackage", () => {
  describe("if found filename", () => {
    it("return to RootPackage", async () => {
      const teardown = makeDummyMonorepo()
      const result = await readRootPackage('./tmp/package.json')
      teardown()
      expect(result.val).toStrictEqual({
        name: 'root',
        workspaces: [
          {
            name: '@dummy/a',
            path: './workspaces/a'
          },
          {
            name: '@dummy/b',
            path: './workspaces/b'
          }
        ]
      })
    })
  })
  describe("if not found fileName", () => {
    it("return to notFoundRootPackageJson", async () => {
      const result = await readRootPackage('./invalid')
      expect(result.val).toMatchObject({
        kind: 'notFoundRootPackageJson'
      })
    })
  })
})
