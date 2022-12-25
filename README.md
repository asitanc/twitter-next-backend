# Twitter NextJS Backend
An easy example of Twitter backend using [Twitter API v2](https://developer.twitter.com/en/docs/twitter-api) and [OAuth2 authorization](https://oauth.net/2/) using [NextJS](https://nextjs.org).

This example can be easily deployed on [Vercel](https://vercel.com); however, it will be necessary to prepare the APIs and also register as [developer with Twitter account](https://developer.twitter.com/). So far, there are only a few examples to fetch tweets by query and ids, and fetch user info by username.

The current APIs get query from request body, but you can also move the API use [dynamic route](https://nextjs.org/docs/routing/dynamic-routes).

```
/pages/api/ - API examples
/src/oauth/index.js - OAuth2 authorization script that you need to use in API to get access key!
```

*This source code is what helped me get rid of 401 error. Most resources I found online were complaining about the Twitter APIv2 servers issues etc. (which is possible ofc) I think my code before was just bad and this works, so it was bad. See threads here: [1](https://twittercommunity.com/t/401-unauthorized-error-with-v2-api/149187/3) [2](https://stackoverflow.com/questions/19343141/twitter-api-returned-a-401-unauthorized-an-error-occurred-processing-your-req)*

Check [Twitter API endpoint status here](https://api.twitterstat.us).