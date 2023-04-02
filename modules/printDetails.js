// print the output to the console
const zero = 0;
const printDetails = (planList, renewalAmount) => {
    if (planList.length === zero) {
        console.log(`SUBSCRIPTIONS_NOT_FOUND`);
        return;
    }
    for (i=zero; i<planList.length; i++) {
        console.log(`RENEWAL_REMINDER ${planList[i].subscriptionType}  ${planList[i].endDate}`);
    }
    console.log(`RENEWAL_AMOUNT ${renewalAmount}`);
    return renewalAmount;
}

exports.printDetails = printDetails;