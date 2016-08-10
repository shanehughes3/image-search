var db = require("./db"),
    config = require("./dev-config"),
    google = require("googleapis"),
    customsearch = google.customsearch("v1");

 
exports.getSearchResults = function(searchKey, queryOffset, cb) {
    db.logNewSearch(searchKey, queryOffset);
    customsearch.cse.list({
	cx: config.api_cx,
	q: searchKey,
	auth: config.api_key,
	searchType: "image",
	num: 10,
	start: +queryOffset + 1 || 1 },
	function(err, resp) {
	    if (err) {
		cb(err);
	    } else if (resp.items && resp.items.length > 0) {
		output = resp.items.map(function(item) {
		    toAdd = {};
		    toAdd.url = item.link;
		    toAdd.title = item.title;
		    toAdd.thumbnail = item.image.thumbnailLink;
		    toAdd.context = item.image.contextLink;
		    return toAdd;
		});
		cb(null, output);
	    } else {
		cb(null, [{"error":"No results"}]);
	    }
	});
};
