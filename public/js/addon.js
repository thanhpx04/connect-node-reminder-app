/* App frontend script */

function checkAPI() {
    AP.context.getContext().then(
        response => {
            let issueKey;

            issueKey = response.jira.issue.key;
            if(issueKey){
                AP.request(`/rest/api/2/issue/${issueKey}/changelog`)
                .then(response => response.json())
                .then(json => console.log(json))
                .catch(err => console.log('Request Failed', err));
                // then(
                //     res => {
                //         let listHistoryItem, listHistoryStatus;

                //         debugger;
                //         listHistoryItem = res.values;
                //         listHistoryStatus = listHistoryItem.filter(findStatusItemOfHistory);
                //         console.log(listHistoryStatus);
                //     }
                // );

            }
        }
    );
}

function findStatusItemOfHistory(value, index, array) {
    let fieldIdOfStatus;

    fieldIdOfStatus = value.items.fieldId;
    return fieldIdOfStatus == "status";
  }