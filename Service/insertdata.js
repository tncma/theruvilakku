var mongo = require("mongodb");
var dbhost = "127.0.0.1";
var dbport = mongo.Connection.DEFAULT_PORT;
console.log("DB Port - " + dbport);
var db = new mongo.Db("CMA", new mongo.Server(dbhost, dbport));
db.open(function(error){
	if(error)
	{
		console.log("Error in connection - " + error );
	}
	else
	{
		db.collection('zone', function(error, collection){
			if(error)
			{
				console.log("Error in zone collection - " + error );
			}
			else
			{
				collection.insert({did:1, zid:1, zone:'Thiruvotriyur', zoneT:'திருவொற்றியூர்'});
				collection.insert({did:1, zid:2, zone:'Manali', zoneT:'மணாலி'});
				collection.insert({did:1, zid:3, zone:'Madhavaram', zoneT:'மாதவரம்'});
				collection.insert({did:1, zid:4, zone:'Tondiarpet', zoneT:'தண்டையார்பேட்டை'});
				collection.insert({did:1, zid:5, zone:'Royapuram', zoneT:'ராயபுரம்'});
				collection.insert({did:1, zid:6, zone:'Ambattur', zoneT:'அம்பத்தூர்'});
				collection.insert({did:1, zid:7, zone:'Anna Nagar', zoneT:'அண்ணா நகர்'});
				collection.insert({did:1, zid:8, zone:'Teynampet', zoneT:'தேனாம்பேட்டை'});
				collection.insert({did:1, zid:9, zone:'Kodambakkam', zoneT:'கோடம்பாக்கம்'});
				collection.insert({did:1, zid:10, zone:'Valasaravakkam', zoneT:'வளசரவாக்கம்'});
				collection.insert({did:1, zid:11, zone:'Alandur', zoneT:'ஆலந்தூர்'});
				collection.insert({did:1, zid:12, zone:'Adyar', zoneT:'அடையாறு'});
				collection.insert({did:1, zid:13, zone:'Perungudi', zoneT:'பெருங்குடி'});
				collection.insert({did:1, zid:14, zone:'Sholinganallur', zoneT:'ஷோழிங்கநல்லூர்'});
				collection.insert({did:1, zid:15, zone:'Tambaram ', zoneT:'தாம்பரம்'});
				console.log('zone - inserted');
			}
		});
		
		db.collection('ward', function(error, collection) {
		if(error)
			{
				console.log("Error in ward collection - " + error );
			}
			else
			{
				collection.insert({did:1, zid:1, ward:'Ward ', wardT:'வார்டு ', from:1, to:14});
				collection.insert({did:1, zid:2, ward:'Ward ', wardT:'வார்டு ', from:15, to:21});
				collection.insert({did:1, zid:3, ward:'Ward ', wardT:'வார்டு ', from:22, to:33});
				collection.insert({did:1, zid:4, ward:'Ward ', wardT:'வார்டு ', from:34, to:48});
				collection.insert({did:1, zid:5, ward:'Ward ', wardT:'வார்டு ', from:49, to:63});
				collection.insert({did:1, zid:6, ward:'Ward ', wardT:'வார்டு ', from:79, to:93});
				collection.insert({did:1, zid:7, ward:'Ward ', wardT:'வார்டு ', from:94, to:108});
				collection.insert({did:1, zid:8, ward:'Ward ', wardT:'வார்டு ', from:109, to:126});
				collection.insert({did:1, zid:9, ward:'Ward ', wardT:'வார்டு ', from:127, to:142});
				collection.insert({did:1, zid:10, ward:'Ward ', wardT:'வார்டு ', from:143, to:155});
				collection.insert({did:1, zid:11, ward:'Ward ', wardT:'வார்டு ', from:156, to:167});
				collection.insert({did:1, zid:12, ward:'Ward ', wardT:'வார்டு ', from:170, to:182});
				collection.insert({did:1, zid:13, ward:'Ward ', wardT:'வார்டு ', from:183, to:191});
				collection.insert({did:1, zid:14, ward:'Ward ', wardT:'வார்டு ', from:192, to:200});
				collection.insert({did:1, zid:15, ward:'Ward ', wardT:'வார்டு ', from:1, to:39});
				console.log('Ward - inserted');
			}
		});
	}
});