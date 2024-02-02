import { BiMap, HashMultiMapHashValue } from '@rimbu/core'

type Id = number;

type Graph = Id[][];

type Edge<T> = { from: T; to: T };

type MakeGraphResult<T> = {
  graph: Graph;
  idToValue: BiMap<Id, T>;
};

class IncrementalIdGenerator {
  constructor(private id: number = 0) {}

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
    return [fromId, toId] as const
  })

  const groupedEdges = HashMultiMapHashValue.from(labeledEdges)

  const max = groupedEdges.streamKeys().max() || 0

  const graph = range(0, max + 1).map(i => {
    return groupedEdges.getValues(i).toArray()
  })

  return { graph, idToValue }
};
