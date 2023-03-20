// add additional topup
const { TopUp } = require('../doremi/topUp');
let topUpList = [];
let zero = 0;

const addTopUp = (topUp, topUpType, num, startSubscriptionDate, planList, renewalAmount) => {
    if (startSubscriptionDate.date === 'NULL') {
        console.log(`ADD_TOPUP_FAILED INVALID_DATE`);
        return renewalAmount;
    }

    if (startSubscriptionDate.date && planList.length === zero) {
        console.log(`ADD_TOPUP_FAILED SUBSCRIPTIONS_NOT_FOUND`);
        return renewalAmount;
    }
    let checkSub = topUpList.find(item => item.topUp.trim() === topUp.trim())
    if (checkSub) {
        console.log(`ADD_TOPUP_FAILED DUPLICATE_TOPUP`);
        return renewalAmount;
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
    return renewalAmount;
}

exports.addTopUp = addTopUp;

