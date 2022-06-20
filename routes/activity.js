'use strict';
// Deps
const Path = require('path');
const JWT = require(Path.join(__dirname, '..', 'lib', 'jwtDecoder.js'));
var util = require('util');
var http = require('https');
// const axios = require("axios")
// const messaingResponse = require('twilio').twiml.MessagingResponse;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
// const my_phone = process.env.TO_NUMBER
const from_phone = process.env.FROM_NUMBER
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
        console.log("decoded",decoded.keyValue)
        if (decoded && decoded.inArguments && decoded.inArguments.length > 0) {
                var inArguments = decoded.keyValue;
                console.log("inargumentsaxiosss-->",inArguments)
                // logData(req)
                var stringData = {"phone": inArguments}
                // console.log("stringData----->",stringData)


                //comienza twilio

        try {
                const client = require('twilio')(accountSid, authToken); 
                client.messages 
                    .create({         
                        to: inArguments,
                        messagingServiceSid: 'MG9771218c5623a637a50b48352f6b655c',
                        body: 'Hello edu!'
                    }) 
                    .then(message => console.log(message.sid)) 
                    .done();
                res.end("SE ENVIO MENSAJE A "+inArguments);
                
        }catch(error) {
                console.error(error);
        }
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