import { describe, expect, it } from "vitest";
import { convertMermaidDsl, defineEdges, defineLabels } from "./convert-mermaid-dsl";
import { BiMap } from "@rimbu/core";

describe('convertMermaidDsl', () => {
  describe("if graph is empty", () => {
    it("is return to empty string", () => {
      expect(convertMermaidDsl([], BiMap.empty())).toStrictEqual('')
    })
  })

  describe("idToValue length 1", () => {
    it('is return to "graph\n0["xxx"]"', () => {
      expect(convertMermaidDsl([[]], BiMap.of([0, 'yyy']))).toStrictEqual('graph\n0["yyy"]\n')
    })
  })

  it("is return to labeled mermaid graph dsl", () => {
    expect(convertMermaidDsl([[1,2], [2,3], [], []], BiMap.of([0, 'a'], [1, 'b'], [2, 'c'], [3, 'd'])))
    .toStrictEqual('graph\n0["a"]\n1["b"]\n2["c"]\n3["d"]\n0-->1\n0-->2\n1-->2\n1-->3')
  })
})

describe("defineLabels", () => {
  describe('if is empty idToValue', () => {
    it("is return to empty string", () => {
      expect(defineLabels(BiMap.empty())).toStrictEqual('')
    })
  })

  describe('if idToName map length 2 ', () => {
    it('return tu `0["yyy"]\n1["xxx"]\n`', () => {
      expect(defineLabels(BiMap.of([0, 'yyy'], [1, 'xxx']))).toStrictEqual('0["yyy"]\n1["xxx"]')
    })
  })
})


describe("defineEdges", () => {
  describe("if graph is [[1]]", () => {
    it("is return to `0-->1`", () => {
      expect(defineEdges([[1]])).toStrictEqual(`0-->1`)
    })
  })

  describe("if graph is [[1,2]]", () => {
    it("is return to `0-->1\n0-->2\n`", () => {
      expect(defineEdges([[1,2]])).toStrictEqual(`0-->1\n0-->2`)
    })
  })

  describe("if graph is [[1,2], [0,2]]", () => {
    it("is return to `0-->1\n0-->2\n`", () => {
      expect(defineEdges([[1,2], [0,2]])).toStrictEqual(`0-->1\n0-->2\n1-->0\n1-->2`)
    })
  })
})
