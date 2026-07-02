require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
// const { connectMongoDB } = require("./connection");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectMongoDB } = require("./connection");
const PORT = process.env.PORT;
const MongoDB_URL = process.env.MongoDB_URL;

connectMongoDB(MongoDB_URL)
  .then(() => console.log("Connected MongoDB"))
  .catch((err) => console.log("Error connecting MongoDB", err));

const blogRouter = require("./routes/blogs");
const userRouter = require("./routes/user");
const fileRouter = require("./routes/fileupload");
const { logReqRes } = require("./middlewares");

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Routes

app.get("/", (req, res) => {
  res.render("home");
});
app.use("/api/blogs", blogRouter);
app.use("/api/user", userRouter);
app.use("/api/file", fileRouter);

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));
