const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = require("./app/models");
db.sequelize.sync();

require("./app/routes/routes")(app);

const port = 3000;
app.listen(port, function () {
  console.log("Server running on port:", port);
});
