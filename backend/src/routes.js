const { Router } = require('express');

//IMPORT ALL THE API ROUTES HERE
const notes = require('./api/notes/notes.routes');

const tags = require('./api/tags/tags.routes');
const ratings = require('./api/ratings/ratings.routes');
const users = require('./api/users/users.routes');

//------------------------------


const router = Router();

router.use('/notes',notes);
router.use('/tags',tags);
router.use('/ratings',ratings);
router.use('/users',users);

module.exports = router;