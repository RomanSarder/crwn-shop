var express = require('express')
var path = require('path')
var compression = require('compression')
var enforce = require('express-sslify')
var app = express()
var PORT = process.env.PORT || 5000

app.use(express.static(path.join(__dirname, '../build')));
app.use(compression())

if (process.env.NODE_ENV === 'production') {
    app.use(enforce.HTTPS({ trustProtoHeader: true }))
}

app.get('/service-worker.js', function(req, res) {
    res.sendFile(path.resolve(__dirname, '..', 'build/service-worker.js'))
})

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(PORT, error => {
    if (error) throw error;
    console.log('Server running on port ' + PORT);
});