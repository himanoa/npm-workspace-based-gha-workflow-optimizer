import { Lens, Prism } from "monocle-ts";
import { some, none } from "fp-ts/lib/Option";

type PushEvent = "push";
type PullRequestEvent = "pull_request";
type EventType = PushEvent | PullRequestEvent;

type PathsFilter = string;

type EventPayload = {
  paths: ReadonlyArray<PathsFilter>;
};

type EventWithPaths = Record<EventType, EventPayload | undefined>;

type NotPatchedWorkflowDefinition = {
  name: string;
  on: ReadonlyArray<EventType> | EventWithPaths;
  // NOTE: `jobs` value is not use forthis application. But must remine. after serialized. Because of that need to define this field.
  jobs: Record<string, object>;
};

type NormalizedWorkflowDefinition = {
  name: string;
  on: EventWithPaths;
  // NOTE: `jobs` value is not use forthis application. But must remine. after serialized. Because of that need to define this field.
  jobs: Record<string, object>;
};

type PatchedWorkflowDefinition = NormalizedWorkflowDefinition;

export const patchPathsFilter = (
  notNormalizedWorkflowDefinition: NotPatchedWorkflowDefinition,
  pathsFilter: ReadonlyArray<PathsFilter>,
): PatchedWorkflowDefinition => {
  const workflowDefinition = normalizeWorkflowDefinition(
    notNormalizedWorkflowDefinition,
  );

  const on = Lens.fromProp<NormalizedWorkflowDefinition>()("on");

  const pushPrism = new Prism<EventPayload | undefined, EventPayload>(
    (s) => {
      if (s !== undefined) return some(s);
      return none;
    },
    (a: EventPayload): EventPayload | undefined => a,
  );

  const push = Lens.fromProp<EventWithPaths>()("push");
  const paths = Lens.fromProp<EventPayload>()("paths");
  const pullRequest = Lens.fromProp<EventWithPaths>()("pull_request");

  const mofidyPushPaths = on
    .compose(push)
    .composePrism(pushPrism)
    .composeLens(paths)
    .modify(() => pathsFilter);
  const modifyPullRequestPaths = on
    .compose(pullRequest)
    .composePrism(pushPrism)
    .composeLens(paths)
    .modify(() => pathsFilter);

  return modifyPullRequestPaths(mofidyPushPaths(workflowDefinition));
};

const isNormalized = (
  on: ReadonlyArray<EventType> | EventWithPaths,
): on is EventWithPaths => {
  return !Array.isArray(on);
};

const normalizeWorkflowDefinition = (
  w: NotPatchedWorkflowDefinition,
): NormalizedWorkflowDefinition => {
  if (isNormalized(w.on)) {
    return {
      ...w,
      on: w.on,
    };
  }
  return {
    ...w,
    on: w.on.reduce((acc, name) => {
      return {
        ...acc,
        [name]: { paths: [] },
      };
    }, {} as EventWithPaths),
  };
};
