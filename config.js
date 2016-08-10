module.exports = {
    port: process.env.PORT || 80,
    db: process.env.MONGOLAB_URI || "mongodb://localhost/image-search"
};
