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

const File = model("File", fileSchema);

module.exports = File;
