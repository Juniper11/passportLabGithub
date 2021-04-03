const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const cookieSession = require("cookie-session");
const path = require("path");
const port = process.env.port || 3000;
const dotenv = require("dotenv");
dotenv.config();

const app = express();

// app.use(cookieSession({
//   name: "github-auth-session",
//   key: ["key1", "key2"]
// }))

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

const passport = require("./middleware/passport");
const authRoute = require("./routes/authRoute");
const indexRoute = require("./routes/indexRoute");

// Middleware for express
app.use(express.json());
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log(`User details are: `);
  console.log(req.user);

  console.log("Entire session object:");
  console.log(req.session);

  console.log(`Session details are: `);
  console.log(req.session.passport);
  next();
});

app.get("/auth/github/error", (req, res) => {
  res.send("Issues authenticating your github retry")
})

app.use("/", indexRoute);
app.use("/auth", authRoute);
app.get("/auth/github/callback", passport.authenticate("github", {
  failureRedirect: "/",
  successRedirect: "/success"
}), (req, res) => {
  res.redirect("/")
})

app.listen(port, () => {
  console.log(`🚀 Server has started on port ${port}`);
});
