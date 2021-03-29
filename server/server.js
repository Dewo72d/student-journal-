const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");     // для кросдоменных запросов
const multer = require("multer"); // для обработки react-hook-form или простых форм
const upload = multer();
const app = express();
const port = 4000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(upload.array());
app.use(express.static("public"));

app.use(require("./routes/router.js"));

app.listen(port, () => {
  console.log(`http:localhost:${port}`);
});
