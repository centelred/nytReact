//include server dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

//require schemas
var Article = require("./server/model");

//create express app
var app = express();
var PORT = process.env.PORT || 3000; //set inital port

//run morgan for logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: "application/vnd.api+json"}));

app.use(express.static("./public"));

//mongodb config
mongoose.connect('mongodb://admin:reactrocks@ds023593.mlab.com:23593/heroku_pg676kmk');
var db = mongoose.connection;

db.on("error", function(err) {
	console.log("mongoose error: ", err);
});

db.once("open", function(){
	console.log("Mongoose connection successful.");
});

//main route
app.get("/", function(req,res){
	res.sendFile("./public/index.html");
})

//route to get all saved articles
app.get("/api/saved", function(req,res){
	Article.find({})
		.exec(function(err,doc){

			if(err) {
				console.log(err);
			}
			else {
				res.send(doc);
			}

		});
});

//route to save article
app.post("/api/saved", function(req,res){
	var newArticle = new Article(req.body);

	console.log(req.body);

	var title = req.body.title;
	var date = req.body.date;
	var url = req.body.url;

	newArticle.save(function(err,doc){
		if (err) {
			console.log(err);
		}
		else {
			res.send(doc);
		}
	});
});

//route to delete article
app.delete("/api/saved/", function(req,res){
	var url = req.param("url");

	Article.find({ url: url }).remove().exec(function(err){
		if (err) {
			console.log(err);
		}
		else {
			res.send("deleted");
		}
	});
});

//any false routes direct to index.html
app.get("*", function(req,res) {
	res.sendFile(__dirname + "/public/index.html");
});

app.listen(PORT, function() {
	console.log("App listening on PORT: " + PORT);
});