// const { doremi } = require("./modules/runDoremi.js");
const { printDetails } = require("./printDetails.js");
const { startSubsc } = require("./startSubscription.js");
const { addTopUp } = require("./addTopUp.js");
const { addSubsc } = require("./addSubscription.js");

let startSubscriptionDate = {};
let planList = [];
let data = { renewalAmount:0, result: ''};
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
                startSubscriptionDate.date = startSubsc(input[one].trim()).result;
                break;
            case "ADD_SUBSCRIPTION":
                const temp = addSubsc(input[one], input[two], startSubscriptionDate, planList, data.renewalAmount);
                data.renewalAmount = temp.renewalAmount;
                data.result = temp.result
                break;
            case "ADD_TOPUP":
                data = addTopUp(input[zero], input[one], input[two], startSubscriptionDate, planList, data.renewalAmount);
                break;
            case 'PRINT_RENEWAL_DETAILS':
                printDetails(planList, data.renewalAmount);
                break;
        }
    })
    return {renewalAmount: data.renewalAmount, date: startSubscriptionDate.date, data};
}

exports.doremi = doremi