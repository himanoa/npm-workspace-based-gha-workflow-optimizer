import { Err, Result } from "ts-results";
import { Package } from "./package";
import { Tree } from "./tree";
import { RootPackage } from "./root-package";

export type InspectDependenciesSuccess = Tree<Package>;

export type InspectDependenciesError = {
  kind: "unknownError";
  error: Error;
};

export type InspectDependencies = (
  searchRootPackageName: string,
  rootPackage: RootPackage,
) => Promise<Result<InspectDependenciesSuccess, InspectDependenciesError>>;

export const inspectDependencies: InspectDependencies = async () => {
  return Err({ kind: "unknownError", error: new Error("unimplemented") });
};
