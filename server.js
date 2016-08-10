var express = require("express"),
    app = express(),
    db = require("./db"),
    config = require("./config"),
    api = require("./api"),
    markdown = require("marked-engine");

app.set("views", __dirname);

app.engine("md", markdown.renderFile);

app.disable("etag"); // prevent blank page on 304

app.get(["/", "/search"], function(req, res) {
    res.render("README.md", function(err, html) {
	if (err) {
    	    console.log(err);
	} else {
	    res.end(html);
	}
    });
});

app.get("/search/:searchKey", function(req, res) {
    api.getSearchResults(req.params.searchKey, req.query.offset,
	 function(err, output) {
	     if (err) {
		 console.log(err);
		 res.status(500).end();
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
