const express = require("express");
const app = express();
const router = express.Router();
const controller = require("../controller/controller");
//const jwt = require("jsonwebtoken");
//const { jwtSecret } = require("../config/authConfig");

router.use("/api/selection", controller.selection);
router.use("/api/addstudents", controller.insertingStudent);
router.use("/api/deletstudents",controller.deletingStudent);
router.use("/api/uppdatestudents",controller.uppdateStudent);
router.use("/api/addstarosta",controller.insertingStarosta);
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
module.exports = router;
