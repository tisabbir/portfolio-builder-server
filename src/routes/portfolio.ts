import express from "express";
import { Portfolio } from "../models/Portfolio";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const newPortfolio = new Portfolio(req.body);
    await newPortfolio.save();
    res.status(201).json({ message: "Portfolio saved successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to save portfolio" });
  }
});

export default router;
