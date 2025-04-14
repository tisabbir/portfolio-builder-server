import mongoose from "mongoose";

const PortfolioSchema = new mongoose.Schema({
  name: String,
  email: String,
  profession: String,
  bio: String,
  skills: [String],
  projects: [String],
  // Add other fields you collect
});

export const Portfolio = mongoose.model("Portfolio", PortfolioSchema);
