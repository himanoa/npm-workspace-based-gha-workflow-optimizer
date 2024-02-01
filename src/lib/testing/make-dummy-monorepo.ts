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

const nameAndBodyMaps = packages.map(({name, path}) => {
  return {
    path: path.replace('./workspaces/', ''),
    pkg: {
      "name": name,
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
  }
})

export const makeDummyMonorepo = () => {
  return {
    './package.json': JSON.stringify(rootPackageJson),
    workspaces: {
      ...nameAndBodyMaps.reduce((acc, {path, pkg}) => {
        return {
          ...acc,
          [path]: {
            'package.json': JSON.stringify(pkg)
          }
        }
      }, {})
    }
  }
}
