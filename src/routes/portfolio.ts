import express, { Request, Response, Router } from "express";
import asyncHandler from "express-async-handler";
import { Portfolio } from "../models/Portfolio";

const router: Router = express.Router();

// POST /api/portfolio
router.post(
  "/",
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { projectsData, experienceData, educationData, ...rest } = req.body;

    const newPortfolio = new Portfolio({
      ...rest,
      projects: JSON.parse(projectsData),
      experience: JSON.parse(experienceData),
      education: educationData ? JSON.parse(educationData) : [],
    });

    const savedPortfolio = await newPortfolio.save();
    // Instead of returning a value, simply send the response.
    res.status(201).json(savedPortfolio);
  })
);

// GET /api/portfolio/:id
router.get(
  "/:id",
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) {
      res.status(404).json({ error: "Portfolio not found" });
      return;
    }
    res.json(portfolio);
  })
);

export default router;
