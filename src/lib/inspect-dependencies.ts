import { Err, Result } from "ts-results";
import { Package } from "./package";
import { Tree } from "./tree";

export type InspectDependenciesSuccess = Tree<Package>;

export type InspectDependenciesError = {
  kind: "unknownError";
  error: Error;
};

export type InspectDependencies = (
  searchRootPackageName: string,
  rootPackage: Package,
) => Result<InspectDependenciesSuccess, InspectDependenciesError>;

export const inspectDependencies: InspectDependencies = () => {
  return Err({ kind: "unknownError", error: new Error("unimplemented") });
};
