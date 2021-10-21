const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = require("./app/models");
db.sequelize.sync();

require("./app/routes/routes")(app);

const port = 3001;
app.listen(port, function () {
  console.log("Server running on port:", port);
});
