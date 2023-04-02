// add additional topup
const { TopUp } = require('../doremi/topUp');
let topUpList = [];
let zero = 0;

const addTopUp = (topUp, topUpType, num, startSubscriptionDate, planList, renewalAmount) => {
    if (startSubscriptionDate.date === 'INVALID_DATE') {
        console.log(`ADD_TOPUP_FAILED INVALID_DATE`);
        return {renewalAmount: renewalAmount, result:'ADD_TOPUP_FAILED INVALID_DATE' };;
    }

    if (startSubscriptionDate.date && planList.length === zero) {
        console.log(`ADD_TOPUP_FAILED SUBSCRIPTIONS_NOT_FOUND`);
        return {renewalAmount: renewalAmount, result:'ADD_TOPUP_FAILED SUBSCRIPTIONS_NOT_FOUND' };;
    }
    let checkSub = topUpList.find(item => item.topUp.trim() === topUp.trim())
    if (checkSub) {
        console.log(`ADD_TOPUP_FAILED DUPLICATE_TOPUP`);
        return {renewalAmount: renewalAmount, result:'ADD_TOPUP_FAILED DUPLICATE_TOPUP' };
    }

    let topUpInfo = TopUp[topUpType];
    let amount = topUpInfo.amount * num;
    renewalAmount = renewalAmount + amount;
    topUpObj = {
        topUp: topUp,
        topUpType: topUpType,
        num: num,
    }
    topUpList.push(topUpObj);
    return {renewalAmount: renewalAmount, result: ''};
}

exports.addTopUp = addTopUp;

