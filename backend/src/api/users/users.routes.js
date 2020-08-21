const router = require('express').Router();
const { addUser, getUsers, removeUser } = require('./users.controller');

router.get('/', getUsers);
router.get('/:id', getUsers);
router.post('/', addUser);
router.delete('/:id', removeUser);

module.exports = router;