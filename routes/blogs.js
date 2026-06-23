const express = require("express");
const router = express.Router();
const {
  handleGetAllBlogs,
  handleCreateBlog,
  handleGetBlogCategories,
} = require("../controllers/blogs");

router.get("/", handleGetAllBlogs);
router.post("/create", handleCreateBlog);
router.get("/categories", handleGetBlogCategories);

module.exports = router;
