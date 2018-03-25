/**
 * XML-XSD validation script
 */

const xsd = require('libxml-xsd');
const fs = require('fs');

let xmlToValidate = './out.xml';
let schema = './schema.xsd';

fs.readFile(xmlToValidate, 'utf8', function (err, data) {
    if (err) throw err;
    // console.log(data);
    xsd.parseFile(schema, function (err2, schema) {
        if (err2) throw err2;

        schema.validate(data, function (err, validationErrors) {
            if(!validationErrors){
                console.log(xmlToValidate + " is valid XML.")
            }else{
                // From libxml-xsd documentation:
                // err contains any technical error 
                // validationError is an array, null if the validation is ok 
                // Thus, only validationErrors seems of interest in a validator-error output
                console.log(validationErrors);
            }
        });
    });
});

