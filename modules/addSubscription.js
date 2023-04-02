// add subscription
const { StreamingPlans } = require('../doremi/streaming');
let zero = 0;
const ten = 10;
const UNDEFINED = 'undefined';

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

    if (startSubscriptionDate.date == 'INVALID_DATE') {
        console.log(`ADD_SUBSCRIPTION_FAILED INVALID_DATE`);
        return {renewalAmount: renewalAmount, result: 'ADD_SUBSCRIPTION_FAILED INVALID_DATE'};
    }
    
    const endDate = startSubscriptionDate.date ? addMonths(startSubscriptionDate.date, month) :  'Invalid date' ;

    let obj = {
        subscriptionType,
        subscriptionPlan,
        startDate:startSubscriptionDate.date,
        endDate: endDate === 'Invalid date' ? UNDEFINED : subtractDays(endDate, ten),
    }

    let checkSub = planList.find(item=>item.subscriptionType.trim() === subscriptionType.trim())
    if (checkSub) {
        console.log(`ADD_SUBSCRIPTION_FAILED DUPLICATE_CATEGORY`);
        return {renewalAmount: renewalAmount, result: 'ADD_SUBSCRIPTION_FAILED DUPLICATE_CATEGORY'};
    } 
    if (!checkSub) {
        planList.push(obj);
        renewalAmount = renewalAmount  + planDetails[subscriptionPlan.trim()].amount
    }
    return {renewalAmount: renewalAmount, result: ''};
}

exports.addSubsc = addSubsc;