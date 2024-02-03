import { match } from "ts-pattern";
import { MakeDependenciesGraph } from "./dependencies/make-dependencies-graph";
import { ReadRootPackage } from "./npm/read-root-package";

type AllOptions = null;
type WorkspaceOnlyOptions = {
  packageName: string;
};

type InspectOptions = AllOptions | WorkspaceOnlyOptions;

type Dependencies = {
  makeDependenciesGraph: MakeDependenciesGraph;
  readRootPackage: ReadRootPackage;
};

export const makeInspect =
  (deps: Dependencies) => async (options: InspectOptions) => {
    if (options?.packageName) {
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
      graphResult.map((graph) => {
        console.dir(graph);
      });
      return;
    }
    throw new Error("unimplemented");
  };
