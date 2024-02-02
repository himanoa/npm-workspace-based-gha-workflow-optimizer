import { Err, Result } from "ts-results";
import { Package } from "./package";
import { Tree } from "./tree";
import { RootPackage } from "./root-package";
import { ReadPackageJson } from "./read-package-json";

export type InspectDependenciesSuccess = Tree<Package>;

export type InspectDependenciesError = {
  kind: "unknownError";
  error: Error;
};

export type InspectDependencies = (
  rootPackage: RootPackage,
) => Promise<Result<InspectDependenciesSuccess, InspectDependenciesError>>;

type Dependencies = {
  readPackageJson: ReadPackageJson
}

export const buildInspectDependencies: (deps: Dependencies) => InspectDependencies = (deps) => async (rootPackage) => {
  // rootPackage.workspaces.map(({ relativePath }) => deps.readPackageJson(join(relativePath, 'package.json')))
  return Err({ kind: "unknownError", error: new Error("unimplemented") });
};
