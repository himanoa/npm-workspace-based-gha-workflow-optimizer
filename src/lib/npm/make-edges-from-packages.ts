import { Package } from "./package";
import { Edge } from "./digraph";

export type MakeEdgesFromPackages = (
  pkgs: ReadonlyArray<Package>,
) => ReadonlyArray<Edge<string>>;

export const makeEdgesFromPackages: MakeEdgesFromPackages = (pkgs) => {
  return pkgs.flatMap(({ name, dependencies }) => {
    return dependencies.map((d) => ({ from: name, to: d }));
  });
};
