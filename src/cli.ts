#!/usr/bin/env node

import { defineCommand, runMain } from "citty";

const program = defineCommand({
  meta: {
    name: process.env.npm_package_name,
    version: process.env.npm_package_version,
    description: process.env.package_description,
  },
  subCommands: {
    inspect: () => import('./commands/inspect').then(r => r.default),
    optimize: () => import('./commands/optimize').then(r => r.default)
  },
})

runMain(program)
