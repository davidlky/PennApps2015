var express = require('express');
var app = express();

var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
// Connection URL
var url = 'mongodb://localhost:27017/payshare';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
	if(err==null){
		console.log("Connected correctly to server");
	}else{
		console.log(err);
	}

});

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.get('/', function (req, res) {
	res.sendfile("index.html");
});
app.get('/:id', function (req, res) {

	MongoClient.connect(url, function(err, db) {
	  if (err) {
	    throw err;
	  }
	  db.collection(req.params.id).find().toArray(function(err, result) {
	    if (err) {
	      throw err;
	    }
  		res.json(result);
	  });
	});
});


app.post('/:id', function (req, res) {
	console.log(req.body);
	MongoClient.connect(url, function(err, db) {
	  if (err) {
	    throw err;
	  }
	  db.collection(req.params.id).insert(req.body,function(err, result) {
	    if (err) {
	      throw err;
	    }
  		res.send(result);
	  });
	});
});

app.get('/delete/:id', function (req,res){
	MongoClient.connect(url, function(err, db) {
	  if (err) {
	    throw err;
	  }
	  db.collection(req.params.id).deleteMany(function(err, result) {
	    if (err) {
	      throw err;
	    }
  		res.send("deleted all " + req.params.id);
	  });
	});

});

app.post('/:event/search', function (req,res){
	MongoClient.connect(url, function(err, db) {
	  if (err) {
	    throw err;
	  }
	  db.collection(req.params.event).find(req.body).toArray(function(err,data) {
	    if (err) {
	      throw err;
	    }
  		res.json(data);
	  });
	});

});

app.get('/:event/id_search/:id', function (req,res){
	MongoClient.connect(url, function(err, db) {
	  if (err) {
	    throw err;
	  }
	  db.collection(req.params.event).findOne({_id:new ObjectId(req.params.id)},function(err,data) {
	    if (err) {
	      throw err;
	    }
  		res.json(data);
	  });
	});

});


app.listen(80, function () {
  console.log('Example app listening on port 80!');
  MongoClient.connect(url, function(err, db) {
	  if (err) {
	    throw err;
	  }
	  db.collection('users').find().toArray(function(err, result) {
	    if (err) {
	      throw err;
	    }
  		console.log(result);
	  });
	});
});
