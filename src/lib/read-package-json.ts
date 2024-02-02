import { Package } from "./package";
import { Ok, Err, Result } from "ts-results";
import { RootPackage } from "./root-package";
import { readFile } from "fs/promises";
import { mergeDeps } from "./merge-deps";

type ReadPackageJsonSuccess = Package;

type ReadPackageJsonError =
  | {
      kind: "notFoundPackageError";
    }
  | {
      kind: "unknownError";
      error: Error;
    };

export type ReadPackageJson = (
  root: RootPackage,
  path: string,
) => Promise<Result<ReadPackageJsonSuccess, ReadPackageJsonError>>;

export const readPackageJson: ReadPackageJson = async (root, path) => {
  const packageJsonRawResult = await readFile(path, "utf8")
    .then((body) => Ok(body))
    .catch(() => Err({ kind: "notFoundPackageError" } as const));

  return packageJsonRawResult.map((packageJsonRaw) => {
    const pkg = JSON.parse(packageJsonRaw);

    const workspacePackageNames = root.workspaces.map((p) => p.name);
    const dependencies = mergeDeps(pkg).filter((d) =>
      workspacePackageNames.includes(d),
    );
    return { name: pkg.name, dependencies };
  });
};
