var express = require("express"),
    app = express(),
    db = require("./db"),
    config = require("./dev-config"),
    api = require("./api");

app.get("/", function(req, res) {
    
});

app.get("/search/:searchKey", function(req, res) {
    api.getSearchResults(req.params.searchKey, req.query.offset,
	 function(err, output) {
	     if (err) {
		 console.log(err);
	     } else {
		 res.writeHead(200, {"Content-Type":"application/json"});
		 res.end(JSON.stringify(output));
	     }
    });
});

app.get("/recent/", function(req, res) {
    db.getRecent(function(err, output) {
	if (err) {
	    console.log(err);
	    res.status(500).end();
	} else {
	    res.writeHead(200, {"Content-Type":"application/json"});
	    res.end(JSON.stringify(output));
	}
    });
});

app.listen(config.port);
