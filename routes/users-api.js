/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const userQueries = require("../db/queries/helpers");

router.get("/", (req, res) => {
  userQueries
    .getUsers()
    .then((users) => {
      res.json({ users });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});
router.get("/login/:id", (req, res) => {
  let id = req.params.id;
  userQueries
    .getUserWithId(id)
    .then((user) => {
      res.cookie("userId", user.id);
      res.cookie("userName", user.name);
      res.redirect("/");
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get("/logout", (req, res) => {
  res.clearCookie("userId");
  res.redirect("/");
});

router.get("/login/:id", (req, res) => {
  let id = req.params.id;
  userQueries
    .getUserWithId(id)
    .then((user) => {
      res.cookie("userId", user.id);
      res.cookie("userName", user.name);
      res.redirect("/");
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get("/logout", (req, res) => {
  res.clearCookie("userId");
  res.redirect("/");
});

module.exports = router;
