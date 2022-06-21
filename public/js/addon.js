/* App frontend script */

function checkAPI() {
    AP.context.getContext().then(
        response => {
            let issueKey;

            issueKey = response.jira.issue.key;
            if(issueKey){
                AP.request(`/rest/api/2/issue/${issueKey}/changelog`)
                .then(res => {
                    let resObj, listHistoryItem, newestStatus;

                    debugger;
                    resObj = JSON.parse(res.body);
                    listHistoryItem = resObj.values;
                    console.log(listHistoryItem);
                    // get the newest status item of history
                    newestStatus = getNewestHistoryItemStatus(listHistoryItem);
                    // append html to display data
                    displayData(newestStatus, calculateMillisecond(newestStatus));
                })
                .catch(err => console.log('Request Failed', err));
            }
        }
    );
}

function findStatusItemOfHistory(value, index, array) {
    let fieldIdOfStatus = value.items[0].fieldId;
    return fieldIdOfStatus == "status";
}

function getNewestHistoryItemStatus(listHistoryItem) {
    const listHistoryStatus = listHistoryItem.filter(findStatusItemOfHistory);
    let newestStatus;

    newestStatus = listHistoryStatus[0];
    if (listHistoryStatus.length > 1) {
        // new array avoid Mutation in JavaScript
        const listStatusOrderedCreatedDates = [...listHistoryStatus].sort(function(current, next) {
            return Date.parse(next.created) - Date.parse(current.created);
        });
        newestStatus = listStatusOrderedCreatedDates[0];
    }
    
    return newestStatus;
}

function calculateMillisecond(newestStatus) {
    let difMillisecond = ( new Date() - new Date(newestStatus.created) ); // milliseconds between now & newestStatus
    let difDays = Math.floor(difMillisecond / 86400000); // days
    let difHours = Math.floor((difMillisecond % 86400000) / 3600000); // hours
    let difMinutes = Math.round(((difMillisecond % 86400000) % 3600000) / 60000); // minutes

    return {
        days: difDays,
        hours: difHours,
        minutes: difMinutes
    };
}

function displayData(newestStatus, data){
    let element = document.getElementById("details");
    let template = [];

    // clean data before trigger again
    $("#details").empty();
    template.push(
        '<div class="aui-message">',
            '<p class="title"><strong>Current status: ' + newestStatus.items[0].toString + '</strong></p>',
            '<p>This status was hold for <time>'+ data.days +' days, '+ data.hours +' hours, '+ data.minutes +' minute.</time></p>',
        '</div>'
    );

    let htmlString = template.join('');
    element.innerHTML = htmlString;
}