const { Schema, model } = require("mongoose");

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    blogImage: {
      type: String,
      required: true,
    },
    // author: {
    //   type: String,
    //   required: true,
    // },
    // authorImage: {
    //   type: String,
    // },
  },
  { timestamps: true },
);

const Blogs = model("blogs", blogSchema);

module.exports = Blogs;
