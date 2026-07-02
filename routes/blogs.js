const express = require("express");
const router = express.Router();
const { checkAuthentication } = require("../middlewares");
const {
  handleGetAllBlogs,
  handleCreateBlog,
  handleGetBlogCategories,
  handleGetBlogByID,
  handleUpdateBlog,
  handleDeleteBlog,
  handleGetMyBlogs,
} = require("../controllers/blogs");

router.get("/", handleGetAllBlogs);
router.post("/create", checkAuthentication, handleCreateBlog);
router.get("/categories", handleGetBlogCategories);
router.get("/getBlogDetails/:id", handleGetBlogByID);
router.put("/update/:id", checkAuthentication, handleUpdateBlog);
router.delete("/delete/:id", checkAuthentication, handleDeleteBlog);
router.get("/my-blogs", checkAuthentication, handleGetMyBlogs);

module.exports = router;
