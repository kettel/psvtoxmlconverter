# PSV to XML converter
A cross-platform nodejs script that converts a pipe-separated and structured `data.psv` into a nested XML file according to a specific set of rules, implemented in `schema.xsd`.

## Requirements:
- node (tested on node 8.9.4)
- node-gyp

## Run:
```
$ git clone https://github.com/kettel/psvtoxmlconverter.git
$ cd psvtoxmlconverter
$ npm i
$ npm run convert
```

You should now have a well-formed `out.xml` in the `psvtoxmlconverter` root-folder.

### Validation according to schema.xsd:
`$ npm run validate`

### Fancy all-in-one convert and validate:
`$ npm run convertAndValidate`

## Known issues (Windows only):
XSD-validation utilizes libxml-xsd whose requirement node-gyp is likely not installed in a normal Windows dev-setup.

Workaround:

Start an elevated powershell/cmd and run 

`npm install --global --production windows-build-tools`

### Possible future enhancements
- Arbitrary filenames (psv-input, xml-output). Real easy!
- Better folder-structure (separate scripts and data). Easy!
- Chaining capabilities.
- Testable!
- Progressbar.
- Observables instead of classic async.
