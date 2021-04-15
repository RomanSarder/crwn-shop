const express = require('express')
const path = require('path')
const compression = require('compression')
const app = express()
const PORT = process.env.PORT || 5000

app.use(express.static(path.join(__dirname, '../build')));
app.use(compression())

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(PORT, error => {
    if (error) throw error;
    console.log('Server running on port ' + PORT);
});