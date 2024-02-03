import { Workspace } from "./workspace";

export type RootPackage = {
  name: string;
  workspaces: ReadonlyArray<Workspace>;
};
