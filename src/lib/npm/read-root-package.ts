import mapWorkspaces from "@npmcli/map-workspaces";
import { Err, Ok, Result } from "ts-results";
import { readFile } from "fs/promises";
import { Workspace } from "../dependencies/workspace";
import { RootPackage } from "../dependencies/root-package";

type ReadRootPackageSuccess = RootPackage;

type ReadRootPackageError =
  | {
      kind: "notFoundRootPackageJson";
    }
  | {
      kind: "unknownError";
    };

export type ReadRootPackage = (
  fileName?: string,
) => Promise<Result<ReadRootPackageSuccess, ReadRootPackageError>>;

export const readRootPackage: ReadRootPackage = async (
  fileName = "./package.json",
) => {
  return readFile(fileName, "utf8")
    .then(async (jsonBody) => {
      const rootPackage = JSON.parse(jsonBody);
      const workspacesMap = await mapWorkspaces({
        cwd: ".",
        pkg: rootPackage,
      });
      const workspaces = Array.from(workspacesMap.entries()).map<Workspace>(
        ([name, path]) => {
          return { name, relativePath: path };
        },
      );
      return Ok({
        name: rootPackage.name,
        workspaces,
      });
    })
    .catch((err) => {
      if (err.code === "ENOENT") {
        return Err({ kind: "notFoundRootPackageJson" } as const);
      }
      return Err({ kind: "unknownError" } as const);
    });
};
