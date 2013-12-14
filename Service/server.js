// Server.js 
var fs = require('fs');
var config = JSON.parse(fs.readFileSync("config.json"));
var host = config.host;
var port = config.port;

var mongo = require("mongodb");
var dbhost = "127.0.0.1";
var dbport = mongo.Connection.DEFAULT_PORT;


var express = require('express');
var app = express();
app.use(express.bodyParser());

app.get('/', function(req, res){
  res.send("it's working");
});

app.get('/zone/:did', function(req,res)
{
	setResponseHeader(res);
	getZone(req.params.did, function(data)
	{
		res.send(data);
	});
});

app.get('/ward/:did/:zid', function(req,res)
{
	setResponseHeader(res);
	getWard(req.params.did,req.params.zid, function(data)
	{
		res.send(data);
	});
});

app.post('/compliant', function(req, res) {
	// To DO Store data
    console.log ("Data received " + req.body.UserInfo.PhoneNo);    
});

console.log('Started');
app.listen(port);

// Common Functions
function setResponseHeader(res)
{
	res.contentType('application/json');
	res.header('Access-Control-Allow-Origin', '*');
}
function logError(title, error)
{
	console.log("Error in " + title + " - " + error );
}


// Sample data provider
function getZone(did, callback)
{
	var db = new mongo.Db("CMA", new mongo.Server(dbhost, dbport));
	db.open(function(error)
	{
		if(error) { logError("connection",error);}
		else
		{
			db.collection('zone', function(error, collection)
			{
			if(error) { logError("zone collection",error);}
			else
			{
				collection.find({did:parseInt(did)}, function(error, cursor)
				{
					if(error) { logError("find zone collection",error);}
					else
					{
						cursor.toArray(function(error,data)
						{ 
							if(error) { logError("find zone toArray",error);}
							else
							{
								callback(data);
							}
						});
					}
				});
			}
		});
	}
	});
}

function getWard(did, zid, callback)
{
	var db = new mongo.Db("CMA", new mongo.Server(dbhost, dbport));
	db.open(function(error)
	{
		if(error) { logError("connection",error);}
		else
		{
			db.collection('ward', function(error, collection)
			{
			if(error) { logError("ward collection",error);}
			else
			{
				collection.find({did:parseInt(did), zid:parseInt(zid)}, function(error, cursor)
				{
					if(error) { logError("find ward collection",error);}
					else
					{
						cursor.toArray(function(error,data)
						{ 
							if(error) { logError("find ward toArray",error);}
							else
							{
								if(data.length > 0)
								{
									var wdata = [];
									for(var i = data[0].from; i < data[0].to; i++)
									{
										wdata.push({did:did, zid:zid, ward:'Ward ' + i, wardT:'வார்டு ' + i});
									}
									callback(wdata);
								}
							}
						});
					}
				});
			}
		});
	}
	});
}