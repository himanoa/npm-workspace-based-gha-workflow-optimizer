import { match } from 'ts-pattern'
import { InspectDependencies } from "./inspect-dependencies";
import { ReadRootPackage } from './read-root-package';

type AllOptions = null;
type WorkspaceOnlyOptions = {
  packageName: string;
};

type InspectOptions = AllOptions | WorkspaceOnlyOptions;

type Dependencies = {
  inspectDependencies: InspectDependencies;
  readRootPackage: ReadRootPackage
};

export const makeInspect =
  (deps: Dependencies) =>
  async (options: InspectOptions) => {
    if (options?.packageName) {
      const rootPackage = await deps.readRootPackage()
      await match(rootPackage)
        .with({ ok: true }, async ({val: rootPackage}) => {
          await deps.inspectDependencies('unsupported', rootPackage);
        })
        .with({err: true}, async () => {
          console.error('Not found package.json')
          process.exit(1)
        })
        .exhaustive()
      return;
    }
    throw new Error("unimplemented");
  };
