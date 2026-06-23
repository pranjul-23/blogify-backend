const { Schema, model } = require("mongoose");

const fileSchema = new Schema(
  {
    filename: {
      type: String,
      required: true,
    },
    filepath: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const File = model("file", fileSchema);

module.exports = File;
