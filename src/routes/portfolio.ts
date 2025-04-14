import express from "express";
import { Portfolio } from "../models/Portfolio";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { projectsData, experienceData, educationData, ...rest } = req.body;

    const newPortfolio = new Portfolio({
      ...rest,
      projects: JSON.parse(projectsData),
      experience: JSON.parse(experienceData),
      education: educationData ? JSON.parse(educationData) : [],
    });

    const savedPortfolio = await newPortfolio.save();
    res.status(201).json(savedPortfolio);
  } catch (err) {
    console.error("Error saving portfolio:", err);
    res.status(500).json({ error: "Failed to save portfolio" });
  }
});

export default router;
