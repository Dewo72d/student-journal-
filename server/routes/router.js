const express = require("express");
const app = express();
const router = express.Router();
const controller = require("../controller/controller");

router.use("/api/cookie", controller.testCookie);
router.use("/api/selection", controller.selection);
router.use("/api/login", controller.login);
router.use("api/addnewuser", controller.addNewUser);
router.use("/api/students", controller.student);
router.use("/api/setstudents", controller.students);
router.use("/api/addstudents", controller.insertingStudent);
router.use("/api/deletstudents", controller.deletingStudent);
router.use("/api/uppdatestudents", controller.uppdateStudent);
router.use("/api/marking", controller.marking);
router.use("/api/updatemark", controller.updateMarking);
router.use("/api/addnewstarosta", controller.insertingStarosta);
router.use("/api/addnewprepod", controller.insertingPrepod);
router.use("/api/getstarosta", controller.getStarosta);
router.use("/api/getprepod", controller.getPrepod);
router.use("/api/deleteprepod", controller.deletePrepod);

app.use(function (err, req, res) {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});

module.exports = router;
