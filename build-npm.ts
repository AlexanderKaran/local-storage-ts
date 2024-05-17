import { build, emptyDir } from "https://deno.land/x/dnt@0.28.0/mod.ts";

const outDir = "./build/npm";

await emptyDir(outDir);

const [version] = Deno.args;
if (!version) {
  throw new Error("a version argument is required to build the npm package");
}

await build({
  entryPoints: ["./mod.ts"],
  outDir,
  shims: {
    deno: false,
  },
  test: false,
  typeCheck: false,
  compilerOptions: {
    target: "ES2020",
    sourceMap: true,
  },
  package: {
    // package.json properties
    name: "local-storage-typescript",
    version,
    description: "Graph Generator",
    license: "MIT",
    repository: {
      author: "tech@alexanderkaran.com",
      type: "git",
      url: "git+https://github.com/AlexanderKaran/local-storage-ts.git",
    },
    bugs: {
      url: "https://github.com/AlexanderKaran/local-storage-ts/issues",
    },
    engines: {
      node: ">= 16",
    },
  },
});

await Deno.copyFile("README.md", `${outDir}/README.md`);
