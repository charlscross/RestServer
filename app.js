var application_root = __dirname,
    express = require("express"),
    path = require("path"),
	  restServer = require('./restserver');

var app = express();

// Config
app.configure(function () {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(application_root, "public")));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  app.all('*', function(req, res, next){
  	  
	  if (!req.get('Origin')) return next();
	  // use "*" here to accept any origin
	  
	  res.set('Access-Control-Allow-Origin', 'http://localhost:8000');
	  res.set('Access-Control-Allow-Methods', 'GET, POST,PUT,DELETE');
	  res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
	  // res.set('Access-Control-Allow-Max-Age', 3600);
	  if ('OPTIONS' == req.method) return res.send(200);
	  next();
	  console.log(req.method);
	 
	});
  
});



app.get('/api', function (req, res) {
  res.send('Ecomm API is running');
});

restServer.restserver(app);

// Launch server
app.listen(4242);