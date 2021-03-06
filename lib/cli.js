#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const args = process.argv.slice(2);
try {
  if (args.length < 1) {
    throw new Error('A filename must be provided');
  }

  const defaults = {
    type: 'js',
    testfile: true,
    dir: path.join('./'),
    tfdir: path.join('./', '__tests__'),
  };

  const isFlag = (str) => {
    return str[0] === '-';
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

    if (
      args[noFlagIndex] !== undefined &&
      !isFlag(args[noFlagIndex])
    ) {
      return args[noFlagIndex];
    }

    return undefined;
  };

  const evalBoolean = (str) => {
    switch (str) {
      case 'true':
        return true;
      case 't':
        return true;
      case 'false':
        return false;
      case 'f':
        return false;
      default:
        return undefined;
    }
  };

  const shouldMakeTestFile =
    evalBoolean(getArg('--testfile', '-tf', 2)) !== undefined
      ? evalBoolean(getArg('--testfile', '-tf', 2))
      : defaults.testfile;

  const name = getArg('--name', '-n', 0);
  console.log(name);
  if (name === undefined) {
    throw new Error('A filename must be provided');
  }

  const type = getArg('--type', '-t', 1) || defaults.type;
  const dir = getArg('--dir', '-d') || defaults.dir;
  const tfdir = getArg('--tfdir', '-td') || defaults.tfdir;

  const testfileName = `${name}.test.${type}`;
  const filename = `${name}.${type}`;

  const destinationFile = path.join(dir, filename);
  const destinTestFile = path.join(tfdir, testfileName);

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
    { recursive: true },
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
      .replace(/\.[^/.]+$/, '')}";

describe('testing ${name}', ()=>{
  // dummy test so will always pass should be replaced
  it('dummy test', () => {
    expect(false).toBeFalsy();
  });
})
  `,
    { recursive: true },
  );

  console.log(`file '${filename}' created at '${dir}'`);
  console.log(`test file '${testfileName}' created at '${tfdir}'`);
} catch (e) {
  console.log(`Error: ${e.message}`);
  console.log('process exiting with code (1)');
  process.exit(1);
}

process.exit(0);
