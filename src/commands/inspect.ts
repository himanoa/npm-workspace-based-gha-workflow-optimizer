import { defineCommand } from "citty";

export default defineCommand({
  meta: {
    name: "inspect",
    description: "Inspect the package dependencies",
  },
  run: () => {
    console.log("inspect");
  },
});
