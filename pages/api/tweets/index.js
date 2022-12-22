// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {

    // oauth verification
    var OAuth = require('oauth');

    var oauth = new OAuth.OAuth(
        'https://api.twitter.com/oauth/request_token',
        'https://api.twitter.com/oauth/access_token',
        process.env.API_KEY,
        process.env.API_SECRET,
        '1.0A',
        null,
        'HMAC-SHA1'
    );

    // get request
    oauth.get(
        'https://api.twitter.com/2/tweets?ids=1278747501642657792,1255542774432063488',
        process.env.USER_KEY, //test user token
        process.env.USER_SECRET, //test user secret            
        function (e, data, r) {
            if (e) console.error(e);
            res.status(200).json({ result: JSON.parse(data) })
        });

}
