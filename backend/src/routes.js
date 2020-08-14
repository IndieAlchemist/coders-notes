const { Router } = require('express');

//IMPORT ALL THE API ROUTES HERE
const notes = require('./api/notes/notes.routes');
const tags = require('./api/tags/tags.routes');

//------------------------------


const router = Router();

router.use('/notes',notes);
router.use('/tags',tags);


module.exports = router;