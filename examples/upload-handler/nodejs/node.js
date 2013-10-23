// Load Modules
var express = require('express')
  , http = require('http')
  , path = require('path')
  , fs = require('fs');

// Init Express.js
var app = express();
// Bind Socket.IO to Express.js session
var srv = http.createServer(app);
// Configure Express.js
app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.use(express.bodyParser());
  app.use(express.methodOverride());  
  
  // Static files in public/
  app.use(express.static(__dirname + '/../../../'));
  console.log(__dirname + '/../../../');
  // App Routes
  app.use(app.router);
});

app.all('/file/post', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Cache-Control, X-Requested-With');

  next();
});

app.all('/file/post', function(req, res){
  fs.readFile(req.files.file.path, function (err, data) {
    // ...
    var name = Math.random().toString(36).substr(2, 15);
    var newPath = __dirname + "/uploads/" + name;
    fs.writeFile(newPath, data, function (err) {
      res.end("http://localhost:3000/examples/upload-handler/nodejs/uploads/" + name);
    });
  });
});

// Listing
srv.listen(app.get('port'), function(){
  console.log("");
  console.log("Access editor at http://localhost:" + app.get('port') + "/index.html");
  console.log("");
});