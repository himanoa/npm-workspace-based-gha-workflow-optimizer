import { BiMap } from "@rimbu/core";
import { Graph, Id } from "./digraph";

export const convertMermaidDsl = (
  graph: Graph,
  idToName: BiMap<Id, string>
): string => {
  if(graph.length === 0) {
    return ''
  }

  return `graph\n${defineLabels(idToName)}\n${defineEdges(graph)}`
}

export const defineLabels = (
  idToName: BiMap<Id, string>
): string => {
  return idToName.toArray().map(([key, value]) => {
    return `${key}["${value}"]`
  }).join('\n')
}

export const defineEdges = (
  graph: Graph
): string => {
  return graph.map((points, from) => {
    return points.map(to => `${from}-->${to}`)
  }).flat().join('\n')
}
