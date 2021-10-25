"use strict";

/**
 * Required External Modules
 */
const express = require("express");
const path = require("path");
const expressSession = require("express-session");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");

require("dotenv").config();

const indexRouter = require("./routes/index");
const authRouter = require("./routes/Auth");
const userRouter = require("./routes/User");
const postRouter = require("./routes/Post");

const db = require('./models/index.js');

/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || "8000";

/**
 * Session Configuration
 */

const session = {
    secret: process.env.SESSION_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: false
};
  
if (app.get("env") === "production") {
    // Serve secure cookies, requires HTTPS
    session.cookie.secure = true;
}

/**
 * Passport Configuration
 */

const strategy = new Auth0Strategy(
    {
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      callbackURL: process.env.AUTH0_CALLBACK_URL
    },
    function(accessToken, refreshToken, extraParams, profile, done) {
      return done(null, profile);
    }
);

/**
 *  App Configuration
 */
app.use(express.urlencoded({extended: true}))

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")));
app.use(expressSession(session));

passport.use(strategy);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {done(null, user);});  
passport.deserializeUser((user, done) => {done(null, user);});

// Creating custom middleware with Express
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated();
    next();
});

// Router mounting
app.use("/", indexRouter);
app.use("/", authRouter);
app.use("/user", userRouter);
app.use("/posts", postRouter);

// Server Activation
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});
