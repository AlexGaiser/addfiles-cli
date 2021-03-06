# Add File

## Description
Adds a file and corresponding testing file to the current working directory. 
Will create a `__tests__/` directory if not already present.

In addition, users have the option to designate specific directories for the created file and test file. If the directories do not exist they will be created.
Uses also have the option of setting a flag that prevents the creation of test files. Test files will have the format of `filename.test.filetype`.

## Installation 
Run the following command from your terminal. 
```bash
$ npm i -g simplemkfile

```

However it is preferred to run the command using `npx`
For example the following will work without a global install: 
```bash
$ npx simplemkfile test js
```
Using `npx` will ensure that you are always using the latest version of the CLI tool. 

## How To Use

From your terminal run the command `simplemkfile` with the name of the file you wish to create. Defaults to creating a `.js` file.

### Flags
`-n` or `--name` flag is used to designate the name of the file you want to create  

`-t` or `--type` flag designates the file extension (js by default)

`-tf` or `--testfile` flag enables or disables creation of the test file and directory (true by default). Can also be designated by passing as the third, unflagged argument.

`-td` or `--tfdir` to designate the directory the test file will be created in. 
Defaults to `./__tests__`

`-d` or `--dir` to designate the directory the test file will be created in. 
Defaults to current working directory.



As a shortcut, you can pass `[name] [type] [testfile]` as the first arguments without flags.  

The CLI tool will create a file with the name you give it (along with some boilerplate code) as well as a test (jest) file that imports your file.


## Examples:

Create a typescript file and corresponding test file:  
```bash
$ simplemkfile testfile ts

```

Create  typescript file and corresponding test file using flags:  
```bash
$ simplemkfile --name testfile --type ts
```

Create a javascript file in a designated directory with a test file with a designatd directory:

```bash
$ simplemkfile myfile ts --dir ./src --tfdir ./tests
```
