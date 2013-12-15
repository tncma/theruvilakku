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

app.post('/problem', function(req, res) {
	setResponseHeader(res);
	// To DO Store data
	insertProblem(req.body,function(){
		//res.send("{status:'success'}");
    });    
});
app.get('/problems/:dname', function(req,res)
{
	setResponseHeader(res);
	getProblems(req.params.dname,function(data){
		res.send(data);
	});
});
app.get('/clearproblem', function(req,res)
{
	setResponseHeader(res);
	clearProblems(function(data){
		res.send(data);
	});
});
console.log('Started');
app.listen(port);

// Common Functions
function setResponseHeader(res)
{
	res.contentType('application/json');
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With"); 
}

function logError(title, error)
{
	console.log("Error in " + title + " - " + error );
}

// data provider
function getZone(did, callback)
{
	var db = new mongo.Db("CMA", new mongo.Server(dbhost, dbport),{safe:true});
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
	var db = new mongo.Db("CMA", new mongo.Server(dbhost, dbport),{safe:true});
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

function insertProblem(problem, callback)
{
	var db = new mongo.Db("CMA", new mongo.Server(dbhost, dbport),{safe:true});
	db.open(function(error)
	{
		if(error) { logError("connection",error);}
		else
		{
			db.collection('problem', function(error, collection)
			{
			if(error) { logError("problem collection",error);}
			else
			{
				collection.insert(problem,function(error){ if(error) {logError("problem insert",error);}});
			}
		});
	}
	});
}

function getProblems(dname,callback)
{
	var db = new mongo.Db("CMA", new mongo.Server(dbhost, dbport,{}),{safe:true});
	db.open(function(error)
	{
		if(error) { logError("connection",error);}
		else
		{
			db.collection('problem', function(error, collection)
			{
			if(error) { logError("problem collection",error);}
			else
			{
				collection.find({zone:dname},function(error, cursor)
				{
					if(error) { logError("find problem collection",error);}
					else
					{
						cursor.toArray(function(error,data)
						{ 
							if(error) { logError("find problem toArray",error);}
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

function clearProblems(callback)
{
	var db = new mongo.Db("CMA", new mongo.Server(dbhost, dbport));
	db.open(function(error)
	{
		if(error) { logError("connection",error);}
		else
		{
			db.collection('problem', function(error, collection)
			{
			if(error) { logError("problem collection",error);}
			else
			{
			collection.remove();
				callback("done");
			}
		});
	}
	});
}