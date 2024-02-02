import { describe, it, expect } from "vitest"
import { BijectiveMap } from "./bijective-map"

describe("BijectiveMap", () => {
  describe("#inverse", () => {
    it('return to equal new Map([[1, "foo"]])', () => {
      expect(new BijectiveMap(new Map<string, number>([["foo", 1]])).invert()).toEqual(new Map([[1, "foo"]]))
    })
  })

  describe("#toMap", () => {
    it('return to equal new Map([["foo", 1]])', () => {
      const seed = new Map<string, number>([["foo", 1]])
      expect(new BijectiveMap(seed).toMap()).toEqual(seed)
    })
  })

  describe("#hasKey", () => {
    describe("if key 'foo' is included", () => {
      it('return to true', () => {
        const bijectiveMap = new BijectiveMap(new Map<string, number>([["foo", 1]]))
        expect(bijectiveMap.hasKey("foo")).toEqual(true)
      })
    })
    describe("unless key 'foo' is included", () => {
      it('return to false', () => {
        const bijectiveMap = new BijectiveMap(new Map<string, number>())
        expect(bijectiveMap.hasKey("foo")).toEqual(false)
      })
    })
  })

  describe("#hasValue", () => {
    describe("if value 1 is included", () => {
      it('return to true', () => {
        const bijectiveMap = new BijectiveMap(new Map<string, number>([["foo", 1]]))
        expect(bijectiveMap.hasValue(1)).toEqual(true)
      })
    })
    describe("unless value is included", () => {
      it('return to false', () => {
        const bijectiveMap = new BijectiveMap(new Map<string, number>())
        expect(bijectiveMap.hasValue(1)).toEqual(false)
      })
    })
  })

  describe("#tryInsert", () => {
    describe("if key 'foo' is not found and value 1 is not found", () => {
      it("return to Ok and inserted BijectiveMap", () => {
        const bijectiveMap = new BijectiveMap(new Map<string, number>())
        const result = bijectiveMap.tryInsert("foo", 1)
        expect(result.ok).toBe(true)
        expect((result.val as BijectiveMap<string, number>).hasKey("foo")).toStrictEqual(true)
      })
    })

    describe("if key 'foo' is not found and value 1 is found", () => {
      it("return to Err", () => {
        const bijectiveMap = new BijectiveMap(new Map<string, number>([["dummy", 1]]))
        const result = bijectiveMap.tryInsert("foo", 1)
        expect(result.err).toBe(true)
      })
    })

    describe("if key 'foo' is found and value 1 is not found", () => {
      it("return to Err", () => {
        const bijectiveMap = new BijectiveMap(new Map<string, number>([["foo", 2]]))
        const result = bijectiveMap.tryInsert("foo", 1)
        expect(result.err).toBe(true)
      })
    })
  })

  describe("#[Symbol.iterator]", () => {
    it("return to forwardMap iterator", () => {
      const bijectiveMap = new BijectiveMap(new Map<string, number>([["foo", 2]]))
      expect([...bijectiveMap]).toStrictEqual([["foo", 2]])
    })
  })
})
