import { describe, expect, it } from "vitest";
import { convertToMap, makeGraph } from "./digraph";

describe("makeGraph", () => {
  it("test", () => {
    expect(makeGraph([{ from: "foo", to: "bar" }])).toMatchInlineSnapshot(`
      {
        "graph": [
          [
            1,
          ],
        ],
        "idToValue": {
          "dataType": "BiMap",
          "value": [
            [
              0,
              "foo",
            ],
            [
              1,
              "bar",
            ],
          ],
        },
      }
    `);

    expect(
      makeGraph([
        { from: "foo", to: "bar" },
        { from: "bar", to: "foo" },
      ]),
    ).toMatchInlineSnapshot(`
      {
        "graph": [
          [],
          [],
          [
            3,
          ],
          [
            2,
          ],
        ],
        "idToValue": {
          "dataType": "BiMap",
          "value": [
            [
              2,
              "bar",
            ],
            [
              3,
              "foo",
            ],
          ],
        },
      }
    `);

    expect(
      makeGraph([
        { from: "foo", to: "bar" },
        { from: "bar", to: "baz" },
        { from: "baz", to: "foo" },
      ]),
    ).toMatchInlineSnapshot(`
      {
        "graph": [
          [],
          [],
          [
            4,
          ],
          [],
          [
            5,
          ],
          [
            2,
          ],
        ],
        "idToValue": {
          "dataType": "BiMap",
          "value": [
            [
              2,
              "bar",
            ],
            [
              4,
              "baz",
            ],
            [
              5,
              "foo",
            ],
          ],
        },
      }
    `);
  });
});

describe("convertToMap", () => {
  it('is return to Map([[0, [1]], [1, [2]], [2, []]])', () => {
    expect(convertToMap([[1], [2], []])).toStrictEqual(new Map([[0, [1]], [1, [2]], [2, []]]))
  })
})
