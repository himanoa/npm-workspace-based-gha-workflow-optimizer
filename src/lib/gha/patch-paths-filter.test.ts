import { describe, it, expect } from "vitest";
import { patchPathsFilter } from "./patch-paths-filter";

describe("patchPathsFilter", () => {
  describe("if push and pull_request exist", () => {
    it("applied paths filter both push and pull_request field", () => {
      expect(
        patchPathsFilter(
          {
            name: "xxx",
            on: ["push", "pull_request"],
            jobs: {},
          },
          ["modules/xxx/*"],
        ),
      ).toStrictEqual({
        name: "xxx",
        on: {
          push: {
            paths: ["modules/xxx/*"],
          },
          pull_request: {
            paths: ["modules/xxx/*"],
          },
        },
        jobs: {},
      });
    });
  });

  describe("if only push field exist", () => {
    it("applied paths filter only push field", () => {
      expect(
        patchPathsFilter(
          {
            name: "xxx",
            on: ["push"],
            jobs: {},
          },
          ["modules/xxx/*"],
        ),
      ).toStrictEqual({
        name: "xxx",
        on: {
          push: {
            paths: ["modules/xxx/*"],
          },
        },
        jobs: {},
      });
    });
  });

  describe("if only pull_request field exist", () => {
    it("applied paths filter only pull_request field", () => {
      expect(
        patchPathsFilter(
          {
            name: "xxx",
            on: ["pull_request"],
            jobs: {},
          },
          ["modules/xxx/*"],
        ),
      ).toStrictEqual({
        name: "xxx",
        on: {
          pull_request: {
            paths: ["modules/xxx/*"],
          },
        },
        jobs: {},
      });
    });
  });
});
