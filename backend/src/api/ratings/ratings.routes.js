const router = require('express').Router();
const { addRating, getRatings, removeRating } = require('./ratings.controller');

router.get('/', getRatings);
router.get('/:id', getRatings);
router.post('/', addRating);
router.delete('/:id', removeRating);

module.exports = router;
