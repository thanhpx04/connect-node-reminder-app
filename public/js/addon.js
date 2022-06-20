/* App frontend script */

function checkAPI() {
    AP.context.getContext().then(
        response => {
            let issueKey;

            issueKey = response.jira.issue.key;
            if(issueKey){
                AP.request(`/rest/api/2/issue/${issueKey}/changelog`)
                .then(res => {
                    let resObj, listHistoryItem, listHistoryStatus;
                    debugger;
                    resObj = JSON.parse(res);
                    listHistoryItem = res.values;
                    listHistoryStatus = listHistoryItem.filter(findStatusItemOfHistory);
                    console.log(listHistoryStatus);
                })
                .catch(err => console.log('Request Failed', err));
            }
        }
    );
}

function findStatusItemOfHistory(value, index, array) {
    let fieldIdOfStatus;

    fieldIdOfStatus = value.items.fieldId;
    return fieldIdOfStatus == "status";
  }