# image-search

An api wrapper for google image search.

### Usage

#### Search

Visit `/search/<keywords>` to retrieve results.  The server will return the
first 10 results in JSON format.

Use the `offset=<n>` option to bypass the first n results.

Examples:

`/search/cats` - Returns the first 10 image results of cats.

`/search/dogs?offset=20` - Returns results 21-30 of images of dogs.

#### Recent Searches

Visit `/recent/` to view the 10 most recent searches.

#### Help

Visit the root level on the server (`/`) to display this page.