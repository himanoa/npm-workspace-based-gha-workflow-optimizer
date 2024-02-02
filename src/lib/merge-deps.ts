import { IPackageJson as PackageJson } from "package-json-type";

/**
 * Merge all dependencies present in the package.json specification
 *
 * @param  p parsed package.json body object
 * @returns package names array
 *
 **/
export const mergeDeps = (p: PackageJson): string[] => {
  p.depe;
  return [
    ...Object.keys(p.optionalDependencies || {}),
    ...Object.keys(p.devDependencies || {}),
    ...Object.keys(p.dependencies || {}),
    ...Object.keys(p.peerDependencies || {}),
    ...(p.bundledDependencies || []),
  ];
};
