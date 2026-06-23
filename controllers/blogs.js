const Blogs = require("../models/blogs");

const handleGetAllBlogs = async (req, res) => {
  const blogs = await Blogs.find({});
  return res.status(200).json({
    status: true,
    data: blogs,
  });
};

const handleCreateBlog = async (req, res) => {
  const body = req.body;
  const { title, description, category, blogImage } = body;
  try {
    const errors = {};

    if (!title?.trim()) {
      errors.title = ["Title is required"];
    }

    if (!description?.trim()) {
      errors.description = ["Description is required"];
    }

    if (!category?.trim()) {
      errors.category = ["Category is required"];
    }

    if (!blogImage?.trim()) {
      errors.blogImage = ["Blog image is required"];
    }

    const result = await Blogs.create({
      title,
      description,
      category,
      blogImage,
    });
    return res.status(201).json({
      status: true,
      data: { success: true, id: result._id },
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      errors: { success: false, message: error?.message },
    });
  }
};

const handleGetBlogCategories = (req, res) => {
  const categories = [
    { id: 1, name: "Startup" },
    { id: 2, name: "Technology" },
    { id: 3, name: "Lifestyle" },
  ];
  return res.status(200).send({ success: true, data: categories });
};

module.exports = {
  handleGetAllBlogs,
  handleCreateBlog,
  handleGetBlogCategories,
};
