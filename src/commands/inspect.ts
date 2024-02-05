import { defineCommand } from "citty";
import { makeInspect } from "../lib/inspect";
import { makeDependenciesGraph } from "../lib/dependencies/make-dependencies-graph";
import { readPackageJson } from "../lib/npm/read-package-json";
import { readRootPackage } from "../lib/npm/read-root-package";

export default defineCommand({
  meta: {
    name: "inspect",
    description: "Output package dependencies with mermaid dsl",
  },
  run: async () => {
    const inspect = makeInspect({
      makeDependenciesGraph: makeDependenciesGraph({
        readPackageJson: readPackageJson
      }),
      readRootPackage: readRootPackage
    })

    await inspect()
  },
});
