import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    details: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    liveDemoUrl: {
      type: String,
      required: true
    },
    thumbnail: {
      type: String,
      required: true
    },
    pictures: {
      type: [String],
      default: []
    }
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);