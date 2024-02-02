import { match } from "ts-pattern";
import { InspectDependencies } from "./inspect-dependencies";
import { ReadRootPackage } from "./read-root-package";

type AllOptions = null;
type WorkspaceOnlyOptions = {
  packageName: string;
};

type InspectOptions = AllOptions | WorkspaceOnlyOptions;

type Dependencies = {
  inspectDependencies: InspectDependencies;
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

      await deps.inspectDependencies(rootPackage);
      return;
    }
    throw new Error("unimplemented");
  };
