const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

//Routes
const UserRoutes = require("./routes/user");

mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("DATABASE connected");
  })
  .catch("Error in Database");

//middleWares
app.use(express.json());
app.use(cors());

app.use("/api", UserRoutes);

//port
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
