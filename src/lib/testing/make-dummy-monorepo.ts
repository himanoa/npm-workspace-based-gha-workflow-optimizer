import { mkdirSync, rmSync, writeFileSync } from "fs"

type TearDown = () => void
type MakeDummyMonorepo = () => TearDown

export const makeDummyMonorepo: MakeDummyMonorepo =  () => {
  const packages = [
    {
      name: '@dummy/a',
      path: './workspaces/a'
    },
    {
      name: '@dummy/b',
      path: './workspaces/b'
    }
  ]

  const rootPackageJson = {
    "name": "root",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "workspaces": packages.map(p => p.path),
    "scripts": {
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "dependencies": {
    },
    "devDependencies": {
    }
  }

  writeFileSync('./tmp/package.json', JSON.stringify(rootPackageJson))

  for(const p of packages) {
    const packageJson = {
      "name": p.name,
      "version": "1.0.0",
      "description": "",
      "main": "index.js",
      "scripts": {
      },
      "keywords": [],
      "author": "",
      "license": "ISC",
      "dependencies": {
      },
      "devDependencies": {
      }
    }
    mkdirSync(`./tmp/${p.path}`, { recursive: true })
    writeFileSync(`./tmp/${p.path}/package.json`, JSON.stringify(packageJson))
  }

  return () => {
    rmSync('./tmp/package.json')
    rmSync('./tmp/workspaces', { force: true, recursive: true })
  }
}
