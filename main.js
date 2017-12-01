
var PORT = 3000;

var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var staffService = require('./api/staff.js');


// mysql.query(_sql, function (err, rows) {
//     if (err) {
//         console.log("query-" + err);
//     }
//     console.log("query succeed..." + rows);
// });

// mysql.end(function (err) {
//     if (err) {
//         return;
//     }
//     console.log("close succeed...");
// });

var server = http.createServer(function (request, response) {
    staffService.getStaffByAccount('chaoguan').then(function (res) {
        console.table(JSON.stringify(res));
        response.writeHead(200, {
            'Content-Type': 'application/json'
        });
        response.write(JSON.stringify(res));
        response.end();
    }, function (error) {
        response.writeHead(404, {
            'Content-Type': 'text/plain'
        });
        response.write('cannot get data!');
        response.end();
    });
    // var pathname = url.parse(request.url).pathname;
    // var realPath = path.join("assets", pathname);
    // //console.log(realPath);
    // var ext = path.extname(realPath);
    // ext = ext ? ext.slice(1) : 'unknown';
    // fs.exists(realPath, function (exists) {
    //     if (!exists) {
    //         response.writeHead(404, {
    //             'Content-Type': 'text/html'
    //         });
    //         fs.readFile('assets/page/404.html',function(err,file){
    //             response.write(file);
    //             response.end();
    //         });
    //     } else {
    //         fs.readFile(realPath, "binary", function (err, file) {
    //             if (err) {
    //                 response.writeHead(500, {
    //                     'Content-Type': 'text/plain'
    //                 });
    //                 response.end(err);
    //             } else {
    //                 var contentType =  "text/plain";
    //                 response.writeHead(200, {
    //                     'Content-Type': contentType
    //                 });
    //                 response.write(file, "binary");
    //                 response.end();
    //             }
    //         });
    //     }
    // });
});
server.listen(PORT);
console.log("Server runing at port: " + PORT + ".");