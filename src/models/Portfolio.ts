import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String,
  link: String,
  github: String,
});

const ExperienceSchema = new mongoose.Schema({
  icon: String,
  title: String,
  company: String,
  period: String,
  description: String,
});

const EducationSchema = new mongoose.Schema({
  institution: String,
  degree: String,
  period: String,
});

const PortfolioSchema = new mongoose.Schema({
  name: String,
  title: String,
  company: String,
  about: String,
  email: String,
  location: String,
  phone: String,
  imageUrl: String,
  skills: String,
  github: String,
  linkedin: String,
  twitter: String,
  website: String,
  theme: String,
  projects: [ProjectSchema],
  experience: [ExperienceSchema],
  education: [EducationSchema],
  createdAt: String,
});

export const Portfolio = mongoose.model("Portfolio", PortfolioSchema);
