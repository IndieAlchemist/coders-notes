const colors = require('colors/safe');

const { HOST, PORT } = require('./config');
const app = require('./app');

app.listen(PORT, HOST,
    () => console.log(colors.cyan(`Server started @ http://${HOST}:${PORT}/`)));