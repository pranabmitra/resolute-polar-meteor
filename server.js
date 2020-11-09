const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Mailer = require("./services/Mailer");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set our app to use the handlebars engine
app.set("view engine", "pug");

app.use(express.static("public"));

// routing
require("./routes/route")(app);

const listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
  /*
   * Send email for all users those have pending request
   *
   * Need to make a valid form submission, then it will start the process.
   * As per as the spec, need to fetch the API on every form submission. Hence, storing all users info
   * while submitting the form to reduce the API call and storing users information in memory.
   */
  const mailer = new Mailer();
  mailer.send();
});
