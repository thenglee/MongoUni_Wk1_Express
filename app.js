var express = require('express'),
	app = express(),
	cons = require('consolidate'), //Wrappers for template libraries for Express
	MongoClient = require('mongodb').MongoClient,
	Server = require('mongodb').Server;

app.engine('html', cons.swig); //Swig template engine integrated with Express using consolidate
app.set('view engine', 'html'); //Set view engine for express to be html
app.set('views', __dirname + '/views'); //Set directory to look for views

//Create object to set up connection information
var mongoclient = new MongoClient(new Server('localhost', 27017,
												{ 'native_parser' : true }));
//Set reference to db, no connection yet
var db = mongoclient.db('demo');



app.get('/', function(req, res){
	db.collection('hello_mongo_express').findOne({}, function(err, doc){
		if (err) throw err;
		res.render('hello', doc); //Look for hello.html page and pass in document
	});
});

app.get('*', function(req, res){
	res.send("Page not found", 404);
});

//Start listening when the db connection is open
mongoclient.open(function(err, mongoclient){
	if (err) throw err;
	app.listen(7000);
	console.log("Express server started on port 7000");
});
