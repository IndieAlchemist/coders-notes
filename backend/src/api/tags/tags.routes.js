const router = require('express').Router();
const { addTag, getTags, updateTag, removeTag } = require('./tags.controller');

router.get('/', getTags);
router.get('/:id', getTags);
router.put('/:id', updateTag);
router.post('/', addTag);
router.delete('/:id', removeTag);

module.exports = router;
