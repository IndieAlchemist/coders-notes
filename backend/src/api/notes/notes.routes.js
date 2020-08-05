const router = require('express').Router();
const { addNote, getNotes, removeNote } = require('./notes.controller');

router.get('/', getNotes);
router.get('/:id', getNotes);
router.post('/', addNote);
router.delete('/:id', removeNote);

module.exports = router;
