import { defineCommand } from "citty";
import { makeOptimize } from "../lib/optimize";
import { makeDependenciesGraph } from "../lib/dependencies/make-dependencies-graph";
import { readPackageJson } from "../lib/npm/read-package-json";
import { readRootPackage } from "../lib/npm/read-root-package";
import { readFile, writeFile } from "fs/promises";
import { makeApplyPathsFilter } from "../lib/gha/apply-paths-filter";
import { getWorkflowFilePaths } from "../lib/gha/get-workflow-file-paths";

export default defineCommand({
  meta: {
    name: "optimize",
    description: "Apply paths filter to Github actions workflow files",
  },
  run: async () => {
    const optimize = makeOptimize({
      makeDependenciesGraph: makeDependenciesGraph({
        readPackageJson: readPackageJson,
      }),
      readRootPackage: readRootPackage,
      applyPathsFilter: makeApplyPathsFilter({
        readFile: (name: string) => readFile(name, "utf8"),
        writeFile: (path: string, body: string) => writeFile(path, body),
        getWorkflowFiles: getWorkflowFilePaths,
      }),
    });

    await optimize();
  },
});
