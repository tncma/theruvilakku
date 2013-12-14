// Server.js 
// Municipality details
// Ward Details
// Street Details

var express = require('express');
var app = express();

app.use(express.bodyParser());

app.get('/', function(req, res){
  res.send("it's working");
});

app.get('/municipality', function(req,res)
{
	setResponseHeader(res);
	getMunicipalities(1, function(data)
	{
		res.send(data);
	});
});

app.get('/street', function(req,res)
{
	setResponseHeader(res);
	getStreets(1,1, function(data)
	{
		res.send(data);
	});
});

app.post('/compliant', function(req, res) {
    console.log ("Data received " + req.body.UserInfo.PhoneNo);    
});

console.log('Started');
app.listen(1234);

// Common Functions
function setResponseHeader(res)
{
	res.contentType('application/json');
	res.header('Access-Control-Allow-Origin', '*');
}


// Sample data provider
function getMunicipalities(cid, callback)
{
	// Get from data set
	var mun = [
		{"ID":"1","Name":"Avadi"},
		{"ID":"2","Name":"Alandur"},
		{"ID":"3","Name":"Pallavaram"},
		{"ID":"4","Name":"Tambaram"},
		{"ID":"5","Name":"Thiruvallur"}
	]
	callback(mun);
}

function getStreets(cid, mid, callback)
{
	// Get from data set
	var mun = [
		{"ID":"1","Name":"Avadi"},
		{"ID":"2","Name":"Alandur"},
		{"ID":"3","Name":"Pallavaram"},
		{"ID":"4","Name":"Tambaram"},
		{"ID":"5","Name":"Thiruvallur"}
	]
	callback(mun);
}