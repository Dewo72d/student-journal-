const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");     // для кросдоменных запросов
const multer = require("multer"); // для обработки react-hook-form или простых форм
const cookieParser = require("cookie-parser");
const upload = multer();
const app = express();
const port = 4000;

app.use(cors());    //Кроссдоменные запросы

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(upload.array());            //для работы с формами
app.use(express.static("public"));  //для работы с формами
app.use(cookieParser());            //для работы с куки

app.use(require("./routes/router.js"));

app.listen(port, '0.0.0.0', () => {
    console.log(`http:localhost:${port}`);
});
