import { auth } from "../../../src/oauth";

export default async function handler(req, res) {
    /** fetch tweets based on ids in request body, POST */

    const url = 'https://api.twitter.com'

    const request = JSON.parse(req.body);
    const method = request.method;
    const apiUrl = request.apiUrl ?? `${url}${request.apiUrl}`;
    const query = request.query ? `${apiUrl}?query=${request.query}` : `${apiUrl}`;
    const expansions = request.expansions ? `${url}?expansions=${request.expansions}` : `${query}`;
    const tweetFields = request.tweetFields ? `${url}?tweet.fields=${request.tweetFields}` : `${expansions}`;
    const userFields = request.userFields ? `${url}?user.fields=${request.userFields}` : `${tweetFields}`;
    const maxResults = request.maxResults ? `${url}?max_results=${request.maxResults}` : `${userFields}`;
    const requestUrl = maxResults;
    const accessToken = await auth();
    
    const result = await fetch(`${requestUrl}`, {
        method: method,
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    }).then((res) => res.json());

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(result);
}