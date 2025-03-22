const express = require('express');
const { body, validationResult } = require('express-validator');
const Rating = require('../models/rating');
const Store = require('../models/store');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.post(
  '/',
  authMiddleware(['user']),
  [body('store_id').isInt(), body('rating').isInt({ min: 1, max: 5 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const rating = await Rating.createOrUpdate({ ...req.body, user_id: req.user.id });
    res.status(201).json(rating);
  }
);

router.get('/store/:storeId', authMiddleware(['store_owner']), async (req, res) => {
  const store = await Store.findByOwner(req.user.id);
  if (store.id !== parseInt(req.params.storeId)) {
    return res.status(403).json({ message: 'Unauthorized' });
  }
  const ratings = await Rating.findByStore(req.params.storeId);
  const average = await Rating.averageRating(req.params.storeId);
  res.json({ ratings, average });
});

module.exports = router;