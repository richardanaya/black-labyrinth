var express = require('express');
var request = require('request');
require('dotenv').load();

var configureServer = function () {
    var server = express.createServer();

    server.configure(
        function () {
            console.log(__dirname);
            //any static file from the static directory, just return it to user if requested
            server.use(express.static(__dirname + '/../../build/'));
        }
    );
    return server;
};

var port = process.env.PORT || 5000;
var server = configureServer();

server.get('/token', function (req, res) {
    var config = {
        domain: process.env.XIRSYS_DOMAIN,
        application: 'default',
        room: 'default',
        ident: process.env.XIRSYS_IDENT,
        secret: process.env.XIRSYS_SECRET
    };
    console.log(config);
    request({
        url: "https://service.xirsys.com/signal/token",
        method: "POST",
        json: true,
        headers: {
            "content-type": "application/json",
        },
        body: config
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(body.d.token);
        }
    });
});

server.listen(port);
console.log("listening on port " + port);
