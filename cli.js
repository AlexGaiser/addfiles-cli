#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const args = process.argv.slice(2);

if (args.length < 1) {
  console.log("Error: please provide a name for the file to be created");
  process.exit(0);
}

const defaults = {
  type: "js",
  testfile: true,
  dir: path.join(process.cwd()),
  tfdir: path.join(process.cwd(), "__tests__"),
};

const isFlag = (str) => {
  return str[0] === "-";
};

const getArg = (name, shortname, noFlagIndex) => {
  if (noFlagIndex !== undefined && args[noFlagIndex] === undefined)
    return undefined;

  const flagIndex = args.findIndex((a) => {
    return a === name || a === shortname;
  });
  const flagValue = args[flagIndex + 1];

  if (flagIndex > 0 && flagValue && !isFlag(flagValue)) {
    return flagValue;
  }

  if (args[noFlagIndex] !== undefined && !isFlag(args[noFlagIndex])) {
    return args[noFlagIndex];
  }

  return undefined;
};

const name = getArg("--name", "-t", 0);
const type = getArg("--type", "-t", 1) || defaults.type;
const dir = getArg("--dir", "-d") || defaults.dir;
const tfdir = getArg("--tfdir", "-tf") || defaults.tfdir;

const testfileName = `${name}.test.${type}`;
const filename = `${name}.${type}`;

const destinationFile = path.join(
  dir[0] === "." ? "." : process.cwd(),
  dir,
  filename
);
const destinTestFile = path.join(
  tfdir[0] === "." ? "." : process.cwd(),
  tfdir,
  testfileName
);
try {
  if (!fs.existsSync(tfdir)) {
    fs.mkdirSync(tfdir, { recursive: true });
  }
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(
    destinationFile,
    `
const ${name} = () => {

}

export default ${name}
`,
    { recursive: true }
  );
  fs.writeFileSync(
    destinTestFile,
    `
import ${name} from "${path
      .relative(destinTestFile, destinationFile)
      .replace(/\.[^/.]+$/, "")}";

describe('testing ${name}', ()=>{

})
  `,
    { recursive: true }
  );
} catch (e) {
  console.log(e.message);
  process.exit(0);
}
