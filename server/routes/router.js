const express = require("express");
const app = express();
const router = express.Router();
const controller = require("../controller/controller");
//const jwt = require("jsonwebtoken");
//const { jwtSecret } = require("../config/authConfig");

router.use("/api/selection", controller.selection);

app.use(function (err, req, res) {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});
module.exports = router;
