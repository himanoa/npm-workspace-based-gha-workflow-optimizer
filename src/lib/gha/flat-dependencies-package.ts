import { BiMap } from "@rimbu/core"
import { Graph, Id, makeDigraphWalker } from "../graph/digraph"

export type FlatDependenciesPackage = {
  kind: 'flatDependenciesPackage'
  name: string,
  dependencies: string[]
}

export const buildFromDependencyGraph = (graph: Graph, rootId: Id, idToValue: BiMap<number, string>): FlatDependenciesPackage => {
  const dependencies = Array.from(makeDigraphWalker(rootId, graph)).map(i => idToValue.getValue(i) || '')
  return {
    kind: 'flatDependenciesPackage',
    name: idToValue.getValue(rootId) || '',
    dependencies
  }
}
