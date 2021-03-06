if (process.env.NODE_ENV == "development") {
    module.exports = require("./dev-config");
} else {
    module.exports = {
	port: process.env.PORT || 8080,
	db: process.env.MONGOLAB_URI,
	api_cx: process.env.GOOGLE_API_CX,
	api_key: process.env.GOOGLE_API_KEY
    };

}
