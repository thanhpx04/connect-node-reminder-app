/* App frontend script */
function getInfo() {
    debugger;
    console.log("something");
    debugger;
    console.log("something else");
}

function checkAPI() {
    AP.context.getContext().then(
        response => {
            let issueKey;

            debugger;
            issueKey = response.jira.issue.key;
            if(issueKey){
                AP.request(`/rest/api/2/issue/${issueKey}/changelog`).then(
                    res => {
                        let listHistoryStatus;

                        debugger;
                        const listHistoryItem = res.values;
                        listHistoryStatus = listHistoryItem.filter(findStatusItemOfHistory);
                        console.log(listHistoryStatus);
                    }
                );

            }
        }
    );
}

function findStatusItemOfHistory(value, index, array) {
    let fieldIdOfStatus;

    fieldIdOfStatus = value.items.fieldId;
    return fieldIdOfStatus == "status";
  }