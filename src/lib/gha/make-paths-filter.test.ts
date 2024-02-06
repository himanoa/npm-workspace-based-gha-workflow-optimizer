import { describe, it, expect } from "vitest";
import { RootPackage } from "../dependencies/root-package";
import { makePathsFilter } from "./make-paths-filter";
import { BiMap } from "@rimbu/core";

describe("makePathsFilter", () => {
  it('return to ["foo/**", "bar/**", "baz/**"]', () => {
    const rootPackage: RootPackage = {
      name: "dummy",
      workspaces: [
        {
          name: "foo",
          relativePath: "./foo",
        },
        {
          name: "bar",
          relativePath: "./bar",
        },
        {
          name: "baz",
          relativePath: "./baz",
        },
      ],
    };

    expect(
      makePathsFilter(
        [[1], [2], [3], []],
        0,
        rootPackage,
        BiMap.of([0, "foo"], [1, "bar"], [2, "baz"]),
      ),
    ).toStrictEqual(["foo/**", "bar/**", "baz/**"]);
  });
});
