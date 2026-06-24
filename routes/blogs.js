const express = require("express");
const router = express.Router();
const {
  handleGetAllBlogs,
  handleCreateBlog,
  handleGetBlogCategories,
  handleGetBlogByID,
  handleUpdateBlog,
} = require("../controllers/blogs");

router.get("/", handleGetAllBlogs);
router.post("/create", handleCreateBlog);
router.get("/categories", handleGetBlogCategories);
router.get("/getBlogDetails/:id", handleGetBlogByID);
router.put("/update/:id", handleUpdateBlog);

module.exports = router;
