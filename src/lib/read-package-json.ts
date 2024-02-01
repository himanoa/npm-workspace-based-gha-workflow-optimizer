import { Package } from "./package";
import { Err, Result } from "ts-results";
import { RootPackage } from "./root-packaget";

type ReadPackageJsonSuccess = Package;

type ReadPackageJsonError =
  | {
      kind: "notFoundInWorkspaces";
    }
  | {
      kind: "unknownError";
      error: Error;
    };

export type ReadPackageJson = (
  root: RootPackage,
  name: string,
) => Result<ReadPackageJsonSuccess, ReadPackageJsonError>;

export const readPackageJson: ReadPackageJson = () => {
  return Err({ kind: "unknownError", error: new Error("unimplemented") });
};
