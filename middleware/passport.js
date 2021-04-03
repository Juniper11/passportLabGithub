const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const userController = require("../controllers/userController");
const dotenv = require("dotenv");
dotenv.config();
console.log(process.env.GITHUB_CLIENT_ID);
console.log(process.env.GITHUB_CLIENT_SECRET);
const localLogin = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (email, password, done) => {
    const user = userController.getUserByEmailIdAndPassword(email, password);
    return user
      ? done(null, user)
      : done(null, false, {
        message: "Your login details are not valid. Please try again",
      });
  }
);

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.callbackURL
},
  function (accessToken, refreshToken, profile, done) {
    console.log(profile)
    // User.findOrCreate({ githubId: profile.id }, function (err, user) {
    return done();
    // });
  }
));

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  let user = userController.getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});

module.exports = passport.use(localLogin);
