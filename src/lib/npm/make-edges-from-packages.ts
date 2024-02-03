import { Package } from "../dependencies/package";
import { Edge } from "../graph/digraph";

export type MakeEdgesFromPackages = (
  pkgs: ReadonlyArray<Package>,
) => ReadonlyArray<Edge<string>>;

export const makeEdgesFromPackages: MakeEdgesFromPackages = (pkgs) => {
  return pkgs.flatMap(({ name, dependencies }) => {
    return dependencies.map((d) => ({ from: name, to: d }));
  });
};
