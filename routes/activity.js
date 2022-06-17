'use strict';
// Deps
const Path = require('path');
const JWT = require(Path.join(__dirname, '..', 'lib', 'jwtDecoder.js'));
var util = require('util');
var http = require('https');
const axios = require("axios")
const url = "https://api-global.yalochat.com/notifications/api/v1/accounts/krispy-kreme-wa-mx/bots/krispy-kreme-wa-mx/notifications"
exports.logExecuteData = [];
function logData(req) {
exports.logExecuteData.push({
body: req.body,
headers: req.headers,
trailers: req.trailers,
method: req.method,
url: req.url,
params: req.params,
query: req.query,
route: req.route,
cookies: req.cookies,
ip: req.ip,
path: req.path,
host: req.host,
fresh: req.fresh,
stale: req.stale,
protocol: req.protocol,
secure: req.secure,
originalUrl: req.originalUrl
});
console.log("body: " + util.inspect(req.body));
console.log("headers: " + req.headers);
console.log("trailers: " + req.trailers);
console.log("method: " + req.method);
console.log("url: " + req.url);
console.log("params: " + util.inspect(req.params));
console.log("query: " + util.inspect(req.query));
console.log("route: " + req.route);
console.log("cookies: " + req.cookies);
console.log("ip: " + req.ip);
console.log("path: " + req.path);
console.log("host: " + req.host);
console.log("fresh: " + req.fresh);
console.log("stale: " + req.stale);
console.log("protocol: " + req.protocol);
console.log("secure: " + req.secure);
console.log("originalUrl: " + req.originalUrl);
}
/*
* POST Handler for / route of Activity (this is the edit route).
*/
exports.edit = function (req, res) {
// Data from the req and put it in an array accessible to the main app.
console.log( req.body );
logData(req);
res.send(200, 'Edit');
};
/*
* POST Handler for /save/ route of Activity.
*/
exports.save = function (req, res) {
// Data from the req and put it in an array accessible to the main app.
console.log("save in activity--->", req.body );
logData(req);
res.send(200, 'Save');
};
/*
* POST Handler for /execute/ route of Activity.
*/

exports.execute = function (req, res) {
console.log("reqbody -->", req.body);
// example on how to decode JWT

console.log("EXECUTE HAS BEEN RUN");
console.log('KEY - > ' + process.env.jwtSecret);

JWT(req.body, process.env.jwtSecret, (err, decoded) => {

        if (err) {
        console.error(err);
        return res.status(401).end();
        }
        console.log("decoded",decoded)
        if (decoded && decoded.inArguments && decoded.inArguments.length > 0) {
                var inArguments = decoded.inArguments;
                logData(req);
                var stringData = '{"type":"kkpremiososcars2022","users":[{"phone":"'+inArguments[1].Phone+'","params":{"PROMOCION":"promocion"}}]}'
                console.log("stringData----->",stringData)
                axios.defaults.headers = {
                'Content-Type': 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJUNUtNbHBiSGpKQ2RQSUtmdFZ5SUJBem5IUEllcThyMCJ9.EDZ45MU8V6tlEvAv1KAZeLtAwRSJgSg2bo5VzwNzdRE'
                }
                axios.post('https://api-global.yalochat.com/notifications/api/v1/accounts/krispy-kreme-wa-mx/bots/krispy-kreme-wa-mx/notifications',
                stringData)
                .then(response => {
                console.log('Response', response.data)
                })
                .catch(e => {
                console.log('Error: ', e.response.data)
                })


                res.send(200, 'Execute');
        } else {
                console.error('inArguments invalid.');
                return res.status(400).end();
                }
        });
};
/*
* POST Handler for /publish/ route of Activity.
*/
exports.publish = function (req, res) {
// Data from the req and put it in an array accessible to the main app.
console.log( req.body );
logData(req);
res.send(200, 'Publish');
};
/*
* POST Handler for /validate/ route of Activity.
*/
exports.validate = function (req, res) {
// Data from the req and put it in an array accessible to the main app.

console.log("activate consolelog --->", req.body );
logData(req);
res.send(200, 'Validate');
};