var express = require('express'),
	app = express(),
	cons = require('consolidate'); //Wrappers for template libraries for Express

app.engine('html', cons.swig); //Swig template engine integrated with Express using consolidate
app.set('view engine', 'html'); //Set view engine for express to be html
app.set('views', __dirname + '/views'); //Set directory to look for views

app.get('/', function(req, res){
	res.render('hello', { 'name': 'Swig' }); //Look for hello.html page and pass in value for 'name'
});

app.get('*', function(req, res){
	res.send("Page not found", 404);
});

app.listen(7000);
console.log("Express server started on port 7000");