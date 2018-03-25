/**
 * Main script with file-manipulation and XML-building
 */

 // Get all node-requirements
const readline = require('readline');
const fs = require('fs');
const libxml = require('libxmljs');

// Start the linereader with hardcoded input file
const rl = readline.createInterface({
    input: fs.createReadStream('./data.psv')
});

// Init empty People-XML and libXML
let doc = new libxml.Document();
let peopleNode = doc.node('people');

// Init personNode and familyNode
let personNode;
let familyNode;

rl.on('line', function(line){
    if(line.charAt(0) === "P"){
        // If family is defined, make sure to empty it's memory pointer in order to get address and phone-nodes
        // correctly assigned as children to main person and not to a rouge family member
        if(familyNode){
            familyNode = undefined;
        }
        personNode = libxml.Element(doc, 'person');
        let nodeContent = getFilteredRow(line);
        let nameMapArr = ['firstname', 'lastname'];
        addChildNode(doc, personNode, nodeContent, nameMapArr);
        peopleNode.addChild(personNode);
    }
    else if(line.charAt(0) === "T"){
        let phoneNode = libxml.Element(doc, 'phone');
        let nodeContent = getFilteredRow(line);
        let nameMapArr = ['mobile', 'landline'];
        addChildNode(doc, phoneNode, nodeContent, nameMapArr);
        if(familyNode){
            familyNode.addChild(phoneNode);
        }else{
            personNode.addChild(phoneNode);
        }
    }
    else if(line.charAt(0) === "A"){
        let addressNode = libxml.Element(doc, 'address');
        let nodeContent = getFilteredRow(line);
        let nameMapArr = ['street', 'city','zipnumber'];
        addChildNode(doc, addressNode, nodeContent, nameMapArr);        
        if(familyNode){
            familyNode.addChild(addressNode);
        }else{
            personNode.addChild(addressNode);
        }
    }
    else if(line.charAt(0) === "F" && personNode){
        familyNode = libxml.Element(doc, 'family');
        let nodeContent = getFilteredRow(line);
        let nameMapArr = ['name', 'born'];
        addChildNode(doc, familyNode, nodeContent, nameMapArr);        
        personNode.addChild(familyNode);
    }
});

rl.on('close', function(){
    fs.writeFile('./out.xml', doc.toString(), function(err) {
        if(err) throw err;
        console.log("PSV to XML created out.xml successfully!");
    });
});

/**
 * Return splitted and washed row based on assumptions:
 * - pipe (|) separator
 * - first element in separated array is not of interest
 * @param {string} row 
 */
let getFilteredRow = function(row){
    let arr = row.split('|');
    arr.shift();
    return arr;
}

/**
 * Add one or more childs to an existing libxmlJS-document XML-node
 * 
 * @param {*} libXmlDoc 
 * @param {*} parentNode Parent node to which all new elements will be added
 * @param {array} contentArr Array with content to be placed in xml-elements
 * @param {array} nameMapArr Name of XML-elements with content from contentArr
 */
let addChildNode = function(libXmlDoc, parentNode, contentArr, nameMapArr){
    for(i = 0; i < nameMapArr.length; i++){
        let newXmlElement = libxml.Element(doc, nameMapArr[i], contentArr[i]);
        parentNode.addChild(newXmlElement);        
    }
}