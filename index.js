var express = require("express");
var bodyParser = require("body-parser");
var request = require("request");
var app = express();

app.use(express.static(__dirname + "/public"));

app.use(bodyParser());

app.get("/", function(req, res) {
	res.redirect("/index.html");
});

app.post("/getData", function(req, res) {
	var dataUrl = req.body.dataUrl;
	request(dataUrl, function(err, response) {
		res.send(JSON.parse(response.body));
	});
});

app.listen(8080);