
require("dotenv").config();


const express = require("express"),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  app = express(),
  port = process.env.PORT,
  helmet = require("helmet"),
  client = require("./database/db"),
  isReady = require("./database/dbready");

  app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
  });
  
  app.use(bodyParser.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(helmet());
  app.use(cors());
  








app.use("/api/sellorders",require("./routes/sell"))
app.use("/api/buyorders",require("./routes/buy"))
app.use("/api/askorders",require("./routes/ask"))
app.use("/api/rent",require("./routes/rent"))

app.get('/', (req, res) => res.send('Hello in Waseet!'))























client
  .connect()
  .then(async() => {
    console.log("psql is connected ..");
    app.listen(port, () =>
      console.log(`Example app listening on port ${port}!`)
    );
    await isReady();
  })
  .catch((error) => console.log(error));
