var express = require('express');

var app = express();

var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var session = require('express-session');

app.use(session({secret:'SuperSecretPassword'}));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 6897);


app.get('/', function(req,res){
   var context = {};
   if (!req.session.name) {      //if the session object does not exist yet
      res.render('
});


app.use(function(req,res){
   res.status(404);
   res.render('404');
});


app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://flip2.engr.oregonstate.edu:' + app.get('port') + '; press Ctrl-C to terminate.');
});
