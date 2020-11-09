if (process.env.NODE_ENV === "production") {
  // we are in production
  module.exports = require("./prod.js");
} else {
  module.exports = require("./dev.js");
}
