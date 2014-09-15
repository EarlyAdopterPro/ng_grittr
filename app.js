
// BASE SETUP
// =============================================
var express = require('express'),
	app = express(),
	server =      require('http').createServer(app),
	io =          require('socket.io').listen(server),
  mongoose =    require('mongoose'),
  bodyParser =  require('body-parser'),
  validator =   require('validator');	

  app.use(express.static(__dirname + '/public'));

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }))

  // parse application/json
  app.use(bodyParser.json())

  // parse application/vnd.api+json as json
  app.use(bodyParser.json({ type: 'application/vnd.api+json' }))



// CONNECT MONGOOSE 
// =============================================
  mongoose.connect('mongodb://localhost/grittr');

  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function callback () {
  // yay!
  });

// MONGOOSE SCHEMAS & MODELS
// =============================================

var UserModel = require('./models/user-model'); 
var User = mongoose.model('User', UserModel.UserSchema);

// REST API ROUTES
// =============================================

// api
// ---------------------------------------------------------------------
// post User - create a new record for a new user

app.post('/api/setpass', function(req, res) { 
  console.log("SetPass Mongoos api hit");
  console.log(req.body);
  console.log(req.params);

  if (validator.isEmail(req.body.email)) {
    User.findOne({email:req.body.email},'email password details', function (err, profile)    {
      if (err)
        res.send(err);
      if(!profile){
        User.create({
            email:req.body.email,
            password: req.body.password,
            roles:[{}],
            details:{wizard_progress: 1},
          }, function (err, result){
                if(err)
                  res.send(err)
                console.log("/api/setpass: Wizard_progress: 1 - User created, password set");
                res.send(result);

          });
       } else {
        console.log ("Update record - set password");
        console.log (req.body.password);
        profile.password = req.body.password;
        profile.details.wizard_progress = 1;
        profile.save(function(err, result){
          if (err){
            console.log(err);
            res.send(err);
          }
          console.log ("Wizard_progress: 1 - Password set");
          res.send(result)
        });
       }
     }); 
  } else { // email validator else
      res.send("Email format is incorrect");
  }
});
 
// Entry point for Invites;
app.get('/invite/:email', function(req, res) {
  console.log("INVITE");
  console.log(req.params.email);

  // Check if email format is valid
  if (validator.isEmail(req.params.email)) {
    console.log ("Data is Email");

    User.findOne( {email:req.params.email}, function(err, user) {
      if (err)
        res.send(err)
      console.log(user);

      if (!user) {
          // Email is not used, create a new record. 
          User.create({
            email:req.params.email,
            password: null,
            roles:[{}],
            details:{wizard_progress: 0}
          }, function (err, user){
              if(err)
                res.send(err)
              res.redirect("/wizard#/invite/" + req.params.email);
          });
          console.log("Wizard progress: 0; new profile created");
      } else {
          console.log('User exists, email:');
          console.log(user.email);
            
          if(user.details.wizard_progress > 0  && user.password != null) {
            console.log("Password was set previously, redirecting to home");
            res.redirect("/");
          } else {
            console.log("Password was not set, redirecting to wizard");
            res.redirect("/wizard#/invite/" + req.params.email);
          }
        }
    }); // User.findOne ends here;
  } else {
    console.log("ERROR: Email format is not valid; Redirecting to home");
    res.redirect("/"); 
  }
})

// START SERVER
// =============================================
  server.listen(3000);


// ROUTES
// =============================================


  // get an instance of router
  var router = express.Router();

  // route middleware that will happen on every request
  router.use(function(req, res, next) {

    // log each request to the console
    console.log(req.method, req.url);

    // continue doing what we were doing and go to the route
    next(); 

    // Keep in mind that you can use route middleware for many things. 
    // You can use it to check that a user is logged in in the session 
    // before letting them continue.
  });

  // apply the routes to our application
  // we can use multiple route groups: basic routes, authentification routes, etc

  app.route('/')

    // show the form (GET http://localhost:8080/login)
    .get(function(req, res) {
  	  res.sendfile(__dirname + '/login.html');
   //   res.send('this is the login form');
    })

    // process the form (POST http://localhost:8080/login)
    .post(function(req, res) {
      console.log('processing');
      res.send('processing the login form!');
    });

  // home page route (http://localhost:3000)
  router.get('/grittr', function(req, res){
	  res.sendfile(__dirname + '/index.html');
  });

  router.get('/dashboard', function(req, res) {
    res.sendfile(__dirname + '/dashboard.html');
  });

  router.get('/wizard', function(req, res) {
    res.sendfile(__dirname + '/wizard.html');
  });

  router.get('/wizard/', function(req, res) {
    res.sendfile(__dirname + '/wizard.html');
  });

  router.get('/invite/', function(req, res) {
    res.sendfile(__dirname + '/wizard.html');
  });

  router.get('/invite', function(req, res) {
    res.sendfile(__dirname + '/wizard.html');
  });

  // this is default route
  app.use('/', router);



// SOCKET.IO
// ============================================
io.sockets.on('connection', function(socket){
	socket.on('send message', function(data){
		io.sockets.emit('new message', data);
	});
});
