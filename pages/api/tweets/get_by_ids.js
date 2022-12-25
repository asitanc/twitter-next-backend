import { auth } from "../../../src/oauth";

export default async function handler(req, res) {
    /** fetch tweets based on ids in request body, POST */

    const request = JSON.parse(req.body);
    const ids = request.ids;

    const accessToken = await auth();
  
    const result = await fetch(`https://api.twitter.com/2/tweets?ids=${ids}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then((res) => res.json())

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(result);
}