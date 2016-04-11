var http = require('http');
var path = require('path');

var express = require('express');

var router = express();
var server = http.createServer(router);

router.use(express.static(path.resolve(__dirname, 'client')));

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Listening", addr.address + ":" + addr.port);
});

var schools = [{
  id: 1,
  imageurl: "https://upload.wikimedia.org/wikipedia/en/thumb/4/44/MIT_Seal.svg/1024px-MIT_Seal.svg.png",
  collegename: "Massachusetts Institute of Technology",
  duedate: "Janurary 1st, 2017"
}, {
  id: 2,
  imageurl:"http://sadermedia.com/wp-content/uploads/2015/09/ut-logo.png",
  collegename: "University of Texas",
  duedate: "December 25th, 2016"
}];

router.get('/', function (req,res) {
  res.render('main.hbs', {
    schools: schools
  });
});
