import express from 'express';
import { IUser } from '../models/User';
import User from '../models/User';
import auth from '../middleware/auth';

const router = express.Router();

// Get current user
router.get('/me', auth, async (req: any, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Update user profile
router.put('/profile', auth, async (req: any, res) => {
  const { fullName, title, bio, links, skills } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        'profile.fullName': fullName,
        'profile.title': title,
        'profile.bio': bio,
        'profile.links': links,
        'profile.skills': skills
      },
      { new: true }
    ).select('-password');

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Update portfolio settings
router.put('/settings', auth, async (req: any, res) => {
  const { isPublic, customDomain, theme } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        'portfolioSettings.isPublic': isPublic,
        'portfolioSettings.customDomain': customDomain,
        'portfolioSettings.theme': theme
      },
      { new: true }
    ).select('-password');

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

export default router;