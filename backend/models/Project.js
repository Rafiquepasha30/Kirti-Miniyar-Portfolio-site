import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug:  { type: String, unique: true, index: true },
  shortDescription: String,
  description: String,
  heroImage: String,            // single hero image URL
  gallery:   [String],          // array of image URLs
  technologies: [String],
  category: String,
  client: String,
  location: String,
  date: Date,
  featured: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model("Project", projectSchema);
