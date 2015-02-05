Fiber-friendly sleep statements (server only)

Example
=======
```javascript
console.assert(Meteor.isServer); // Meteor.sleep only works on the server
Meteor.sleep(1000); // ms
```

Why?
====
Meteor's fibers let you wait (i.e. during I/O) without blocking the event loop.
But the greatest of all ways to wait has been unattainable until now.
This package lets you sprinkle sleep statements throughout your code to convince your boss to buy better hardware.
Or rate-limit your API usage without using setTimeout.

```javascript
// Shopify wants no more than two events per second.
var results = [];
for (var i = 0; i < numPages; i++) {
    Meteor.sleep(500);

    var currentPage = FetchOrders(i);
    results = results.concat(currentPage);
}
```

Setup
=====
* Install `meteor add froatsnook:sleep`

License
=======
MIT

