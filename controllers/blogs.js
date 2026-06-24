const Blogs = require("../models/blogs");

const handleGetAllBlogs = async (req, res) => {
  try {
    const blogs = await Blogs.find({});
    return res.status(200).json({
      success: true,
      data: blogs,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong.",
    });
  }
};

const handleCreateBlog = async (req, res) => {
  try {
    const body = req.body;
    const { title, description, category, blogImage } = body;
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
      success: true,
      message: "Blog created successfully.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong.",
    });
  }
};

const handleGetBlogCategories = (req, res) => {
  const categories = [
    { id: 1, name: "Startup" },
    { id: 2, name: "Technology" },
    { id: 3, name: "Lifestyle" },
  ];
  return res.status(200).json({ success: true, data: categories });
};

const handleGetBlogByID = async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await Blogs.findById(id);

    if (!blog) {
      return res
        .status(401)
        .json({ success: false, message: "Blog not found" });
    }
    return res.status(200).json({ success: true, data: blog });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong.",
    });
  }
};

const handleUpdateBlog = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const { title, description, category, blogImage } = body;
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

    const blog = await Blogs.findById(id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found.",
      });
    }
    blog.title = title;
    blog.description = description;
    blog.blogImage = blogImage;
    blog.category = category;
    await blog.save();

    return res.status(201).json({
      success: true,
      message: "Blog updated successfully.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error?.message || "Something went wrong.",
    });
  }
};

module.exports = {
  handleGetAllBlogs,
  handleCreateBlog,
  handleGetBlogCategories,
  handleGetBlogByID,
  handleUpdateBlog,
};
