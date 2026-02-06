const http = require("http");
const { generateSig } = require("../utils/sig");

const BASE_URL = "http://localhost:3000";
const ENDPOINT = "/device/real/query";
const TOKEN = "interview_token_123";

function postDeviceBatch(snList) {
  return new Promise((resolve, reject) => {
    const timestamp = Date.now().toString();
    const signature = generateSig(ENDPOINT, TOKEN, timestamp);

    const body = JSON.stringify({ sn_list: snList });

    const options = {
      hostname: "localhost",
      port: 3000,
      path: ENDPOINT,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(body),
        timestamp,
        signature,
      },
    };

    const req = http.request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        if (res.statusCode === 200) {
          resolve(JSON.parse(data));
        } else {
          reject({
            status: res.statusCode,
            body: data,
          });
        }
      });
    });

    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

module.exports = {
  postDeviceBatch,
};
