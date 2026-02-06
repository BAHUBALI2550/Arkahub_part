const crypto = require("crypto");

function generateSig(url, token, timestamp) {
  return crypto
    .createHash("md5")
    .update(url + token + timestamp)
    .digest("hex");
}

module.exports = {
  generateSig,
};
