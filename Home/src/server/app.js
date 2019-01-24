const express = require('express');
const path = require('path');
const route = require('../js/route/route');

const app = express();

app.use(express.static(__dirname));

app.use('/', route);

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`App listening to ${PORT}`)
});