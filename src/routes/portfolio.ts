import express from 'express';
import PortfolioItem from '../models/Portfolio';
import auth from '../middleware/auth';

const router = express.Router();

// Add portfolio item
router.post('/', auth, async (req: any, res) => {
  const { title, description, images, tags } = req.body;

  try {
    const newItem = new PortfolioItem({
      userId: req.userId,
      title,
      description,
      images,
      tags
    });

    await newItem.save();
    res.json(newItem);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Get user's portfolio items
router.get('/me', auth, async (req: any, res) => {
  try {
    const items = await PortfolioItem.find({ userId: req.userId }).sort('-createdAt');
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Get public portfolio items by username
router.get('/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user || !user.portfolioSettings.isPublic) {
      return res.status(404).json({ message: 'Portfolio not found or private' });
    }

    const items = await PortfolioItem.find({ userId: user._id }).sort('-createdAt');
    res.json({
      user: {
        username: user.username,
        profile: user.profile
      },
      items
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

export default router;