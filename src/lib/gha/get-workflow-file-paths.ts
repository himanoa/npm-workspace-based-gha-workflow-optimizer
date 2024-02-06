import { glob } from "glob";

export const getWorkflowFilePaths = async (packageName: string) => {
  return glob(`.github/workflows/${packageName}-*.yml`);
};
