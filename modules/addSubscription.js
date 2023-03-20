// add subscription
const { StreamingPlans } = require('../doremi/streaming');
let zero = 0;
const ten = 10;

const isoFormattedDateReturn = (date) => {
    const newDate = date.toISOString().split('T')[zero];
    const [year1, month1, day1] = newDate.split('-');
    const isoFormattedDate1 = `${day1}-${month1}-${year1}`;
    date = isoFormattedDate1;
    return date;
}

const addMonths = (date, months) => {
    const [day, month, year] = date.split('-');
    const isoFormattedDate = `${year}-${month}-${day}`;
    date = new Date(isoFormattedDate);
    date.setMonth(date.getMonth() + months);
    return isoFormattedDateReturn(date)
}

  // create a function tosubtract ten days from the end date
const subtractDays = (date, days) => {
    const [day, month, year] = date.split('-');
    const isoFormattedDate = `${year}-${month}-${day}`;
    date = new Date(isoFormattedDate);
    date.setDate(date.getDate() - days);
    return isoFormattedDateReturn(date);
}

const addSubsc = (subscriptionType, subscriptionPlan, startSubscriptionDate, planList, renewalAmount) => {
    let planDetails =  StreamingPlans[subscriptionType];
    let month = planDetails[subscriptionPlan.trim()].month
    if (startSubscriptionDate.date == 'NULL') {
        console.log(`ADD_SUBSCRIPTION_FAILED INVALID_DATE`);
        return renewalAmount;
    }

    const endDate = startSubscriptionDate.date === undefined ? 'Invalid date' : addMonths(startSubscriptionDate.date, month);

    let obj = {
        subscriptionType,
        subscriptionPlan,
        startDate:startSubscriptionDate.date,
        endDate: endDate === 'Invalid date' ? undefined : subtractDays(endDate, ten),
    }

    let checkSub = planList.find(item=>item.subscriptionType.trim() === subscriptionType.trim())
    if (checkSub) {
        console.log(`ADD_SUBSCRIPTION_FAILED DUPLICATE_CATEGORY`);
        return renewalAmount;
    } 
    if (!checkSub) {
        planList.push(obj);
        renewalAmount = renewalAmount  + planDetails[subscriptionPlan.trim()].amount
    }
    return renewalAmount;
}

exports.addSubsc = addSubsc;