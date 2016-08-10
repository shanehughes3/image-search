var config = require("./dev-config"),
    mongoose = require("mongoose"),
    db = mongoose.connect(config.db),
    Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var logSchema = new Schema({
    keywords: String,
    offset: Number,
    time: {type: Date, default: Date.now}
});

var Entry = mongoose.model("Entry", logSchema);

exports.logNewSearch = function(searchKey, offset) {
    var newEntry = new Entry({ keywords: searchKey, offset: offset || 0 });
    newEntry.save(function(err) {
	if (err) {
	    console.log(err)
	} else {
	    console.log(newEntry);
	}
    });
};

exports.getRecent = function(cb) {
    var query = Entry.find().sort({ time: -1 }).limit(10);
    query.select({
	_id: 0,
	__v: 0
    });
    query.exec(function(err, output) {
	if (err) {
	    cb(err)
	} else {
	    cb(null, output)
	}
    });
};
