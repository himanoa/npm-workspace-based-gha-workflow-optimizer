import { BiMap } from '@rimbu/core'
import groupBy from 'object.groupby'

type Id = number;

type Graph = Id[][];

type Edge<T> = { from: T; to: T };

type MakeGraphResult<T> = {
  graph: Graph;
  idToValue: BiMap<Id, T>;
};

class IncrementalIdGenerator {
  private id: number = 0;
  constructor() {}

  generate(): number {
    return this.id++;
  }
}


const range = (begin: number, end: number) => ([...Array(end - begin)].map((_, i) => (begin + i)));

export const makeGraph = <T>(edges: Edge<T>[]): MakeGraphResult<T> => {
  const idGen = new IncrementalIdGenerator();
  const initialIdToValue = BiMap.empty<Id, T>();

  const idToValue  = edges.reduce((acc, {from, to}) => {
    return acc.set(idGen.generate(), from).set(idGen.generate(), to)
  }, initialIdToValue)

  const labeledEdges = edges.map(({from, to}) => {
    const fromId = idToValue.getKey(from)
    const toId = idToValue.getKey(to)
    if(fromId === undefined || toId === undefined) {
      throw new Error("unreachable")
    }
    return [fromId, toId]
  })

  const groupedEdges = groupBy(labeledEdges, ([fromId]) => fromId)

  const groupedEdgesWithoutFromId = Object.entries(groupedEdges).reduce<Record<string, number[]>>((acc, [key, values]) => ({ ...acc, [key]: values.map(([, to]) => to) }), {})

  const keyNumbers = Object.keys(groupedEdgesWithoutFromId).map((x) => parseInt(x, 10))
  const max = Math.max(...keyNumbers)

  const graph = range(0, max + 1).map(i => {
    if(groupedEdgesWithoutFromId[i.toString()] == undefined) {
      return []
    }
    return groupedEdgesWithoutFromId[i]
  })

  return { graph, idToValue }
};
