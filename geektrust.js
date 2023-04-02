const fs = require("fs")
const filename = process.argv[2];
const { doremi } = require("./modules/runDoremi.js");

// read the input file
fs.readFile(filename, "utf8", (error, data) => {
    if (error) throw error
    let inputLines = data.toString().split("\n");
    // Add your code here to process input commands
    doremi(inputLines);
});