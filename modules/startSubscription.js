// start subscription
const checkDate = (date, regex) => date.match(regex) === null;
const checkTimeStamp = (timestamp) => typeof timestamp !== 'number' || Number.isNaN(timestamp);

const startSubsc = (subscriptionDate) =>{
    const regex = /^\d{2}-\d{2}-\d{4}$/;
    if (checkDate(subscriptionDate, regex)) {
        console.log(`INVALID_DATE`);
        return {renewalAmount: 0, result: "INVALID_DATE"};
    }
    const [day, month, year] = subscriptionDate.split('-');
    const isoFormattedDate = `${year}-${month}-${day}`;
    const date = new Date(isoFormattedDate);
    const timestamp = date.getTime();
    if (checkTimeStamp(timestamp)) {
        console.log(`INVALID_DATE`);
        return {renewalAmount: 0, result: "INVALID_DATE"};
    }
    return {renewalAmount: 0, result: subscriptionDate};
}

exports.startSubsc = startSubsc;