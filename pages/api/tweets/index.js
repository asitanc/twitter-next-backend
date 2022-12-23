export default async function handler(req, res) {

    const request = JSON.parse(req.body);
    const query = request.query;

    const OAuth2 = require('oauth').OAuth2;
    const promisify = f => (...args) => new Promise((a,b)=>f(...args, (err, res) => err ? b(err) : a(res)));

    var oauth2 = new OAuth2(
        process.env.API_KEY,
        process.env.API_SECRET,
        'https://api.twitter.com/',
        null,
        'oauth2/token',
        null,
        'HMAC-SHA1'
    );

    const getOAuthAccessToken = promisify(oauth2.getOAuthAccessToken.bind(oauth2))
    const accessToken = await getOAuthAccessToken('', { grant_type: 'client_credentials' })
  
    const result = await fetch(`https://api.twitter.com/2/tweets/search/recent?query=${query}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then((res) => res.json())

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(result);

}
