# Add File

## Description
Adds a file and corresponding testing file to the current working directory. 
Will create a __tests__ file if not already present.


## How To Use

in the command line run the command `simplemkfile`

### flags
`-n` or `--name` flag is used to designate the name of the file you want to create  

`-t` or `--type` flag designates the file extension (js by default)

`-tf` or `--testfile` flag enables or disables creation of the test file and directory (true by default)  

As a shortcut, you can pass `[name] [type] [testfile]` as the first in this order to pass the arguments without flags.  

The CLI tool will create a file with the name you give it (along with some boilerplate code) as well as a test (jest) file that imports your file.


## Example:

create a typescript file and corresponding test file
```bash
$ simplemkfile testfile ts

```

create  typescript file and corresponding test file using flags
```bash
$ simplemkfile --name testfile --type ts


```