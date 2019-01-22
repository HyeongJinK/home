console.log("\x1b[31m", "\nApp Setting Start...")
console.log("\x1b[32m")

const path = require('path');
const express = require('express');
//const expressLayouts = require('express-ejs-layouts');

const app = express(),
            DIST_DIR = __dirname,
            HTML_FILE = path.join(DIST_DIR, 'index.html');

//app.set('view engine', 'ejs');

app.use(express.static(DIST_DIR));

app.get('*', (req, res) => {
    res.sendFile(HTML_FILE);
});

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`App listening to ${PORT}`)
});

console.log("\x1b[31m", "\nApp Setting Finish...");
console.log("\x1b[37m");