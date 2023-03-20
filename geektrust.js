const fs = require("fs")
const { printDetails } = require("./modules/printDetails.js");
const { startSubsc } = require("./modules/startSubscription.js");
const { addTopUp } = require("./modules/addTopUp.js");
const { addSubsc } = require("./modules/addSubscription.js");
const filename = process.argv[2]
let startSubscriptionDate = {};
let planList = [];
let renewalAmount = 0;
const zero = 0;
const one = 1;
const two = 2;

// start doremi function
const doremi = (inputLines) => {
    // file input comes in as an array of strings
    inputLines.map((line) => {
        let input = line.split(" ");
        switch (input[zero]) {
            case 'START_SUBSCRIPTION':
                startSubscriptionDate.date = startSubsc(input[one].trim());
                break;
            case "ADD_SUBSCRIPTION":
                renewalAmount = addSubsc(input[one], input[two], startSubscriptionDate, planList, renewalAmount);
                break;
            case "ADD_TOPUP":
                renewalAmount = addTopUp(input[zero], input[one], input[two], startSubscriptionDate, planList, renewalAmount);
                break;
            case 'PRINT_RENEWAL_DETAILS':
                printDetails(planList, renewalAmount);
                break;
        }
    })
}

// read the input file
fs.readFile(filename, "utf8", (error, data) => {
    if (error) throw error
    let inputLines = data.toString().split("\n");
    // Add your code here to process input commands
    doremi(inputLines);
});