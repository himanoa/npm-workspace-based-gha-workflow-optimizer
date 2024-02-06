import { BiMap } from "@rimbu/core";
import { RootPackage } from "../dependencies/root-package";
import { Graph, Id } from "../graph/digraph";
import { buildFromDependencyGraph } from "./flat-dependencies-package";
import { join } from "path";

export const makePathsFilter = (
  graph: Graph,
  rootId: Id,
  rootPackage: RootPackage,
  idToValue: BiMap<Id, string>,
): ReadonlyArray<string> => {
  const flatPackage = buildFromDependencyGraph(graph, rootId, idToValue);
  const monorepoMap = new Map(
    rootPackage.workspaces.map(({ name, relativePath }) => [
      name,
      relativePath,
    ]),
  );

  const relativePaths = flatPackage.dependencies
    .map((name) => monorepoMap.get(name))
    .filter((x): x is string => x != undefined);

  return relativePaths.map((p) => join(p, "**"));
};
