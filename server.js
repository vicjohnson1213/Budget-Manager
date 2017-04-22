var path = require('path'),
    request = require('request'),
    express = require('express'),
    proxy = require('http-proxy-middleware'),
    app = express();

var apiURL = 'https://localhost:3443';

// app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 86400000 }}));

app.use('/api', proxy({
    target: apiURL,
    changeOrigin: true,
    pathRewrite: {"^/api" : "/api"},
    logLevel: 'error'
}));

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(process.env.PORT || 4200);