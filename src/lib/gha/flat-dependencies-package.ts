import { Graph, Id } from "../graph/digraph"

export type FlatDependenciesPackage = {
  kind: 'flatDependenciesPackage'
  name: string,
  dependencies: string[]
}

export const buildFromDependencyGraph = (graph: Graph, rootId: Id) => {
  throw new Error()
}
