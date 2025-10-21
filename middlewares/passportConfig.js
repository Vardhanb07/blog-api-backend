const passport = require("passport");
const JwtStartegy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const prisma = require("../db/client");
require("dotenv").config();

passport.use(
  new JwtStartegy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (payload, done) => {
      const user = await prisma.admins.findUnique({
        where: {
          id: payload.id,
        },
      });
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    }
  )
);
