export default function handler(req, res) {
    //console.log("hello")
    //res.setHeader("Allow-Access-Control-Origin", null);
    res.status(200).json({response : "Hello", data: "Its me"})
}
