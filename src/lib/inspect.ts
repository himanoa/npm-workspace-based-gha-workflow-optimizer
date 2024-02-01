import { InspectDependencies } from "./inspect-dependencies"

type AllOptions = null
type WorkspaceOnlyOptions = {
  packageName: string
}

type InspectOptions = AllOptions | WorkspaceOnlyOptions

type Dependencies = {
  inspectDependencies: InspectDependencies
}

export const makeInspect = (deps: Dependencies) => (options: InspectOptions): void => {
  if(options?.packageName) {
    deps.inspectDependencies(options.packageName)
    return 
  }
  throw new Error('unimplemented')
}
