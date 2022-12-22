// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {

    // oauth verification
    var OAuth2 = require('oauth').OAuth2;

    let token = "";

    var oauth2 = new OAuth2(
        process.env.API_KEY,
        process.env.API_SECRET,
        'https://api.twitter.com/',
        null,
        'oauth2/token',
        null,
        'HMAC-SHA1'
    );

    oauth2.getOAuthAccessToken(
        '',
        { 'grant_type': 'client_credentials' },
        function (e, access_token, refresh_token, results) {
            console.log(results)
            oauth2.get('https://api.twitter.com/2/tweets/search/all?query=NBA',
                access_token, function (e, data, r) {
                    if (e) console.error(e);
                    res.status(200).json({ result: JSON.parse(data) })
                })
        }
    )

    /*
    // get request
    oauth.get(
        'https://api.twitter.com/2/spaces/search?query=NBA&space.fields=title,created_at&expansions=creator_id',
        process.env.USER_KEY, //test user token
        process.env.USER_SECRET, //test user secret            
        function (e, data, r) {
            if (e) console.error(e);
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.status(200).json({ result: JSON.parse(data) })
        });

        */

}
