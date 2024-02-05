import { match } from "ts-pattern";
import { MakeDependenciesGraph } from "./dependencies/make-dependencies-graph";
import { ReadRootPackage } from "./npm/read-root-package";
import { convertMermaidDsl } from "./graph/convert-mermaid-dsl";

type Dependencies = {
  makeDependenciesGraph: MakeDependenciesGraph;
  readRootPackage: ReadRootPackage;
};

export const makeInspect = (deps: Dependencies) => async () => {
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
  graphResult.map(({graph, idToValue}) => {
    console.log(convertMermaidDsl(graph, idToValue))
  });
  return;
};
