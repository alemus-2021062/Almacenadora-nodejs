const {connection} = require('./database/config');
const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const routes = require("./routes/server");
const cors = require("cors");

connection();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use("/api", routes);
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});