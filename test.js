const  {startSubsc}  = require("./modules/startSubscription.js");
const assert = require('assert');
const { doremi } = require("./modules/runDoremi.js");

describe('Doremi Test Cases', () => {
    beforeEach(() => {
        console.log("Run Before Each Test Case");
    });

    it('Start Subscription', () => {
        const input = 'START_SUBSCRIPTION 20-02-2022';
        const output = startSubsc(input.split(" ")[1]);
        assert.equal(output.result,"20-02-2022");
    });

    it('Final Amount', () => {
        const inputLines = [
            'START_SUBSCRIPTION 20-02-2022\r',       
            'ADD_SUBSCRIPTION MUSIC PERSONAL\r',     
            'ADD_SUBSCRIPTION VIDEO PREMIUM\r',      
            'ADD_SUBSCRIPTION PODCAST FREE\r',       
            'ADD_TOPUP FOUR_DEVICE 3\r',
            'PRINT_RENEWAL_DETAILS'
        ]
        const output = doremi(inputLines);
        assert.equal(output.renewalAmount, 750);
    });

    it('ADD_SUBSCRIPTION_FAILED INVALID_DATE', () => {
        const inp = [ 'START_SUBSCRIPTION 07-19-2022\r', 'ADD_SUBSCRIPTION MUSIC PREMIUM']
        const output = doremi(inp);
        assert.equal(output.data.result, 'ADD_SUBSCRIPTION_FAILED INVALID_DATE');
    });

});