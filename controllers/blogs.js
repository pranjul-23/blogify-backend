const Blog = require("../models/blogs");

const handleGetAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({})
      .populate("createdBy", "fullName profileImage")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Blogs fetched successfully.",
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

    const blog = await Blog.create({
      title,
      description,
      category,
      blogImage,
      createdBy: req.user._id,
    });
    return res.status(201).json({
      success: true,
      message: "Blog created successfully.",
      data: blog,
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
  return res.status(200).json({
    success: true,
    message: "Categories fetched successfully.",
    data: categories,
  });
};

const handleGetBlogByID = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id).populate(
      "createdBy",
      "fullName profileImage",
    );

    if (!blog) {
      return res
        .status(401)
        .json({ success: false, message: "Blog not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Blog fetched successfully.",
      data: blog,
    });
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
    const { id } = req.params;
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

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found.",
      });
    }

    if (blog.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to edit this blog.",
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
      data: blog,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error?.message || "Something went wrong.",
    });
  }
};

const handleDeleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    await Blog.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Blog deleted successfully.",
      data: null,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong.",
    });
  }
};

const handleGetMyBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ createdBy: req.user._id })
      .populate("createdBy", "fullName profileImage")
      .sort({
        createdAt: -1,
      });
    return res.status(200).json({
      success: true,
      message: "Blogs fetched successfully",
      data: blogs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  handleGetAllBlogs,
  handleCreateBlog,
  handleGetBlogCategories,
  handleGetBlogByID,
  handleUpdateBlog,
  handleDeleteBlog,
  handleGetMyBlogs,
};
