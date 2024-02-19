import { glob } from "glob";

export const getWorkflowFilePaths = async (packageName: string) => {
  return glob(`.github/workflows/${normalizePackageName(packageName)}-*.yml`);
};

export const normalizePackageName = (packageName: string): string => {
  return packageName.replace("@", "").replace('/', '-')
}
