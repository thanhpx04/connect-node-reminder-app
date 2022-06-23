export default function routes(app, addon) {
    // Redirect root path to /atlassian-connect.json,
    // which will be served by atlassian-connect-express.
    app.get('/', (req, res) => {
        res.redirect('/atlassian-connect.json');
    });

    app.get('/main', (req, res) => {
        const {issueKey} = req.query
        getHistoryItem(addon, req, issueKey).then((newestHistoryStatus) => {
          res.render(
            'main.hbs',
            {
                title: 'Main',
                newestHistoryStatus: newestHistoryStatus,
                issueKey: issueKey
            }
          );
        })
    });

    async function getHistoryItem (addon, req, issueKey)  {
      return new Promise((resolve, reject) => {
        var httpClient = addon.httpClient(req);
        httpClient.get(`/rest/api/3/issue/${issueKey}`, function (err, res, body) {
            resolve(JSON.parse(body).fields.summary)
        });
        //   var httpClient = addon.httpClient(req);

        //   httpClient.get(`/rest/api/2/issue/${issueKey}/changelog`, function (err, res, body) {
        //       debugger
        //       console.log(JSON.parse(body).values)
        //       resolve(JSON.parse(body).values[0].items[0].toString)
              
        //     // var listHistoryItem = JSON.parse(body).values;
        //     // // get the newest status item of history
        //     // var newestStatus = getNewestHistoryItemStatus(listHistoryItem);
        //     // resolve(calculateMillisecond(newestStatus))
        //   });
      })
    }
    
    const getNewestHistoryItemStatus = (listHistoryItem) => {
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

    const findStatusItemOfHistory = (value, index, array) => {
        let fieldIdOfStatus = value.items[0].fieldId;
        return fieldIdOfStatus == "status";
    }
    
    const calculateMillisecond = (newestStatus) => {
        let difMillisecond = ( new Date() - new Date(newestStatus.created) ); // milliseconds between now & newestStatus
        let difDays = Math.floor(difMillisecond / 86400000); // days
        let difHours = Math.floor((difMillisecond % 86400000) / 3600000); // hours
        let difMinutes = Math.round(((difMillisecond % 86400000) % 3600000) / 60000); // minutes
    
        return {
            status: newestStatus.items[0].toString,
            days: difDays,
            hours: difHours,
            minutes: difMinutes
        };
    }

    // Add additional route handlers here...
}
