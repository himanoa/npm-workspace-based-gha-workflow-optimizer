import { Err, Result } from "ts-results";
import { RootPackage } from "./root-package";
import { readFile } from 'fs/promises'

type ReadRootPackageSuccess = RootPackage

type ReadRootPackageError = {
  kind: "notFoundRootPackageJson"
} | {
  kind: 'unknownError'
}

type ReadRootPackage = (fileName?: string) => Promise<Result<ReadRootPackageSuccess, ReadRootPackageError>>

export const readRootPackage: ReadRootPackage = async (fileName = './package.json') => {
  return readFile(fileName).then(() => {
    return Err({kind: 'unknownError'} as const)
  }).catch(err => { 
    if(err.code === 'ENOENT') {
      return Err({kind: 'notFoundRootPackageJson'} as const)
    }
    return Err({kind: 'unknownError'} as const)
  })
}
