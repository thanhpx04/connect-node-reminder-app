export default function routes(app, addon) {
    // Redirect root path to /atlassian-connect.json,
    // which will be served by atlassian-connect-express.
    app.get('/', (req, res) => {
        res.redirect('/atlassian-connect.json');
    });

    app.get('/main', addon.authenticate(), (req, res) => {
      const {issueKey} = req.query
      getIssueSummary(addon, req, issueKey).then((issueSummary) => {
        res.render(
          'main.hbs',
          {
              title: 'Main',
              issueSummary: issueSummary,
              issueKey: issueKey
          }
        );
      })
    });

    async function getIssueSummary (addon, req, issueKey)  {
      return new Promise((resolve, reject) => {
        var httpClient = addon.httpClient(req);
        httpClient.get(`/rest/api/2/issue/${issueKey}/changelog`, function (err, res, body) {
          console.log(JSON.parse(body).values);
          resolve(JSON.parse(body).values);
        });
      })
    }

    // Add additional route handlers here...
}
