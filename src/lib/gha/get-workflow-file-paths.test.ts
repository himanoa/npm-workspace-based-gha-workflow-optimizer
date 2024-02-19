import { describe, it, expect } from "vitest";
import { normalizePackageName } from "./get-workflow-file-paths";

describe("normalizePackageName", () => {
  it("replaced @ to ''", () => {
    expect(normalizePackageName("@foo")).toStrictEqual('foo')
  })

  it("replaced / to '-'", () => {
    expect(normalizePackageName("@foo/bar")).toStrictEqual('foo-bar')
  })
})

