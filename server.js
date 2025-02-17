require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var helpers = require("handlebars-helpers")();
// var bodyParser = require("body-parser");
// var cookieParser = require("cookie-parser");
// var customAuthMiddleware = require("./controllers/customAuthMiddleware");

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(cookieParser());
// app.use(customAuthMiddleware);

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./controllers/itemController")(app);
// require("./controllers/userController")(app);
require("./controllers/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

var apiKey = process.env.USDA_ID;

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
module.exports = apiKey;
