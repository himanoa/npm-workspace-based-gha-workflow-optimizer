import { Result } from "ts-results";
import { RootPackage } from "./root-package";
import { join } from "path";
import { ReadPackageJson } from "../npm/read-package-json";
import { GraphAndIdValueMap, makeGraph } from "../graph/digraph";
import { makeEdgesFromPackages } from "../npm/make-edges-from-packages";

export type MakeDependenciesGraphSuccess = GraphAndIdValueMap<string>;

export type MakeDependenciesGraphError = {
  kind: "unknownError";
  error: Error;
};

export type MakeDependenciesGraph = (
  rootPackage: RootPackage,
) => Promise<Result<MakeDependenciesGraphSuccess, MakeDependenciesGraphError>>;

type Dependencies = {
  readPackageJson: ReadPackageJson;
};

export const makeDependenciesGraph: (
  deps: Dependencies,
) => MakeDependenciesGraph = (deps) => async (rootPackage) => {
  const packagesResult = Result.all(
    ...(await Promise.all(
      rootPackage.workspaces.map(({ relativePath }) =>
        deps.readPackageJson(rootPackage, join(relativePath, "package.json")),
      ),
    )),
  );
  const edgesResult = packagesResult.map(makeEdgesFromPackages);
  const graphResult = edgesResult.map((e) => makeGraph([...e]));
  return graphResult.mapErr((e) => ({
    kind: "unknownError",
    error: new Error(e.kind),
  }));
};
