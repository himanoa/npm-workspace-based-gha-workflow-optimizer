import { describe, it, expect, vi } from "vitest";
import { makeApplyPathsFilter } from "./apply-paths-filter";
import { BiMap } from "@rimbu/core";

describe("applyPathFilter", () => {
  it("changed workflow yamls", async () => {
    const writeFile = vi.fn();
    const applyPathsFilter = makeApplyPathsFilter({
      getWorkflowFiles: async (packageName: string) => [
        `./github/${packageName}-test.yml`,
        `./github/${packageName}-lint.yml`,
      ],
      readFile: async () => {
        return `
name: test
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: '18.x'
        registry-url: 'https://registry.npmjs.org'
    - uses: pnpm/action-setup@v2
      with:
        version: 8
    - run: pnpm install
    - run: pnpm test
`;
      },
      writeFile: writeFile,
    });

    await applyPathsFilter(
      [[1], [2], [3], []],
      {
        name: "dummy",
        workspaces: [
          { name: "a", relativePath: "a" },
          { name: "b", relativePath: "b" },
          { name: "c", relativePath: "c" },
          { name: "d", relativePath: "d" },
        ],
      },
      BiMap.of([0, "a"], [1, "b"], [2, "c"], [3, "d"]),
    );

    expect(writeFile.mock.calls).toMatchInlineSnapshot(`
      [
        [
          "./github/a-test.yml",
          "name: test
      on:
        push:
          paths:
            - a/**
            - b/**
            - c/**
            - d/**
        pull_request:
          paths:
            - a/**
            - b/**
            - c/**
            - d/**
      jobs:
        test:
          runs-on: ubuntu-latest
          steps:
            - uses: actions/checkout@v4
            - uses: actions/setup-node@v4
              with:
                node-version: 18.x
                registry-url: https://registry.npmjs.org
            - uses: pnpm/action-setup@v2
              with:
                version: 8
            - run: pnpm install
            - run: pnpm test
      ",
        ],
        [
          "./github/a-lint.yml",
          "name: test
      on:
        push:
          paths:
            - a/**
            - b/**
            - c/**
            - d/**
        pull_request:
          paths:
            - a/**
            - b/**
            - c/**
            - d/**
      jobs:
        test:
          runs-on: ubuntu-latest
          steps:
            - uses: actions/checkout@v4
            - uses: actions/setup-node@v4
              with:
                node-version: 18.x
                registry-url: https://registry.npmjs.org
            - uses: pnpm/action-setup@v2
              with:
                version: 8
            - run: pnpm install
            - run: pnpm test
      ",
        ],
        [
          "./github/b-test.yml",
          "name: test
      on:
        push:
          paths:
            - b/**
            - c/**
            - d/**
        pull_request:
          paths:
            - b/**
            - c/**
            - d/**
      jobs:
        test:
          runs-on: ubuntu-latest
          steps:
            - uses: actions/checkout@v4
            - uses: actions/setup-node@v4
              with:
                node-version: 18.x
                registry-url: https://registry.npmjs.org
            - uses: pnpm/action-setup@v2
              with:
                version: 8
            - run: pnpm install
            - run: pnpm test
      ",
        ],
        [
          "./github/b-lint.yml",
          "name: test
      on:
        push:
          paths:
            - b/**
            - c/**
            - d/**
        pull_request:
          paths:
            - b/**
            - c/**
            - d/**
      jobs:
        test:
          runs-on: ubuntu-latest
          steps:
            - uses: actions/checkout@v4
            - uses: actions/setup-node@v4
              with:
                node-version: 18.x
                registry-url: https://registry.npmjs.org
            - uses: pnpm/action-setup@v2
              with:
                version: 8
            - run: pnpm install
            - run: pnpm test
      ",
        ],
        [
          "./github/c-test.yml",
          "name: test
      on:
        push:
          paths:
            - c/**
            - d/**
        pull_request:
          paths:
            - c/**
            - d/**
      jobs:
        test:
          runs-on: ubuntu-latest
          steps:
            - uses: actions/checkout@v4
            - uses: actions/setup-node@v4
              with:
                node-version: 18.x
                registry-url: https://registry.npmjs.org
            - uses: pnpm/action-setup@v2
              with:
                version: 8
            - run: pnpm install
            - run: pnpm test
      ",
        ],
        [
          "./github/c-lint.yml",
          "name: test
      on:
        push:
          paths:
            - c/**
            - d/**
        pull_request:
          paths:
            - c/**
            - d/**
      jobs:
        test:
          runs-on: ubuntu-latest
          steps:
            - uses: actions/checkout@v4
            - uses: actions/setup-node@v4
              with:
                node-version: 18.x
                registry-url: https://registry.npmjs.org
            - uses: pnpm/action-setup@v2
              with:
                version: 8
            - run: pnpm install
            - run: pnpm test
      ",
        ],
        [
          "./github/d-test.yml",
          "name: test
      on:
        push:
          paths:
            - d/**
        pull_request:
          paths:
            - d/**
      jobs:
        test:
          runs-on: ubuntu-latest
          steps:
            - uses: actions/checkout@v4
            - uses: actions/setup-node@v4
              with:
                node-version: 18.x
                registry-url: https://registry.npmjs.org
            - uses: pnpm/action-setup@v2
              with:
                version: 8
            - run: pnpm install
            - run: pnpm test
      ",
        ],
        [
          "./github/d-lint.yml",
          "name: test
      on:
        push:
          paths:
            - d/**
        pull_request:
          paths:
            - d/**
      jobs:
        test:
          runs-on: ubuntu-latest
          steps:
            - uses: actions/checkout@v4
            - uses: actions/setup-node@v4
              with:
                node-version: 18.x
                registry-url: https://registry.npmjs.org
            - uses: pnpm/action-setup@v2
              with:
                version: 8
            - run: pnpm install
            - run: pnpm test
      ",
        ],
      ]
    `);
  });

  it("changed workflow yamls2", async () => {
    const writeFile = vi.fn();
    const applyPathsFilter = makeApplyPathsFilter({
      getWorkflowFiles: async (packageName: string) => [
        `./github/${packageName}-test.yml`,
        `./github/${packageName}-lint.yml`,
      ],
      readFile: async () => {
        return `
name: test
on: 
  pull_request:
    types: [opend, reopened, synchronized, closed]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: '18.x'
        registry-url: 'https://registry.npmjs.org'
    - uses: pnpm/action-setup@v2
      with:
        version: 8
    - run: pnpm install
    - run: pnpm test
`;
      },
      writeFile: writeFile,
    });

    await applyPathsFilter(
      [[1], [2], [3], []],
      {
        name: "dummy",
        workspaces: [
          { name: "a", relativePath: "a" },
          { name: "b", relativePath: "b" },
          { name: "c", relativePath: "c" },
          { name: "d", relativePath: "d" },
        ],
      },
      BiMap.of([0, "a"], [1, "b"], [2, "c"], [3, "d"]),
    );

    expect(writeFile.mock.calls).toMatchInlineSnapshot(`
      [
        [
          "./github/a-test.yml",
          "name: test
      on:
        push:
          paths:
            - a/**
            - b/**
            - c/**
            - d/**
        pull_request:
          types:
            - opend
            - reopened
            - synchronized
            - closed
          paths:
            - a/**
            - b/**
            - c/**
            - d/**
      jobs:
        test:
          runs-on: ubuntu-latest
          steps:
            - uses: actions/checkout@v4
            - uses: actions/setup-node@v4
              with:
                node-version: 18.x
                registry-url: https://registry.npmjs.org
            - uses: pnpm/action-setup@v2
              with:
                version: 8
            - run: pnpm install
            - run: pnpm test
      ",
        ],
        [
          "./github/a-lint.yml",
          "name: test
      on:
        push:
          paths:
            - a/**
            - b/**
            - c/**
            - d/**
        pull_request:
          types:
            - opend
            - reopened
            - synchronized
            - closed
          paths:
            - a/**
            - b/**
            - c/**
            - d/**
      jobs:
        test:
          runs-on: ubuntu-latest
          steps:
            - uses: actions/checkout@v4
            - uses: actions/setup-node@v4
              with:
                node-version: 18.x
                registry-url: https://registry.npmjs.org
            - uses: pnpm/action-setup@v2
              with:
                version: 8
            - run: pnpm install
            - run: pnpm test
      ",
        ],
        [
          "./github/b-test.yml",
          "name: test
      on:
        push:
          paths:
            - b/**
            - c/**
            - d/**
        pull_request:
          types:
            - opend
            - reopened
            - synchronized
            - closed
          paths:
            - b/**
            - c/**
            - d/**
      jobs:
        test:
          runs-on: ubuntu-latest
          steps:
            - uses: actions/checkout@v4
            - uses: actions/setup-node@v4
              with:
                node-version: 18.x
                registry-url: https://registry.npmjs.org
            - uses: pnpm/action-setup@v2
              with:
                version: 8
            - run: pnpm install
            - run: pnpm test
      ",
        ],
        [
          "./github/b-lint.yml",
          "name: test
      on:
        push:
          paths:
            - b/**
            - c/**
            - d/**
        pull_request:
          types:
            - opend
            - reopened
            - synchronized
            - closed
          paths:
            - b/**
            - c/**
            - d/**
      jobs:
        test:
          runs-on: ubuntu-latest
          steps:
            - uses: actions/checkout@v4
            - uses: actions/setup-node@v4
              with:
                node-version: 18.x
                registry-url: https://registry.npmjs.org
            - uses: pnpm/action-setup@v2
              with:
                version: 8
            - run: pnpm install
            - run: pnpm test
      ",
        ],
        [
          "./github/c-test.yml",
          "name: test
      on:
        push:
          paths:
            - c/**
            - d/**
        pull_request:
          types:
            - opend
            - reopened
            - synchronized
            - closed
          paths:
            - c/**
            - d/**
      jobs:
        test:
          runs-on: ubuntu-latest
          steps:
            - uses: actions/checkout@v4
            - uses: actions/setup-node@v4
              with:
                node-version: 18.x
                registry-url: https://registry.npmjs.org
            - uses: pnpm/action-setup@v2
              with:
                version: 8
            - run: pnpm install
            - run: pnpm test
      ",
        ],
        [
          "./github/c-lint.yml",
          "name: test
      on:
        push:
          paths:
            - c/**
            - d/**
        pull_request:
          types:
            - opend
            - reopened
            - synchronized
            - closed
          paths:
            - c/**
            - d/**
      jobs:
        test:
          runs-on: ubuntu-latest
          steps:
            - uses: actions/checkout@v4
            - uses: actions/setup-node@v4
              with:
                node-version: 18.x
                registry-url: https://registry.npmjs.org
            - uses: pnpm/action-setup@v2
              with:
                version: 8
            - run: pnpm install
            - run: pnpm test
      ",
        ],
        [
          "./github/d-test.yml",
          "name: test
      on:
        push:
          paths:
            - d/**
        pull_request:
          types:
            - opend
            - reopened
            - synchronized
            - closed
          paths:
            - d/**
      jobs:
        test:
          runs-on: ubuntu-latest
          steps:
            - uses: actions/checkout@v4
            - uses: actions/setup-node@v4
              with:
                node-version: 18.x
                registry-url: https://registry.npmjs.org
            - uses: pnpm/action-setup@v2
              with:
                version: 8
            - run: pnpm install
            - run: pnpm test
      ",
        ],
        [
          "./github/d-lint.yml",
          "name: test
      on:
        push:
          paths:
            - d/**
        pull_request:
          types:
            - opend
            - reopened
            - synchronized
            - closed
          paths:
            - d/**
      jobs:
        test:
          runs-on: ubuntu-latest
          steps:
            - uses: actions/checkout@v4
            - uses: actions/setup-node@v4
              with:
                node-version: 18.x
                registry-url: https://registry.npmjs.org
            - uses: pnpm/action-setup@v2
              with:
                version: 8
            - run: pnpm install
            - run: pnpm test
      ",
        ],
      ]
    `);
  });
});
