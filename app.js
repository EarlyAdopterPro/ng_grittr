
// BASE SETUP
// =============================================
var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server);
	
  app.use(express.static(__dirname + '/public'));

// START SERVER
// ============================================
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


   // this is default route
  app.use('/', router);



// SOCKET.IO
// ============================================
io.sockets.on('connection', function(socket){
	socket.on('send message', function(data){
		io.sockets.emit('new message', data);
	});
});
