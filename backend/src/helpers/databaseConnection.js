const mongoose = require('mongoose');

const { NODE_ENV, TEST_MONGO_URI, MONGO_URI } = require('../config');

const URI = NODE_ENV === 'test' ? TEST_MONGO_URI : MONGO_URI;

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('Database connected')
},
    error => {
        console.log('Database could not be connected : ' + error)
    }
);