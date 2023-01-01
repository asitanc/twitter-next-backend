import { auth } from "../../../src/oauth";

export default async function handler(req, res) {
    /** fetch tweets based on ids in request body, POST */
    const url = 'https://api.twitter.com'

    const request = JSON.parse(req.body);
    const method = request.method;
    const apiUrl = request.apiUrl ? `${url}${request.apiUrl}` : null;
    const query = request.query ? `${apiUrl}?query=${request.query}` : `${apiUrl}`;
    const expansions = request.expansions ? `${query}&expansions=${request.expansions}` : `${query}`;
    const tweetFields = request.tweetFields ? `${expansions}&tweet.fields=${request.tweetFields}` : `${expansions}`;
    const userFields = request.userFields ? `${tweetFields}&user.fields=${request.userFields}` : `${tweetFields}`;
    const maxResults = request.maxResults ? `${userFields}&max_results=${request.maxResults}` : `${userFields}`;
    const requestUrl = maxResults;
    const accessToken = await auth();
    
    if (requestUrl === null) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(200).json({ error: 'No URL provided' });
    }

    // for now only allow GET requests
    if (method !== 'GET') {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(200).json({ error: 'Only GET requests are allowed' });
    }

    const result = await fetch(`${requestUrl}`, {
        method: method,
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    }).then((res) => res.json());

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(result);
}