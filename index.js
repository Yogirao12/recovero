const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("./config/mongoose");
const passport = require("passport");
const jwt = require("./config/passportjwtStrategy");
const session = require("express-session");
const connectMongo = require("connect-mongo");
const PORT = 8000;

app.use(express.urlencoded());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

app.use("/", require("./routers"));

app.use(
  session({
    name: "recovero",
    secret: "something",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
    store: connectMongo.create(
      {
        mongoUrl: "mongodb://127.0.0.1:27017/recovera",
        mongooseConnection: mongoose,
        autoRemove: false,
      },
      function (err) {
        console.log(err || "mongo store is conncted");
      }
    ),
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.listen(PORT, function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log("app is running on port :", PORT);
});
