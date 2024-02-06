import { match } from "ts-pattern";
import { MakeDependenciesGraph } from "./dependencies/make-dependencies-graph";
import { ReadRootPackage } from "./npm/read-root-package";
import { ApplyPathsFilter } from "./gha/apply-paths-filter";

type Dependencies = {
  readRootPackage: ReadRootPackage;
  makeDependenciesGraph: MakeDependenciesGraph;
  applyPathsFilter: ApplyPathsFilter;
};

export const makeOptimize = (deps: Dependencies) => async () => {
  const rootPackageResult = await deps.readRootPackage();
  const rootPackage = await match(rootPackageResult)
    .with({ ok: true }, async ({ val: rootPackage }) => {
      return rootPackage;
    })
    .with({ err: true }, async () => {
      console.error("Not found package.json");
      process.exit(1);
    })
    .exhaustive();
  const graphResult = await deps.makeDependenciesGraph(rootPackage);
  graphResult.map(async ({ graph, idToValue }) => {
    await deps.applyPathsFilter(graph, rootPackage, idToValue);
  });
  return;
};
