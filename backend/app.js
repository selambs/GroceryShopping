const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

const fs = require("fs");
const morgan = require("morgan");
const path = require("path");

const swaggerjsdoc = require("./swagger.json");
const swaggerui = require("swagger-ui-express");

const farmerRouter = require("./route/farmerRouter");
const customerRouter = require("./route/customerRouter");
const orderRouter = require("./route/orderRouter");
const superuserRouter = require("./route/superuserRouter");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//create as stream to get log file for all request by using morgan
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);
app.use(morgan("combined", { stream: accessLogStream }));

//for documentation by using swagger
app.use("/swagger", swaggerui.serve, swaggerui.setup(swaggerjsdoc));

app.use(farmerRouter);
app.use(customerRouter);
app.use(orderRouter);
app.use(superuserRouter);

mongoose
  .connect("mongodb://localhost:27017/covid19-shopping", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(3000, () => {
      console.log(
        "server is running on 3000" + " " + "http://localhost:3000/swagger/#/"
      );
    });
  })
  .catch((err) => console.log(err));
