var http = require('http');
var path = require('path');

var express = require('express');

var Chance = require('chance'),
    chance = new Chance();
    
var router = express();
var server = http.createServer(router);

var schoolData = require('./schools.js');

router.use(express.static(path.resolve(__dirname, 'client')));


server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Listening", addr.address + ":" + addr.port);
});

router.get('/', function (req,res) {
  res.render('main.hbs', {schools: schoolData.data});
});

var findById = function(items, id) {
  for (var i = 0; i < items.length; i++) {
    if (items[i].id == id) {
      return items[i];
    }
  }
}

router.get("/college/:id", function(request, response) {
  
  var id = parseInt(request.params.id);
  var selected_school = findById(schoolData.data, id);
  
  if (selected_school != null) {
    console.log("showing college", selected_school);
    response.render("details.hbs", selected_school);
  } else {
    console.log("Unknown school:" + id);
    response.redirect('/');
  }
  
})

router.get('/random', function (req, res) {
  res.render('stressed.hbs', {
    
    quote: chance.pickone(['Good job', 'Keep going', 'Don\'t worry, you\'ll get there', 'Winners never quit, and quitters never win',
    'You can do this!', 'Think of a puppy wearing sunglasses', 'Remember that person who gave up? Neither does anyone else', 
    'Every wrong attempt discarded is a step forward', 'Sometimes adversity is what you need to face in order to become successful', 'JUST DO IT',
    'Don\'t stop  when you are tired, stop when you are done'
    ]),
    
    author: "Inspirational Quote",
    
    gif: chance.pickone(["stressed1.gif", "stressed2.gif", "stressed3.gif", "stressed4.gif", "stressed5.gif"])
  });
});

router.get("/college/mit", function(req, res) {
  res.render("details.hbs", schools[0]);
})



