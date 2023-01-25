import { auth } from "../../../src/oauth";

export default async function handler(req, res) {

    // you can prepare your API request here
    // eg. get the request URL from the request body


    // here you need to get the access token from oauth
    const accessToken = await auth();

    // example URL
    const url = "https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=twitterapi&count=2";

    // fetch data from the API
    const result = await fetch(`${url}`, {
        method: method,
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    }).then((res) => res.json());

    // return the result
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(result);
}