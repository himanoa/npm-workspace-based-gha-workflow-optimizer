import { BiMap } from "@rimbu/core";
import { RootPackage } from "../dependencies/root-package";
import { makePathsFilter } from "./make-paths-filter";
import { Graph, Id } from "../graph/digraph";
import { parse, stringify } from 'yaml'

type Dependencies = {
  readFile: (path: string) => Promise<string>,
  writeFile: (path: string, body: string) => Promise<void>
  getWorkflowFiles: (packageName: string)  => string[]
}

export const applyPathsFilter = (deps: Dependencies) => async (
  graph: Graph,
  rootId: Id,
  rootPackage: RootPackage,
  idToValue: BiMap<Id, string>
) => {
  await Promise.all(rootPackage.workspaces.map(async workspace => {
    const id = idToValue.getKey(workspace.name)
    if(id === undefined) {
      return 
    }
    const pathsFilter = makePathsFilter(graph, id, rootPackage, idToValue)

    const workflowPaths = deps.getWorkflowFiles(idToValue.getValue(rootId) || '')
    const workflowYamls = await Promise.all(workflowPaths.map(async p => [p, await deps.readFile(p)] as const))

    const workflows = await Promise.all(workflowYamls.map(async ([path, w]) => [path, await parse(w)] as const))

    const appliedPathsFilterWorkflows = workflows.map(([path, workflow]) => {
      return [path, {
        ...workflow,
        on: {
          ...workflow.on,
          push: {
            ...workflow.on.push,
            paths: pathsFilter
          }
        }
      }] as const
    })

    await Promise.all(appliedPathsFilterWorkflows.map(async ([path, workflow]) => deps.writeFile(path, stringify(workflow))))
  }))
}
