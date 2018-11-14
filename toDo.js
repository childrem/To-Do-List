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
      res.render('nameEntry', context);
      return;
   }
   
   // if the session does exist, we can process it
   context.name = req.session.name;
   context.toDo = req.session.toDo;
   context.toDoNum = req.session.toDo.length || 0;
   res.render('toDo',context);
});


app.post('/', function(req,res){
   var context = {};
   
   if (req.body['newUser']){
      // user came from the name entry page, so need to set up the new session object
      req.session.name = req.body.name;
      req.session.toDo = [];
      req.session.curId = 0;
   }
   
   if (!req.session.name){
      res.render('nameEntry',context);
      return;
   }
   
   context.name = req.session.name;
   context.toDoNum = req.session.toDo.length;
   context.toDo = req.session.toDo;
   
   res.render('toDo',context);
   
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
