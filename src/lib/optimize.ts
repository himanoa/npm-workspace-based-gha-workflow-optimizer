import { MakeDependenciesGraph } from "./dependencies/make-dependencies-graph"
import { ReadRootPackage } from "./npm/read-root-package"

type Dependencies = {
  readRootPackage: ReadRootPackage,
  makeDependenciesGraph: MakeDependenciesGraph
}

export const makeOptimize = () => async () => {
  // const rootPackageResult = await deps.readRootPackage();
  // const rootPackage = await match(rootPackageResult)
  //   .with({ ok: true }, async ({ val: rootPackage }) => {
  //     return rootPackage;
  //   })
  //   .with({ err: true }, async () => {
  //     console.error("Not found package.json");
  //     process.exit(1);
  //   })
  //   .exhaustive();

  // const _graphResult = await deps.makeDependenciesGraph(rootPackage);
  return;
};
