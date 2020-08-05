const { Router } = require('express');

//IMPORT ALL THE API ROUTES HERE
const notes = require('./api/notes/notes.routes');
//------------------------------


const router = Router();

router.use('/notes',notes);

module.exports = router;