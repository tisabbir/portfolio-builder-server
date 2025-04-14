import express from 'express';
import Review from '../models/Review';
import auth from '../middleware/auth';

const router = express.Router();

// Add review
router.post('/', auth, async (req: any, res) => {
  const { rating, comment } = req.body;

  try {
    // Check if user already submitted a review
    const existingReview = await Review.findOne({ userId: req.userId });
    if (existingReview) {
      return res.status(400).json({ message: 'You already submitted a review' });
    }

    const newReview = new Review({
      userId: req.userId,
      rating,
      comment
    });

    await newReview.save();
    res.json(newReview);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Get all reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find().populate('userId', 'username profile.avatar');
    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

export default router;