const express = require("express");
const app = express();
const router = express.Router();
const controller = require("../controller/controller");

router.use("/api/selection", controller.selection);
router.use("/api/login", controller.login);
router.use("api/addnewuser", controller.addNewUser);
router.use("api/addnewstarosta", controller.addNewStarosta);
router.use("/api/addstudents", controller.insertingStudent);
router.use("/api/deletstudents", controller.deletingStudent);
router.use("/api/uppdatestudents", controller.uppdateStudent);
app.use(function (err, req, res) {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});

module.exports = router;