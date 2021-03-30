#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const args = process.argv.slice(2);
const type =
  args[
    args.findIndex((a) => {
      return a === "--type" || a === "-t";
    }) + 1
  ];
const name =
  args[0][0] !== "-"
    ? args[0]
    : args[
        args.findIndex((a) => {
          return a === "--name" || a === "-n";
        }) + 1
      ];
console.log("args", args);
const testfileName = `${name}.test.${type}`;
const filename = `${name}.${type}`;

const destinationFile = path.join(process.cwd(), filename);
const destinTestFile = path.join(process.cwd(), "__tests__", testfileName);

if (!fs.existsSync("__tests__")) {
  fs.mkdirSync(dirname);
}

fs.writeFileSync(
  destinationFile,
  `
  const ${name} = () => {

  }

  export default ${name}
`
);
fs.writeFileSync(
  destinTestFile,
  `
  import ${name} from "../${name}";

  describe('testing ${name}', ()=>{
    

  })

`
);
