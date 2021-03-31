# Add File

## Description
Adds a file and corresponding testing file to the current working directory. 
Will create a __tests__ file if not already present.


## How To Use

in the command line run the command `simplemkfile`

### flags
`-n` or `--name` flag is used to designate the name of the file you want to create  

`-t` or `--type` flag designates the file extension (js by default)

`-tf` or `--testfile` flag enables or disables creation of the test file and directory (true by default). Can also be designated by passing as the third, unflagged argument.

`-td` or `--tfdir` to designate the directory the test file will be created in. 
Defaults to `./__tests__`

`-d` or `--dir` to designate the directory the test file will be created in. 
Defaults to current working directory.



As a shortcut, you can pass `[name] [type] [testfile]` as the first in this order to pass the arguments without flags.  

The CLI tool will create a file with the name you give it (along with some boilerplate code) as well as a test (jest) file that imports your file.


## Example:

create a typescript file and corresponding test file:  
```bash
$ simplemkfile testfile ts

```

create  typescript file and corresponding test file using flags:  
```bash
$ simplemkfile --name testfile --type ts


```

create a javascript file in a designated directory with a test file with a designatd directory:

```bash
$ simplemkfile myfile ts --dir ./src --tfdir ./tests
```