function restserver(app){

	var mongoose = require('mongoose'), 
		Schema = mongoose.Schema;
		

	// Database
	mongoose.connect('mongodb://localhost/web_api');

	var Order = new Schema({  
		username: { type: String, required: true },  
		address: { type: String, required: true },  
		mode: { type: String, required: false},  
		modified: { type: Date, default: Date.now }
	});

	var OrderModel = mongoose.model('Order', Order); 

    app.get('/api/orders', function (req, res){
    	console.log('get recibido')
	  return OrderModel.find(function (err, order) {
		if (!err) {
		  return res.send(order);
		} else {
		  return console.log(err);
		}
	  });
	});

	app.post('/api/orders', function (req, res){
	  var order;
	  console.log("POST: ");
	  console.log(req.body);
	  order = new OrderModel({
		username: req.body.username,
		address: req.body.address,
		mode: req.body.mode,
	  });
	  order.save(function (err) {
		if (!err) {
		  return console.log("created");
		} else {
		  return console.log(err);
		}
	  });
	  return res.send(order);
	});
	
	app.put('/api/orders/:id', function (req, res){
	  return OrderModel.findById(req.params.id, function (err, order) {
		order.username = req.body.username;
		order.address = req.body.address;
		order.mode = req.body.mode;
		return order.save(function (err) {
		  if (!err) {
			console.log("updated");
		  } else {
			console.log(err);
		  }
		  return res.send(order);
		});
	  });
	});
	
	app.delete('/api/orders/:id', function (req, res){
		console.log('Delete inside');
	  return OrderModel.findById(req.params.id, function (err, order) {
		return order.remove(function (err) {
		  if (!err) {
			console.log("removed");
			return res.send('');
		  } else {
			console.log(err);
		  }
		});
	  });
	});

	

}

exports.restserver = restserver;

console.log('Restserver init');

