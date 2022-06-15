/* App frontend script */
function getInfo() {
    debugger;
    console.log("something");
    debugger;
}

function checkAPI() {
    AP.request('/rest/api/2/issue/DW-1/changelog', {
        success: function(res) {
            console.log(res);
        }
    });
}