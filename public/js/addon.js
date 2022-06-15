/* App frontend script */
function getInfo() {
    debugger;
    console.log("something");
    debugger;
}

function checkAPI() {

    AP.context.getContext().then(response => {
        console.log(
          `Response: ${response.jira.issue.key}`
        );
        return response.text();
    });
    
    AP.context.getContext(function(response){
        console.log(response.jira.issue.key);
    });
    // AP.request('/rest/api/2/issue/DW-1/changelog', {
    //     success: function(res) {
    //         console.log(res);
    //     }
    // });
fetch('https://your-domain.atlassian.net/rest/api/2/issue/{issueIdOrKey}/changelog', {
  method: 'GET',
  headers: {
    'Authorization': `Basic ${Buffer.from(
      'email@example.com:<api_token>'
    ).toString('base64')}`,
    'Accept': 'application/json'
  }
})
  .then(response => {
    console.log(
      `Response: ${response.status} ${response.statusText}`
    );
    return response.text();
  })
  .then(text => console.log(text))
  .catch(err => console.error(err));
}