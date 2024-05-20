const UAParser = require("ua-parser-js");

const userAgentString =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36";

const uaParser = new UAParser();
const result = uaParser.setUA(userAgentString).getResult();

const browser = result;

console.log(browser);
