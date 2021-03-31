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
  dir: path.join("./"),
  tfdir: path.join("./", "__tests__"),
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

const evalBoolean = (str) => {
  switch (str) {
    case "true":
      return true;
    case "t":
      return true;
    case "false":
      return false;
    case "f":
      return false;
    default:
      return undefined;
  }
};

const shouldMakeTestFile =
  evalBoolean(getArg("--testfile", "-tf", 2)) !== undefined
    ? evalBoolean(getArg("--testfile", "-tf", 2))
    : defaults.testfile;

const name = getArg("--name", "-d", 0);
const type = getArg("--type", "-t", 1) || defaults.type;
const dir = getArg("--dir", "-d") || defaults.dir;
const tfdir = getArg("--tfdir", "-td") || defaults.tfdir;

const testfileName = `${name}.test.${type}`;
const filename = `${name}.${type}`;

const destinationFile = path.join(dir, filename);
const destinTestFile = path.join(tfdir, testfileName);

try {
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
  if (!shouldMakeTestFile) {
    process.exit(0);
  }
  if (!fs.existsSync(tfdir)) {
    fs.mkdirSync(tfdir, { recursive: true });
  }

  fs.writeFileSync(
    destinTestFile,
    `
import ${name} from "${path
      .relative(tfdir, destinationFile)
      .replace(/\.[^/.]+$/, "")}";

describe('testing ${name}', ()=>{

})
  `,
    { recursive: true }
  );

  console.log(`file '${filename}' created at '${dir}'`);
  console.log(`test file '${testfileName}' created at '${tfdir}'`);
} catch (e) {
  console.log("Error");
  console.log(e.message);
  console.log("exiting with code 0");
  process.exit(1);
}

process.exit(0);
