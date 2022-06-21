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

function trigger() {
    let body = {"self":"https://hienthanh180721.atlassian.net/rest/api/2/issue/PD-4/changelog?maxResults=100&startAt=0","maxResults":100,"startAt":0,"total":5,"isLast":true,"values":[{"id":"10028","author":{"self":"https://hienthanh180721.atlassian.net/rest/api/2/user?accountId=623940b450bb2b0070b5478c","accountId":"623940b450bb2b0070b5478c","avatarUrls":{"48x48":"https://secure.gravatar.com/avatar/39fbc09c1ff29f229f80379f569b4c50?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FHT-5.png","24x24":"https://secure.gravatar.com/avatar/39fbc09c1ff29f229f80379f569b4c50?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FHT-5.png","16x16":"https://secure.gravatar.com/avatar/39fbc09c1ff29f229f80379f569b4c50?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FHT-5.png","32x32":"https://secure.gravatar.com/avatar/39fbc09c1ff29f229f80379f569b4c50?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FHT-5.png"},"displayName":"hien thanh","active":true,"timeZone":"Asia/Bangkok","accountType":"atlassian"},"created":"2022-06-16T18:20:55.282+0700","items":[{"field":"assignee","fieldtype":"jira","fieldId":"assignee","from":null,"fromString":null,"to":"623940b450bb2b0070b5478c","toString":"hien thanh","tmpFromAccountId":null,"tmpToAccountId":"623940b450bb2b0070b5478c"}]},{"id":"10029","author":{"self":"https://hienthanh180721.atlassian.net/rest/api/2/user?accountId=623940b450bb2b0070b5478c","accountId":"623940b450bb2b0070b5478c","avatarUrls":{"48x48":"https://secure.gravatar.com/avatar/39fbc09c1ff29f229f80379f569b4c50?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FHT-5.png","24x24":"https://secure.gravatar.com/avatar/39fbc09c1ff29f229f80379f569b4c50?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FHT-5.png","16x16":"https://secure.gravatar.com/avatar/39fbc09c1ff29f229f80379f569b4c50?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FHT-5.png","32x32":"https://secure.gravatar.com/avatar/39fbc09c1ff29f229f80379f569b4c50?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FHT-5.png"},"displayName":"hien thanh","active":true,"timeZone":"Asia/Bangkok","accountType":"atlassian"},"created":"2022-06-20T18:12:30.209+0700","items":[{"field":"status","fieldtype":"jira","fieldId":"status","from":"1","fromString":"Open","to":"3","toString":"In Progress"}]},{"id":"10030","author":{"self":"https://hienthanh180721.atlassian.net/rest/api/2/user?accountId=623940b450bb2b0070b5478c","accountId":"623940b450bb2b0070b5478c","avatarUrls":{"48x48":"https://secure.gravatar.com/avatar/39fbc09c1ff29f229f80379f569b4c50?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FHT-5.png","24x24":"https://secure.gravatar.com/avatar/39fbc09c1ff29f229f80379f569b4c50?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FHT-5.png","16x16":"https://secure.gravatar.com/avatar/39fbc09c1ff29f229f80379f569b4c50?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FHT-5.png","32x32":"https://secure.gravatar.com/avatar/39fbc09c1ff29f229f80379f569b4c50?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FHT-5.png"},"displayName":"hien thanh","active":true,"timeZone":"Asia/Bangkok","accountType":"atlassian"},"created":"2022-06-20T18:12:34.989+0700","items":[{"field":"description","fieldtype":"jira","fieldId":"description","from":null,"fromString":null,"to":null,"toString":"ty"}]},{"id":"10031","author":{"self":"https://hienthanh180721.atlassian.net/rest/api/2/user?accountId=623940b450bb2b0070b5478c","accountId":"623940b450bb2b0070b5478c","avatarUrls":{"48x48":"https://secure.gravatar.com/avatar/39fbc09c1ff29f229f80379f569b4c50?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FHT-5.png","24x24":"https://secure.gravatar.com/avatar/39fbc09c1ff29f229f80379f569b4c50?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FHT-5.png","16x16":"https://secure.gravatar.com/avatar/39fbc09c1ff29f229f80379f569b4c50?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FHT-5.png","32x32":"https://secure.gravatar.com/avatar/39fbc09c1ff29f229f80379f569b4c50?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FHT-5.png"},"displayName":"hien thanh","active":true,"timeZone":"Asia/Bangkok","accountType":"atlassian"},"created":"2022-06-20T18:12:37.694+0700","items":[{"field":"environment","fieldtype":"jira","fieldId":"environment","from":null,"fromString":null,"to":null,"toString":"tyu"}]},{"id":"10032","author":{"self":"https://hienthanh180721.atlassian.net/rest/api/2/user?accountId=623940b450bb2b0070b5478c","accountId":"623940b450bb2b0070b5478c","avatarUrls":{"48x48":"https://secure.gravatar.com/avatar/39fbc09c1ff29f229f80379f569b4c50?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FHT-5.png","24x24":"https://secure.gravatar.com/avatar/39fbc09c1ff29f229f80379f569b4c50?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FHT-5.png","16x16":"https://secure.gravatar.com/avatar/39fbc09c1ff29f229f80379f569b4c50?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FHT-5.png","32x32":"https://secure.gravatar.com/avatar/39fbc09c1ff29f229f80379f569b4c50?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FHT-5.png"},"displayName":"hien thanh","active":true,"timeZone":"Asia/Bangkok","accountType":"atlassian"},"created":"2022-06-20T18:12:49.010+0700","items":[{"field":"status","fieldtype":"jira","fieldId":"status","from":"3","fromString":"In Progress","to":"10004","toString":"Done"}]}]};
    let resObj, listHistoryItem, newestStatus;
    debugger;
    // resObj = JSON.parse(res.body);
    resObj = body;
    listHistoryItem = resObj.values;
    // get the newest status item of history
    newestStatus = getNewestHistoryItemStatus(listHistoryItem);
    // append html to display data
    displayData(newestStatus, calculateMillisecond(newestStatus));
}

function findStatusItemOfHistory(value, index, array) {
    let fieldIdOfStatus = value.items[0].fieldId;
    return fieldIdOfStatus == "status";
}

function getNewestHistoryItemStatus(listHistoryItem) {
    const listHistoryStatus = listHistoryItem.filter(findStatusItemOfHistory);
    let newestStatus;
    debugger;
    newestStatus = listHistoryStatus[0];
    // console.log(listHistoryStatus);
    // debugger;
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
    debugger;
    return {
        days: difDays,
        hours: difHours,
        minutes: difMinutes
    };
}

function displayData(newestStatus, data){
    let element = document.getElementById("details");
    debugger;
    let template = [];

    $("#details").empty();
    template.push(
        '<div class="aui-message">',
            '<p class="title"><strong>Current status: ' + newestStatus.items[0].toString + '</strong></p>',
            '<p>This status was hold for <time>'+ data.days +' days, '+ data.hours +' hours, '+ data.minutes +' minute.</time></p>',
        '</div>'
    );

    var htmlString = template.join('');
    element.innerHTML = htmlString;
}