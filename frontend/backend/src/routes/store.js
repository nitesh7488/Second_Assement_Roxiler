const express = require('express');
const { body, validationResult } = require('express-validator');
const Store = require('../models/store');
const Rating = require('../models/rating');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.post(
  '/',
  authMiddleware(['admin']),
  [
    body('name').isLength({ min: 20, max: 60 }),
    body('email').isEmail(),
    body('address').isLength({ max: 400 }),
    body('owner_id').isInt(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const store = await Store.create(req.body);
    res.status(201).json(store);
  }
);

router.get('/', async (req, res) => {
  const { name, address, sortField = 'name', sortOrder = 'ASC' } = req.query;
  const stores = await Store.findAll({ name, address }, { field: sortField, order: sortOrder });
  if (req.user) {
    for (let store of stores) {
      store.userRating = (await Rating.findByUserAndStore(req.user.id, store.id))?.rating || null;
    }
  }
  res.json(stores);
});

module.exports = router;