Fiber-friendly sleep statements (server only)

Example
=======
```javascript
console.assert(Meteor.isServer); // Meteor.sleep only works on the server
Meteor.sleep(1000); // ms
```

```javascript
console.assert(Meteor.isServer); // Meteor.sleepUntil only works on the server
Meteor.sleepUntil(new Date(2020, 3, 1));
```

Why?
====
Meteor's fibers let you wait (i.e. during I/O) without blocking the event loop.  But the greatest of all ways to wait has been unattainable until now.  This package lets you sprinkle sleep statements throughout your code to convince your boss to buy better hardware.  Or to rate-limit your API usage without using setTimeout.

```javascript
// Shopify wants no more than two events per second.
var results = [];
for (var i = 0; i < numPages; i++) {
    Meteor.sleep(500);

    var currentPage = FetchOrders(i);
    results = results.concat(currentPage);
}
HandleResults(results);
```

Alternatives
============
The real advantage is code clarity.  The following examples demonstrate how this code might be written in the browser (where fibers are not available).

```javascript
// plain javascript
var results;
(function fetcher(i) {
    if (i === 5) {
        HandleResults(results);
        return;
    }

    var currentPage = FetchOrders(i);
    results = results.concat(currentPage);
    Meteor.setTimeout(function() {
        fetcher(i + 1);
    }, 500);
})(0);
```

```javascript
// async.js
async.concatSeries(_.range(5), function(i, callback) {
    var currentPage = FetchOrders(i);
    Meteor.setTimeout(function() {
        callback(null, currentPage);
    }, 500);
}, function(err, results) {
    HandleResults(results);
});
```

Setup
=====
* Install `meteor add froatsnook:sleep`

License
=======
MIT

