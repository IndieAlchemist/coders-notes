const router = require('express').Router();
const { addNote, getNotes, updateNote, removeNote } = require('./notes.controller');

router.get('/', getNotes);
router.get('/:id', getNotes);
router.put('/:id', updateNote);
router.post('/', addNote);
router.delete('/:id', removeNote);

module.exports = router;
