const express = require("express");
const router = express.Router();
const passport = require("passport");
const controller = require("../controller/home");

router.post("/register", controller.register);
router.post("/login", controller.login);

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  controller.home
);
router.post(
  "/addmember",
  passport.authenticate("jwt", { session: false }),
  controller.addMember
);
router.get(
  "/biling",
  passport.authenticate("jwt", { session: false }),
  controller.biling
);
router.post(
  "/removemember",
  passport.authenticate("jwt", { session: false }),
  controller.removeMember
);
router.get(
  "/dashboard",
  passport.authenticate("jwt", { session: false }),
  controller.dashboard
);

module.exports = router;
