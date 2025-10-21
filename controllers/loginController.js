const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const prisma = require("../db/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

passport.use(
  new LocalStrategy(async (username, password, done) => {
    const user = await prisma.admins.findUnique({
      where: {
        username: username,
      },
    });
    if (!user) {
      return done(null, false, { message: "Incorrect password or username" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return done(null, false, { message: "Incorrect password or username" });
    }
    return done(null, user);
  })
);

function adminLogin(req, res) {
  passport.authenticate("local", { session: false }, (err, user, message) => {
    if (err || !user) {
      return res.status(404).json({
        message: message,
        user: user,
      });
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }
      const token = jwt.sign(user, process.env.JWT_SECRET);
      res.json({
        message: "Login success",
        token: token,
      });
    });
  })(req, res);
}

module.exports = {
  adminLogin,
};
