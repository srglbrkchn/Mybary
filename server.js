if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");

const indexRouter = require("./routes/index");

app.set("view engine", "ejs");
app.set("View", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));

// set up database
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("err", (err) => {
  console.error(err);
});
db.once("open", () => console.log("Connected to mongoose"));

app.use("/", indexRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log("The server is up and running");
});
