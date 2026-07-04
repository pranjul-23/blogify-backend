require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectMongoDB } = require("./connection");
const PORT = process.env.PORT || 8000;
const MongoDB_URL = process.env.MongoDB_URL;

connectMongoDB(MongoDB_URL)
  .then(() => console.log("Connected MongoDB"))
  .catch((err) => {
    console.error("Error connecting MongoDB", err);
    process.exit(1);
  });

const blogRouter = require("./routes/blogs");
const userRouter = require("./routes/user");
const fileRouter = require("./routes/fileupload");
const { logReqRes } = require("./middlewares");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));

// Routes

app.get("/", (req, res) => {
  res.json({
    message: "Blogify API is running",
  });
});
app.use("/api/blogs", blogRouter);
app.use("/api/user", userRouter);
app.use("/api/file", fileRouter);

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
  });
});

app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));
