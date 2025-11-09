"use strict";

const passport = require("passport");
const JwtStartegy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const { client } = require("../db/client");
require("dotenv").config({ quiet: true });

passport.use(
  new JwtStartegy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (payload, done) => {
      let user;
      try {
        user = await client.admins.findUnique({
          where: {
            id: payload.id,
          },
        });
      } catch (e) {
        user = undefined;
      }
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    }
  )
);
