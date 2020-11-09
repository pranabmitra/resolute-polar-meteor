const helper = require("../utils/helper");

const showErrorPage = (errorType, res) => {
  let errorMessage = null;
  let errorStatus = "alert-danger";
  switch (errorType) {
    case "uid":
      errorMessage = "Please enter your user id";
      break;
    case "message":
      errorMessage = "Please enter your message";
      break;
    case "unregistered":
      errorMessage = "The user is not registered";
      errorStatus = "alert-warning";
      break;
    case "overaged":
      errorMessage = "The user is more than 10 years old";
      errorStatus = "alert-info";
      break;
    default:
      errorMessage = "Something went wrong!";
      errorStatus = "alert-info";
  }

  res.render("../views/error", { message: errorMessage, status: errorStatus });
};

module.exports = (app) => {
  app.get("/", (request, response) => {
    response.render("../views/index");
  });

  app.get("/error", (req, res) => {
    res.render("../views/error", { message: "Something went wrong!" });
  });

  app.get("/success/:uid", (req, res) => {
    res.render("../views/success", { uid: req.params.uid });
  });

  app.post("/api/santa", async (req, res) => {
    try {
      const { uid, message } = req.body;

      if (!uid) {
        return showErrorPage("uid", res);
      }

      if (!message) {
        return showErrorPage("message", res);
      }

      const isRegistered = await helper.isRegistered(uid);
      if (!isRegistered) {
        return showErrorPage("unregistered", res);
      }

      const isMoreThanTenYears = await helper.isMoreThanTenYears(uid);
      if (isMoreThanTenYears) {
        return showErrorPage("overaged", res);
      }

      helper.setMessage(uid, message);

      res.redirect(`/success/${uid}`);
    } catch (error) {
        console.log('set message: ', error);
      return showErrorPage("", res);
    }
  });

  // redirect to home page for all unmatched routes
  app.all("*", (req, res) => {
    res.redirect("/");
  });
};
